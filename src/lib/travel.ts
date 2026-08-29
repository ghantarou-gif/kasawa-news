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
  image?: string;
  imageAlt?: Record<Locale, string>;
  caption?: Record<Locale, string>;
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
  imageAlt?: Record<Locale, string>;
  imageCaption?: Record<Locale, string>;
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
    slug: "suica-how-to",
    publishedAt: "2026-08-28",
    region: "kanto",
    place: { ja: "東京・JR東日本", en: "Tokyo / JR East" },
    title: {
      ja: "Suicaの買い方と仕組み：カード・モバイル・訪日向けの選び方",
      en: "How Suica works and how to get one: card, mobile, and visitor options",
    },
    excerpt: {
      ja: "電車・バス・コンビニで使う交通系ICの定番。改札の仕組み、無記名カードとモバイル、訪日向けWelcome Suicaの違い、チャージと払い戻しまで一通りまとめました。",
      en: "Japan's everyday transit IC for trains, buses, and convenience stores. How the gates work, physical vs mobile vs Welcome Suica, plus charging and refunds.",
    },
    image: "/images/travel/suica/hero-gate.jpg",
    imageAlt: {
      ja: "JR新宿駅・甲州街道改札の自動改札機",
      en: "Automatic ticket gates at JR Shinjuku Station, Koshu-kaido Gate",
    },
    imageCaption: {
      ja: "JR新宿駅・甲州街道改札。写真: MaedaAkihiko / Wikimedia Commons（CC BY-SA 4.0）",
      en: "Koshu-kaido Gate, JR Shinjuku. Photo: MaedaAkihiko / Wikimedia Commons (CC BY-SA 4.0)",
    },
    xHook: {
      ja: "Suica、いまはモバイルかWelcomeが現実的。買い方と仕組み↓",
      en: "Suica in 2026: mobile or Welcome is the practical pick. How it works↓",
    },
    sections: [
      {
        heading: { ja: "Suicaとは何か", en: "What Suica is" },
        body: {
          ja: "Suica（スイカ）はJR東日本が発行する交通系ICカードです。駅の改札やバスの読取機にタッチするだけで運賃が引き落とされ、対応するコンビニ・自販機・ロッカーでも電子マネーとして使えます。PASMOやICOCAなど他社のICと全国相互利用が進んでいるので、関東で作った1枚を大阪や福岡の改札でも使える場面が多いです。残高の上限は2万円。仕組みの核はソニーのFeliCaという非接触ICで、改札を秒速で通れるのはこの通信速度のおかげです。",
          en: "Suica is JR East's transit IC card. Tap a gate or bus reader and the fare is deducted; many convenience stores, vending machines, and lockers take it as e-money. Nationwide interoperability with PASMO, ICOCA, and others means a Kanto card often works in Osaka or Fukuoka too. The balance cap is ¥20,000. The chip is Sony FeliCa—fast enough that ticket gates feel instant.",
        },
        image: "/images/travel/suica/card-tap.jpg",
        imageAlt: {
          ja: "ペンギン柄のSuicaを改札の読取機にかざしているところ",
          en: "Tapping a penguin-design Suica on a gate reader",
        },
        caption: {
          ja: "本物のSuicaカード。読取機にタッチすると入場・運賃が記録されます。写真: タチヤマカムイ / Wikimedia Commons（CC BY-SA 4.0）",
          en: "A real Suica card. Tap the reader to record entry and fare. Photo: タチヤマカムイ / Wikimedia Commons (CC BY-SA 4.0)",
        },
      },
      {
        heading: { ja: "改札と残高の仕組み", en: "How gates and the balance work" },
        body: {
          ja: "入場時にカード（またはスマホ）をタッチすると入場記録が書き込まれ、出場時にもう一度タッチして区間運賃が計算されます。残高が足りないと出場できません。バスは「乗るときだけタッチ」か「乗り降り両方」か路線で違うので、車内の案内を見てください。電子マネーは店舗の読取機にタッチして即時引き落とし。改札も店もオフラインに近い処理で動くため、電波が弱い地下でも通りやすい一方、スマホ側は電源オフや機内モードの扱いに注意が必要です（iPhoneのエクスプレスカード設定ならロック画面のまま通せることが多いです）。",
          en: "Tap in to write an entry record, tap out to calculate the fare. Too little balance and you cannot exit. Buses may require tap-on only or tap on and off—follow the signage. Shops deduct instantly at the reader. Gates work even underground because the transaction is local to the card. Keep the phone powered; on iPhone, Express Transit usually lets you tap from the lock screen.",
        },
        image: "/images/travel/suica/simple-gate.jpg",
        imageAlt: {
          ja: "入場・出場と書かれた簡易Suica改札機",
          en: "Simple Suica entry and exit readers",
        },
        caption: {
          ja: "無人駅などで使う簡易改札。入場と出場を間違えると運賃が正しく引けません。写真: 西内 正 / Wikimedia Commons（CC BY-SA 4.0）",
          en: "Simple readers at unstaffed stations. Tap the correct entry/exit pillar. Photo: 西内 正 / Wikimedia Commons (CC BY-SA 4.0)",
        },
      },
      {
        heading: { ja: "どれを選べばよいか", en: "Which Suica to choose" },
        body: {
          ja: "いま現実的な選択肢は四つです。\n\n1）モバイルSuica（iPhoneのWallet、またはFeliCa対応の国内向けAndroid＋Google Wallet）— 券売機に並ばず、カードを忘れない。長く日本にいる人の本命。\n2）Welcome Suica Mobile（訪日向けアプリ、iPhone / Apple Watch）— 発行手数料・デポジットなし、有効期間は発行から180日、残高の払い戻しは不可。海外発行のカードでもApple Payチャージしやすい。\n3）カード型Welcome Suica — デポジットなし、有効28日、払い戻し不可。成田・羽田や主要駅のJR EAST Travel Service Center、一部の専用券売機。Androidやスマホを改札に当てたくない短期旅行向き。\n4）通常のSuica（無記名）／My Suica（記名）— 発売額はチャージ＋デポジット500円が基本。払い戻し時にデポジットは戻り、残高は手数料（220円が目安）を差し引いて返金。記名式は紛失時の再発行に向く。在庫は駅によって差があるので、並んで空振りするくらいならモバイルを先に試すのが早いです。",
          en: "Four practical options:\n\n1) Mobile Suica (iPhone Wallet, or a Japan-sold FeliCa Android with Google Wallet)—no ticket-machine queue, nothing to forget. Best if you live here or visit often.\n2) Welcome Suica Mobile (visitor app, iPhone / Apple Watch)—no issue fee or deposit, valid 180 days from issue, no balance refund. Overseas cards often work via Apple Pay.\n3) Plastic Welcome Suica—no deposit, valid 28 days, no refund. JR EAST Travel Service Centers at Narita, Haneda, and major stations, plus some dedicated machines. Good for short trips or Android phones that cannot run Mobile Suica.\n4) Regular unnamed Suica or named My Suica—price is charge plus a ¥500 deposit. On refund the deposit comes back and leftover balance is returned minus a fee (around ¥220). Named cards can be reissued if lost. Stock still varies by station; try mobile first if the machine is empty.",
        },
        image: "/images/travel/suica/welcome-card.jpg",
        imageAlt: {
          ja: "桜模様の赤いWelcome Suicaカード",
          en: "Red Welcome Suica card with cherry-blossom design",
        },
        caption: {
          ja: "訪日向けWelcome Suica。デポジットなし・有効28日・払い戻し不可。写真: Ravi Dwivedi / Wikimedia Commons（CC BY-SA 4.0）",
          en: "Welcome Suica for visitors: no deposit, 28 days, no refund. Photo: Ravi Dwivedi / Wikimedia Commons (CC BY-SA 4.0)",
        },
      },
      {
        heading: { ja: "買い方・発行の手順", en: "How to buy or issue one" },
        body: {
          ja: "モバイルSuica（iPhone）：Walletを開き「＋」→交通系ICカード→Suica。チャージ額を入れてApple Payで支払います。日本の電話番号がなくても発行できることが多いです。すでにプラスチックSuicaを持っている人は、対応する券売機でカードを取り込んでスマホに移せます（移したカードは使えなくなります）。\n\nWelcome Suica Mobile：App Storeで同名アプリを入れ、合言葉を決めて発行。会員登録は不要。チャージはApple Payが中心で、国内では現金チャージに対応する案内もあります。\n\nカード型Welcome：空港到着後、JR東日本の旅行サービスセンターか専用券売機。額面は1,000／2,000／5,000／10,000円など（全額が乗車・買い物に使える残高で、デポジットは乗らない）。パスポートが必要な窓口もあるので、到着ロビーで案内を確認してください。\n\n通常カード：JR東日本の多機能券売機・話せる指定席券売機・みどりの窓口。「Suica購入」から金額を選び、現金または対応するカードで支払います。PASMOは私鉄・地下鉄寄りの券売機でも買えますが、改札の相互利用はほぼ同じです。\n\n注意：海外で買ったAndroidはFeliCa非搭載が多く、モバイルSuicaが出せません。その場合はカードか、iPhoneのWelcome Suica Mobileです。",
          en: "Mobile Suica on iPhone: Wallet → + → Transit card → Suica, then charge with Apple Pay. A Japanese phone number is often unnecessary. An existing plastic Suica can be transferred at a compatible machine (the card then dies).\n\nWelcome Suica Mobile: install the app, set a passphrase, issue. No membership. Charge via Apple Pay; cash top-up is described for use inside Japan.\n\nPlastic Welcome: after landing, JR East Travel Service Center or a dedicated machine. Typical values ¥1,000 / ¥2,000 / ¥5,000 / ¥10,000—all usable balance, no deposit. Some counters ask for a passport.\n\nRegular card: JR East multi-function machines, reserved-seat machines, or Midori-no-madoguchi. Pick Suica purchase and pay cash or a supported card. PASMO is sold at many private-railway machines; gate interoperability is essentially the same.\n\nNote: most overseas Androids lack FeliCa, so Mobile Suica will not issue. Use plastic or Welcome Suica Mobile on iPhone.",
        },
        image: "/images/travel/suica/ticket-machine.jpg",
        imageAlt: {
          ja: "Suicaのチャージ機。お札を入れてカードを置くタイプ",
          en: "A Suica charge machine that takes bills and a card on the tray",
        },
        caption: {
          ja: "駅や店頭のチャージ機。おつりは出ないことが多い。カード購入は券売機・窓口。写真: Tatsuo Yamashita / Wikimedia Commons（CC BY 2.0）",
          en: "Charge kiosks at stations and shops often give no change. Buy cards at machines or counters. Photo: Tatsuo Yamashita / Wikimedia Commons (CC BY 2.0)",
        },
      },
      {
        heading: { ja: "チャージと日常の使い方", en: "Charging and everyday use" },
        body: {
          ja: "チャージは駅の券売機（現金が確実）、コンビニレジ、モバイルならアプリやWalletからクレジットカード／Apple Pay／Google Pay。オートチャージはビューカードなど対応カードを紐づけた記名式・モバイル向けです。\n\n改札は財布やスマホごとタッチせず、カード面や端末上部を読取部にまっすぐ当てる。改札を通ったあと残高不足に気づいたら、駅の精算機か有人改札へ。新幹線の自由席はタッチだけで乗れる区間と、EXやチケットレス予約が必要な列車が混在するので、乗る前に案内を見てください。\n\n買い物は「交通系IC」のマークがある店。一部の屋台や個人店は現金のみ。残高は券売機かモバイルの履歴で確認できます。",
          en: "Top up at station machines (cash is reliable), convenience-store counters, or in the app / Wallet with a card, Apple Pay, or Google Pay. Auto-charge is for named or mobile Suica linked to a supported card such as View.\n\nTap the card face or the top of the phone on the reader—don't bury it in a stack of cards. If you are stuck inside with too little balance, use a fare-adjustment machine or staffed gate. Some shinkansen cars allow a simple tap; others need EX or a ticketless booking—check before you board.\n\nShops showing the transit-IC mark take Suica. Stalls may be cash only. Check the balance on a machine or in the mobile history.",
        },
        image: "/images/travel/suica/vending-pay.jpg",
        imageAlt: {
          ja: "飲料自販機のSuica対応IC読取機",
          en: "Suica IC reader on a drink vending machine",
        },
        caption: {
          ja: "自販機でも交通系ICが使える。店の「交通系IC」マークと同じタッチ。写真: Real Estate Japan / Wikimedia Commons（CC BY 2.0）",
          en: "Vending machines take transit IC with the same tap as shops. Photo: Real Estate Japan / Wikimedia Commons (CC BY 2.0)",
        },
      },
      {
        heading: { ja: "払い戻し・期限・よくある勘違い", en: "Refunds, expiry, and common mix-ups" },
        body: {
          ja: "通常Suicaの払い戻しはJR東日本の窓口。デポジット500円は戻り、残額から手数料を引いた額が現金で戻ります。Welcome（カード／モバイル）は原則払い戻し不可なので、使い切る前提でチャージ額を抑えるのが安全です。通常カードは最終利用から10年で失効することがあります。モバイルは機種変更の手順を踏まないと残高が消えるので、買い替え前に公式アプリの案内を見てください。\n\nSuicaとPASMOは発行会社が違うだけで、都内の移動ではほぼ同じ使い勝手です。ICOCAはJR西日本エリアのカードで、相互利用対象なら関東の改札でも通ります。子ども用は年齢条件のある小児Suica。定期券はモバイルか記名カードに載せられます。\n\n運賃・発売状況は駅や公式サイトが正です。チップ不足で無記名カードが一時止まった経緯もあるので、旅行直前はJR東日本のSuica案内を一度確認すると安心です。",
          en: "Refund a regular Suica at a JR East counter: the ¥500 deposit returns, and remaining value comes back minus a fee. Welcome (card or mobile) is generally non-refundable—charge modestly. Regular cards can expire after about ten years unused. On a phone, follow the official transfer steps before you switch devices or the balance can vanish.\n\nSuica and PASMO differ by issuer; in Tokyo they feel the same. ICOCA is JR West's card and still works at many Kanto gates under interoperability. Child Suica has age rules. Commuter passes go on mobile or a named card.\n\nFares and stock change. Unnamed cards were paused during a chip shortage, so check JR East's Suica page shortly before you travel.",
        },
      },
    ],
    tips: [
      {
        ja: "iPhoneならWalletのSuicaかWelcome Suica Mobileが最短。海外Androidはカード型が無難。",
        en: "On iPhone, Wallet Suica or Welcome Suica Mobile is fastest. Overseas Android: use plastic.",
      },
      {
        ja: "成田エクスプレスなど特急は運賃が重い。到着直後に3,000円以上チャージしておくと慌てない。",
        en: "Limited expresses add up—charge ¥3,000+ right after landing if you might take Narita Express.",
      },
      {
        ja: "残高上限は2万円。払い戻しできないWelcomeは使い切れる額だけ入れる。",
        en: "Cap is ¥20,000. On non-refundable Welcome, only load what you will spend.",
      },
      {
        ja: "公式の最新案内: JR東日本「Suica」ページ（発売箇所・Welcomeの条件は改定されやすい）。",
        en: "Confirm details on JR East's Suica pages—sales points and Welcome rules change.",
      },
    ],
    offers: [
      {
        goId: "travel-hotel",
        label: { ja: "東京の宿を探す", en: "Find a Tokyo hotel" },
      },
      {
        goId: "travel-tour",
        label: { ja: "東京のツアー・体験", en: "Tokyo tours & activities" },
      },
      {
        goId: "travel-book",
        label: { ja: "東京・交通のガイド本（Amazon）", en: "Tokyo / transit guidebook (Amazon)" },
      },
    ],
  },
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
