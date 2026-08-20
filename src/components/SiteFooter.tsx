import Link from "next/link";
import { nyanchuBaseUrl } from "@/lib/nyanchu";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { sourceNames } from "@/lib/feeds";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const names = sourceNames(locale);

  return (
    <footer className="mt-16 border-t border-line pt-8 pb-12 text-[13px] leading-6 text-muted">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="font-display text-lg tracking-wide text-ink">{copy.siteName}</p>
          <p className="mt-2 max-w-xl">{copy.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-[12px] tracking-[0.14em] uppercase">
          <Link href={`/${locale}`} className="hover:text-accent">
            {copy.top}
          </Link>
          <Link href={`/${locale}/book`} className="hover:text-accent">
            {copy.book}
          </Link>
          <a href={nyanchuBaseUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            {copy.nyanchu}
          </a>
        </nav>
      </div>
      <p className="mt-6 max-w-3xl">{copy.footerNote}</p>
      <p className="mt-4">
        {copy.sources}: {names.join(" · ")}
      </p>
      <p className="mt-1">
        {copy.live}
        <span className="mx-2 text-ink/30">/</span>
        {copy.freshWindow}
      </p>
    </footer>
  );
}
