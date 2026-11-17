import Link from "next/link";
import { affiliateOffersForGenre } from "@/lib/affiliate";
import { t } from "@/lib/i18n";
import type { GenreId } from "@/lib/genres";
import type { Locale } from "@/lib/locale";

export function AffiliateBlock({
  locale,
  genre,
}: {
  locale: Locale;
  genre: GenreId | null;
}) {
  const copy = t(locale);
  const offers = affiliateOffersForGenre(genre, locale);

  if (offers.length === 0) return null;

  return (
    <aside className="affiliate-block">
      <p className="affiliate-kicker">{copy.adLabel}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {offers.map((offer) => (
          <li key={offer.id}>
            <Link
              href={`/go/${offer.id}?utm_source=site&utm_medium=affiliate&utm_campaign=article`}
              className="affiliate-link"
              rel="sponsored"
            >
              {offer.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12px] leading-5 text-muted">{copy.affiliateNote}</p>
    </aside>
  );
}
