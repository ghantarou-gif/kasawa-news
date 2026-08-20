import Link from "next/link";
import {
  hostFromUrl,
  nyanchuBaseUrl,
  nyanchuSearchUrl,
  searchKeywordsFromTitle,
  xSearchUrl,
} from "@/lib/nyanchu";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import type { Article } from "@/lib/types";

export function XSearchTools({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  const copy = t(locale);
  const kw = searchKeywordsFromTitle(article.title);
  const host = hostFromUrl(article.url);
  const xQuery = [`"${kw}"`, "within_time:24h", locale === "ja" ? "lang:ja" : "lang:en"]
    .filter(Boolean)
    .join(" ");

  const nyanchu = nyanchuSearchUrl({
    kw,
    mode: "phrase",
    url: host ?? undefined,
    wt: 24,
    wtUnit: "h",
    lang: locale === "ja" ? "ja" : "en",
  });

  return (
    <section className="x-tools">
      <p className="x-tools-kicker">{copy.xToolsKicker}</p>
      <p className="mt-2 text-[14px] leading-6 text-muted">{copy.xToolsLead}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a href={xSearchUrl(xQuery)} target="_blank" rel="noopener noreferrer" className="open-btn">
          {copy.searchOnX}
        </a>
        <a href={nyanchu} target="_blank" rel="noopener noreferrer" className="ghost-btn">
          {copy.searchOnNyanchu}
        </a>
      </div>
      <p className="mt-3 text-[12px] text-muted">
        {copy.nyanchuHint}{" "}
        <Link href={nyanchuBaseUrl()} className="text-accent hover:underline">
          NyanChu
        </Link>
      </p>
    </section>
  );
}
