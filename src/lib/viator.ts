/** Viator affiliate partner id. Override with NEXT_PUBLIC_VIATOR_PARTNER_ID. */
const DEFAULT_PARTNER_ID = "P00316100";

export function viatorPartnerId(): string {
  return process.env.NEXT_PUBLIC_VIATOR_PARTNER_ID?.trim() || DEFAULT_PARTNER_ID;
}
