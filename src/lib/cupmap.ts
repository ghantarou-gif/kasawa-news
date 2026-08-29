import type { Locale } from "./locale";

export type CupGrade = "A" | "B" | "C" | "D" | "E";

export type CupPrefecture = {
  id: string;
  /** Short kanji shown on the map tile */
  tile: string;
  name: Record<Locale, string>;
  grade: CupGrade;
  /** Position on the tile cartogram (0-based) */
  col: number;
  row: number;
  note: Record<Locale, string>;
};

export const CUP_GRADES: {
  id: CupGrade;
  color: string;
  label: Record<Locale, string>;
}[] = [
  { id: "E", color: "#a4739f", label: { ja: "E（頂点）", en: "E (the summit)" } },
  { id: "D", color: "#f07a68", label: { ja: "D（雄大）", en: "D (grand)" } },
  { id: "C", color: "#f6ebac", label: { ja: "C（平均）", en: "C (average)" } },
  { id: "B", color: "#cbda72", label: { ja: "B（控えめ）", en: "B (modest)" } },
  { id: "A", color: "#79bc74", label: { ja: "A（大自然）", en: "A (great outdoors)" } },
];

export function cupGradeMeta(grade: CupGrade) {
  return CUP_GRADES.find((g) => g.id === grade)!;
}

/**
 * ネットで定期的にバズる「都道府県別カップサイズマップ」のデータ写し。
 * 元ネタは下着メーカーの調査とされる画像で、統計的根拠はない。
 * col/row はタイル地図上の位置（実際の県境を簡略化したカルトグラム）。
 */
