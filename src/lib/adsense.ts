export type AdPlacement = "article" | "feed" | "home";

/** Public publisher ID from AdSense site verification (not a secret). */
export const DEFAULT_ADSENSE_CLIENT = "ca-pub-9222859203841922";

const slotEnv: Record<AdPlacement, string | undefined> = {
  article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE,
  feed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FEED,
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME,
};

export function adsenseClient(): string | null {
  const client =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || DEFAULT_ADSENSE_CLIENT;
  return client || null;
}

export function adsenseSlot(placement: AdPlacement): string | null {
  const slot = slotEnv[placement]?.trim();
  return slot || null;
}

export function adsenseEnabled(): boolean {
  return adsenseClient() !== null;
}
