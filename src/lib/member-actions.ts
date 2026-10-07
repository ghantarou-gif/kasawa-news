"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@/lib/locale";
import {
  MEMBER_COOKIE,
  MEMBER_ERROR_COOKIE,
  memberCodeMatches,
  memberConfigured,
  memberToken,
} from "@/lib/member";

function localeFrom(formData: FormData): Locale {
  return formData.get("locale") === "en" ? "en" : "ja";
}

function memberPath(locale: Locale): string {
  return `/${locale}/members/x`;
}

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function unlockMember(formData: FormData) {
  const locale = localeFrom(formData);
  const code = String(formData.get("code") ?? "");
  const jar = await cookies();

  if (!memberConfigured() || !memberCodeMatches(code)) {
    jar.set(MEMBER_ERROR_COOKIE, "1", { ...cookieBase, maxAge: 20 });
    redirect(memberPath(locale));
  }

  const token = memberToken();
  if (!token) {
    jar.set(MEMBER_ERROR_COOKIE, "1", { ...cookieBase, maxAge: 20 });
    redirect(memberPath(locale));
  }

  jar.set(MEMBER_COOKIE, token, { ...cookieBase, maxAge: 60 * 60 * 24 * 30 });
  jar.delete(MEMBER_ERROR_COOKIE);
  redirect(memberPath(locale));
}

export async function lockMember(formData: FormData) {
  const locale = localeFrom(formData);
  const jar = await cookies();
  jar.delete(MEMBER_COOKIE);
  jar.delete(MEMBER_ERROR_COOKIE);
  redirect(memberPath(locale));
}
