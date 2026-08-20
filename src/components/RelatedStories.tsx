import Link from "next/link";
import { articleHubPath } from "@/lib/article-id";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import type { Article } from "@/lib/types";

export function RelatedStories({
  items,
  locale,
}: {
  items: Article[];
  locale: Locale;
}) {
  const copy = t(locale);
  if (items.length === 0) return null;

  return (
    <section className="mt-10 border-t border-ink/10 pt-8">
      <h2 className="font-display text-[1.35rem] tracking-[-0.02em]">{copy.relatedStories}</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((article) => (
          <li key={article.id}>
            <Link
              href={articleHubPath(locale, article.id)}
              className="related-link block rounded-xl border border-ink/8 bg-card px-4 py-3 hover:border-accent/35"
            >
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted">{article.source}</p>
              <p className="mt-1 font-display text-[1.05rem] leading-snug">{article.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
