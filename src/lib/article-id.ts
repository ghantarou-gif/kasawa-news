export function encodeArticleId(id: string): string {
  return Buffer.from(id, "utf8").toString("base64url");
}

export function decodeArticleId(pathId: string): string | null {
  try {
    return Buffer.from(pathId, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

export function articleHubPath(locale: string, articleId: string): string {
  return `/${locale}/n/${encodeArticleId(articleId)}`;
}
