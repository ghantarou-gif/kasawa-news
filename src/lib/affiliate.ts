import { book } from "./book";
import type { GenreId } from "./genres";
import type { Locale } from "./locale";
import { viatorLinkUrl } from "./viator";

export type GoLink = {
  label: Record<Locale, string>;
  /**
   * Static destination URL. Leave empty to resolve from env at request time.
   * Empty (and no env value) hides/falls back the link.
   */
  url?: string;
  /**
   * Env var names checked in order for the destination URL.
   * Set the generated affiliate URL (Rakuten / A8 / Booking / Amazon / Klook 等)
   * in one of these to activate the link without editing code.
   */
  urlEnv?: string[];
};

/** Check `AFF_<KEY>` and `NEXT_PUBLIC_AFF_<KEY>` for a destination URL. */
function affEnv(key: string): string[] {
  return [`AFF_${key}`, `NEXT_PUBLIC_AFF_${key}`];
}

/**
 * Outbound affiliate destinations for /go/[id].
 * Paste your generated affiliate URL into the matching env var (see README),
 * or hard-code `url` here if you prefer committing it.
 */
export const goLinks: Record<string, GoLink> = {
  kindle: {
    label: {
      ja: "著者のKindle本",
      en: "Author's Kindle book",
    },
    url: book.kindleUrl,
  },
  tech: {
    label: {
      ja: "テック関連（Amazon）",
      en: "Tech pick (Amazon)",
    },
    urlEnv: affEnv("TECH_URL"),
  },
  business: {
    label: {
      ja: "経済・投資関連（Amazon）",
      en: "Business pick (Amazon)",
    },
    urlEnv: affEnv("BUSINESS_URL"),
  },
  world: {
    label: {
      ja: "国際情勢関連（Amazon）",
      en: "World affairs pick (Amazon)",
    },
    urlEnv: affEnv("WORLD_URL"),
  },
  japan: {
    label: {
      ja: "国内ニュース関連（Amazon）",
      en: "Japan news pick (Amazon)",
    },
    urlEnv: affEnv("JAPAN_URL"),
  },
  sports: {
    label: {
      ja: "スポーツ関連（Amazon）",
      en: "Sports pick (Amazon)",
    },
    urlEnv: affEnv("SPORTS_URL"),
  },
  "travel-hotel": {
    label: {
      ja: "旅行の宿（予約）",
      en: "Travel hotels",
    },
    /** 楽天トラベル / Booking / じゃらん 等のアフィリURL（AFF_TRAVEL_HOTEL_URL） */
    urlEnv: affEnv("TRAVEL_HOTEL_URL"),
  },
  "travel-tour": {
    label: {
      ja: "ツアー・体験（予約）",
      en: "Tours & activities",
    },
    /** 既定はViatorのパートナーリンク。AFF_TRAVEL_TOUR_URL で上書き可 */
    url: viatorLinkUrl(),
    urlEnv: affEnv("TRAVEL_TOUR_URL"),
  },
  "travel-book": {
    label: {
      ja: "旅行ガイド本（Amazon）",
      en: "Travel guidebook (Amazon)",
    },
    /** Amazonアソシエイト等（AFF_TRAVEL_BOOK_URL） */
    urlEnv: affEnv("TRAVEL_BOOK_URL"),
  },
};

/** Resolve a link's destination URL at request time (env override, then static url). */
export function goLinkUrl(id: string): string {
  const link = goLinks[id];
  if (!link) return "";
  for (const name of link.urlEnv ?? []) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return link.url ?? "";
}

const genreGoId: Record<GenreId, string> = {
  world: "world",
  japan: "japan",
  business: "business",
  tech: "tech",
  sports: "sports",
};

export function resolveGoLink(id: string): GoLink | null {
  return goLinks[id] ?? null;
}

export function affiliateOffersForGenre(
  genre: GenreId | null,
  locale: Locale,
): { id: string; label: string }[] {
  const offers: { id: string; label: string }[] = [
    { id: "kindle", label: goLinks.kindle.label[locale] },
  ];

  if (genre) {
    const goId = genreGoId[genre];
    const genreLink = goLinks[goId];
    if (genreLink && goLinkUrl(goId)) {
      offers.push({ id: goId, label: genreLink.label[locale] });
    }
  }

  return offers;
}

export function affiliateOffersForTravel(
  goIds: string[],
  locale: Locale,
): { id: string; label: string }[] {
  const offers: { id: string; label: string }[] = [];
  for (const id of goIds) {
    const link = goLinks[id];
    if (!link) continue;
    offers.push({
      id,
      label: link.label[locale],
    });
  }
  return offers;
}
