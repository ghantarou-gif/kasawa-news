import Link from "next/link";
import { MemberNav } from "@/components/MemberNav";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { memberHubHref, type MemberSection } from "@/lib/member-sections";

export function MemberChrome({
  locale,
  current,
  title,
  lead,
  children,
}: {
  locale: Locale;
  current: MemberSection | "hub";
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  const copy = t(locale);
  const isHub = current === "hub";

  return (
    <div className="lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-10">
      <aside className="mb-8 lg:mb-0">
        <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-accent">
          {copy.memberKicker}
        </p>
        {!isHub ? (
          <Link
            href={memberHubHref(locale)}
            className="mt-2 block font-display text-[18px] leading-snug tracking-[-0.02em] hover:text-accent"
          >
            {copy.memberTitle}
          </Link>
        ) : null}
        <div className="mt-4 border-t border-line pt-4">
          <MemberNav locale={locale} current={current} />
        </div>
      </aside>

      <div className="min-w-0">
        <h1 className="font-display max-w-3xl text-[clamp(1.85rem,4.5vw,2.8rem)] leading-[1.12] tracking-[-0.03em]">
          {title}
        </h1>
        {lead ? <p className="mt-4 max-w-2xl text-[17px] leading-8 text-muted">{lead}</p> : null}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
