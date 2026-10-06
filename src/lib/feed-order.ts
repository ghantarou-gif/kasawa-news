import type { Article } from "./types";

export function sortDomesticFirst(articles: Article[]): Article[] {
  const domestic: Article[] = [];
  const rest: Article[] = [];
  for (const article of articles) {
    const isDomestic = article.locales.length === 1 && article.locales[0] === "ja";
    (isDomestic ? domestic : rest).push(article);
  }
  return [...domestic, ...rest];
}

export function isMinorSports(article: Article): boolean {
  return article.desks.includes("sports") && !article.desks.includes("top");
}

export function excludeMinorSports(articles: Article[]): Article[] {
  return articles.filter((article) => !isMinorSports(article));
}
