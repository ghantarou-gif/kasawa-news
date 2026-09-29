const PLACEHOLDER =
  /default\.jpg|spacer|pixel|blank\.(?:gif|png|jpg)|no-?image|btn_share|logo_yahoo|\/icon[-_./]/i;

function decodeEntities(value: string): string {
  return value
    .replace(/\\\//g, "/")
    .replace(/\\u0026/gi, "&")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function isPublicHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (!host.includes(".")) return false;
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return false;
  if (host === "0.0.0.0" || host === "::1" || host.startsWith("127.") || host.startsWith("10.")) return false;
  if (host.startsWith("192.168.") || host.startsWith("169.254.")) return false;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) return false;
  return true;
}

/** RSS and publisher pages sometimes ship a logo instead of the news photo. */
export function isPlaceholderImage(url: string | null | undefined): boolean {
  if (!url || !url.startsWith("https://")) return true;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return true;
  }
  if (parsed.username || parsed.password || !isPublicHost(parsed.hostname)) return true;
  if (PLACEHOLDER.test(parsed.pathname) || PLACEHOLDER.test(url)) return true;
  if (/\.svg(?:$|\?)/i.test(parsed.pathname)) return true;
  const width = Number(parsed.searchParams.get("w") ?? parsed.searchParams.get("width") ?? "");
  if (Number.isFinite(width) && width > 0 && width < 200) return true;
  return false;
}

function metaValues(html: string, key: string): string[] {
  const out: string[] = [];
  for (const tag of html.matchAll(/<meta\b[^>]*>/gi)) {
    const chunk = tag[0];
    if (!new RegExp(`(?:property|name)=["']${key}["']`, "i").test(chunk)) continue;
    const content = chunk.match(/content=["']([^"']+)["']/i);
    if (content?.[1]) out.push(decodeEntities(content[1].trim()));
  }
  return out;
}

function absoluteImage(raw: string, pageUrl: string): string | null {
  try {
    const url = new URL(raw, pageUrl);
    if (url.protocol !== "https:") return null;
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

/** Picks the publisher photo, skipping logos and Yahoo's default.jpg. */
export function imageFromHtml(html: string, pageUrl: string): string | null {
  const yahoo = [...html.matchAll(/https?:\/\/newsatcl-pctr\.c\.yimg\.jp\/[^"'\\\s<>]+/g)].map((match) =>
    decodeEntities(match[0]),
  );
  const candidates = [
    ...metaValues(html, "og:image"),
    ...metaValues(html, "twitter:image"),
    ...yahoo,
  ];
  for (const raw of candidates) {
    const url = absoluteImage(raw, pageUrl);
    if (url && !isPlaceholderImage(url)) return url;
  }
  return null;
}

export function cardImagePath(imageUrl: string): string {
  const token = Buffer.from(imageUrl, "utf8").toString("base64url");
  return `/pic/${token}.jpg`;
}

export function cardImageUrl(imageUrl: string, origin: string): string {
  return `${origin.replace(/\/$/, "")}${cardImagePath(imageUrl)}`;
}

export function imageUrlFromToken(token: string): string | null {
  const clean = token.replace(/\.jpe?g$/i, "");
  if (!/^[A-Za-z0-9_-]{8,}$/.test(clean)) return null;
  try {
    const url = Buffer.from(clean, "base64url").toString("utf8");
    return isPlaceholderImage(url) ? null : url;
  } catch {
    return null;
  }
}
