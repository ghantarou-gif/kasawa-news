import Link from "next/link";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { nyanchuBaseUrl } from "@/lib/nyanchu";
import { genres, type GenreId } from "@/lib/genres";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { formatStamp } from "@/lib/time";

export function GenreChips({
  locale,
  latestDate,
  active,
  counts,
  total,
}: {
  locale: Locale;
  latestDate: string | null;
  active?: GenreId | "all";
  counts?: Partial<Record<GenreId, number>>;
  total?: number;
}) {
  const copy = t(locale);
  const base = latestDate ? `/${locale}/d/${latestDate}` : `/${locale}`;

  return (
    <nav aria-label="ジャンル" className="chip-nav">
      <Link href={base} className={`chip ${active === "all" ? "chip-active" : ""}`}>
        {copy.all}
        {typeof total === "number" ? <span className="chip-count">{total}</span> : null}
      </Link>
      {genres.map((genre) => {
        const count = counts?.[genre.id];
        if (typeof count === "number" && count === 0 && active !== genre.id) {
          return null;
        }
        return (
          <Link
            key={genre.id}
            href={`${base}?desk=${genre.id}`}
            className={`chip ${active === genre.id ? "chip-active" : ""}`}
          >
            <span>{genre.emoji}</span>
            <span>{copy[genre.id]}</span>
            {typeof count === "number" ? <span className="chip-count">{count}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function DeskHeader({
  locale,
  updatedAt,
}: {
  locale: Locale;
  updatedAt: string;
}) {
  const copy = t(locale);

  return (
    <header className="desk-hero">
      <div className="site-shell mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-7">
        <div className="flex min-w-0 items-start gap-3">
          <span className="brand-mark mt-1 shrink-0" aria-hidden>
            NC
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase sm:text-[11px] sm:tracking-[0.24em]">
              {copy.deskKicker}
            </p>
            <Link
              href={`/${locale}`}
              className="font-display mt-1 block text-[clamp(1.65rem,8vw,3.2rem)] leading-[1.05] tracking-[-0.03em] hover:opacity-90"
            >
              <span className="text-accent">BREAKING</span>{" "}
              <span className="text-ink">{copy.siteName}</span>
            </Link>
            <p className="mt-1 font-sans text-[11px] tracking-[0.14em] text-muted sm:text-[12px] sm:tracking-[0.16em]">
              {copy.mastheadKana}
            </p>
          </div>
        </div>

        <nav className="header-nav" aria-label="サイト">
          <LanguageSwitch locale={locale} />
          <a
            href={nyanchuBaseUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="header-nav-link"
          >
            {copy.nyanchu}
          </a>
          <Link href={`/${locale}/travel`} className="header-nav-link">
            {copy.travel}
          </Link>
          <Link href={`/${locale}/book`} className="header-nav-link">
            {copy.book}
          </Link>
        </nav>

        <p className="max-w-2xl text-[13px] leading-6 text-muted sm:text-[14px]">
          {copy.deskLead} {formatStamp(updatedAt)} {copy.updated}
        </p>
      </div>
    </header>
  );
}
