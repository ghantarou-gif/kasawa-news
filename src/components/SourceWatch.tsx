import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { watchEntries, type WatchLink, type WatchStatus } from "@/lib/source-watch";

const statusKey = {
  confirmed: "watchConfirmed",
  unverified: "watchUnverified",
  misleading: "watchMisleading",
  false: "watchFalse",
} as const satisfies Record<WatchStatus, string>;

function LinkList({ label, links }: { label: string; links: WatchLink[] }) {
  return (
    <div className="mt-3">
      <p className="font-sans text-[12px] tracking-[0.12em] uppercase text-muted">{label}</p>
      <ul className="mt-1 space-y-1 text-[15px] leading-7">
        {links.map((link) => (
          <li key={link.url}>
            <a className="underline underline-offset-4 hover:text-accent" href={link.url} rel="noopener noreferrer" target="_blank">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SourceWatch({ locale }: { locale: Locale }) {
  const copy = t(locale);

  return (
    <section className="mt-14 max-w-2xl">
      <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.2rem)] leading-[1.15] tracking-[-0.02em]">
        {copy.watchTitle}
      </h2>
      <p className="mt-3 text-[16px] leading-7 text-muted">{copy.watchLead}</p>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {watchEntries.map((entry) => {
          const text = entry.text[locale];
          return (
            <li key={entry.id} className="py-6">
              <p className="font-sans text-[12px] tracking-[0.12em] uppercase">
                <span className="text-accent">{copy[statusKey[entry.status]]}</span>
                <span className="text-muted"> · {copy.watchFirstSeen} {entry.firstSeen}</span>
              </p>
              <h3 className="mt-2 text-[19px] font-bold leading-8">{text.title}</h3>
              <dl className="mt-2 space-y-2 text-[16px] leading-7">
                <div>
                  <dt className="inline font-bold">{copy.watchClaim}: </dt>
                  <dd className="inline">{text.claim}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">{copy.watchOrigin}: </dt>
                  <dd className="inline">{text.origin}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">{copy.watchChecked}: </dt>
                  <dd className="inline">{text.checked}</dd>
                </div>
              </dl>
              {entry.spreaders.length ? <LinkList label={copy.watchSpreaders} links={entry.spreaders} /> : null}
              {entry.sources.length ? <LinkList label={copy.watchSources} links={entry.sources} /> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
