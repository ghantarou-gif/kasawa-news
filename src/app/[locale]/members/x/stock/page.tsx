import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemberChrome } from "@/components/MemberChrome";
import { StockBoard } from "@/components/StockBoard";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  return {
    title: `${copy.memberNavStock} · ${copy.memberTitle}`,
    description: copy.memberBlurbStock,
    robots: { index: false, follow: false },
  };
}

export default async function MemberStockPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale);

  return (
    <MemberChrome locale={locale} current="stock" title={copy.memberNavStock} lead={copy.memberBlurbStock}>
      <StockBoard />
    </MemberChrome>
  );
}
