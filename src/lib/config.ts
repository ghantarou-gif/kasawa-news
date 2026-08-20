import type { Category } from "./i18n";

export const REVALIDATE_SECONDS = 120;
export const POLL_SECONDS = 90;
export const FRESH_MS = 24 * 60 * 60 * 1000;
export const ARCHIVE_KEEP_MS = 14 * 24 * 60 * 60 * 1000;
export const FETCH_TIMEOUT_MS = 10000;
export const PER_SOURCE_PER_DAY = 8;

export type Desk = Category | "top";

const PAYWALL_HOSTS = [
  "asahi.com",
  "nikkei.com",
  "yomiuri.co.jp",
  "mainichi.jp",
  "sankei.com",
  "japantimes.co.jp",
  "wsj.com",
  "nytimes.com",
  "ft.com",
  "bloomberg.com",
  "economist.com",
  "reuters.com",
  "washingtonpost.com",
  "newyorker.com",
  "theatlantic.com",
  "foreignaffairs.com",
  "nature.com",
  "science.org",
  "wired.com",
];

const PAYWALL_TEXT =
  /会員限定|有料会員|購読者限定|有料記事|subscribers? only|subscriber exclusive/i;

export function isPaywalledUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return PAYWALL_HOSTS.some(
      (blocked) => host === blocked || host.endsWith(`.${blocked}`),
    );
  } catch {
    return true;
  }
}

export function isPaywalledText(text: string): boolean {
  return PAYWALL_TEXT.test(text);
}
