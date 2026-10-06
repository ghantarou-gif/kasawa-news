import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeskHeader } from "@/components/DeskHeader";
import { HtmlLang } from "@/components/HtmlLang";
import { SiteFooter } from "@/components/SiteFooter";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";

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
    title: copy.siteName,
    description: copy.deskLead,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="flex min-h-full flex-col">
      <HtmlLang locale={locale} />
      <DeskHeader locale={locale} updatedAt={new Date().toISOString()} />
      <div className="site-shell mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">{children}</div>
      <div className="site-shell mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
