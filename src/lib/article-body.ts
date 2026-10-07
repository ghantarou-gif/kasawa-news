import { FETCH_TIMEOUT_MS, isPaywalledText, isPaywalledUrl, REVALIDATE_SECONDS } from "./config";

const BOILERPLATE =
  /記事を読む|続きを読む|関連記事|関連リンク|おすすめ|著作権|クッキー|cookie|プライバシー|ログイン|会員登録|シェアする|フォローする|この記事を|写真は|画像は|出典：|提供：|主要トピックスを新着順|幅広いジャンルのニュースをいち早く|newsletter|subscribe|all rights reserved/i;

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
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function normalize(value: string): string {
  return value.replace(/\s+/g, "").trim();
}

function isProse(line: string, titleNorm: string, full: boolean): boolean {
  const min = full ? 20 : 40;
  const max = full ? 2500 : 700;
  if (line.length < min || line.length > max) return false;
  if (BOILERPLATE.test(line)) return false;
  if (/https?:|www\./i.test(line)) return false;
  if (!/[。！？.!?]/.test(line)) return false;
  const norm = normalize(line);
  if (titleNorm && (norm === titleNorm || norm.startsWith(titleNorm))) return false;
  return true;
}

/** Turns feed HTML or a publisher page into readable paragraphs. */
export function paragraphsFromHtml(html: string, title = "", full = false): string {
  let source = html;
  for (let pass = 0; pass < 2; pass += 1) {
    const decoded = decodeEntities(source);
    if (decoded === source) break;
    source = decoded;
  }
  const stripped = source
    .replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (anchor) =>
      /続きを読む|記事を読む|read more/i.test(anchor) ? " " : anchor,
    )
    .replace(/<(script|style|noscript|nav|footer|header|aside|form|iframe|svg)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(p|div|li|h[1-6]|tr|blockquote|section|article)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ");

  const titleNorm = normalize(title);
  const lines: string[] = [];
  for (const raw of stripped.split(/\n+/)) {
    const line = raw
      .replace(/\s+/g, " ")
      .replace(/(続きを読む|記事を読む|read more).*/i, "")
      .trim();
    if (!isProse(line, titleNorm, full)) continue;
    if (lines.at(-1) === line) continue;
    lines.push(line);
  }

  const kept: string[] = [];
  let total = 0;
  for (const line of lines) {
    if (!full && kept.length >= 2 && total >= 180 && line.length < 45) break;
    if (total >= (full ? 10000 : 1200) || (!full && kept.length >= 8)) break;
    kept.push(line);
    total += line.length;
  }
  return kept.join("\n\n");
}

export function excerptFromBody(body: string): string {
  const first = body.split("\n\n")[0]?.trim() ?? "";
  if (first.length <= 220) return first;
  return `${first.slice(0, 219)}…`;
}

