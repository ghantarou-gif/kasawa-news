import { MemberGate } from "@/components/MemberGate";
import type { Locale } from "@/lib/locale";

/** GitHub Pages export has no server. The principles stay off this build. */
export function MemberDesk({ locale }: { locale: Locale }) {
  return <MemberGate locale={locale} />;
}
