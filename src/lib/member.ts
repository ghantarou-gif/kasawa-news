import { createHmac, timingSafeEqual } from "node:crypto";

export const MEMBER_COOKIE = "nyanchu-member";
export const MEMBER_ERROR_COOKIE = "nyanchu-member-error";

function accessCodes(): string[] {
  return (process.env.MEMBER_ACCESS_CODES ?? "")
    .split(",")
    .map((code) => code.trim())
    .filter((code) => code.length > 0);
}

function secret(): string {
  const dedicated = process.env.MEMBER_SECRET?.trim();
  if (dedicated) return dedicated;
  return process.env.MEMBER_ACCESS_CODES?.trim() ?? "";
}

export function memberConfigured(): boolean {
  return accessCodes().length > 0 && secret().length > 0;
}

export function memberToken(): string | null {
  const key = secret();
  if (!memberConfigured() || !key) return null;
  return createHmac("sha256", key).update("nyanchu-member-v1").digest("hex");
}

export function memberCodeMatches(input: string): boolean {
  const key = secret();
  const codes = accessCodes();
  const given = input.trim();
  if (!key || !given || codes.length === 0) return false;
  const givenDigest = createHmac("sha256", key).update(given).digest();
  return codes.some((code) =>
    timingSafeEqual(givenDigest, createHmac("sha256", key).update(code).digest()),
  );
}

export function tokenMatches(value: string | undefined): boolean {
  const expected = memberToken();
  if (!expected || !value || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}