export const cupPrefectures: CupPrefecture[] = [
  {
    id: "hokkaido",
    tile: "北海道",
    name: { ja: "北海道", en: "Hokkaido" },
    grade: "A",
    col: 10,
    row: 0,
    note: {
      ja: "広さ日本一、カップは謙虚。大自然は胸より心を満たす。",
      en: "Biggest prefecture, humblest cup. Nature fills the soul instead.",
    },
  },
  {
    id: "aomori",
    tile: "青森",
    name: { ja: "青森県", en: "Aomori" },
    grade: "B",
    col: 10,
    row: 1,
    note: {
      ja: "りんごのように控えめ。ねぶた祭りの熱量はD級。",
      en: "Modest as an apple. Nebuta festival energy is a solid D.",
    },
  },
  {
    id: "akita",
    tile: "秋田",
    name: { ja: "秋田県", en: "Akita" },
    grade: "B",
    col: 9,
    row: 2,
    note: {
      ja: "秋田美人はBで輝く。米どころの誇り。",
      en: "Akita beauties shine at B. A rice-land's pride.",
    },
  },
  {
    id: "iwate",
    tile: "岩手",
    name: { ja: "岩手県", en: "Iwate" },
    grade: "B",
    col: 10,
    row: 2,
    note: {
      ja: "わんこそばの杯数なら全国トップクラス。",
      en: "Wanko-soba bowl counts are world-class, at least.",
    },
  },
  {
    id: "yamagata",
    tile: "山形",
    name: { ja: "山形県", en: "Yamagata" },
    grade: "B",
    col: 9,
    row: 3,
    note: {
      ja: "さくらんぼ級の愛らしさ。芋煮会の鍋は大盛り。",
      en: "Cherry-sized charm. The imoni stew pot overflows.",
    },
  },
  {
    id: "miyagi",
    tile: "宮城",
    name: { ja: "宮城県", en: "Miyagi" },
    grade: "C",
    col: 10,
    row: 3,
    note: {
      ja: "牛タンの厚みは別格。カップは平均的。",
      en: "Gyutan is thick-cut; the cup stays average.",
    },
  },
  {
    id: "ishikawa",
    tile: "石川",
    name: { ja: "石川県", en: "Ishikawa" },
    grade: "D",
    col: 6,
    row: 4,
    note: {
      ja: "金箔だけじゃない、Dの輝き。",
      en: "Not just gold leaf — a D-grade shine.",
    },
  },
  {
    id: "toyama",
    tile: "富山",
    name: { ja: "富山県", en: "Toyama" },
    grade: "D",
    col: 7,
    row: 4,
    note: {
      ja: "立山連峰のように雄大。",
      en: "Grand as the Tateyama range.",
    },
  },
  {
    id: "niigata",
    tile: "新潟",
    name: { ja: "新潟県", en: "Niigata" },
    grade: "B",
    col: 8,
    row: 4,
    note: {
      ja: "米どころはB。酒の強さはE。",
      en: "Rice country is a B. Sake tolerance: E.",
    },
  },
  {
    id: "fukushima",
    tile: "福島",
    name: { ja: "福島県", en: "Fukushima" },
    grade: "C",
    col: 9,
    row: 4,
    note: {
      ja: "桃のようにちょうどいい。",
      en: "Just right, like a peach.",
    },
  },
  {
    id: "fukui",
    tile: "福井",
    name: { ja: "福井県", en: "Fukui" },
    grade: "D",
    col: 5,
    row: 5,
    note: {
      ja: "恐竜もびっくりのD。",
      en: "Even the dinosaurs are impressed.",
    },
  },
  {
    id: "nagano",
    tile: "長野",
    name: { ja: "長野県", en: "Nagano" },
    grade: "D",
    col: 7,
    row: 5,
    note: {
      ja: "山の高さに比例するかは不明。",
      en: "Whether it scales with mountain height is unknown.",
    },
  },
  {
    id: "gunma",
    tile: "群馬",
    name: { ja: "群馬県", en: "Gunma" },
    grade: "B",
    col: 8,
    row: 5,
    note: {
      ja: "ぐんまちゃんの頭部はE相当。",
      en: "Gunma-chan's head alone is an E.",
    },
  },
  {
    id: "tochigi",
    tile: "栃木",
    name: { ja: "栃木県", en: "Tochigi" },
    grade: "C",
    col: 9,
    row: 5,
    note: {
      ja: "いちごの甘さはE級。カップはC。",
      en: "Strawberry sweetness: E-tier. Cup: C.",
    },
  },
  {
    id: "ibaraki",
    tile: "茨城",
    name: { ja: "茨城県", en: "Ibaraki" },
    grade: "C",
    col: 10,
    row: 5,
    note: {
      ja: "納豆のように地味に見えて粘り強いC。",
      en: "Like natto: unassuming, but persistent.",
    },
  },
  {
    id: "gifu",
    tile: "岐阜",
    name: { ja: "岐阜県", en: "Gifu" },
    grade: "E",
    col: 6,
    row: 6,
    note: {
      ja: "飛騨高山の気高さ、Eの貫禄。全国2県だけの頂点。",
      en: "The dignity of Takayama, in E. One of only two at the summit.",
    },
  },
  {
    id: "yamanashi",
    tile: "山梨",
    name: { ja: "山梨県", en: "Yamanashi" },
    grade: "D",
    col: 7,
    row: 6,
    note: {
      ja: "富士山を望むだけあってD。",
      en: "A prefecture facing Fuji earns a D.",
    },
  },
  {
    id: "saitama",
    tile: "埼玉",
    name: { ja: "埼玉県", en: "Saitama" },
    grade: "B",
    col: 8,
    row: 6,
    note: {
      ja: "東京に吸われてB。だがそれがいい。",
      en: "Siphoned by Tokyo down to a B. And that's fine.",
    },
  },
  {
    id: "tokyo",
    tile: "東京",
    name: { ja: "東京都", en: "Tokyo" },
    grade: "C",
    col: 9,
    row: 6,
    note: {
      ja: "人口日本一でもカップは平均。謙虚な大都会。",
      en: "Biggest population, perfectly average cup. A humble metropolis.",
    },
  },
  {
    id: "chiba",
    tile: "千葉",
    name: { ja: "千葉県", en: "Chiba" },
    grade: "C",
    col: 10,
    row: 6,
    note: {
      ja: "ディズニーの夢はEカップ級。データはC。",
      en: "Disney dreams are an E. The data says C.",
    },
  },
  {
    id: "shimane",
    tile: "島根",
    name: { ja: "島根県", en: "Shimane" },
    grade: "D",
    col: 2,
    row: 7,
    note: {
      ja: "出雲大社のご縁の大きさ。",
      en: "As grand as Izumo Taisha's blessings.",
    },
  },
  {
    id: "tottori",
    tile: "鳥取",
    name: { ja: "鳥取県", en: "Tottori" },
    grade: "D",
    col: 3,
    row: 7,
    note: {
      ja: "砂丘の起伏。",
      en: "Like the rolling sand dunes.",
    },
  },
  {
    id: "hyogo",
    tile: "兵庫",
    name: { ja: "兵庫県", en: "Hyogo" },
    grade: "C",
    col: 4,
    row: 7,
    note: {
      ja: "神戸のおしゃれは胸より足元。",
      en: "Kobe style is about the shoes, not the chest.",
    },
  },
  {
    id: "kyoto",
    tile: "京都",
    name: { ja: "京都府", en: "Kyoto" },
    grade: "E",
    col: 5,
    row: 7,
    note: {
      ja: "千年の都はE。雅の極み、全国2県だけの頂点。",
      en: "The thousand-year capital is an E. Peak elegance, shared by only two.",
    },
  },
  {
    id: "shiga",
    tile: "滋賀",
    name: { ja: "滋賀県", en: "Shiga" },
    grade: "C",
    col: 6,
    row: 7,
    note: {
      ja: "琵琶湖の広さに対してカップはC。",
      en: "Lake Biwa is vast; the cup is a C.",
    },
  },
  {
    id: "aichi",
    tile: "愛知",
    name: { ja: "愛知県", en: "Aichi" },
    grade: "D",
    col: 7,
    row: 7,
    note: {
      ja: "名古屋めしのボリュームと同級。",
      en: "Same volume as Nagoya-meshi portions.",
    },
  },
  {
    id: "shizuoka",
    tile: "静岡",
    name: { ja: "静岡県", en: "Shizuoka" },
    grade: "D",
    col: 8,
    row: 7,
    note: {
      ja: "富士山のお膝元はD。",
      en: "At Fuji's feet: a D.",
    },
  },
  {
    id: "kanagawa",
    tile: "神奈川",
    name: { ja: "神奈川県", en: "Kanagawa" },
    grade: "C",
    col: 9,
    row: 7,
    note: {
      ja: "海は開放的、データは中庸。",
      en: "Open-minded coast, middle-of-the-road data.",
    },
  },
  {
    id: "yamaguchi",
    tile: "山口",
    name: { ja: "山口県", en: "Yamaguchi" },
    grade: "C",
    col: 1,
    row: 8,
    note: {
      ja: "ふぐのように身は締まってC。",
      en: "Trim as a fugu.",
    },
  },
  {
    id: "hiroshima",
    tile: "広島",
    name: { ja: "広島県", en: "Hiroshima" },
    grade: "C",
    col: 2,
    row: 8,
    note: {
      ja: "お好み焼きの層の厚みは別腹。",
      en: "The okonomiyaki layers are a separate stomach.",
    },
  },
  {
    id: "okayama",
    tile: "岡山",
    name: { ja: "岡山県", en: "Okayama" },
    grade: "C",
    col: 3,
    row: 8,
    note: {
      ja: "桃太郎の桃はCサイズ。",
      en: "Momotaro's peach is a C.",
    },
  },
  {
    id: "osaka",
    tile: "大阪",
    name: { ja: "大阪府", en: "Osaka" },
    grade: "D",
    col: 4,
    row: 8,
    note: {
      ja: "笑いのボリュームもD。",
      en: "The comedy volume is also a D.",
    },
  },
  {
    id: "nara",
    tile: "奈良",
    name: { ja: "奈良県", en: "Nara" },
    grade: "D",
    col: 5,
    row: 8,
    note: {
      ja: "大仏のスケール感。",
      en: "The Great Buddha's sense of scale.",
    },
  },
  {
    id: "mie",
    tile: "三重",
    name: { ja: "三重県", en: "Mie" },
    grade: "C",
    col: 6,
    row: 8,
    note: {
      ja: "伊勢神宮の前では謙虚に。",
      en: "Modest before Ise Grand Shrine.",
    },
  },
  {
    id: "fukuoka",
    tile: "福岡",
    name: { ja: "福岡県", en: "Fukuoka" },
    grade: "C",
    col: 0,
    row: 9,
    note: {
      ja: "豚骨のこってり度はD級だがカップはC。",
      en: "The tonkotsu richness is a D; the cup is a C.",
    },
  },
  {
    id: "oita",
    tile: "大分",
    name: { ja: "大分県", en: "Oita" },
    grade: "D",
    col: 1,
    row: 9,
    note: {
      ja: "温泉の湯量のような豊かさ。",
      en: "Abundant as the hot-spring flow.",
    },
  },
  {
    id: "ehime",
    tile: "愛媛",
    name: { ja: "愛媛県", en: "Ehime" },
    grade: "D",
    col: 2,
    row: 9,
    note: {
      ja: "みかんより大きめ。",
      en: "Bigger than a mikan.",
    },
  },
  {
    id: "kagawa",
    tile: "香川",
    name: { ja: "香川県", en: "Kagawa" },
    grade: "C",
    col: 3,
    row: 9,
    note: {
      ja: "うどんのコシの強さはE級。",
      en: "Udon firmness: E-tier. Cup: C.",
    },
  },
  {
    id: "tokushima",
    tile: "徳島",
    name: { ja: "徳島県", en: "Tokushima" },
    grade: "D",
    col: 4,
    row: 9,
    note: {
      ja: "阿波踊りの躍動。",
      en: "The dynamism of the Awa Odori.",
    },
  },
  {
    id: "wakayama",
    tile: "和歌山",
    name: { ja: "和歌山県", en: "Wakayama" },
    grade: "C",
    col: 5,
    row: 9,
    note: {
      ja: "みかんのようにまろやか。",
      en: "Mellow as a mikan.",
    },
  },
  {
    id: "saga",
    tile: "佐賀",
    name: { ja: "佐賀県", en: "Saga" },
    grade: "D",
    col: 0,
    row: 10,
    note: {
      ja: "有田焼の器の大きさ。",
      en: "Sized like an Arita-yaki bowl.",
    },
  },
  {
    id: "kumamoto",
    tile: "熊本",
    name: { ja: "熊本県", en: "Kumamoto" },
    grade: "D",
    col: 1,
    row: 10,
    note: {
      ja: "くまモンのボディに近い。",
      en: "Close to Kumamon's silhouette.",
    },
  },
  {
    id: "kochi",
    tile: "高知",
    name: { ja: "高知県", en: "Kochi" },
    grade: "C",
    col: 2,
    row: 10,
    note: {
      ja: "カツオのようにさっぱりC。",
      en: "Clean-cut as katsuo.",
    },
  },
  {
    id: "nagasaki",
    tile: "長崎",
    name: { ja: "長崎県", en: "Nagasaki" },
    grade: "C",
    col: 0,
    row: 11,
    note: {
      ja: "カステラの甘さに胸は控えめ。",
      en: "Sweet as castella, modest elsewhere.",
    },
  },
  {
    id: "miyazaki",
    tile: "宮崎",
    name: { ja: "宮崎県", en: "Miyazaki" },
    grade: "D",
    col: 1,
    row: 11,
    note: {
      ja: "南国の開放感。",
      en: "Southern openness.",
    },
  },
  {
    id: "kagoshima",
    tile: "鹿児島",
    name: { ja: "鹿児島県", en: "Kagoshima" },
    grade: "C",
    col: 0,
    row: 12,
    note: {
      ja: "桜島の噴火はE級、カップはC。",
      en: "Sakurajima's eruptions are an E; the cup is a C.",
    },
  },
  {
    id: "okinawa",
    tile: "沖縄",
    name: { ja: "沖縄県", en: "Okinawa" },
    grade: "C",
    col: 0,
    row: 13,
    note: {
      ja: "海の青さにすべてを持っていかれる。",
      en: "The blue of the sea steals the show.",
    },
  },
];

