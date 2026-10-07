import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import {
  excerptFromBody,
  fetchArticleLead,
  fetchNhkStory,
  nhkArticleId,
  nhkLeadText,
  paragraphsFromHtml,
  shouldExpandStory,
} from "./article-body";
import { FETCH_TIMEOUT_MS, isPaywalledText, isPaywalledUrl, PER_SOURCE_PER_DAY, REVALIDATE_SECONDS } from "./config";
import { encodeArticleId } from "./article-id";
import { isJapaneseElectionArticle } from "./election";
import { feedsForLocale, type Feed } from "./feeds";
import { genres, type GenreId } from "./genres";
import { githubPages } from "./hosting";
import { mergeArticles } from "./store";
import { articleDayKey } from "./time";
import type { Article } from "./types";
import type { Locale } from "./locale";

function decodeEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCharCode(parseInt(n, 16)),
    );
}

function stripTags(value: string): string {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inner(block: string, tag: string): string {
  const match = block.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"),
  );
  return match ? stripTags(match[1]) : "";
}

function attr(block: string, tag: string, name: string): string {
  const match = block.match(
    new RegExp(`<${tag}[^>]*\\s${name}="([^"]+)"[^>]*/?>`, "i"),
  );
  return match ? decodeEntities(match[1]) : "";
}

function itemBlocks(xml: string): string[] {
  const items = xml.match(/<item(?=[\s>])[\s\S]*?<\/item>/gi) ?? [];
  const entries = xml.match(/<entry(?=[\s>])[\s\S]*?<\/entry>/gi) ?? [];
  return [...items, ...entries];
}

function itemLink(block: string): string {
  const href = attr(block, "link", "href");
  if (href) return href;
  return inner(block, "link") || inner(block, "guid") || attr(block, "item", "rdf:about");
}

function itemDate(block: string): string | null {
  const raw =
    inner(block, "pubDate") ||
    inner(block, "updated") ||
    inner(block, "published") ||
    inner(block, "dc:date");
  if (!raw) return null;
  const time = Date.parse(raw);
  return Number.isNaN(time) ? raw : new Date(time).toISOString();
}

function canonicalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    [
      "at_medium",
      "at_campaign",
      "ref",
      "utm_source",
      "utm_medium",
      "utm_campaign",
    ].forEach((key) => parsed.searchParams.delete(key));
    // itmedia.co.jp without www redirects to the site root, not the article.
    if (parsed.hostname.startsWith("www.") && !parsed.hostname.endsWith("itmedia.co.jp")) {
      parsed.hostname = parsed.hostname.slice(4);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

function itemImage(block: string): string | null {
  const candidates = [
    attr(block, "media:thumbnail", "url"),
    attr(block, "media:content", "url"),
    attr(block, "enclosure", "url"),
    inner(block, "image"),
    inner(block, "itunes:image") || attr(block, "itunes:image", "href"),
  ];
  const html = block.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (html?.[1]) candidates.push(decodeEntities(html[1]));

  for (const candidate of candidates) {
    if (candidate.startsWith("http://") || candidate.startsWith("https://")) {
      if (/\.(mp3|mp4|m4a|aac)(\?|$)/i.test(candidate)) continue;
      return candidate;
    }
  }
  return null;
}

function rawInner(block: string, tag: string): string {
  const match = block.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"),
  );
  return match?.[1] ?? "";
}

function itemBody(block: string, title: string): string {
  const candidates = [
    rawInner(block, "content:encoded"),
    rawInner(block, "content"),
    rawInner(block, "description"),
    rawInner(block, "summary"),
  ];
  let best = "";
  for (const candidate of candidates) {
    if (!candidate.trim()) continue;
    const text = paragraphsFromHtml(candidate, title);
    if (text.length > best.length) best = text;
  }
  return best;
}

function parseFeed(xml: string, feed: Feed): Article[] {
  return itemBlocks(xml)
    .map((block) => {
      const title = inner(block, "title");
      const url = itemLink(block);
      if (!title || !url || !url.startsWith("http")) return null;
      const cleanUrl = canonicalizeUrl(url);
      const described = feed.id.startsWith("nhk-")
        ? nhkLeadText(decodeEntities(rawInner(block, "description")))
        : "";
      const body = itemBody(block, title) || described;
      const excerpt = excerptFromBody(body);
      if (isPaywalledUrl(cleanUrl) || isPaywalledText(`${title} ${excerpt} ${body}`)) {
        return null;
      }
      return {
        id: `${feed.id}:${cleanUrl}`,
        title,
        url: cleanUrl,
        excerpt,
        body,
        publishedAt: itemDate(block),
        source: feed.name,
        sourceId: feed.id,
        desks: feed.categories,
        locales: feed.locales,
        firstSeenAt: new Date().toISOString(),
        image: itemImage(block),
      } satisfies Article;
    })
    .filter((article): article is Article => article !== null);
}

