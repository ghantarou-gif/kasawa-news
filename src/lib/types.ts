import type { Desk } from "./config";
import type { Locale } from "./locale";

export type Article = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  /** Readable article text. Feed blurbs are replaced with the publisher story when it is longer. */
  body: string;
  /** True after the publisher page has been read, so a short story is not fetched again. */
  bodyComplete?: boolean;
  publishedAt: string | null;
  source: string;
  sourceId: string;
  desks: Desk[];
  locales: Locale[];
  firstSeenAt: string;
  image: string | null;
};
