/** Public site URL used in OGP, sitemap, and cross-links. */
export function publicSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://kasawa.news";
}

export const LOCALE_COOKIE = "nyanchu-locale";
export const LOCALE_COOKIE_LEGACY = "kasawa-locale";
