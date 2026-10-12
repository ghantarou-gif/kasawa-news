import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemberChrome } from "@/components/MemberChrome";
import { SourceWatch } from "@/components/SourceWatch";
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
    title: `${copy.watchTitle} · ${copy.memberTitle}`,
    description: copy.watchLead,
    robots: { index: false, follow: false },
  };
}

export default async function MemberSourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale);

  return (
    <MemberChrome locale={locale} current="sources" title={copy.watchTitle} lead={copy.watchLead}>
      <SourceWatch locale={locale} />
    </MemberChrome>
  );
}
