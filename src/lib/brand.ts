/** Canonical public origin for OGP, sitemap, and share links. */
export function publicSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/\/$/, "")}`;

  const deployment = process.env.VERCEL_URL?.trim();
  if (deployment) return `https://${deployment.replace(/\/$/, "")}`;

  return "https://kasawa.news";
}

export const LOCALE_COOKIE = "nyanchu-locale";
export const LOCALE_COOKIE_LEGACY = "kasawa-locale";
