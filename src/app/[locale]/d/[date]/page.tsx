import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DayDeskFeed } from "@/components/DayDeskFeed";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import { getDayArticles, getDaySummaries } from "@/lib/rss";
import { formatDayHeading, formatDayMeta, isDayKey } from "@/lib/time";

export const revalidate = 120;

export async function generateStaticParams() {
  const params: { locale: string; date: string }[] = [];
  for (const locale of ["ja", "en"] as const) {
    const { days } = await getDaySummaries(locale);
    for (const day of days) {
      params.push({ locale, date: day.date });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}): Promise<Metadata> {
  const { locale, date } = await params;
  if (!isLocale(locale) || !isDayKey(date)) return {};
  return { title: formatDayHeading(date, locale) };
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ locale: string; date: string }>;
}) {
  const { locale, date } = await params;
  if (!isLocale(locale) || !isDayKey(date)) notFound();

  const copy = t(locale);
  const [items, { days }] = await Promise.all([
    getDayArticles(locale, date),
    getDaySummaries(locale),
  ]);
  const summary = days.find((day) => day.date === date);

  return (
    <section className="break-words py-6 sm:py-8">
      <Link
        href={`/${locale}`}
        className="font-sans text-[12px] tracking-[0.16em] uppercase text-muted hover:text-accent"
      >
        {copy.back}
      </Link>
      <h2 className="font-display mt-4 text-[clamp(1.55rem,7vw,3.3rem)] leading-none">
        <span className="text-accent">BREAKING</span> {formatDayHeading(date, locale)}
      </h2>
      <p className="mt-3 text-[14px] text-muted">
        {formatDayMeta(date, locale)}
        {summary ? ` · ${summary.total}${copy.items}` : null}
      </p>
      <Suspense fallback={<p className="mt-6 text-muted">{copy.live}</p>}>
        <DayDeskFeed
          items={items}
          locale={locale}
          date={date}
          counts={summary?.counts}
          total={summary?.total}
        />
      </Suspense>
    </section>
  );
}
