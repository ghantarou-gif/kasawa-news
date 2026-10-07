import { dynamicSiteUrl } from "@/lib/hosting";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";

export function MemberGate({
  locale,
  denied = false,
  configured = false,
  action,
}: {
  locale: Locale;
  denied?: boolean;
  configured?: boolean;
  action?: (formData: FormData) => Promise<void>;
}) {
  const copy = t(locale);

  return (
    <article className="py-12">
      <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-accent">
        {copy.memberKicker}
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] tracking-[-0.03em]">
        {copy.memberTitle}
      </h1>
      <p className="mt-4 max-w-xl text-[17px] leading-8 text-muted">{copy.memberLead}</p>

      {action && configured ? (
        <form action={action} className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-center">
          <input type="hidden" name="locale" value={locale} />
          <label className="sr-only" htmlFor="member-code">
            {copy.memberCode}
          </label>
          <input
            id="member-code"
            name="code"
            type="password"
            required
            autoComplete="current-password"
            placeholder={copy.memberCode}
            className="min-h-11 w-full flex-1 rounded-full border border-ink bg-card px-4 text-[15px] outline-none focus:border-accent"
          />
          <button className="open-btn px-5" type="submit">
            {copy.memberOpen}
          </button>
        </form>
      ) : null}

      {denied ? (
        <p role="alert" className="mt-4 text-sm text-accent">
          {copy.memberDenied}
        </p>
      ) : null}

      {action && !configured ? (
        <p className="mt-6 max-w-xl text-sm leading-6 text-muted">{copy.memberClosed}</p>
      ) : null}

      {!action ? (
        <a className="open-btn mt-8 px-5" href={`${dynamicSiteUrl}/${locale}/members/x`}>
          {copy.memberExport}
        </a>
      ) : null}
    </article>
  );
}
