import { timingSafeEqual } from "node:crypto";
import { MEMBER_COOKIE, tokenMatches } from "@/lib/member";

function cookieValue(request: Request, name: string): string | undefined {
  const part = request.headers
    .get("cookie")
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));
  if (!part) return undefined;
  try {
    return decodeURIComponent(part.slice(name.length + 1));
  } catch {
    return undefined;
  }
}

export function memberRequestOpen(request: Request): boolean {
  return tokenMatches(cookieValue(request, MEMBER_COOKIE));
}

export function cronRequestOk(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim() ?? "";
  if (!secret) return false;
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length).trim() : "";
  const left = Buffer.from(token);
  const right = Buffer.from(secret);
  return left.length === right.length && timingSafeEqual(left, right);
}
