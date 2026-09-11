import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GenreChips } from "@/components/DeskHeader";
import { AdSlot } from "@/components/AdSlot";
import { DayList } from "@/components/DayList";
import { TopStories } from "@/components/TopStories";
import { isLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import {
  excludeMinorSports,
  getDayArticles,
  getDaySummaries,
  sortDomesticFirst,
} from "@/lib/rss";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: t(locale).news };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale);
  const { days } = await getDaySummaries(locale);
  const latestDate = days[0]?.date ?? null;
  const topItems = latestDate
    ? sortDomesticFirst(excludeMinorSports(await getDayArticles(locale, latestDate)))
    : [];

  return (
    <>
      <div className="pt-6">
        <GenreChips locale={locale} latestDate={latestDate} />
      </div>
      <AdSlot placement="home" className="mt-6" />
      <TopStories items={topItems} locale={locale} />
      {days.length > 0 ? (
        <section aria-labelledby="archive-heading" className="mt-12 border-t border-line pt-2">
          <h2 id="archive-heading" className="section-heading">
            <span className="section-heading-bar" aria-hidden />
            {copy.dateArchive}
          </h2>
          <DayList days={days} locale={locale} />
        </section>
      ) : null}
    </>
  );
}