function sameSite(left: string, right: string): boolean {
  try {
    const host = (value: string) => new URL(value).hostname.replace(/^www\./, "");
    const a = host(left);
    const b = host(right);
    return a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`);
  } catch {
    return false;
  }
}

type YahooParagraph = {
  textDetails?: Array<{ text?: string }>;
};

type YahooState = {
  articleDetail?: {
    maxPage?: number;
    paragraphs?: YahooParagraph[];
  };
};

function readAssignmentJson(html: string, marker: string): unknown | null {
  const at = html.indexOf(marker);
  if (at < 0) return null;
  const start = html.indexOf("{", at);
  if (start < 0) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < html.length; index += 1) {
    const char = html[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(start, index + 1)) as unknown;
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

function plainText(value: string): string {
  let source = value;
  for (let pass = 0; pass < 2; pass += 1) {
    const decoded = decodeEntities(source);
    if (decoded === source) break;
    source = decoded;
  }
  return source
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\u3000/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function paragraphsFromYahooState(data: YahooState): string {
  const lines: string[] = [];
  for (const paragraph of data.articleDetail?.paragraphs ?? []) {
    for (const detail of paragraph.textDetails ?? []) {
      const text = plainText(detail.text ?? "");
      for (const line of text.split(/\n+/)) {
        const cleaned = line.replace(/\s+/g, " ").trim();
        if (cleaned.length < 8 || lines.at(-1) === cleaned) continue;
        if (BOILERPLATE.test(cleaned)) continue;
        lines.push(cleaned);
      }
    }
  }
  return lines.join("\n\n");
}

function yahooPageUrl(url: string, page: number): string {
  const parsed = new URL(url);
  parsed.searchParams.delete("source");
  if (page > 1) parsed.searchParams.set("page", String(page));
  else parsed.searchParams.delete("page");
  return parsed.toString();
}

/** A redirect to the publisher homepage is not the article. */
function landedOnStory(requestUrl: string, responseUrl: string): boolean {
  if (!sameSite(requestUrl, responseUrl)) return false;
  try {
    const requested = new URL(requestUrl).pathname.replace(/\/+$/, "");
    const landed = new URL(responseUrl).pathname.replace(/\/+$/, "");
    if (requested && !landed) return false;
    return true;
  } catch {
    return false;
  }
}

async function fetchHtmlOnce(url: string): Promise<string> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: {
      Accept: "text/html",
      "User-Agent": "NyanChu/1.0 RSS reader",
    },
  });
  if (!response.ok || !landedOnStory(url, response.url)) return "";
  const type = response.headers.get("content-type") ?? "";
  if (type && !type.includes("html") && !type.includes("xml") && !type.includes("json")) {
    return "";
  }
  return (await response.text()).slice(0, 400_000);
}

async function fetchHtml(url: string): Promise<string> {
  const first = await fetchHtmlOnce(url);
  if (first) return first;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.startsWith("www.")) return "";
    parsed.hostname = `www.${parsed.hostname}`;
    return await fetchHtmlOnce(parsed.toString());
  } catch {
    return "";
  }
}

async function fetchYahooArticle(url: string): Promise<string> {
  const first = await fetchHtml(yahooPageUrl(url, 1));
  if (!first) return "";
  const state = readAssignmentJson(first, "window.__PRELOADED_STATE__") as YahooState | null;
  const maxPage = Math.min(Math.max(state?.articleDetail?.maxPage ?? 1, 1), 8);
  const pages = [paragraphsFromYahooState(state ?? {})];
  if (maxPage > 1) {
    const rest = await Promise.all(
      Array.from({ length: maxPage - 1 }, (_, index) => fetchHtml(yahooPageUrl(url, index + 2))),
    );
    for (const html of rest) {
      if (!html) continue;
      const next = readAssignmentJson(html, "window.__PRELOADED_STATE__") as YahooState | null;
      pages.push(paragraphsFromYahooState(next ?? {}));
    }
  }
  const lines: string[] = [];
  for (const page of pages) {
    for (const line of page.split("\n\n")) {
      const cleaned = line.trim();
      if (!cleaned || lines.at(-1) === cleaned) continue;
      lines.push(cleaned);
    }
  }
  return lines.join("\n\n");
}

function isYahooArticle(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "").endsWith("yahoo.co.jp") && parsed.pathname.includes("/articles/");
  } catch {
    return false;
  }
}

/** A stored blurb still needs the publisher article behind it. */
export function shouldExpandStory(article: {
  body?: string;
  excerpt?: string;
  bodyComplete?: boolean;
}): boolean {
  if (article.bodyComplete) return false;
  const text = (article.body || article.excerpt || "").trim();
  if (text.length >= 900 && /[。！？.!?」）)]$/.test(text)) return false;
  return true;
}

function sliceElement(html: string, start: number, tag: string): string {
  const gt = html.indexOf(">", start);
  if (gt < 0) return "";
  const lower = html.toLowerCase();
  const open = `<${tag.toLowerCase()}`;
  const close = `</${tag.toLowerCase()}>`;
  let depth = 1;
  let index = gt + 1;
  while (index < html.length && depth > 0) {
    const nextOpen = lower.indexOf(open, index);
    const nextClose = lower.indexOf(close, index);
    if (nextClose < 0) return html.slice(gt + 1);
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + open.length;
    } else {
      depth -= 1;
      if (depth === 0) return html.slice(gt + 1, nextClose);
      index = nextClose + close.length;
    }
  }
  return "";
}

function elementsMatching(html: string, pattern: RegExp): string[] {
  const chunks: string[] = [];
  for (const match of html.matchAll(pattern)) {
    const tag = match[1];
    if (match.index === undefined || !tag) continue;
    chunks.push(sliceElement(html, match.index, tag));
  }
  return chunks;
}

function byId(html: string, id: string): string[] {
  return elementsMatching(html, new RegExp(`<([a-z0-9]+)[^>]*\\bid="${id}"[^>]*>`, "ig"));
}

function byClass(html: string, className: string): string[] {
  return elementsMatching(
    html,
    new RegExp(`<([a-z0-9]+)[^>]*\\bclass="[^"]*\\b${className}\\b[^"]*"`, "ig"),
  );
}

function bbcStory(html: string): string {
  const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!match) return "";
  let data: unknown;
  try {
    data = JSON.parse(match[1]) as unknown;
  } catch {
    return "";
  }
  const root = data as {
    props?: { pageProps?: { pageData?: { content?: { model?: { blocks?: unknown } } } } };
  };
  const blocks = root.props?.pageProps?.pageData?.content?.model?.blocks;
  if (!blocks) return "";
  const lines: string[] = [];
  const walk = (node: unknown) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!node || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    const type = record.type;
    if (type === "recommendations" || type === "relatedContent" || type === "headline") return;
    if (type === "paragraph") {
      const model = record.model as { text?: unknown } | undefined;
      const text = typeof model?.text === "string" ? model.text.replace(/\s+/g, " ").trim() : "";
      if (text.length > 25 && lines.at(-1) !== text) lines.push(text);
      return;
    }
    for (const value of Object.values(record)) walk(value);
  };
  walk(blocks);
  return lines.join("\n\n");
}

function publisherChunks(url: string, html: string): string[] {
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return [];
  }
  if (host.endsWith("itmedia.co.jp")) return byClass(html, "p-syntax-sentence");
  if (host.endsWith("gigazine.net")) return byId(html, "article");
  if (host.endsWith("mynavi.jp")) return byId(html, "js-articleBody");
  if (host.endsWith("livedoor.com")) return byId(html, "article-body");
  if (host.endsWith("cnet.com")) return byClass(html, "article_body");
  if (host.endsWith("bbc.com") || host.endsWith("bbci.co.uk")) return [];
  return [
    ...byId(html, "article-body"),
    ...byId(html, "js-articleBody"),
    ...byClass(html, "article_body"),
    ...byClass(html, "article-body"),
    ...byClass(html, "articleBody"),
  ].slice(0, 1);
}

function extractPublisherStory(url: string, html: string, title: string): string {
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
  if (host.endsWith("bbc.com") || host.endsWith("bbci.co.uk")) {
    const story = bbcStory(html);
    if (story) return story;
  }
  const chunks = publisherChunks(url, html);
  if (chunks.length === 0) return "";
  return paragraphsFromHtml(chunks.join("\n"), title, true);
}

export function nhkArticleId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "news.web.nhk" && !host.endsWith(".nhk.or.jp")) return null;
    const id = parsed.pathname.split("/").filter(Boolean).at(-1) ?? "";
    if (!/^n[a-z]-[A-Za-z0-9-]+$/.test(id)) return null;
    return id;
  } catch {
    return null;
  }
}

/** NHK publishes a short lead in RSS. The rest sits behind their usage check. */
export function nhkLeadText(value: string): string {
  const lines = value
    .replace(/\r/g, "")
    .replace(/<[^>]+>/g, " ")
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").replace(/^【NHK】/, "").trim())
    .filter((line) => line.length >= 8);
  const finished = lines.filter((line) => /[。！？.!?」）)]$/.test(line));
  // The public JSON lead is often cut off mid-sentence around 100 characters.
  return (finished.length > 0 ? finished : lines).join("\n\n");
}

type NhkArticleJson = {
  description?: string;
  abstract?: string;
  image?: { medium?: { url?: string }; icon?: { url?: string } };
};

function nhkImageUrl(value: string | undefined): string | null {
  if (!value || !value.startsWith("https://")) return null;
  try {
    const host = new URL(value).hostname.replace(/^www\./, "");
    if (host === "nhk" || host.endsWith(".nhk") || host.endsWith(".nhk.or.jp") || host.endsWith(".nhk.jp")) {
      return value;
    }
  } catch {
    return null;
  }
  return null;
}

export async function fetchNhkStory(url: string): Promise<{ text: string; image: string | null }> {
  const id = nhkArticleId(url);
  if (!id) return { text: "", image: null };
  try {
    const response = await fetch(`https://api.web.nhk/r8/t/newsarticle/na/${id}.json`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        Accept: "application/json",
        "User-Agent": "NyanChu/1.0 RSS reader",
      },
    });
    if (!response.ok) return { text: "", image: null };
    const data = (await response.json()) as NhkArticleJson;
    const text = nhkLeadText(data.description || data.abstract || "");
    const image = nhkImageUrl(data.image?.medium?.url) || nhkImageUrl(data.image?.icon?.url);
    if (text && isPaywalledText(text)) return { text: "", image };
    return { text, image };
  } catch {
    return { text: "", image: null };
  }
}

/** Reads the article text the publisher page actually contains. */
export async function fetchArticleLead(url: string, title: string): Promise<string> {
  if (!url.startsWith("https://") || isPaywalledUrl(url)) return "";
  try {
    if (nhkArticleId(url)) {
      const story = await fetchNhkStory(url);
      if (story.text) return story.text;
      return "";
    }
    if (isYahooArticle(url)) {
      const story = await fetchYahooArticle(url);
      if (story && !isPaywalledText(story)) return story;
    }
    const html = await fetchHtml(url);
    if (!html) return "";
    const story = extractPublisherStory(url, html, title);
    if (story && !isPaywalledText(story)) return story;
    const lead = paragraphsFromHtml(html, title);
    if (!lead || isPaywalledText(lead)) return "";
    return lead;
  } catch {
    return "";
  }
}
