"use client";

import Link from "next/link";
import { LOCALE_COOKIE } from "@/lib/brand";
import { otherLocale, type Locale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export function LanguageSwitch({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const next = otherLocale(locale);
  const href = pathname.replace(/^\/(ja|en)/, `/${next}`) || `/${next}`;
  const copy = t(locale);

  return (
    <Link
      href={href}
      className={
        className ??
        "text-[13px] tracking-[0.12em] uppercase text-muted hover:text-accent"
      }
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      }}
    >
      {copy.languageLabel}
    </Link>
  );
}
