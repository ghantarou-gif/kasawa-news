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

// 英語記事で日本を示す語。Tokyo / LDP や主要都市・都道府県など語境界で判定。
const JAPAN_EN_MARKERS = [
  "japan",
  "japanese",
  "tokyo",
  "ldp",
  "komeito",
  "ishiba",
  "kishida",
  "takaichi",
  "osaka",
  "kyoto",
  "yokohama",
  "nagoya",
  "sapporo",
  "fukuoka",
  "kobe",
  "okinawa",
  "hokkaido",
];

// 日本の地方選挙を示す語（首長選・議員選）。これらは日本の選挙を強く示すため、
// FOREIGN マーカーが無ければ単独で「日本の選挙」と判定する。
// 「市長選」「知事選」など海外にも使われうる語は FOREIGN 側で打ち消す。
const JAPAN_LOCAL_ELECTION = [
  "知事選",
  "県知事選",
  "都知事選",
  "道知事選",
  "府知事選",
  "市長選",
  "区長選",
  "町長選",
  "村長選",
  "首長選",
  "都議選",
  "府議選",
  "道議選",
  "県議選",
  "市議選",
  "区議選",
  "町議選",
  "村議選",
  "都議会議員選挙",
  "府議会議員選挙",
  "道議会議員選挙",
  "県議会議員選挙",
  "市議会議員選挙",
  "区議会議員選挙",
  "町議会議員選挙",
  "村議会議員選挙",
  "統一地方選",
  "出直し選",
  "再選挙",
  "補欠選挙",
  "補選",
];

// 上記の地方選語が「海外の選挙」を指す代表的ケースを打ち消すための語。
// 日本語表記と衝突しにくい語を選ぶ（例: 日本の知事は「知事」なので「州知事選」は
// 米・独などの州知事選のみを捕捉。「州」単独は九州等と衝突するため使わない）。
const FOREIGN_JA_MARKERS = [
  "州知事選",
  "州議会",
  "州議選",
  "ロンドン",
  "ニューヨーク",
  "ワシントン",
  "パリ",
  "ベルリン",
  "モスクワ",
  "ソウル",
  "北京",
  "上海",
  "台北",
  "香港",
  "米国",
  "米大統領",
  "アメリカ",
  "英国",
  "イギリス",
  "フランス",
  "ドイツ",
  "イタリア",
  "スペイン",
  "ポルトガル",
  "オランダ",
  "アイルランド",
  "アイスランド",
  "ロシア",
  "ウクライナ",
  "ポーランド",
  "ハンガリー",
  "セルビア",
  "トルコ",
  "韓国",
  "北朝鮮",
  "台湾",
  "タイ",
  "ベトナム",
  "フィリピン",
  "インドネシア",
  "シンガポール",
  "インド",
  "ブラジル",
  "アルゼンチン",
  "メキシコ",
  "カナダ",
  "オーストラリア",
  "ニュージーランド",
  "ナイジェリア",
  "イスラエル",
  "イラン",
  "ザンビア",
  "ギニアビサウ",
  "欧州",
  "EU",
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

function mentionsForeign(text: string): boolean {
  return FOREIGN_JA_MARKERS.some((marker) => text.includes(marker));
}

// 日本の地方選挙（市長選・知事選・市議選・都議選・統一地方選 など）を指すか。
// 地方選語を含み、かつ海外を示す語を含まない場合のみ true。
// これにより「ロンドン市長選」「米〇〇州知事選」などの海外地方選は除外される。
function isJapaneseLocalElection(text: string): boolean {
  if (!JAPAN_LOCAL_ELECTION.some((term) => text.includes(term))) return false;
  return !mentionsForeign(text);
}

// 日本国内の選挙記事だけを対象にする。次のいずれかを満たすとき true:
//   1. 日本の地方選語を含み、海外マーカーを含まない（市長選〜知事選・地方議員選を網羅）
//   2. 選挙関連の語を含み、かつ日本への明示的な言及（国名・政党・国会・都知事 など）がある
// 海外の選挙（EU国民投票・米大統領選・各国総選挙・ロンドン市長選など）は除外される。
export function isJapaneseElectionArticle(article: Article): boolean {
  const text = `${article.title} ${article.excerpt}`;
  if (isJapaneseLocalElection(text)) return true;
  return matchesElection(text) && mentionsJapan(text);
}
