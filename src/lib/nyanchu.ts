const DEFAULT = "https://candid-cassata-bceae7.netlify.app";

export type NyanchuPrefill = {
  kw?: string;
  mode?: "phrase" | "and" | "or";
  url?: string;
  wt?: number;
  wtUnit?: "h" | "m" | "d";
  lang?: string;
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
  base.searchParams.set("via", "nyanchu");
  return base.toString();
}

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
