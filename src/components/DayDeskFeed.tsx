"use client";

import { useSearchParams } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { GenreChips } from "@/components/DeskHeader";
import { TopStories } from "@/components/TopStories";
import { isGenre, type GenreId } from "@/lib/genres";
import { excludeMinorSports, sortDomesticFirst } from "@/lib/feed-order";
import type { Article } from "@/lib/types";
import type { Locale } from "@/lib/locale";

export function DayDeskFeed({
  items,
  locale,
  date,
  counts,
  total,
}: {
  items: Article[];
  locale: Locale;
  date: string;
  counts?: Partial<Record<GenreId, number>>;
  total?: number;
}) {
  const query = useSearchParams();
  const raw = query.get("desk");
  const desk = raw && isGenre(raw) ? raw : undefined;
  const scoped = desk ? items.filter((article) => article.desks.includes(desk)) : items;
  const base = desk === "sports" ? scoped : excludeMinorSports(scoped);
  const feedItems = sortDomesticFirst(base);

  return (
    <>
      <div className="mt-5">
        <GenreChips
          locale={locale}
          latestDate={date}
          active={desk ?? "all"}
          counts={counts}
          total={total}
        />
      </div>
      <AdSlot placement="feed" className="mt-6" />
      <TopStories items={feedItems} locale={locale} headings={false} />
    </>
  );
}
