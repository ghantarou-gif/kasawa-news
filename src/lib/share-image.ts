import { existsSync } from "node:fs";
import path from "node:path";
import { siteUrl } from "@/lib/site";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

function isPlaceholderImage(url: string): boolean {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.toLowerCase();
    if (
      path.endsWith("/default.jpg") ||
      path.endsWith("/default.png") ||
      path.includes("/default.") ||
      path.includes("noimage") ||
      path.includes("placeholder") ||
      path.includes("spacer")
    ) {
      return true;
    }
    const yahoo =
      parsed.hostname.endsWith("yimg.jp") || parsed.hostname.endsWith("yahoo.co.jp");
    if (yahoo) return false;
    const height = Number(parsed.searchParams.get("h") || parsed.searchParams.get("height") || 0);
    const width = Number(parsed.searchParams.get("w") || parsed.searchParams.get("width") || 0);
    if (height > 0 && height < 100) return true;
    if (width > 0 && width < 120) return true;
    return false;
  } catch {
    return true;
  }
}

/** Prefer a larger Yahoo/news thumbnail when the feed only gives a small cut. */
export function enlargeShareImage(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.endsWith("yimg.jp") || parsed.hostname.endsWith("yahoo.co.jp")) {
      parsed.searchParams.set("pri", "l");
      parsed.searchParams.set("w", String(OG_WIDTH));
      parsed.searchParams.set("h", String(OG_HEIGHT));
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * X's crawler is blocked by many news CDNs (Yahoo, etc.).
 * Route the photo through wsrv.nl so the card can load a 1200×630 JPEG.
 */
export function proxiedShareImage(url: string): string {
  const source = enlargeShareImage(url);
  const params = new URLSearchParams({
    url: source,
    w: String(OG_WIDTH),
    h: String(OG_HEIGHT),
    fit: "cover",
    output: "jpg",
  });
  return `https://wsrv.nl/?${params.toString()}`;
}

export function articleOpenGraphImage(
  image: string | null,
  pathId?: string,
): { url: string; width: number; height: number } {
  if (pathId) {
    const local = path.join(process.cwd(), "public", "og", `${pathId}.jpg`);
    if (existsSync(local)) {
      return {
        url: `${siteUrl()}/og/${pathId}.jpg`,
        width: OG_WIDTH,
        height: OG_HEIGHT,
      };
    }
  }
  if (image && !isPlaceholderImage(image)) {
    return { url: proxiedShareImage(image), width: OG_WIDTH, height: OG_HEIGHT };
  }
  return {
    url: `${siteUrl()}/opengraph-image`,
    width: OG_WIDTH,
    height: OG_HEIGHT,
  };
}
