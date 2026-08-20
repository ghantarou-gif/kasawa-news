import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateBlock } from "@/components/AffiliateBlock";
import { RelatedStories } from "@/components/RelatedStories";
import { ShareBar } from "@/components/ShareBar";
import { XSearchTools } from "@/components/XSearchTools";
import { decodeArticleId } from "@/lib/article-id";
import { genres, primaryGenre } from "@/lib/genres";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import { getArticleById, getRelatedArticles } from "@/lib/rss";
import { siteUrl } from "@/lib/site";
import { getTake } from "@/lib/takes";
import { articleDayKey, formatWhen } from "@/lib/time";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const articleId = decodeArticleId(id);
  if (!articleId) return {};
  const article = await getArticleById(locale, articleId);
  if (!article) return {};

  const description =
    article.excerpt ||
    (locale === "ja"
      ? "見出しはここで。本文は発行元で。"
      : "Headline here. Full story at the publisher.");

  const images = article.image ? [{ url: article.image, alt: article.title }] : undefined;

  return {
    title: article.title,
    description,
    openGraph: {
      type: "article",
      title: article.title,
      description,
      images,
      url: `${siteUrl()}/${locale}/n/${id}`,
    },
    twitter: {
      card: article.image ? "summary_large_image" : "summary",
      title: article.title,
      description,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();

  const articleId = decodeArticleId(id);
  if (!articleId) notFound();

  const article = await getArticleById(locale, articleId);
  if (!article) notFound();

  const copy = t(locale);
  const take = await getTake(articleId, locale);
  const genre = primaryGenre(article.desks);
  const genreMeta = genres.find((item) => item.id === genre);
  const day = articleDayKey(article);
  const related = await getRelatedArticles(locale, article);
  const pageUrl = `${siteUrl()}/${locale}/n/${id}`;

  return (
    <article className="py-8">
      <Link
        href={`/${locale}/d/${day}`}
        className="font-sans text-[12px] tracking-[0.16em] uppercase text-muted hover:text-accent"
      >
        {copy.backDay}
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-[0.12em] uppercase text-muted">
        <span>{article.source}</span>
        {genreMeta ? (
          <span>
            {genreMeta.emoji} {copy[genreMeta.id]}
          </span>
        ) : null}
      </div>

      <h1 className="font-display mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight tracking-[-0.03em]">
        {article.title}
      </h1>

      <p className="mt-3 text-[13px] text-muted">
        {formatWhen(article.publishedAt ?? article.firstSeenAt, locale)}
      </p>

      <div className="mt-6">
        <ShareBar url={pageUrl} title={article.title} locale={locale} take={take} />
      </div>

      {article.image ? (
        <div className="story-image mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.image} alt="" />
        </div>
      ) : null}

      {article.excerpt ? (
        <p className="mt-6 text-[17px] leading-8 text-ink/90">{article.excerpt}</p>
      ) : null}

      {take ? (
        <section className="take-block mt-8">
          <p className="take-kicker">{copy.takeKicker}</p>
          <p className="mt-3 whitespace-pre-wrap text-[16px] leading-8">{take}</p>
        </section>
      ) : null}

      <div className="mt-8">
        <XSearchTools article={article} locale={locale} />
      </div>

      <div className="mt-8">
        <AffiliateBlock locale={locale} genre={genre} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="open-btn text-[13px]"
        >
          {copy.readAt.replace("{source}", article.source)}
        </a>
      </div>

      <RelatedStories items={related} locale={locale} />
    </article>
  );
}
