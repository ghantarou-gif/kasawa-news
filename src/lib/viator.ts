/** Viator affiliate partner id. Override with NEXT_PUBLIC_VIATOR_PARTNER_ID. */
const DEFAULT_PARTNER_ID = "P00316100";

/** Viator's marketing channel id for affiliate links (same value their banner script uses). */
const VIATOR_MCID = "42383";

export function viatorPartnerId(): string {
  return process.env.NEXT_PUBLIC_VIATOR_PARTNER_ID?.trim() || DEFAULT_PARTNER_ID;
}

/** Monetized Viator text link (used as the default /go/travel-tour destination). */
export function viatorLinkUrl(path = "/"): string {
  const url = new URL(path, "https://www.viator.com");
  url.searchParams.set("pid", viatorPartnerId());
  url.searchParams.set("mcid", VIATOR_MCID);
  url.searchParams.set("medium", "link");
  return url.toString();
}
