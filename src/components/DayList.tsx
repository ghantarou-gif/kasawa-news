import Link from "next/link";
import { genres } from "@/lib/genres";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import type { DaySummary } from "@/lib/rss";
import { formatDayHeading, formatDayMeta } from "@/lib/time";

export function DayList({
  days,
  locale,
}: {
  days: DaySummary[];
  locale: Locale;
}) {
  const copy = t(locale);

  return (
    <ol className="flex flex-col gap-4 py-8">
      {days.map((day, index) => (
        <li key={day.date}>
          <Link href={`/${locale}/d/${day.date}`} className={`day-card ${index === 0 ? "day-card-new" : ""}`}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 font-display text-[1.85rem] leading-none tracking-[-0.03em]">
                  {formatDayHeading(day.date, locale)}
                  {index === 0 ? <span className="new-badge">{copy.newBadge}</span> : null}
                </p>
                <p className="mt-2 text-[13px] text-muted">{formatDayMeta(day.date, locale)}</p>
              </div>
              <p className="text-[13px] text-muted">
                {day.total}
                {copy.items}
                <span className="mx-2 text-ink/25">·</span>
                {copy.news} {day.total}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {genres
                .filter((genre) => day.counts[genre.id] > 0)
                .map((genre) => (
                  <span key={genre.id} className="mini-chip">
                    {genre.emoji} {copy[genre.id]} {day.counts[genre.id]}
                  </span>
                ))}
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
