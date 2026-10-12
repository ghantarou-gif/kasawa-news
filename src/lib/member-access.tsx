import { cookies } from "next/headers";
import { connection } from "next/server";
import { MemberGate } from "@/components/MemberGate";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { lockMember, unlockMember } from "@/lib/member-actions";
import { MEMBER_COOKIE, MEMBER_ERROR_COOKIE, memberConfigured, tokenMatches } from "@/lib/member";
import { memberHubHref } from "@/lib/member-sections";

export async function MemberAccess({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
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
        next={memberHubHref(locale)}
      />
    );
  }

  return (
    <div className="py-12">
      {children}
      <form action={lockMember} className="mt-12 border-t border-line pt-6">
        <input type="hidden" name="locale" value={locale} />
        <button className="ghost-btn px-5" type="submit">
          {copy.memberLeave}
        </button>
      </form>
    </div>
  );
}
