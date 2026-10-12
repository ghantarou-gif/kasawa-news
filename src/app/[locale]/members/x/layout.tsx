import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locale";
import { MemberAccess } from "@/lib/member-access";

export default async function MemberAreaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <MemberAccess locale={locale}>{children}</MemberAccess>;
}
