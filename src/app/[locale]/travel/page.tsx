import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import {
  listTravelPosts,
  regionLabel,
  travelPostPath,
} from "@/lib/travel";

export function generateStaticParams() {
  return [{ locale: "ja" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return {
    title: copy.travel,
    description: copy.travelLead,
  };
}

export default async function TravelIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = t(locale);
  const posts = listTravelPosts();

  return (
    <section className="break-words py-6 sm:py-8">
      <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-accent">
        {copy.travelKicker}
      </p>
      <h1 className="font-display mt-2 text-[clamp(1.7rem,6vw,2.8rem)] leading-tight tracking-[-0.03em]">
        {copy.travel}
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">{copy.travelLead}</p>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">{copy.travelEmpty}</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={travelPostPath(locale, post.slug)}
                className="day-card block hover:border-accent"
              >
                <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-muted">
                  <span>{regionLabel(post.region, locale)}</span>
                  <span className="text-ink/25">·</span>
                  <span>{post.place[locale]}</span>
                  <span className="text-ink/25">·</span>
                  <span>{post.publishedAt}</span>
                </div>
                <h2 className="font-display mt-3 text-[clamp(1.2rem,4.5vw,1.55rem)] leading-snug tracking-[-0.02em]">
                  {post.title[locale]}
                </h2>
                {post.image ? (
                  <div className="story-image mt-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.imageAlt?.[locale] ?? ""} />
                  </div>
                ) : null}
                <p className="mt-2 text-[14px] leading-6 text-muted line-clamp-3">
                  {post.excerpt[locale]}
                </p>
                <p className="mt-4 text-[13px] font-bold text-accent">{copy.more}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
