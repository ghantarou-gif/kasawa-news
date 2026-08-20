const DEFAULT =
  "https://candid-cassata-bceae7.netlify.app";

export type NyanchuPrefill = {
  /** Keyword / phrase for the 語句 field */
  kw?: string;
  /** Keyword mode: phrase | and | or */
  mode?: "phrase" | "and" | "or";
  /** url: operator value (domain or path) */
  url?: string;
  /** within_time number */
  wt?: number;
  /** within_time unit: h | m | d */
  wtUnit?: "h" | "m" | "d";
  /** lang: ja | en ... */
  lang?: string;
  /** from: account */
  from?: string;
};

export function nyanchuBaseUrl(): string {
  return process.env.NEXT_PUBLIC_NYANCHU_URL ?? DEFAULT;
}

export function nyanchuSearchUrl(prefill: NyanchuPrefill): string {
  const base = new URL(nyanchuBaseUrl());
  if (prefill.kw) base.searchParams.set("kw", prefill.kw);
  if (prefill.mode) base.searchParams.set("mode", prefill.mode);
  if (prefill.url) base.searchParams.set("url", prefill.url);
  if (prefill.wt) base.searchParams.set("wt", String(prefill.wt));
  if (prefill.wtUnit) base.searchParams.set("wtUnit", prefill.wtUnit);
  if (prefill.lang) base.searchParams.set("lang", prefill.lang);
  if (prefill.from) base.searchParams.set("from", prefill.from);
  base.searchParams.set("via", "kasawa");
  return base.toString();
}

export function xSearchUrl(query: string): string {
  return `https://x.com/search?q=${encodeURIComponent(query)}&src=typed_query&f=live`;
}

/** Short phrase from a headline for X / NyanChu. */
export function searchKeywordsFromTitle(title: string): string {
  return title
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/[「『].*[」』]/g, "")
    .replace(/….*$/u, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 48);
}

export function hostFromUrl(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
