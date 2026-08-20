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
    <nav aria-label="ジャンル" className="flex flex-wrap gap-2">
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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-white/55">{copy.deskKicker}</p>
            <Link href={`/${locale}`} className="font-display mt-1 block text-[clamp(2.2rem,6vw,3.6rem)] leading-none hover:opacity-95">
              <span className="text-accent">BREAKING</span>{" "}
              <span className="text-white">{copy.siteName}</span>
            </Link>
            <p className="mt-1 font-sans text-[12px] tracking-[0.2em] text-white/50">{copy.mastheadKana}</p>
          </div>
          <div className="flex items-center gap-4 pt-2 font-sans text-[12px] tracking-[0.14em] uppercase">
            <LanguageSwitch locale={locale} />
            <a
              href={nyanchuBaseUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-accent"
            >
              {copy.nyanchu}
            </a>
            <Link href={`/${locale}/book`} className="text-white/80 hover:text-accent">
              {copy.book}
            </Link>
          </div>
        </div>
        <p className="max-w-2xl text-[14px] leading-6 text-white/70">
          {copy.deskLead} {formatStamp(updatedAt)} {copy.updated}
        </p>
      </div>
    </header>
  );
}
