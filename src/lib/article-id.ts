function hash32(value: string, seed: number): number {
  let h = seed >>> 0;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Filesystem-safe article slug (base64url of the RSS id is often ENAMETOOLONG). */
export function encodeArticleId(id: string): string {
  const a = hash32(id, 2166136261).toString(16).padStart(8, "0");
  const b = hash32(id, 0x811c9dc5).toString(16).padStart(8, "0");
  const c = hash32(id.split("").reverse().join(""), 2166136261)
    .toString(16)
    .padStart(8, "0");
  return `${a}${b}${c}`;
}

export function decodeArticleId(pathId: string): string | null {
  if (/^[0-9a-f]{24}$/i.test(pathId)) return pathId;
  try {
    return Buffer.from(pathId, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

export function articleHubPath(locale: string, articleId: string): string {
  return `/${locale}/n/${encodeArticleId(articleId)}`;
}
