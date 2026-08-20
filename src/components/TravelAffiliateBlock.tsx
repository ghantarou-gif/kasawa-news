import Link from "next/link";
import { affiliateOffersForTravel } from "@/lib/affiliate";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import type { TravelOffer } from "@/lib/travel";

export function TravelAffiliateBlock({
  locale,
  offers,
}: {
  locale: Locale;
  offers: TravelOffer[];
}) {
  const copy = t(locale);
  const items = offers.map((offer) => ({
    id: offer.goId,
    label: offer.label[locale],
  }));
  const fallback = affiliateOffersForTravel(
    ["travel-hotel", "travel-tour", "travel-book"],
    locale,
  );
  const list = items.length > 0 ? items : fallback;

  return (
    <aside className="affiliate-block">
      <p className="affiliate-kicker">{copy.travelOffers}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {list.map((offer) => (
          <li key={offer.id}>
            <Link
              href={`/go/${offer.id}?utm_source=site&utm_medium=affiliate&utm_campaign=travel`}
              className="affiliate-link"
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
