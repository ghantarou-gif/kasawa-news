import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemberChrome } from "@/components/MemberChrome";
import { MemberToolChapter } from "@/components/MemberChapters";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import { memberChapters } from "@/lib/member-chapters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = t(locale);
  const chapter = memberChapters[locale].tool;
  return {
    title: `${chapter.title} · ${copy.memberTitle}`,
    description: chapter.lead,
    robots: { index: false, follow: false },
  };
}

export default async function MemberToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const chapters = memberChapters[locale];

  return (
    <MemberChrome
      locale={locale}
      current="tool"
      title={chapters.tool.title}
      lead={chapters.tool.lead}
    >
      <MemberToolChapter chapters={chapters} />
    </MemberChrome>
  );
}
