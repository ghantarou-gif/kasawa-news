import { cookies } from "next/headers";
import { connection } from "next/server";
import { MemberGate } from "@/components/MemberGate";
import { editorGuide } from "@/lib/editor-guide";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { lockMember, unlockMember } from "@/lib/member-actions";
import { MEMBER_COOKIE, MEMBER_ERROR_COOKIE, memberConfigured, tokenMatches } from "@/lib/member";

export async function MemberDesk({ locale }: { locale: Locale }) {
  await connection();
  const jar = await cookies();
  const open = tokenMatches(jar.get(MEMBER_COOKIE)?.value);
  const copy = t(locale);

  if (!open) {
    return (
      <MemberGate
        locale={locale}
        denied={jar.get(MEMBER_ERROR_COOKIE)?.value === "1"}
        configured={memberConfigured()}
        action={unlockMember}
      />
    );
  }

  const guide = editorGuide[locale];

  return (
    <article className="py-12">
      <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-accent">
        {copy.memberKicker}
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] tracking-[-0.03em]">
        {copy.memberTitle}
      </h1>
      <p className="mt-4 max-w-xl text-[17px] leading-8 text-muted">{copy.memberOpenLead}</p>
      <ol className="mt-10 max-w-2xl list-decimal space-y-0 divide-y divide-line border-y border-line pl-6">
        {guide.items.map((item) => (
          <li key={item} className="py-4 pl-2 text-[17px] leading-8">
            {item}
          </li>
        ))}
      </ol>
      <form action={lockMember} className="mt-8">
        <input type="hidden" name="locale" value={locale} />
        <button className="ghost-btn px-5" type="submit">
          {copy.memberLeave}
        </button>
      </form>
    </article>
  );
}