export const CUP_MAP_COLS = 11;
export const CUP_MAP_ROWS = 14;

export function cupGradeCount(grade: CupGrade): number {
  return cupPrefectures.filter((p) => p.grade === grade).length;
}

export function cupPrefecturesByGrade(grade: CupGrade): CupPrefecture[] {
  return cupPrefectures.filter((p) => p.grade === grade);
}

export const cupMapCopy = {
  kicker: { ja: "話題の地図・触れる版", en: "The viral map, interactive" },
  mapTitle: {
    ja: "都道府県別カップサイズ分布図",
    en: "Cup size by prefecture",
  },
  mapLead: {
    ja: "県をタップ（またはホバー）すると「調査結果」が出ます。",
    en: "Tap or hover a prefecture to reveal its survey result.",
  },
  legendHeading: { ja: "凡例", en: "Legend" },
  detailEmpty: {
    ja: "都道府県をタップすると、ここに結果が出ます。",
    en: "Tap a prefecture and its result appears here.",
  },
  detailGradeLabel: { ja: "平均カップ", en: "Average cup" },
  detailRank: {
    ja: "{grade}は全国で{n}件",
    en: "{n} of 47 prefectures are {grade}",
  },
  gachaButton: {
    ja: "行き先を運まかせで決める",
    en: "Pick my destination at random",
  },
  gachaRolling: { ja: "選定中…", en: "Choosing…" },
  gachaResult: { ja: "あなたの運命の県", en: "Your destined prefecture" },
  rankingHeading: { ja: "ランキング（E→A）", en: "Ranking (E to A)" },
  rankingUnit: { ja: "件", en: "" },
  disclaimer: {
    ja: "※元ネタはネットで話題の「下着メーカーの調査」とされる地図で、統計的な根拠はありません。旅の計画には一切役に立たないので、宿は普通に立地と値段で選びましょう。",
    en: "*Based on a viral map attributed to a lingerie maker's survey. Statistically worthless and useless for trip planning — pick hotels by location and price like everyone else.",
  },
} as const;

export function cupMapText(
  key: keyof typeof cupMapCopy,
  locale: Locale,
): string {
  return cupMapCopy[key][locale];
}