async function fetchFeed(feed: Feed): Promise<Article[]> {
  try {
    const response = await fetch(feed.url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
        "User-Agent": "NyanChu/1.0 RSS reader",
      },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    if (!xml.includes("<")) return [];
    return parseFeed(xml, feed);
  } catch {
    return [];
  }
}

function sortNewest(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    const aTime = Date.parse(a.publishedAt ?? a.firstSeenAt);
    const bTime = Date.parse(b.publishedAt ?? b.firstSeenAt);
    return (Number.isNaN(bTime) ? 0 : bTime) - (Number.isNaN(aTime) ? 0 : aTime);
  });
}

function capDay(articles: Article[]): Article[] {
  const seen = new Map<string, number>();
  const kept: Article[] = [];
  for (const article of sortNewest(articles)) {
    const n = seen.get(article.source) ?? 0;
    if (n >= PER_SOURCE_PER_DAY) continue;
    seen.set(article.source, n + 1);
    kept.push(article);
  }
  return kept;
}

export type DaySummary = {
  date: string;
  total: number;
  counts: Record<GenreId, number>;
};

const ingest = cache(async (locale: Locale): Promise<Article[]> => {
  const groups = await Promise.all(feedsForLocale(locale).map(fetchFeed));
  const stored = await mergeArticles(groups.flat());
  return stored.filter((article) => article.locales.includes(locale));
});

function countGenres(articles: Article[]): Record<GenreId, number> {
  const counts = Object.fromEntries(genres.map((genre) => [genre.id, 0])) as Record<
    GenreId,
    number
  >;
  for (const article of articles) {
    for (const genre of genres) {
      if (article.desks.includes(genre.id)) counts[genre.id] += 1;
    }
  }
  return counts;
}

export async function getDaySummaries(
  locale: Locale,
): Promise<{ days: DaySummary[]; updatedAt: string }> {
  const items = await ingest(locale);
  const buckets = new Map<string, Article[]>();
  for (const article of items) {
    const key = articleDayKey(article);
    const list = buckets.get(key) ?? [];
    list.push(article);
    buckets.set(key, list);
  }

  const days = [...buckets.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, articles]) => {
      const list = capDay(articles);
      return {
        date,
        total: list.length,
        counts: countGenres(list),
      };
    });

  return { days, updatedAt: new Date().toISOString() };
}

export async function getDayArticles(
  locale: Locale,
  date: string,
  desk?: GenreId,
): Promise<Article[]> {
  const items = await ingest(locale);
  const matched = capDay(items.filter((article) => articleDayKey(article) === date));
  const filtered = desk
    ? matched.filter((article) => article.desks.includes(desk))
    : matched;
  return sortNewest(filtered);
}

export async function latestDay(locale: Locale): Promise<string | null> {
  const { days } = await getDaySummaries(locale);
  return days[0]?.date ?? null;
}

export async function getElectionArticles(
  locale: Locale,
  limit = 48,
): Promise<Article[]> {
  const items = await ingest(locale);
  const matched = capDay(items.filter(isJapaneseElectionArticle));
  return sortNewest(matched).slice(0, limit);
}

function longer(next?: string, previous?: string): string {
  const incoming = next?.trim() ?? "";
  const stored = previous?.trim() ?? "";
  return incoming.length >= stored.length ? incoming : stored;
}

/** Reads the publisher page when the stored feed text is still a blurb. */
async function fillStory(article: Article): Promise<Article> {
  if (nhkArticleId(article.url)) {
    if (article.bodyComplete && article.image) return article;
    const story = await fetchNhkStory(article.url);
    if (!story.text && !story.image) return article;
    const body = longer(story.text, article.body);
    return {
      ...article,
      body,
      excerpt: body ? excerptFromBody(body) : article.excerpt,
      image: article.image || story.image,
      bodyComplete: Boolean(body),
    };
  }
  if (!shouldExpandStory(article)) return article;
  const current = (article.body || article.excerpt || "").trim();
  const lead = await fetchArticleLead(article.url, article.title);
  if (!lead) return article;
  if (lead.length <= current.length + 40) {
    return {
      ...article,
      body: article.body || lead,
      bodyComplete: true,
    };
  }
  return {
    ...article,
    body: lead,
    excerpt: excerptFromBody(lead),
    bodyComplete: true,
  };
}

