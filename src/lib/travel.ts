import type { Locale } from "./locale";

export type TravelRegion =
  | "kanto"
  | "kansai"
  | "hokkaido"
  | "kyushu"
  | "okinawa"
  | "other";

export type TravelSection = {
  heading: Record<Locale, string>;
  body: Record<Locale, string>;
};

export type TravelOffer = {
  /** Key in goLinks /go/[id] */
  goId: string;
  label: Record<Locale, string>;
};

export type TravelPost = {
  slug: string;
  publishedAt: string;
  region: TravelRegion;
  place: Record<Locale, string>;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  /** Hero image URL (optional). Use your own photo CDN/path later. */
  image?: string;
  /** Short line for X posts */
  xHook: Record<Locale, string>;
  sections: TravelSection[];
  tips: Record<Locale, string>[];
  offers: TravelOffer[];
};

/**
 * 観光地ガイドのストック。
 * 新しい記事は配列の先頭に追加する（新しいものが上）。
 * アフィリURLは src/lib/affiliate.ts の goLinks に設定。
 */
export const travelPosts: TravelPost[] = [
  {
    slug: "kyoto-arashiyama",
    publishedAt: "2026-08-20",
    region: "kansai",
    place: { ja: "京都・嵐山", en: "Arashiyama, Kyoto" },
    title: {
      ja: "嵐山の歩き方：竹林・渡月橋・穴場ルート",
      en: "Arashiyama walking guide: bamboo grove, Togetsukyo, quieter routes",
    },
    excerpt: {
      ja: "観光客が多い嵐山でも、朝イチと裏道を押さえればゆっくり歩けます。半日コースの回り方と、すぐ使える宿・移動のリンクをまとめました。",
      en: "Even busy Arashiyama is walkable if you go early and use side paths. A half-day route plus hotel and transport picks.",
    },
    xHook: {
      ja: "嵐山、朝イチなら竹林は空いてる。半日コースまとめ↓",
      en: "Arashiyama bamboo grove is quiet at sunrise. Half-day route↓",
    },
    sections: [
      {
        heading: { ja: "おすすめの回り方", en: "Suggested route" },
        body: {
          ja: "渡月橋 → 竹林の小径 → 天龍寺（時間があれば）→ トロッコ駅周辺。混雑を避けるなら開門直後か、夕方の逆ルートがねらい目です。荷物は駅のコインロッカーかホテル預けが無難。",
          en: "Togetsukyo → Bamboo Grove → Tenryu-ji (if time) → around the Torokko station. Early opening or a reverse evening route helps. Leave bags at the station locker or hotel.",
        },
      },
      {
        heading: { ja: "穴場・注意点", en: "Quieter tips" },
        body: {
          ja: "竹林は写真スポットで行列になりやすいので、メイン通路を外れた細道を少し歩くだけでも体験が変わります。雨の日は足元が滑るのでスニーカー推奨。カフェは渡月橋手前より奥側の方が空いていることが多いです。",
          en: "The bamboo path gets queue-heavy for photos—side lanes feel different immediately. Wear sneakers after rain. Cafes deeper in are often quieter than those by the bridge.",
        },
      },
    ],
    tips: [
      {
        ja: "JR山陰線「嵯峨嵐山」から徒歩圏。バスは本数が多いが渋滞に注意。",
        en: "Walkable from JR Saga-Arashiyama. Buses are frequent but can jam.",
      },
      {
        ja: "半日〜1日。着物レンタルは午前予約が取りやすい。",
        en: "Half day to full day. Kimono rentals book out in the morning.",
      },
    ],
    offers: [
      {
        goId: "travel-hotel",
        label: { ja: "京都の宿を探す", en: "Find a Kyoto hotel" },
      },
      {
        goId: "travel-book",
        label: { ja: "京都ガイド本（Amazon）", en: "Kyoto guidebook (Amazon)" },
      },
    ],
  },
  {
    slug: "okinawa-naha-day",
    publishedAt: "2026-08-18",
    region: "okinawa",
    place: { ja: "沖縄・那覇", en: "Naha, Okinawa" },
    title: {
      ja: "那覇1日モデル：国際通り・市場・夕暮れの海岸",
      en: "One day in Naha: Kokusai-dori, markets, sunset shore",
    },
    excerpt: {
      ja: "到着日や最終日に使いやすい那覇の1日コース。食べ歩きと買い物のポイント、翌日の離島・北部へのつなぎ方も短く整理しています。",
      en: "A Naha day plan for arrival or departure days—food, shopping, and how to connect to islands or the north next day.",
    },
    xHook: {
      ja: "那覇の最終日、国際通りだけじゃもったいない。1日コース↓",
      en: "Last day in Naha? Don't stop at Kokusai-dori. Full day plan↓",
    },
    sections: [
      {
        heading: { ja: "午前：市場と国際通り", en: "Morning: markets & Kokusai-dori" },
        body: {
          ja: "牧志公設市場周辺で軽い朝食 → 国際通りを南北に歩いてみやげチェック。暑さが厳しい時期は日陰の路地と休憩を多めに。現金とSuica等の両方が使える店が多いですが、屋台系は現金寄りです。",
          en: "Light breakfast near Makishi Market, then walk Kokusai-dori for souvenirs. In heat, take shade breaks. Many shops take cards/transit IC; stalls often prefer cash.",
        },
      },
      {
        heading: { ja: "午後〜夕暮れ", en: "Afternoon to sunset" },
        body: {
          ja: "壺屋や街歩きのあと、波の上方面か近くの海岸で夕暮れ。翌日が美ら海水族館や離島なら、その日のうちにレンタカー／高速船の予約確認を。空港までモノレールが便利です。",
          en: "After Tsuboya or a stroll, catch sunset near Naminoue. If tomorrow is Churaumi or an island, confirm rental car / ferry bookings tonight. Monorail to the airport is easy.",
        },
      },
    ],
    tips: [
      {
        ja: "那覇空港からゆいレール約20分で県庁前。",
        en: "Yui Rail ~20 min from Naha Airport to Prefectural Office.",
      },
      {
        ja: "台風シーズンは欠航が出やすい。予備日を1日確保すると安心。",
        en: "Typhoon season cancels ferries often—keep a buffer day.",
      },
    ],
    offers: [
      {
        goId: "travel-hotel",
        label: { ja: "那覇の宿を探す", en: "Find a Naha hotel" },
      },
      {
        goId: "travel-tour",
        label: { ja: "沖縄ツアー・アクティビティ", en: "Okinawa tours & activities" },
      },
    ],
  },
];

export function listTravelPosts(): TravelPost[] {
  return [...travelPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0,
  );
}

export function getTravelPost(slug: string): TravelPost | null {
  return travelPosts.find((post) => post.slug === slug) ?? null;
}

export function travelPostPath(locale: Locale, slug: string): string {
  return `/${locale}/travel/${slug}`;
}

export const travelRegions: { id: TravelRegion; label: Record<Locale, string> }[] = [
  { id: "kanto", label: { ja: "関東", en: "Kanto" } },
  { id: "kansai", label: { ja: "関西", en: "Kansai" } },
  { id: "hokkaido", label: { ja: "北海道", en: "Hokkaido" } },
  { id: "kyushu", label: { ja: "九州", en: "Kyushu" } },
  { id: "okinawa", label: { ja: "沖縄", en: "Okinawa" } },
  { id: "other", label: { ja: "その他", en: "Other" } },
];

export function regionLabel(region: TravelRegion, locale: Locale): string {
  return travelRegions.find((item) => item.id === region)?.label[locale] ?? region;
}
