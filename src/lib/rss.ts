import { cache } from "react";
import { FETCH_TIMEOUT_MS, isPaywalledText, isPaywalledUrl, PER_SOURCE_PER_DAY, REVALIDATE_SECONDS } from "./config";
import { feedsForLocale, type Feed } from "./feeds";
import { genres, type GenreId } from "./genres";
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
    if (parsed.hostname.startsWith("www.")) {
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

function cleanExcerpt(value: string): string {
  const text = value.trim();
  if (!text || text === "記事を読む" || text === "続きを読む") return "";
  return text;
}

function parseFeed(xml: string, feed: Feed): Article[] {
  return itemBlocks(xml)
    .map((block) => {
      const title = inner(block, "title");
      const url = itemLink(block);
      if (!title || !url || !url.startsWith("http")) return null;
      const cleanUrl = canonicalizeUrl(url);
      const excerpt = cleanExcerpt(
        inner(block, "description") || inner(block, "summary"),
      );
      if (isPaywalledUrl(cleanUrl) || isPaywalledText(`${title} ${excerpt}`)) {
        return null;
      }
      return {
        id: `${feed.id}:${cleanUrl}`,
        title,
        url: cleanUrl,
        excerpt,
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
        "User-Agent": "KasawaNews/1.0 RSS reader",
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

export async function getArticleById(
  locale: Locale,
  articleId: string,
): Promise<Article | null> {
  const items = await ingest(locale);
  return items.find((article) => article.id === articleId) ?? null;
}

export async function getRelatedArticles(
  locale: Locale,
  article: Article,
  limit = 3,
): Promise<Article[]> {
  const day = articleDayKey(article);
  const items = await getDayArticles(locale, day);
  return items.filter((item) => item.id !== article.id).slice(0, limit);
}
