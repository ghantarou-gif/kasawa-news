import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import type { IslamWatch } from "@/lib/rss";
import { formatStamp } from "@/lib/time";
import type { Article } from "@/lib/types";

function NewsList({ title, items, empty }: { title: string; items: Article[]; empty: string }) {
  return (
    <>
      <h3 className="mt-8 text-[19px] font-bold leading-8">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-[15px] text-muted">{empty}</p>
      ) : (
        <ul className="mt-3 divide-y divide-line border-y border-line">
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
    </>
  );
}

export function IslamNewsFeed({ locale, news }: { locale: Locale; news: IslamWatch }) {
  const copy = t(locale);

  return (
    <section className="mt-14 max-w-2xl">
      <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.2rem)] leading-[1.15] tracking-[-0.02em]">
        <span className="text-accent">BREAKING</span> {copy.watchNewsTitle}
      </h2>
      <p className="mt-3 text-[16px] leading-7 text-muted">{copy.watchNewsLead}</p>
      <NewsList title={copy.watchNewsJapan} items={news.japan} empty={copy.watchNewsEmpty} />
      <NewsList title={copy.watchNewsOverseas} items={news.overseas} empty={copy.watchNewsEmpty} />
    </section>
  );
}
