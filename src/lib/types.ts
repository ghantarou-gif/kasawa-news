import type { Desk } from "./config";
import type { Locale } from "./locale";

export type Article = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  /** Readable lead from the feed, or from the publisher page when the feed has none. */
  body: string;
  publishedAt: string | null;
  source: string;
  sourceId: string;
  desks: Desk[];
  locales: Locale[];
  firstSeenAt: string;
  image: string | null;
};
