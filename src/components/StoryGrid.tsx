import Link from "next/link";
import { articleHubPath } from "@/lib/article-id";
import { genres, primaryGenre } from "@/lib/genres";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { formatWhen } from "@/lib/time";
import type { Article } from "@/lib/types";

export function StoryGrid({
  items,
  locale,
}: {
  items: Article[];
  locale: Locale;
}) {
  const copy = t(locale);

  if (items.length === 0) {
    return <p className="py-16 text-center text-muted">{copy.emptyDay}</p>;
  }

  return (
    <ul className="grid gap-5 py-8 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((article) => {
        const genre = primaryGenre(article.desks);
        const genreMeta = genres.find((item) => item.id === genre);
        const hub = articleHubPath(locale, article.id);
        return (
          <li key={article.id} className="story-card">
            <div className="flex items-center justify-between gap-3 text-[11px] tracking-[0.12em] uppercase text-muted">
              <span>{article.source}</span>
              {genreMeta ? (
                <span>
                  {genreMeta.emoji} {copy[genreMeta.id]}
                </span>
              ) : null}
            </div>
            <Link
              href={hub}
              className="mt-3 block break-words font-display text-[1.15rem] leading-snug tracking-[-0.02em] hover:text-accent sm:text-[1.25rem]"
            >
              {article.title}
            </Link>
            {article.image ? (
              <Link href={hub} className="story-image">
                {/* RSS thumbnails come from many CDNs; a plain img avoids next/image allowlists. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.image} alt="" loading="lazy" />
              </Link>
            ) : null}
            {article.excerpt ? (
              <p className="mt-3 line-clamp-3 text-[14px] leading-6 text-muted">
                {article.excerpt}
              </p>
            ) : null}
            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-3 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between">
              <span>{formatWhen(article.publishedAt ?? article.firstSeenAt, locale)}</span>
              <div className="action-row">
                <Link href={hub} className="open-btn">
                  {copy.more}
                </Link>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-btn"
                >
                  {copy.original}
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
