// Search tool ships with this site at /search.html (see public/search.html).
// Override with NEXT_PUBLIC_NYANCHU_URL only when hosting it elsewhere.
const DEFAULT = "/search.html";
// Former Netlify host now serves the news site itself — treat as unset.
const DEAD_HOSTS = ["candid-cassata-bceae7.netlify.app"];

export type NyanchuPrefill = {
  kw?: string;
  mode?: "phrase" | "and" | "or";
  url?: string;
  wt?: number;
  wtUnit?: "h" | "m" | "d";
  lang?: string;
  from?: string;
};

function isDeadHost(url: string): boolean {
  try {
    return DEAD_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

export function nyanchuBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_NYANCHU_URL?.trim();
  if (fromEnv && !isDeadHost(fromEnv)) return fromEnv;
  return DEFAULT;
}

export function nyanchuSearchUrl(prefill: NyanchuPrefill): string {
  const raw = nyanchuBaseUrl();
  // Absolute URLs (external host) use the URL API; same-origin paths keep a
  // relative href so the link works on any deploy domain without env setup.
  const params = new URLSearchParams();
  if (prefill.kw) params.set("kw", prefill.kw);
  if (prefill.mode) params.set("mode", prefill.mode);
  if (prefill.url) params.set("url", prefill.url);
  if (prefill.wt) params.set("wt", String(prefill.wt));
  if (prefill.wtUnit) params.set("wtUnit", prefill.wtUnit);
  if (prefill.lang) params.set("lang", prefill.lang);
  if (prefill.from) params.set("from", prefill.from);
  params.set("via", "nyanchu");

  if (/^https?:\/\//i.test(raw)) {
    const base = new URL(raw);
    params.forEach((value, key) => base.searchParams.set(key, value));
    return base.toString();
  }

  const qs = params.toString();
  return qs ? `${raw}?${qs}` : raw;
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
