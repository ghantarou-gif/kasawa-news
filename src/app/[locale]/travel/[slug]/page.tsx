import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ShareBar } from "@/components/ShareBar";
import { TravelAffiliateBlock } from "@/components/TravelAffiliateBlock";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import { siteUrl } from "@/lib/site";
import {
  getTravelPost,
  listTravelPosts,
  regionLabel,
  travelPostPath,
} from "@/lib/travel";

export function generateStaticParams() {
  return ["ja", "en"].flatMap((locale) =>
    listTravelPosts().map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getTravelPost(slug);
  if (!post) return {};
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    openGraph: {
      type: "article",
      title: post.title[locale],
      description: post.excerpt[locale],
      url: `${siteUrl()}${travelPostPath(locale, slug)}`,
      images: post.image ? [{ url: post.image, alt: post.title[locale] }] : undefined,
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title[locale],
      description: post.excerpt[locale],
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function TravelPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = getTravelPost(slug);
  if (!post) notFound();

  const copy = t(locale);
  const pageUrl = `${siteUrl()}${travelPostPath(locale, slug)}`;

  return (
    <article className="break-words py-6 sm:py-8">
      <Link
        href={`/${locale}/travel`}
        className="font-sans text-[12px] tracking-[0.16em] uppercase text-muted hover:text-accent"
      >
        {copy.travelBack}
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-muted">
        <span>{regionLabel(post.region, locale)}</span>
        <span className="text-ink/25">·</span>
        <span>{post.place[locale]}</span>
        <span className="text-ink/25">·</span>
        <span>{post.publishedAt}</span>
      </div>

      <h1 className="font-display mt-4 text-[clamp(1.45rem,6.5vw,2.6rem)] leading-tight tracking-[-0.03em]">
        {post.title[locale]}
      </h1>

      <p className="mt-4 text-[16px] leading-8 text-ink/90 sm:text-[17px]">
        {post.excerpt[locale]}
      </p>

      {post.image ? (
        <div className="story-image mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="" />
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-8">
        {post.sections.map((section) => (
          <section key={section.heading[locale]}>
            <h2 className="font-display text-[1.25rem] tracking-[-0.02em]">
              {section.heading[locale]}
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-[16px] leading-8 text-ink/90">
              {section.body[locale]}
            </p>
          </section>
        ))}
      </div>

      {post.tips.length > 0 ? (
        <section className="take-block mt-8">
          <p className="take-kicker">{copy.travelTips}</p>
          <ul className="mt-3 flex flex-col gap-2 text-[15px] leading-7">
            {post.tips.map((tip) => (
              <li key={tip[locale]} className="flex gap-2">
                <span className="text-accent" aria-hidden>
                  ・
                </span>
                <span>{tip[locale]}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-8">
        <TravelAffiliateBlock locale={locale} offers={post.offers} />
      </div>

      <AdSlot placement="article" className="mt-8" />

      <section className="article-actions">
        <ShareBar
          url={pageUrl}
          title={post.title[locale]}
          locale={locale}
          take={post.xHook[locale]}
        />
      </section>
    </article>
  );
}
