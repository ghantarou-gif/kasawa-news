/** GitHub Pages static export (Vercel 402 / DEPLOYMENT_DISABLED fallback). */
export const githubPages = process.env.GITHUB_PAGES === "1";
export const githubPagesBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH || (githubPages ? "/kasawa-news" : "");

export function publicHref(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${githubPagesBasePath}${normalized}`;
}
