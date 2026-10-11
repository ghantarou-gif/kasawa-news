import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const OUT = path.join(process.cwd(), "out");
const OG_DIR = path.join(OUT, "og");
const CONCURRENCY = 6;
const FALLBACK = SITE ? `${SITE}/og-default.png` : "/og-default.png";

function extract(html, attr, prop) {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${prop}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${prop}["']`,
    "i",
  );
  return html.match(re)?.[1] || html.match(re2)?.[1] || "";
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function isOwnCard(url) {
  try {
    const parsed = new URL(url, SITE || "https://example.invalid");
    const pathname = parsed.pathname.toLowerCase();
    return (
      pathname.endsWith("/og-default.png") ||
      pathname.endsWith("/opengraph-image") ||
      pathname.includes("/opengraph-image") ||
      /\/og\/[^/]+\.(jpe?g|png|webp)$/i.test(pathname)
    );
  } catch {
    return false;
  }
}

function unwrapProxy(raw) {
  const value = decodeEntities(raw);
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.hostname === "wsrv.nl" || parsed.hostname.endsWith("weserv.nl")) {
      const inner = parsed.searchParams.get("url");
      return inner || value;
    }
    return value;
  } catch {
    return null;
  }
}

function enlargeYahoo(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.endsWith("yimg.jp") || parsed.hostname.endsWith("yahoo.co.jp")) {
      parsed.searchParams.set("pri", "l");
      parsed.searchParams.set("w", "1200");
      parsed.searchParams.set("h", "630");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

function dropSizeParams(url) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("w");
    parsed.searchParams.delete("h");
    parsed.searchParams.delete("width");
    parsed.searchParams.delete("height");
    return parsed.toString();
  } catch {
    return url;
  }
}

function proxied(url) {
  const params = new URLSearchParams({
    url,
    w: "1200",
    h: "630",
    fit: "cover",
    output: "jpg",
  });
  return `https://wsrv.nl/?${params.toString()}`;
}

function isPlaceholder(url) {
  const lower = url.toLowerCase();
  return (
    lower.includes("/default.jpg") ||
    lower.includes("/default.png") ||
    lower.includes("/default.") ||
    lower.includes("noimage") ||
    lower.includes("placeholder")
  );
}

function looksLikeImage(bytes, type) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return true;
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return true;
  }
  if (
    bytes.length >= 12 &&
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP"
  ) {
    return true;
  }
  return type.startsWith("image/");
}

async function fetchBytes(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      redirect: "follow",
    });
    if (!response.ok) return null;
    const type = response.headers.get("content-type") || "";
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 1500 || bytes.length > 4_000_000) return null;
    if (!looksLikeImage(bytes, type)) return null;
    return bytes;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function candidates(url) {
  const list = [];
  const add = (value) => {
    if (value && !list.includes(value)) list.push(value);
  };
  add(url);
  add(enlargeYahoo(url));
  add(dropSizeParams(url));
  add(proxied(url));
  add(proxied(enlargeYahoo(url)));
  add(proxied(dropSizeParams(url)));
  return list;
}

async function download(url) {
  for (const next of candidates(url)) {
    const bytes = await fetchBytes(next);
    if (bytes) return bytes;
  }
  return null;
}

function storyImages(html) {
  const urls = [];
  const re = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = re.exec(html))) {
    const url = decodeEntities(match[1]);
    if (!url.startsWith("http") || isOwnCard(url) || isPlaceholder(url)) continue;
    if (!urls.includes(url)) urls.push(url);
  }
  return urls;
}

function rewrite(html, nextUrl) {
  const encoded = nextUrl.replace(/&/g, "&amp;");
  return html
    .replace(
      /(<meta[^>]+property=["']og:image["'][^>]+content=["'])([^"']+)(["'])/i,
      `$1${encoded}$3`,
    )
    .replace(
      /(<meta[^>]+content=["'])([^"']+)(["'][^>]+property=["']og:image["'])/i,
      `$1${encoded}$3`,
    )
    .replace(
      /(<meta[^>]+name=["']twitter:image["'][^>]+content=["'])([^"']+)(["'])/i,
      `$1${encoded}$3`,
    )
    .replace(
      /(<meta[^>]+content=["'])([^"']+)(["'][^>]+name=["']twitter:image["'])/i,
      `$1${encoded}$3`,
    );
}

async function collectHtmlFiles(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await collectHtmlFiles(full, acc);
    else if (entry.name === "index.html" && /[/\\]n[/\\][^/\\]+[/\\]index\.html$/.test(full)) {
      acc.push(full);
    }
  }
  return acc;
}

async function main() {
  const files = await collectHtmlFiles(OUT);
  await mkdir(OG_DIR, { recursive: true });
  let ok = 0;
  let index = 0;

  async function worker() {
    while (index < files.length) {
      const file = files[index];
      index += 1;
      const html = await readFile(file, "utf8");
      const raw = extract(html, "property", "og:image") || extract(html, "name", "twitter:image");
      const source = unwrapProxy(raw);
      const id = path.basename(path.dirname(file));
      const destRel = `/og/${id}.jpg`;
      const destAbs = SITE ? `${SITE}${destRel}` : destRel;
      let next = FALLBACK;
      if (source && /\/og\/[^/]+\.(jpe?g|png|webp)$/i.test(source) && !source.includes("og-default")) {
        next = source;
        ok += 1;
      } else {
        const tries = [];
        if (source && !isOwnCard(source) && !isPlaceholder(source)) tries.push(source);
        for (const extra of storyImages(html)) {
          if (!tries.includes(extra)) tries.push(extra);
        }
        for (const tryUrl of tries) {
          const bytes = await download(tryUrl);
          if (bytes) {
            await writeFile(path.join(OG_DIR, `${id}.jpg`), bytes);
            next = destAbs;
            ok += 1;
            break;
          }
        }
      }
      const updated = rewrite(html, next);
      if (updated !== html) await writeFile(file, updated);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  console.log(`localize-og-images: ${ok}/${files.length} photos saved`);
}

await main();
