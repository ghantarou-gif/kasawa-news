import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const OUT = path.join(process.cwd(), "out");
const OG_DIR = path.join(OUT, "og");
const CONCURRENCY = 6;

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

function sourceImageUrl(raw) {
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

async function download(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(enlargeYahoo(url), {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NyanChuOg/1.0)",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      redirect: "follow",
    });
    if (!response.ok) return null;
    const type = response.headers.get("content-type") || "";
    if (!type.startsWith("image/")) return null;
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 4000 || bytes.length > 4_000_000) return null;
    return bytes;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
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
  const fallback = SITE ? `${SITE}/opengraph-image` : "/opengraph-image";
  let ok = 0;
  let index = 0;

  async function worker() {
    while (index < files.length) {
      const file = files[index];
      index += 1;
      const html = await readFile(file, "utf8");
      const raw = extract(html, "property", "og:image") || extract(html, "name", "twitter:image");
      const source = sourceImageUrl(raw);
      const id = path.basename(path.dirname(file));
      const destRel = `/og/${id}.jpg`;
      const destAbs = SITE ? `${SITE}${destRel}` : destRel;
      let next = fallback;
      if (source && !isPlaceholder(source)) {
        const bytes = await download(source);
        if (bytes) {
          await writeFile(path.join(OG_DIR, `${id}.jpg`), bytes);
          next = destAbs;
          ok += 1;
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
