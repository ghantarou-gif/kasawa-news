import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GenreChips } from "@/components/DeskHeader";
import { AdSlot } from "@/components/AdSlot";
import { StoryGrid } from "@/components/StoryGrid";
import { isGenre } from "@/lib/genres";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import { getDayArticles, getDaySummaries } from "@/lib/rss";
import { formatDayHeading, formatDayMeta, isDayKey } from "@/lib/time";

export const revalidate = 120;

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
  searchParams,
}: {
  params: Promise<{ locale: string; date: string }>;
  searchParams: Promise<{ desk?: string }>;
}) {
  const { locale, date } = await params;
  const query = await searchParams;
  if (!isLocale(locale) || !isDayKey(date)) notFound();

  const desk = query.desk && isGenre(query.desk) ? query.desk : undefined;
  const copy = t(locale);
  const [items, { days }] = await Promise.all([
    getDayArticles(locale, date, desk),
    getDaySummaries(locale),
  ]);
  const summary = days.find((day) => day.date === date);

  return (
    <section className="py-8">
      <Link
        href={`/${locale}`}
        className="font-sans text-[12px] tracking-[0.16em] uppercase text-muted hover:text-accent"
      >
        {copy.back}
      </Link>
      <h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.3rem)] leading-none">
        <span className="text-accent">BREAKING</span> {formatDayHeading(date, locale)}
      </h2>
      <p className="mt-3 text-[14px] text-muted">
        {formatDayMeta(date, locale)}
        {summary ? ` · ${summary.total}${copy.items}` : null}
      </p>
      <div className="mt-5">
        <GenreChips
          locale={locale}
          latestDate={date}
          active={desk ?? "all"}
          counts={summary?.counts}
          total={summary?.total}
        />
      </div>
      <AdSlot placement="feed" className="mt-6" />
      <StoryGrid items={items} locale={locale} />
    </section>
  );
}
