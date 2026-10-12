import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IslamNewsFeed } from "@/components/IslamNewsFeed";
import { MemberChrome } from "@/components/MemberChrome";
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
    title: `${copy.watchNewsTitle} · ${copy.memberTitle}`,
    description: copy.watchNewsLead,
    robots: { index: false, follow: false },
  };
}

export default async function MemberNewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale);
  const news = await getIslamWatchArticles(locale);

  return (
    <MemberChrome
      locale={locale}
      current="news"
      title={copy.watchNewsTitle}
      lead={copy.watchNewsLead}
    >
      <IslamNewsFeed locale={locale} news={news} />
    </MemberChrome>
  );
}
