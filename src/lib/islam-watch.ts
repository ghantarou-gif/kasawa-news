import type { Article } from "./types";

// 日本語は部分一致。「ハラル」単独は人名（ハラルド等）と衝突するので入れない。
const JA_KEYWORDS = [
  "イスラム",
  "イスラーム",
  "ムスリム",
  "モスク",
  "ハラール",
  "ハラル食",
  "ハラル認証",
  "ラマダン",
  "ラマダーン",
  "断食月",
  "ヒジャブ",
  "ヒジャーブ",
  "土葬",
  "イマーム",
  "シャリーア",
  "礼拝所",
  "礼拝室",
];

const EN_KEYWORDS = [
  "islam",
  "islamic",
  "islamist",
  "muslim",
  "muslims",
  "mosque",
  "mosques",
  "halal",
  "imam",
  "imams",
  "ramadan",
  "hijab",
  "sharia",
  "mufti",
];

// 海外の記事（中東情勢など）で埋まらないよう、日本の話に限る。
const JAPAN_JA_MARKERS = [
  "日本",
  "国内",
  "邦人",
  "訪日",
  "来日",
  "在日",
  "自治体",
  "北海道",
  "青森",
  "岩手",
  "宮城",
  "秋田",
  "山形",
  "福島",
  "茨城",
  "栃木",
  "群馬",
  "埼玉",
  "千葉",
  "東京",
  "神奈川",
  "新潟",
  "富山",
  "石川",
  "福井",
  "山梨",
  "長野",
  "岐阜",
  "静岡",
  "愛知",
  "三重",
  "滋賀",
  "京都",
  "大阪",
  "兵庫",
  "奈良",
  "和歌山",
  "鳥取",
  "島根",
  "岡山",
  "広島",
  "山口",
  "徳島",
  "香川",
  "愛媛",
  "高知",
  "福岡",
  "佐賀",
  "長崎",
  "熊本",
  "大分",
  "宮崎",
  "鹿児島",
  "沖縄",
  "横浜",
  "川崎",
  "川口",
  "名古屋",
  "札幌",
  "神戸",
];

const JAPAN_EN_MARKERS = [
  "japan",
  "japanese",
  "tokyo",
  "osaka",
  "kyoto",
  "yokohama",
  "nagoya",
  "sapporo",
  "fukuoka",
  "kobe",
  "okinawa",
  "hokkaido",
  "saitama",
  "takaichi",
];

function boundary(words: string[]): RegExp {
  return new RegExp(`\\b(?:${words.join("|")})\\b`, "i");
}

const EN_PATTERN = boundary(EN_KEYWORDS);
const JAPAN_EN_PATTERN = boundary(JAPAN_EN_MARKERS);

function articleText(article: Article): string {
  return `${article.title} ${article.excerpt}`;
}

export function mentionsIslam(article: Article): boolean {
  const text = articleText(article);
  return JA_KEYWORDS.some((word) => text.includes(word)) || EN_PATTERN.test(text);
}

// Feed desks are not used: CNA and BBC Asia file other countries under "japan".
function aboutJapan(article: Article): boolean {
  const text = articleText(article);
  return JAPAN_JA_MARKERS.some((word) => text.includes(word)) || JAPAN_EN_PATTERN.test(text);
}

/** Islam- or Muslim-related news set in Japan. */
export function isIslamWatchArticle(article: Article): boolean {
  return mentionsIslam(article) && aboutJapan(article);
}
