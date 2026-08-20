export const LOCALES = ["ja", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return value === "ja" || value === "en";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ja" ? "en" : "ja";
}
