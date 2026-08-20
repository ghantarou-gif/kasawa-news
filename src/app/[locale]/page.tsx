import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GenreChips } from "@/components/DeskHeader";
import { AdSlot } from "@/components/AdSlot";
import { DayList } from "@/components/DayList";
import { isLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { getDaySummaries } from "@/lib/rss";

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
  const { days } = await getDaySummaries(locale);
  return (
    <>
      <div className="pt-6">
        <GenreChips locale={locale} latestDate={days[0]?.date ?? null} />
      </div>
      <AdSlot placement="home" className="mt-6" />
      <DayList days={days} locale={locale} />
    </>
  );
}
