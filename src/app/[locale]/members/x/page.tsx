import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemberDesk } from "@/lib/member-desk";
import { githubPages } from "@/lib/hosting";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import { getIslamWatchArticles } from "@/lib/rss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return {
    title: copy.memberTitle,
    description: copy.memberLead,
    robots: { index: false, follow: false },
  };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  // The static desk unlocks in the browser, so its list has to be baked in at build time.
  const news = githubPages ? await getIslamWatchArticles(locale) : undefined;
  return <MemberDesk locale={locale} news={news} />;
}
