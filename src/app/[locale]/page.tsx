import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DayList } from "@/components/DayList";
import { GenreChips } from "@/components/DeskHeader";
import { isLocale } from "@/lib/locale";
import { getDaySummaries } from "@/lib/rss";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: "Archive" };
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
      <DayList days={days} locale={locale} />
    </>
  );
}
