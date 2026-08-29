import type { Article } from "./types";

// 日本語は表記が連続するため部分一致で拾う。強いシグナルとなる語のみに絞り、
// 「一次産業」などの誤検出を避けるため一般的すぎる語は入れない。
const JA_KEYWORDS = [
  "選挙",
  "投開票",
  "投票",
  "開票",
  "候補者",
  "立候補",
  "当選",
  "落選",
  "得票",
  "議席",
  "総裁選",
  "代表選",
  "衆院選",
  "衆議院選",
  "参院選",
  "参議院選",
  "総選挙",
  "大統領選",
  "知事選",
  "市長選",
  "区長選",
  "町長選",
  "出馬",
  "公約",
  "有権者",
  "期日前投票",
  "選挙区",
  "比例代表",
  "国民投票",
  "住民投票",
];

// 英語は語境界で判定し、pollution 等の誤検出を避ける。
const EN_KEYWORDS = [
  "election",
  "elections",
  "electoral",
  "electorate",
  "vote",
  "votes",
  "voted",
  "voting",
  "voter",
  "voters",
  "ballot",
  "ballots",
  "poll",
  "polls",
  "polling",
  "pollster",
  "pollsters",
  "candidate",
  "candidates",
  "candidacy",
  "caucus",
  "runoff",
  "run-off",
  "referendum",
  "incumbent",
  "midterm",
  "midterms",
  "by-election",
  "byelection",
];

const EN_PATTERN = new RegExp(
  `\\b(?:${EN_KEYWORDS.map((word) => word.replace(/[-]/g, "\\-")).join("|")})\\b`,
  "i",
);

function matchesElection(text: string): boolean {
  if (!text) return false;
  if (JA_KEYWORDS.some((keyword) => text.includes(keyword))) return true;
  return EN_PATTERN.test(text);
}

export function isElectionArticle(article: Article): boolean {
  return matchesElection(`${article.title} ${article.excerpt}`);
}
