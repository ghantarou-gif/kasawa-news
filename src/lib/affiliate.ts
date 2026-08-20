import { book } from "./book";
import type { GenreId } from "./genres";
import type { Locale } from "./locale";

export type GoLink = {
  label: Record<Locale, string>;
  /** Empty string hides the link until you set a destination URL. */
  url: string;
};

/**
 * Outbound affiliate destinations for /go/[id].
 * Fill url when your Associates / ASP links are ready.
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
    url: "",
  },
  business: {
    label: {
      ja: "経済・投資関連（Amazon）",
      en: "Business pick (Amazon)",
    },
    url: "",
  },
  world: {
    label: {
      ja: "国際情勢関連（Amazon）",
      en: "World affairs pick (Amazon)",
    },
    url: "",
  },
  japan: {
    label: {
      ja: "国内ニュース関連（Amazon）",
      en: "Japan news pick (Amazon)",
    },
    url: "",
  },
  sports: {
    label: {
      ja: "スポーツ関連（Amazon）",
      en: "Sports pick (Amazon)",
    },
    url: "",
  },
  "travel-hotel": {
    label: {
      ja: "旅行の宿（予約）",
      en: "Travel hotels",
    },
    /** 楽天トラベル / Booking / じゃらん 等のアフィリURLを入れる */
    url: "",
  },
  "travel-tour": {
    label: {
      ja: "ツアー・体験（予約）",
      en: "Tours & activities",
    },
    /** じゃらん体験 / Klook / Viator 等 */
    url: "",
  },
  "travel-book": {
    label: {
      ja: "旅行ガイド本（Amazon）",
      en: "Travel guidebook (Amazon)",
    },
    url: "",
  },
};

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
    if (genreLink?.url) {
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
