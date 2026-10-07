import { siteUrl } from "@/lib/site";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

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
): { url: string; width: number; height: number } {
  if (image) {
    return { url: proxiedShareImage(image), width: OG_WIDTH, height: OG_HEIGHT };
  }
  return {
    url: `${siteUrl()}/opengraph-image`,
    width: OG_WIDTH,
    height: OG_HEIGHT,
  };
}
