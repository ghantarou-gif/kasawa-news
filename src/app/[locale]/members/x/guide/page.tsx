import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemberChrome } from "@/components/MemberChrome";
import { editorGuide } from "@/lib/editor-guide";
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
    title: `${copy.memberNavGuide} · ${copy.memberTitle}`,
    description: copy.memberBlurbGuide,
    robots: { index: false, follow: false },
  };
}

export default async function MemberGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale);
  const guide = editorGuide[locale];

  return (
    <MemberChrome
      locale={locale}
      current="guide"
      title={copy.memberNavGuide}
      lead={copy.memberBlurbGuide}
    >
      <ol className="max-w-2xl list-decimal space-y-0 divide-y divide-line border-y border-line pl-6">
        {guide.items.map((item) => (
          <li key={item} className="py-4 pl-2 text-[17px] leading-8">
            {item}
          </li>
        ))}
      </ol>
    </MemberChrome>
  );
}
