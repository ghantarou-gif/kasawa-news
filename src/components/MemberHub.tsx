import Link from "next/link";
import { MemberChrome } from "@/components/MemberChrome";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import {
  memberHref,
  memberSectionBlurb,
  memberSectionLabel,
  memberSections,
} from "@/lib/member-sections";

export function MemberHub({ locale }: { locale: Locale }) {
  const copy = t(locale);

  return (
    <MemberChrome locale={locale} current="hub" title={copy.memberTitle} lead={copy.memberOpenLead}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {memberSections.map((section) => (
          <li key={section}>
            <Link
              href={memberHref(locale, section)}
              className="block rounded-2xl border border-line bg-card p-5 transition hover:border-ink"
            >
              <p className="font-sans text-[13px] tracking-[0.12em] uppercase text-accent">
                {memberSectionLabel(copy, section)}
              </p>
              <p className="mt-2 text-[15px] leading-7 text-muted">{memberSectionBlurb(copy, section)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </MemberChrome>
  );
}
