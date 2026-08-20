import type { Locale } from "./locale";

export function formatWhen(iso: string | null, locale: Locale): string {
  if (!iso) return "";
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return "";

  const delta = Date.now() - time;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const rtf = new Intl.RelativeTimeFormat(locale === "ja" ? "ja" : "en", {
    numeric: "auto",
  });

  if (delta < hour) {
    return rtf.format(-Math.max(1, Math.round(delta / minute)), "minute");
  }
  if (delta < day) return rtf.format(-Math.round(delta / hour), "hour");
  if (delta < 7 * day) return rtf.format(-Math.round(delta / day), "day");

  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(time));
}

export function articleAgeMs(article: { publishedAt: string | null; firstSeenAt: string }): number {
  const stamp = article.publishedAt ?? article.firstSeenAt;
  const time = Date.parse(stamp);
  if (Number.isNaN(time)) return 0;
  return Date.now() - time;
}

export function articleDayKey(article: {
  publishedAt: string | null;
  firstSeenAt: string;
}): string {
  const stamp = article.publishedAt ?? article.firstSeenAt;
  const time = Date.parse(stamp);
  const date = Number.isNaN(time) ? new Date() : new Date(time);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function isDayKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function formatDayHeading(dayKey: string, locale: Locale): string {
  const date = new Date(`${dayKey}T00:00:00+09:00`);
  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    timeZone: "Asia/Tokyo",
    month: locale === "ja" ? "long" : "short",
    day: "numeric",
  }).format(date);
}

export function formatDayMeta(dayKey: string, locale: Locale): string {
  const date = new Date(`${dayKey}T00:00:00+09:00`);
  const year = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
  }).format(date);
  const weekday = new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    timeZone: "Asia/Tokyo",
    weekday: "long",
  }).format(date);
  return `${year} · ${weekday}`;
}

export function formatStamp(iso: string): string {
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return "";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date(time))
    .replace(",", "");
}
