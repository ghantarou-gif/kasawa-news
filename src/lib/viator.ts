/**
 * Viator Banner Builder (partner P00316100).
 * URL construction matches partners.vtrcdn.com/static/scripts/banners/banners.js
 * so the creative and tracking work without waiting on that script.
 */
export const viatorPartnerId = "P00316100";
const viatorMcid = "42383";
const bannerVersion = "version1";

export const viatorBanner = {
  url: "https://www.viator.com/",
  width: 728,
  height: 90,
  language: "en",
  selection: "banner1",
} as const;

function mediumVersion(): string {
  const { selection, width, height } = viatorBanner;
  return `${selection}_${width}x${height}_${bannerVersion}`;
}

export function viatorBannerHref(): string {
  const dest = new URL(viatorBanner.url);
  dest.searchParams.set("mcid", viatorMcid);
  dest.searchParams.set("medium", "banner");
  dest.searchParams.set("medium_version", mediumVersion());
  dest.searchParams.set("pid", viatorPartnerId);
  return dest.toString();
}

export function viatorBannerImageSrc(): string {
  const { language, selection, width, height } = viatorBanner;
  return `https://partners.vtrcdn.com/static/images/banners/${language}/${selection}/${width}x${height}_${bannerVersion}.jpg`;
}

export function viatorBannerAlt(): string {
  return `${viatorPartnerId}-${viatorBanner.selection}`;
}

export function viatorOfferHref(): string {
  const dest = new URL(viatorBanner.url);
  dest.searchParams.set("mcid", viatorMcid);
  dest.searchParams.set("medium", "link");
  dest.searchParams.set("pid", viatorPartnerId);
  return dest.toString();
}
