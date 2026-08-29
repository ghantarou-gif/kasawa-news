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

// 日本の選挙に限定するための「日本」シグナル。海外の総選挙・大統領選・国民投票を
// 除外するため、国名・日本の政党名・国会/議院・首長選など、日本を明示する語のみを使う。
// （「総選挙」「大統領選」など海外にも使われる語はここには入れない）
const JAPAN_JA_MARKERS = [
  "日本",
  "ニッポン",
  "邦人",
  "国内",
  "永田町",
  "国会議員",
  "衆院",
  "衆議院",
  "参院",
  "参議院",
  "自民",
  "自由民主党",
  "立憲",
  "公明",
  "日本維新",
  "維新の会",
  "国民民主",
  "れいわ",
  "社民",
  "日本共産党",
  "都議",
  "都知事",
  "東京都知事",
];

// 英語記事で日本を示す語。Tokyo / LDP など語境界で判定。
const JAPAN_EN_MARKERS = [
  "japan",
  "japanese",
  "tokyo",
  "ldp",
  "komeito",
  "ishiba",
  "kishida",
  "takaichi",
];

function toBoundaryPattern(words: string[]): RegExp {
  return new RegExp(
    `\\b(?:${words.map((word) => word.replace(/[-]/g, "\\-")).join("|")})\\b`,
    "i",
  );
}

const EN_PATTERN = toBoundaryPattern(EN_KEYWORDS);
const JAPAN_EN_PATTERN = toBoundaryPattern(JAPAN_EN_MARKERS);

function matchesElection(text: string): boolean {
  if (!text) return false;
  if (JA_KEYWORDS.some((keyword) => text.includes(keyword))) return true;
  return EN_PATTERN.test(text);
}

function mentionsJapan(text: string): boolean {
  if (!text) return false;
  if (JAPAN_JA_MARKERS.some((marker) => text.includes(marker))) return true;
  return JAPAN_EN_PATTERN.test(text);
}

// 日本国内の選挙記事だけを対象にする。「選挙関連の語」かつ「日本への明示的な言及」の
// 両方を満たす記事のみ true。海外の選挙（EU国民投票・米大統領選など）は除外される。
export function isJapaneseElectionArticle(article: Article): boolean {
  const text = `${article.title} ${article.excerpt}`;
  return matchesElection(text) && mentionsJapan(text);
}
