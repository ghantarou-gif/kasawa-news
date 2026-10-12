import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { formatStamp } from "@/lib/time";
import type { Article } from "@/lib/types";

export function IslamNewsFeed({ locale, items }: { locale: Locale; items: Article[] }) {
  const copy = t(locale);

  return (
    <section className="mt-14 max-w-2xl">
      <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.2rem)] leading-[1.15] tracking-[-0.02em]">
        <span className="text-accent">BREAKING</span> {copy.watchNewsTitle}
      </h2>
      <p className="mt-3 text-[16px] leading-7 text-muted">{copy.watchNewsLead}</p>
      {items.length === 0 ? (
        <p className="mt-6 text-[15px] text-muted">{copy.watchNewsEmpty}</p>
      ) : (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.url} className="py-4">
              <p className="font-sans text-[12px] tracking-[0.08em] text-muted">
                {formatStamp(item.publishedAt ?? item.firstSeenAt)} · {item.source}
              </p>
              <a
                className="mt-1 block text-[17px] font-bold leading-7 hover:text-accent"
                href={item.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.title}
              </a>
              {item.excerpt ? (
                <p className="mt-1 line-clamp-2 text-[15px] leading-6 text-muted">{item.excerpt}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
