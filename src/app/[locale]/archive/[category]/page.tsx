import { notFound, redirect } from "next/navigation";
import { categories, type Category } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import { latestDay } from "@/lib/rss";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["ja", "en"].flatMap((locale) =>
    categories.map((category) => ({ locale, category })),
  );
}

function isCategory(value: string): value is Category {
  return (categories as readonly string[]).includes(value);
}

export default async function ArchiveCategoryRedirect({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isCategory(category)) notFound();
  const date = await latestDay(locale);
  if (!date) redirect(`/${locale}`);
  redirect(`/${locale}/d/${date}?desk=${category}`);
}
