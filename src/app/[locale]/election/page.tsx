import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { StoryGrid } from "@/components/StoryGrid";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import { getElectionArticles } from "@/lib/rss";

export const revalidate = 120;

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
    title: copy.election,
    description: copy.electionLead,
  };
}

export default async function ElectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = t(locale);
  const items = await getElectionArticles(locale);

  return (
    <section className="break-words py-6 sm:py-8">
      <Link
        href={`/${locale}`}
        className="font-sans text-[12px] tracking-[0.16em] uppercase text-muted hover:text-accent"
      >
        {copy.back}
      </Link>
      <p className="mt-4 text-[11px] font-bold tracking-[0.18em] uppercase text-accent">
        🗳️ {copy.electionKicker}
      </p>
      <h1 className="font-display mt-2 text-[clamp(1.7rem,6vw,2.8rem)] leading-tight tracking-[-0.03em]">
        <span className="text-accent">BREAKING</span> {copy.election}
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">{copy.electionLead}</p>
      <AdSlot placement="feed" className="mt-6" />
      {items.length === 0 ? (
        <p className="py-16 text-center text-muted">{copy.electionEmpty}</p>
      ) : (
        <StoryGrid items={items} locale={locale} />
      )}
    </section>
  );
}
