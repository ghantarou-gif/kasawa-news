import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemberDesk } from "@/lib/member-desk";
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
  return <MemberDesk locale={locale} />;
}
