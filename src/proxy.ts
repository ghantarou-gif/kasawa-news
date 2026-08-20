import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE, LOCALE_COOKIE_LEGACY } from "@/lib/brand";
import { LOCALES } from "@/lib/locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/go/")) return NextResponse.next();
  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookie =
    request.cookies.get(LOCALE_COOKIE)?.value ??
    request.cookies.get(LOCALE_COOKIE_LEGACY)?.value;
  const header = request.headers.get("accept-language") ?? "";
  const locale =
    cookie === "en" || cookie === "ja"
      ? cookie
      : header.toLowerCase().includes("ja")
        ? "ja"
        : "ja";

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon).*)"],
};
