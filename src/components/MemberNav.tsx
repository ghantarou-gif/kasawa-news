import Link from "next/link";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import {
  memberHref,
  memberHubHref,
  memberSectionLabel,
  memberSections,
  type MemberSection,
} from "@/lib/member-sections";

export function MemberNav({
  locale,
  current,
}: {
  locale: Locale;
  current?: MemberSection | "hub";
}) {
  const copy = t(locale);
  const onHub = current === "hub" || current === undefined;

  return (
    <nav aria-label={copy.memberNav} className="space-y-1">
      <Link
        href={memberHubHref(locale)}
        className={
          onHub
            ? "block rounded-lg bg-ink px-3 py-2 font-sans text-[14px] text-card"
            : "block rounded-lg px-3 py-2 font-sans text-[14px] text-muted hover:bg-card hover:text-ink"
        }
        aria-current={onHub ? "page" : undefined}
      >
        {copy.memberNavHub}
      </Link>
      {memberSections.map((section) => {
        const active = section === current;
        return (
          <Link
            key={section}
            href={memberHref(locale, section)}
            className={
              active
                ? "block rounded-lg bg-ink px-3 py-2 font-sans text-[14px] text-card"
                : "block rounded-lg px-3 py-2 font-sans text-[14px] text-muted hover:bg-card hover:text-ink"
            }
            aria-current={active ? "page" : undefined}
          >
            {memberSectionLabel(copy, section)}
          </Link>
        );
      })}
    </nav>
  );
}
