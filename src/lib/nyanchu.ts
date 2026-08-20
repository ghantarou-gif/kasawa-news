const DEFAULT = "https://candid-cassata-bceae7.netlify.app";

export function nyanchuBaseUrl(): string {
  return process.env.NEXT_PUBLIC_NYANCHU_URL ?? DEFAULT;
}
