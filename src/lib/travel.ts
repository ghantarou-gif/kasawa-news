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
  /** Slugs of other travel posts to link at the end of the article. */
  related?: string[];
};

/**
 * 観光地ガイドのストック。
 * 新しい記事は配列の先頭に追加する（新しいものが上）。
 * アフィリURLは src/lib/affiliate.ts の goLinks に設定。
 */
export const travelPosts: TravelPost[] = [
  {
    slug: "zauo-next-experience-restaurants",
    publishedAt: "2026-08-24",
    region: "other",
    place: { ja: "全国", en: "Across Japan" },
    title: {
      ja: "ざうおに続く面白い店：釣る・蒸す・焼く体験グルメ5軒",
      en: "After Zauo: five places where you catch, steam, or grill it yourself",
    },
    excerpt: {
      ja: "店内の生け簀で釣ってその場で食べる「釣船茶屋ざうお」が面白かった人向け。同じ「自分でやる」軸で、季節も予約の勝手も違う5軒を並べました。",
      en: "Liked Zauo, where you fish from a boat inside the restaurant? Five more places built on the same do-it-yourself idea, each with its own season and queueing rules.",
    },
    xHook: {
      ja: "ざうおで釣って食べたら次はここ。蒸す・焼く・流す、全部自分でやる店5軒↓",
      en: "Caught your own dinner at Zauo? Five more DIY food spots in Japan↓",
    },
    sections: [
      {
        heading: { ja: "起点：釣船茶屋ざうお", en: "Starting point: Zauo" },
        body: {
          ja: "竿を借りて店内の生け簀で釣り、釣れた魚をスタッフに渡して刺身・焼き・煮付け・唐揚げなどから調理法を選ぶ、という流れの店です。難波本店のほか新宿・目黒・渋谷・亀戸駅前・ららぽーとTOKYO-BAY・所沢・横浜綱島、東海に鈴鹿・星崎・小牧があります。\n注意したいのは、釣りの終了時刻がラストオーダーより早い店が多いこと。釣るのが目的なら閉店の2時間前には着いておくのが安全です。平日ランチは釣れる時間帯を限っている店もあるので、公式サイトの店舗ページで先に確認を。",
          en: "You rent a rod, fish from the tank beside your table, hand the catch to the staff and pick how it is cooked—sashimi, grilled, simmered or fried. Besides the Namba flagship there are branches in Shinjuku, Meguro, Shibuya, Kameido, LaLaport TOKYO-BAY, Tokorozawa and Yokohama Tsunashima, plus Suzuka, Hoshizaki and Komaki in the Tokai area.\nThe catch: fishing usually stops earlier than last orders, so arrive about two hours before closing if fishing is the point. Some branches limit fishing hours at weekday lunch, so check the branch page first.",
        },
      },
      {
        heading: {
          ja: "別府・地獄蒸し工房 鉄輪：温泉の蒸気で蒸す",
          en: "Beppu: steam it over a hot spring vent",
        },
        body: {
          ja: "いでゆ坂沿いの市営施設で、噴き上がる温泉の蒸気の釜に自分で食材を入れ、時間が来たら引き上げます。営業は10:00〜19:00（地獄蒸し釜の最終受付18:00）、休みは毎月第3水曜（祝日の場合は翌日）。\n予約は受け付けておらず、混雑時は受付で番号札をもらい、順番まで周辺を散策して待つ方式です。釜を扱う体験ができるのは中学生以上。",
          en: "Jigokumushi Kobo Kannawa is a city-run kitchen on Ideyu-zaka where you load your own ingredients into a hot-spring steam vat and pull them out when the timer is up. Open 10:00–19:00 (last vat slot 18:00), closed the third Wednesday of each month (the next day if it falls on a holiday).\nNo reservations: at busy times you take a numbered ticket and wander the onsen town until your turn. The steaming itself is for junior-high age and up.",
        },
      },
      {
        heading: {
          ja: "京都・貴船 ひろ文：滝に向かって流しそうめん",
          en: "Kibune, Kyoto: somen flowing over the river",
        },
        body: {
          ja: "渓流に張り出した川床の席で、目の前の樋を流れてくるそうめんをすくって食べます。営業は例年5月1日から9月末（予定）、受付は11:00〜13:00で予約不可、代金引換で番号札を受け取る先着順。平均3〜4時間待ちとされ、支払いは現金のみです。\n当日午前10時の時点で雨なら中止、貴船川の増水や気象警報でも中止。並んでいる途中で降り出した場合は返金されます。",
          en: "At Hirobun you sit on a platform built over the Kibune river and catch somen noodles as they slide past. It runs roughly May 1 to the end of September; reception is 11:00–13:00, no reservations, first come first served with a numbered ticket paid for on the spot. Expect an average three to four hour wait, cash only.\nIt is cancelled if it is raining at 10:00 that morning, and also for high water or weather warnings. If rain starts while you are queueing, you get a refund.",
        },
      },
      {
        heading: {
          ja: "山口・岩国 いろり山賊：山中の祭り屋敷",
          en: "Iwakuni: a permanent festival in the hills",
        },
        body: {
          ja: "国道沿いの山の中に提灯と篝火が並ぶ、一年中お祭りのような店。名物は鶏の一本焼き「山賊焼」と特大の「山賊むすび」です。玖珂店（国道2号沿い）と錦店（国道187号沿い）の2エリアに計5店舗あり、造りも営業時間も店ごとに違います。\n不定休なので、公式サイトの営業日カレンダーを見てから向かうのが確実。移動は基本的に車で、暗くなってからのほうが雰囲気は濃くなります。",
          en: "Irori Sanzoku is a sprawl of lantern-lit halls and open fires in the hills along the highway, open like a festival that never ends. The signatures are sanzoku-yaki, a whole grilled chicken leg, and an oversized rice ball called sanzoku-musubi. Five halls across two areas—Kuga on Route 2 and Nishiki on Route 187—each with its own building and hours.\nClosing days are irregular, so check the official calendar before driving out. It is a car trip, and the place looks best after dark.",
        },
      },
      {
        heading: {
          ja: "福岡・糸島 かき小屋：漁港で自分で焼く",
          en: "Itoshima: grill your own oysters at the port",
        },
        body: {
          ja: "例年10月ごろから翌4月ごろまで、岐志・船越・加布里・深江・福吉などの漁港に牡蠣小屋が並びます。網の前に座って自分で焼き、軍手と牡蠣ナイフを借りて殻を開けるスタイル。\n飲み物や調味料の持ち込みを認める店は多い一方、網で焼く食材（肉・魚介など）の持ち込みは断る店がほとんどです。ルールは店ごとに違うので、行く店の案内を先に読んでおくこと。服と髪に煙のにおいがつくので、その前提の服装で。",
          en: "From around October to April, oyster huts line the fishing ports of Kishi, Funakoshi, Kafuri, Fukae and Fukuyoshi. You sit at a grill, borrow gloves and a shucking knife, and cook your own.\nMany huts allow you to bring drinks and seasonings, but almost none allow you to bring things to put on the grill, such as meat or other seafood. Rules differ hut by hut, so read your hut's page first. Everything you wear will smell of smoke afterwards.",
        },
      },
    ],
    tips: [
      {
        ja: "予約の勝手がバラバラ。ざうおと山賊の一部は予約向き、鉄輪と貴船は当日並ぶ前提。",
        en: "Booking rules vary: Zauo and some Sanzoku halls take reservations; Kannawa and Kibune are same-day queues only.",
      },
      {
        ja: "季節もの：貴船の流しそうめんは5〜9月、糸島の牡蠣小屋は10〜4月ごろ。",
        en: "Seasonal: Kibune somen runs May–September, Itoshima oyster huts roughly October–April.",
      },
      {
        ja: "炭火・屋外の店は、汚れと煙がついてもいい服で。現金しか使えない場面もある。",
        en: "For open-fire and outdoor spots, wear clothes you don't mind smoking up—and carry cash.",
      },
    ],
    offers: [
      {
        goId: "travel-hotel",
        label: { ja: "近くの宿を探す", en: "Find a hotel nearby" },
      },
      {
        goId: "travel-tour",
        label: { ja: "体験・アクティビティ", en: "Experiences & activities" },
      },
    ],
    related: [
      "beppu-jigokumushi-kannawa",
      "kyoto-kibune-nagashi-somen",
      "yamaguchi-irori-sanzoku",
    ],
  },
  {
    slug: "beppu-jigokumushi-kannawa",
    publishedAt: "2026-08-23",
    region: "kyushu",
    place: { ja: "大分・別府（鉄輪）", en: "Kannawa, Beppu" },
    title: {
      ja: "地獄蒸し工房 鉄輪：温泉の蒸気で自分の昼飯を蒸す",
      en: "Jigokumushi Kobo Kannawa: cook lunch in a hot-spring vent",
    },
    excerpt: {
      ja: "別府・鉄輪のいでゆ坂にある市営の地獄蒸し施設。釜に食材を入れて待つだけですが、予約不可・番号札制なので段取りだけ知っておくと待ち時間が短くなります。",
      en: "A city-run steaming kitchen on Ideyu-zaka in Beppu. The cooking is simple; the queue is the part worth planning for, since there are no reservations.",
    },
    xHook: {
      ja: "別府の地獄蒸し、予約なしで並ぶ。釜の使い方と待ち時間の潰し方↓",
      en: "Steam your own lunch in a Beppu hot spring. How the queue works↓",
    },
    sections: [
      {
        heading: { ja: "使い方", en: "How it works" },
        body: {
          ja: "受付で釜の利用を申し込み、施設で売っている食材か持ち込みの食材をざるに並べ、係の案内で釜に入れます。あとは食材ごとの目安時間を待って引き上げるだけ。塩気のある蒸気が回るので、味付けはほとんど要りません。\n釜の使用料は釜の大きさと利用時間で決まり、延長もできます。金額は改定されることがあるので、最新は公式サイトで確認してください。",
          en: "You sign up at reception, arrange ingredients—bought on site or brought with you—on a tray, and a staff member helps you load a vat. Then you just wait out the time for each item and pull it out. The steam is naturally salty, so seasoning is barely needed.\nThe fee depends on vat size and time, with extensions available. Prices change, so check the official site for current rates.",
        },
      },
      {
        heading: { ja: "予約不可と番号札", en: "No reservations, numbered tickets" },
        body: {
          ja: "予約は一切受け付けておらず、当日受付の順番制です。混雑時は受付で番号札とおおよその待ち時間を伝えられるので、その間はいでゆ坂の坂道や周辺の地獄めぐり、足湯で時間を潰すのが定番。\n営業は10:00〜19:00、地獄蒸し釜の最終受付は18:00で、混雑状況によっては早まります。休館は毎月第3水曜（祝日の場合は翌日）。釜を扱えるのは中学生以上です。",
          en: "There are no reservations at all—everything is same-day order of arrival. When it is busy you get a numbered ticket and a rough wait time at reception, which most people spend walking Ideyu-zaka, touring the nearby \"hells\", or sitting in the foot bath.\nOpen 10:00–19:00 with last vat reception at 18:00 (earlier when crowded). Closed the third Wednesday of the month, or the following day if that is a holiday. Steaming is for junior-high age and up.",
        },
      },
      {
        heading: { ja: "何を蒸すか", en: "What to steam" },
        body: {
          ja: "定番は野菜のミックス、卵、地鶏、魚介。火の通りが早いものと遅いものを同じ釜に入れると加減が難しいので、時間の近いものでまとめると失敗しません。持ち込む場合も、下ごしらえを済ませて時間を揃えておくと楽です。\n蒸し上がりは熱く、蒸気も強いので、荷物は手元から離し、やけどに注意して引き上げてください。",
          en: "Standard picks are mixed vegetables, eggs, local chicken and seafood. Mixing fast- and slow-cooking items in one vat makes timing awkward, so group things with similar times. If you bring your own, prep them in advance so the times line up.\nEverything comes out very hot and the steam is fierce—keep bags away from the vat and take care lifting the tray.",
        },
      },
    ],
    tips: [
      {
        ja: "10:00〜19:00（釜の最終受付18:00）／毎月第3水曜休（祝日なら翌日）。",
        en: "Open 10:00–19:00 (last vat 18:00); closed the third Wednesday monthly (next day if a holiday).",
      },
      {
        ja: "別府駅から車で約20分。無料駐車場はあるが台数が限られ、大型車は乗り入れ不可。",
        en: "About 20 minutes by car from Beppu Station. Free parking is limited and not open to larger vehicles.",
      },
      {
        ja: "食後に鉄輪の共同浴場や貸間宿を回ると、蒸し場だけで終わらない。",
        en: "Pair it with Kannawa's public baths or old lodging houses to make an afternoon of it.",
      },
    ],
    offers: [
      {
        goId: "travel-hotel",
        label: { ja: "別府の宿を探す", en: "Find a Beppu hotel" },
      },
      {
        goId: "travel-tour",
        label: { ja: "別府の体験・ツアー", en: "Beppu tours & activities" },
      },
    ],
    related: ["zauo-next-experience-restaurants", "yamaguchi-irori-sanzoku"],
  },
  {
    slug: "kyoto-kibune-nagashi-somen",
    publishedAt: "2026-08-22",
    region: "kansai",
    place: { ja: "京都・貴船", en: "Kibune, Kyoto" },
    title: {
      ja: "貴船の川床流しそうめん：予約なし、3〜4時間待ちの並び方",
      en: "Kibune's river-deck somen: no bookings, three to four hours of queueing",
    },
    excerpt: {
      ja: "貴船で流しそうめんが食べられるのはひろ文の川床。受付時間・支払い方法・中止条件を知らないと、往復2時間かけて空振りになります。",
      en: "Hirobun is the one place in Kibune serving somen on the river deck. Knowing the reception hours, payment rules and cancellation conditions is what keeps the trip from being wasted.",
    },
    xHook: {
      ja: "貴船の流しそうめん、予約は取れない。受付11〜13時・現金のみ・雨で中止↓",
      en: "You can't book Kibune's flowing somen. Reception 11:00–13:00, cash only, cancelled in rain↓",
    },
    sections: [
      {
        heading: { ja: "段取り", en: "The drill" },
        body: {
          ja: "流しそうめんは予約不可。当日、受付時間の11:00〜13:00に現地で申し込み、代金と引き換えに番号札を受け取ります。支払いは現金のみ、料金は2,000円（税込）。平均3〜4時間待ちとされているので、13時ちょうどに着くつもりの計画は避けたほうが無難です。\n席は渓流に張り出した川床の上。目の前の樋を流れてくるそうめんをすくって食べる形で、量そのものは軽めです。",
          en: "The somen cannot be reserved. You sign up on site during reception hours, 11:00–13:00, and get a numbered ticket when you pay. Cash only, 2,000 yen including tax. The average wait is three to four hours, so aiming to arrive right at 13:00 is risky.\nSeating is on the deck built over the stream, where you catch noodles sliding down a bamboo chute. It is a light meal rather than a full lunch.",
        },
      },
      {
        heading: { ja: "中止になる条件", en: "When it is called off" },
        body: {
          ja: "雨天、貴船川の増水、気象警報の発令中は川床の営業を中止します。当日午前10時の時点で雨なら、その日は中止。並んでいる途中で降り出した場合も中止となり、料金は返金されます。\n営業期間は例年5月1日から9月30日（予定）ですが、気候によって9月中旬で終わることもあります。9月に狙うなら直接問い合わせるのが確実です。",
          en: "The deck closes for rain, high water on the Kibune river, or any active weather warning. If it is raining at 10:00 that morning, the day is cancelled. If rain starts while you are in line it is also stopped, and you are refunded.\nThe season normally runs May 1 to September 30, but a cool or wet year can end it in mid-September. If you are aiming for September, call ahead.",
        },
      },
      {
        heading: { ja: "待ち時間の使い方", en: "Using the wait" },
        body: {
          ja: "番号札を取ったら、貴船神社の本宮・結社・奥宮を上流に向かって歩いて回るのが定番。ひろ文は結社のすぐ隣なので、参拝の途中で戻ってこられます。川沿いは市街地より体感で数度涼しく、夏でも歩けます。\n食事をしっかり取りたい場合は、川床の会席や鍋のほうを予約して、流しそうめんは諦めるという選択もあります。",
          en: "Once you have a ticket, the usual move is to walk upstream through Kibune Shrine's three halls. Hirobun sits right next to the middle one, so you can drop back easily. The valley runs noticeably cooler than central Kyoto, so the walk is bearable in summer.\nIf you want an actual meal, consider booking the kaiseki or hot-pot course on the deck instead and skipping the somen queue.",
        },
      },
    ],
    tips: [
      {
        ja: "受付11:00〜13:00／2,000円（税込）／現金のみ／平均3〜4時間待ち。",
        en: "Reception 11:00–13:00, 2,000 yen incl. tax, cash only, three to four hour average wait.",
      },
      {
        ja: "叡山電車「貴船口」からバスかタクシー。歩くと坂道を30分ほど。",
        en: "Bus or taxi from Kibuneguchi Station on the Eizan line; walking takes about 30 uphill minutes.",
      },
      {
        ja: "夏の土日祝は周辺の通行規制が出ることがある。出発前に最新の案内を確認。",
        en: "Traffic near the shrine is sometimes restricted on summer weekends—check before you set out.",
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
    related: ["zauo-next-experience-restaurants", "kyoto-arashiyama"],
  },
  {
    slug: "yamaguchi-irori-sanzoku",
    publishedAt: "2026-08-21",
    region: "other",
    place: { ja: "山口・岩国", en: "Iwakuni, Yamaguchi" },
    title: {
      ja: "いろり山賊：山の中の祭り屋敷で鶏を一本かじる",
      en: "Irori Sanzoku: a hillside festival where you eat chicken off the bone",
    },
    excerpt: {
      ja: "国道沿いの山中に提灯が並ぶ、山口の名物店。5店舗それぞれ造りも営業時間も違い、不定休なので、行く前に見るべきものが決まっています。",
      en: "Lantern-covered halls in the hills along a Yamaguchi highway. Five buildings, five sets of hours, irregular closing days—so there is one page to check before you drive out.",
    },
    xHook: {
      ja: "山口の「いろり山賊」。山の中に提灯と篝火、名物は鶏の一本焼き↓",
      en: "Irori Sanzoku in Yamaguchi: lanterns, open fires, and a whole grilled chicken leg↓",
    },
    sections: [
      {
        heading: { ja: "どんな店か", en: "What it is" },
        body: {
          ja: "山道に提灯と篝火、水車、茅葺きの建物が並び、店というより常設の祭りに近い場所です。玖珂店（国道2号沿い）にはいろり山賊・竈・桃李庵、錦店（国道187号沿い）には山賊砦・一燈銭があり、屋外席が多い店、座敷が中心の店、茅葺きの大きな建物と、性格が分かれています。\n初めてなら、野外席が多く元祖にあたる「いろり山賊」から入るのが分かりやすい選択です。",
          en: "Lanterns, open fires, a waterwheel and thatched roofs spread along a mountain road—it reads less like a restaurant than a festival that was left standing. The Kuga area on Route 2 holds Irori Sanzoku, Kamado and Tourian; the Nishiki area on Route 187 holds Sanzoku-toride and Ittousen. Some are mostly outdoor seating, some tatami rooms, one a large thatched hall.\nFor a first visit, the original Irori Sanzoku hall with its outdoor seats is the easiest to read.",
        },
      },
      {
        heading: { ja: "頼むもの", en: "What to order" },
        body: {
          ja: "名物は鶏もも肉を串に刺して焼く「山賊焼」と、握り拳より大きい「山賊むすび」。この2つに山賊うどんを足せば、だいたいの人は満腹になります。桃李庵は肉料理のメニューが多く、皇牛のステーキまで揃います。\n量が多いので、人数が少ないときは山賊焼を人数分頼まず、むすびやうどんで調整するくらいがちょうどいいです。",
          en: "The signatures are sanzoku-yaki, a skewered grilled chicken thigh, and sanzoku-musubi, a rice ball bigger than your fist. Add the sanzoku udon and most people are done. Tourian carries a longer meat menu, up to steak.\nPortions are large, so a small group is better off sharing the chicken and filling in with rice balls and udon.",
        },
      },
      {
        heading: { ja: "行く前に確認すること", en: "Check before you go" },
        body: {
          ja: "全店とも不定休で、店ごとに休みも営業時間も違います。玖珂店の主要店は10:00〜23:00（ラストオーダー22:00）、山賊砦は10:00〜22:00（同21:00）、一燈銭は10:00〜16:00（同15:00）が基本ですが、錦店は早じまいのことがあり、休業中の店舗が出ることもあります。公式サイトの営業日カレンダーが最終確認先です。\n予約できるのは一部の店舗のみ。電話受付は9:00〜17:00です。",
          en: "Closing days are irregular and differ by hall, as do the hours. The main Kuga halls generally run 10:00–23:00 (last orders 22:00), Sanzoku-toride 10:00–22:00 (21:00), and Ittousen 10:00–16:00 (15:00), but the Nishiki area sometimes closes earlier and individual halls can be shut for a stretch. The official calendar is the source of truth.\nOnly some halls take reservations, and the phone line runs 9:00–17:00.",
        },
      },
    ],
    tips: [
      {
        ja: "移動は車前提。玖珂店は国道2号沿い、錦店は国道187号沿いで、両者は離れている。",
        en: "Plan to drive. Kuga sits on Route 2, Nishiki on Route 187, and they are far apart.",
      },
      {
        ja: "提灯と篝火が生きるのは日没後。写真狙いなら暗くなってから。",
        en: "The lanterns and fires only work after dark—go in the evening for photos.",
      },
      {
        ja: "屋外席は煙と虫がつきもの。夏でも夜は冷えるので羽織るものを。",
        en: "Outdoor seats mean smoke and insects, and evenings get cool even in summer—bring a layer.",
      },
    ],
    offers: [
      {
        goId: "travel-hotel",
        label: { ja: "岩国・広島の宿を探す", en: "Find a hotel near Iwakuni" },
      },
      {
        goId: "travel-tour",
        label: { ja: "山口の体験・ツアー", en: "Yamaguchi tours & activities" },
      },
    ],
    related: ["zauo-next-experience-restaurants", "beppu-jigokumushi-kannawa"],
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

export function relatedTravelPosts(post: TravelPost): TravelPost[] {
  return (post.related ?? [])
    .filter((slug) => slug !== post.slug)
    .map((slug) => getTravelPost(slug))
    .filter((item): item is TravelPost => item !== null);
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
