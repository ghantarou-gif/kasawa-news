/**
 * Viator partner tracking (P00316100).
 * Banner creatives are filled by banners.js; this URL is for /go/viator.
 */
export function viatorOfferHref(): string {
  const dest = new URL("https://www.viator.com/");
  dest.searchParams.set("mcid", "42383");
  dest.searchParams.set("medium", "link");
  dest.searchParams.set("pid", "P00316100");
  return dest.toString();
}