const PAGES_STORY_PATH = path.join(process.cwd(), "data", "pages-stories.json");
const PAGES_FILL_CONCURRENCY = 6;

type BakedStory = {
  body: string;
  excerpt: string;
  image: string | null;
};

const bakedStories = new Map<string, BakedStory>();
let bakedFile: Map<string, BakedStory> | null = null;

function toBaked(article: Article): BakedStory {
  return {
    body: article.body || "",
    excerpt: article.excerpt || "",
    image: article.image,
  };
}

function needsFill(article: Article): boolean {
  if (nhkArticleId(article.url) && (!article.image || shouldExpandStory(article))) return true;
  return shouldExpandStory(article);
}

async function mapPool<T>(items: T[], limit: number, fn: (item: T) => Promise<void>): Promise<void> {
  if (items.length === 0) return;
  let index = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const current = index;
      index += 1;
      await fn(items[current]);
    }
  });
  await Promise.all(workers);
}

async function flushBakedStories(): Promise<void> {
  await mkdir(path.dirname(PAGES_STORY_PATH), { recursive: true });
  const tmp = `${PAGES_STORY_PATH}.tmp`;
  await writeFile(tmp, JSON.stringify(Object.fromEntries(bakedStories)));
  await rename(tmp, PAGES_STORY_PATH);
  bakedFile = bakedStories;
}

/** GitHub Pages bakes HTML at build time, so publisher text has to be fetched then. */
async function expandForStaticPages(articles: Article[]): Promise<void> {
  const pending = articles.filter((article) => !bakedStories.has(article.id));
  for (const article of pending) {
    if (!needsFill(article)) bakedStories.set(article.id, toBaked(article));
  }
  const targets = pending.filter((article) => !bakedStories.has(article.id));
  console.log(`Expanding ${targets.length} article bodies for the static site`);
  await mapPool(targets, PAGES_FILL_CONCURRENCY, async (article) => {
    try {
      bakedStories.set(article.id, toBaked(await fillStory(article)));
    } catch {
      bakedStories.set(article.id, toBaked(article));
    }
  });
  await flushBakedStories();
}

async function bakedStory(id: string): Promise<BakedStory | null> {
  if (bakedStories.has(id)) return bakedStories.get(id) ?? null;
  if (!bakedFile) {
    try {
      const raw = await readFile(PAGES_STORY_PATH, "utf8");
      bakedFile = new Map(Object.entries(JSON.parse(raw) as Record<string, BakedStory>));
    } catch {
      return null;
    }
  }
  return bakedFile.get(id) ?? null;
}

function applyBaked(article: Article, baked: BakedStory): Article {
  const body = longer(baked.body, article.body);
  const image = article.image || baked.image;
  if (body === (article.body || "") && image === (article.image || null)) return article;
  return {
    ...article,
    body,
    excerpt: body ? excerptFromBody(body) : article.excerpt,
    image,
    bodyComplete: true,
  };
}

export const getArticleById = cache(async (
  locale: Locale,
  articleId: string,
): Promise<Article | null> => {
  const items = await ingest(locale);
  const article =
    items.find(
      (item) => item.id === articleId || encodeArticleId(item.id) === articleId,
    ) ?? null;
  if (!article) return null;
  if (githubPages) {
    const baked = await bakedStory(article.id);
    return baked ? applyBaked(article, baked) : article;
  }
  const filled = await fillStory(article);
  if (filled !== article) await mergeArticles([filled]);
  return filled;
});

export async function getRelatedArticles(
  locale: Locale,
  article: Article,
  limit = 3,
): Promise<Article[]> {
  const day = articleDayKey(article);
  const items = await getDayArticles(locale, day);
  return items.filter((item) => item.id !== article.id).slice(0, limit);
}

export async function listCappedArticles(locale: Locale): Promise<Article[]> {
  const items = await ingest(locale);
  const buckets = new Map<string, Article[]>();
  for (const article of items) {
    const key = articleDayKey(article);
    const list = buckets.get(key) ?? [];
    list.push(article);
    buckets.set(key, list);
  }
  const list = [...buckets.values()].flatMap((day) => capDay(day));
  if (githubPages) await expandForStaticPages(list);
  return list;
}
