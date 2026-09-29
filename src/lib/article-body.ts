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

function isProse(line: string, titleNorm: string): boolean {
  if (line.length < 40 || line.length > 700) return false;
  if (BOILERPLATE.test(line)) return false;
  if (/https?:|www\./i.test(line)) return false;
  if (!/[。！？.!?]/.test(line)) return false;
  const norm = normalize(line);
  if (titleNorm && (norm === titleNorm || norm.startsWith(titleNorm))) return false;
  return true;
}

/** Turns feed HTML or a publisher page into short readable paragraphs. */
export function paragraphsFromHtml(html: string, title = ""): string {
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
    if (!isProse(line, titleNorm)) continue;
    if (lines.at(-1) === line) continue;
    lines.push(line);
  }

  const kept: string[] = [];
  let total = 0;
  for (const line of lines) {
    if (kept.length >= 2 && total >= 180 && line.length < 45) break;
    if (total >= 1200 || kept.length >= 8) break;
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

/** Reads the lead a publisher already shows, when the feed itself has no body. */
export async function fetchArticleLead(url: string, title: string): Promise<string> {
  if (!url.startsWith("https://") || isPaywalledUrl(url)) return "";
  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        Accept: "text/html",
        "User-Agent": "NyanChu/1.0 RSS reader",
      },
    });
    if (!response.ok || !sameSite(url, response.url)) return "";
    const type = response.headers.get("content-type") ?? "";
    if (type && !type.includes("html") && !type.includes("xml")) return "";
    const html = (await response.text()).slice(0, 220_000);
    const lead = paragraphsFromHtml(html, title);
    if (!lead || isPaywalledText(lead)) return "";
    return lead;
  } catch {
    return "";
  }
}
