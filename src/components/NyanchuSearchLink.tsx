import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import {
  hostFromUrl,
  nyanchuSearchUrl,
  searchKeywordsFromTitle,
} from "@/lib/nyanchu";
import type { Article } from "@/lib/types";

export function NyanchuSearchLink({
  article,
  locale,
}: {
  article: Article;
  locale: Locale;
}) {
  const copy = t(locale);
  const host = hostFromUrl(article.url);
  const href = nyanchuSearchUrl({
    kw: searchKeywordsFromTitle(article.title),
    mode: "phrase",
    url: host ?? undefined,
    wt: 24,
    wtUnit: "h",
    lang: locale,
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ghost-btn inline-flex"
    >
      {copy.nyanchu}
    </a>
  );
}
