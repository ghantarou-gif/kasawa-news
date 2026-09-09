import Link from "next/link";
import { articleHubPath } from "@/lib/article-id";
import { genres, primaryGenre } from "@/lib/genres";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { formatWhen } from "@/lib/time";
import type { Article } from "@/lib/types";

function GenreTag({ article, locale }: { article: Article; locale: Locale }) {
  const copy = t(locale);
  const genre = primaryGenre(article.desks);
  const genreMeta = genres.find((item) => item.id === genre);
  if (!genreMeta) return null;
  return (
    <span className="headline-genre">
      {genreMeta.emoji} {copy[genreMeta.id]}
    </span>
  );
}

function HeadlineRow({ article, locale }: { article: Article; locale: Locale }) {
  const hub = articleHubPath(locale, article.id);
  return (
    <li className="headline-row">
      <Link href={hub} className="headline-link">
        <div className="headline-text">
          <span className="headline-title">{article.title}</span>
          <div className="headline-meta">
            <GenreTag article={article} locale={locale} />
            <span>{article.source}</span>
            <span>{formatWhen(article.publishedAt ?? article.firstSeenAt, locale)}</span>
          </div>
        </div>
        {article.image ? (
          <span className="headline-thumb">
            {/* RSS thumbnails come from many CDNs; a plain img avoids next/image allowlists. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.image} alt="" loading="lazy" />
          </span>
        ) : null}
      </Link>
    </li>
  );
}

export function TopStories({
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

  const [lead, ...rest] = items;
  const leadHub = articleHubPath(locale, lead.id);
  const headlines = rest.slice(0, 9);
  const latest = rest.slice(9);

  return (
    <div className="top-stories">
      <section aria-labelledby="top-heading">
        <h2 id="top-heading" className="section-heading">
          <span className="section-heading-bar" aria-hidden />
          {copy.topHeadlines}
        </h2>

        <div className="top-grid">
          <article className="lead-card">
            <Link href={leadHub} className="lead-media">
              {lead.image ? (
                // RSS thumbnails come from many CDNs; a plain img avoids next/image allowlists.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={lead.image} alt="" loading="eager" />
              ) : (
                <span className="lead-media-fallback" aria-hidden>
                  {copy.siteName}
                </span>
              )}
            </Link>
            <div className="lead-body">
              <div className="headline-meta">
                <GenreTag article={lead} locale={locale} />
                <span>{lead.source}</span>
                <span>{formatWhen(lead.publishedAt ?? lead.firstSeenAt, locale)}</span>
              </div>
              <Link href={leadHub} className="lead-title">
                {lead.title}
              </Link>
              {lead.excerpt ? <p className="lead-excerpt">{lead.excerpt}</p> : null}
            </div>
          </article>

          <ol className="headline-list">
            {headlines.map((article) => (
              <HeadlineRow key={article.id} article={article} locale={locale} />
            ))}
          </ol>
        </div>
      </section>

      {latest.length > 0 ? (
        <section aria-labelledby="latest-heading" className="mt-10">
          <h2 id="latest-heading" className="section-heading">
            <span className="section-heading-bar" aria-hidden />
            {copy.latestHeadlines}
          </h2>
          <ol className="latest-grid">
            {latest.map((article) => (
              <HeadlineRow key={article.id} article={article} locale={locale} />
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
