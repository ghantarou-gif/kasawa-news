import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";
import { listVisits } from "@/lib/visits";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: t(locale).visitsTitle };
}

export default async function VisitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = t(locale);
  const rows = (await listVisits()).filter((row) => row.path.startsWith(`/${locale}`));
  const number = new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US");

  return (
    <section className="py-6 sm:py-8">
      <h1 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] tracking-[-0.03em]">
        {copy.visitsTitle}
      </h1>
      <p className="mt-3 max-w-2xl text-[14px] leading-7 text-muted">{copy.visitsLead}</p>
      {rows.length === 0 ? (
        <p className="mt-8 text-[15px] text-muted">{copy.visitsEmpty}</p>
      ) : (
        <ol className="mt-8">
          {rows.map((row) => (
            <li key={row.path} className="border-t border-line py-3">
              <Link href={row.path} className="flex items-baseline justify-between gap-4 hover:text-accent">
                <span className="min-w-0">
                  <span className="block truncate text-[16px] leading-7">{row.title}</span>
                  <span className="block truncate text-[12px] text-muted">{row.path}</span>
                </span>
                <span className="shrink-0 text-[15px] tabular-nums">
                  {copy.visits} {number.format(row.count)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
