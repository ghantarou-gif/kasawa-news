import type { Locale } from "./locale";

export type TravelRegion =
  | "hokkaido"
  | "tohoku"
  | "kanto"
  | "chubu"
  | "kansai"
  | "chugoku"
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
    slug: "unusual-dining-performance-and-place",
    publishedAt: "2026-08-24",
    region: "other",
    place: { ja: "全国", en: "Across Japan" },
    title: {
      ja: "もっと面白い食事：場所と演出で食べる店5軒",
      en: "Stranger meals in Japan: five places where the setting is the dish",
    },
    excerpt: {
      ja: "釣る・蒸す・焼くの次は、食べる場所と出され方が変わっている店。走る列車、海女小屋、鵜飼の船、囲炉裏端、そして給仕と向き合うわんこそばの5軒です。",
      en: "After the catch-it-yourself places, here are five where the room, the vehicle, or the person serving you is the point: a moving restaurant, a diver's hut, a cormorant-fishing boat, a hearth counter, and a bottomless bowl of soba.",
    },
    xHook: {
      ja: "食べる場所ごと面白い店。走る列車・海女小屋・鵜飼の船・囲炉裏・わんこそば↓",
      en: "Five Japanese meals where the setting does the work: a train, a diver's hut, a fishing boat, a hearth, endless soba↓",
    },
    sections: [
      {
        heading: {
          ja: "盛岡・東家：給仕と向き合うわんこそば",
          en: "Morioka: soba served until you close the lid",
        },
        body: {
          ja: "「はい、じゃんじゃん」の掛け声とともに、給仕の人がひと口分の蕎麦を椀に投げ込み続けます。15杯でかけ蕎麦1杯分ほど。100杯を超えると証明手形がもらえるのが有名で、食べ放題というより給仕との共同作業に近い時間です。\n料金は給仕付きのコースで4,500円（税込、2025年12月改定）から。予約は原則平日のみで、土日祝・GW・海の日〜8月末は事前予約不可の当日席になります。",
          en: "A server keeps flipping single-bite portions into your bowl with a chant of \"hai, jan-jan\"—about fifteen bowls equal one normal serving of soba. Pass a hundred and you get a certificate, which is the part everyone photographs. It feels less like a buffet than a duet with the person serving you.\nThe served course starts at 4,500 yen including tax (revised December 2025). Reservations are weekdays only in principle; weekends, holidays, Golden Week and mid-July through August are same-day seating.",
        },
      },
      {
        heading: {
          ja: "鳥羽・相差の海女小屋：現役の海女さんの炭火",
          en: "Toba: grilled by an ama diver",
        },
        body: {
          ja: "海女さんが実際に体を温めていた小屋で、目の前の炭火でサザエや干物を焼いてもらいながら、素潜り漁の話を聞きます。はちまんかまどは完全予約制で、原則2日前まで。\n軽食とお話だけのAコースが50分で大人2,900円、サザエ・干物・伊勢エビ汁などの料理コースが1時間15分で4,700円から。伊勢海老や鮑の入った上のコースもあります。台風など海が荒れると中止になります。",
          en: "You sit in the hut where ama divers used to warm up, while a working diver grills turban shells and dried fish on the charcoal in front of you and talks about free-diving. Hachiman Kamado is reservation-only, generally two days ahead.\nThe short course—snacks, tea and conversation—is 50 minutes for 2,900 yen; the meal course with shellfish, dried fish and lobster soup runs 75 minutes from 4,700 yen, with pricier lobster and abalone options above it. Rough seas or typhoons cancel it.",
        },
      },
      {
        heading: {
          ja: "八戸線・TOHOKU EMOTION：走るレストラン",
          en: "The Hachinohe line: a restaurant that moves",
        },
        body: {
          ja: "八戸駅と久慈駅の間を走る、車両ごとレストランにした列車。2号車がライブキッチンで、目の前で仕上げた料理が出てきます。往路はランチコース、復路はデザートブッフェと、方向で内容が違うのが特徴です。\n予約は「のってたのしい列車予約サイト」で乗車日の4日前まで。みどりの窓口では買えず、1回の申し込みは2〜4名まで、支払いはクレジットカードのみ。運行日は限られるので、まず運行カレンダーから日程を決めます。",
          en: "TOHOKU EMOTION runs between Hachinohe and Kuji as a three-car restaurant, with a live kitchen in the middle car finishing plates in front of you. The outbound run is a lunch course; the return is a dessert buffet, so the direction decides the meal.\nBook on JR East's Joyful Train reservation site up to four days before travel. Station ticket windows cannot sell it, each booking is for two to four people, and payment is by credit card only. It runs on selected days, so start from the operating calendar.",
        },
      },
      {
        heading: {
          ja: "岐阜・長良川鵜飼：篝火の下で船の上",
          en: "Gifu: dinner on a boat under the fires",
        },
        body: {
          ja: "1300年続く鵜飼を、川に浮かべた観覧船から見ます。開催は毎年5月11日〜10月15日。船が出るのは夕方で、鵜飼が始まるのは19:45頃、終わるのは20:30〜21:00頃です。\n注意点は、乗船料に食事が含まれないこと。持ち込みは自由で、乗船場まで届けてくれる仕出し業者が案内されています。宿の貸切船プランなら船内で食事が出ます。予約はインターネットか窓口のみで、電話では受け付けていません。",
          en: "Watch 1,300-year-old cormorant fishing from a viewing boat on the Nagara river, held every year from May 11 to October 15. Boats leave in the evening, the fishing starts around 19:45, and it ends between 20:30 and 21:00.\nOne catch: the fare does not include food. You may bring your own, and the office lists caterers who deliver to the boarding point; hotels also sell charter-boat plans that include dinner on board. Booking is online or at the counter—no phone reservations.",
        },
      },
      {
        heading: {
          ja: "東京・六本木 田舎家 東店：長いしゃもじで渡される",
          en: "Tokyo: food handed over on a giant paddle",
        },
        body: {
          ja: "カウンターの中の囲炉裏で炭火焼きにした魚や貝を、「掘返しべら」と呼ばれる長いしゃもじに載せ、掛け声とともに客の手元へ差し出す炉端焼きの老舗。50年以上続き、海外の要人が来日のたびに通う店としても知られます。\n営業は17:00〜23:00。サービス料10%とお通しがつき、予算はそれなりに張るので、記念日や案内役として使うのが向いています。",
          en: "At this half-century-old robatayaki counter, fish and shellfish are grilled over the hearth in the middle of the room and passed to you on a long wooden paddle, with a shout to go with it. It has hosted enough visiting heads of state to have a reputation abroad.\nOpen 17:00–23:00. There is a 10% service charge plus a cover dish, and the bill is not small, so it works best as an occasion or a place to take a guest.",
        },
      },
    ],
    tips: [
      {
        ja: "列車・鵜飼・海女小屋は日程を先に押さえる型。思いつきで行けるのは炉端とわんこそばくらい。",
        en: "The train, the boats and the diver's hut are book-first; only the hearth counter and the soba work on a whim.",
      },
      {
        ja: "鵜飼は船が出る時間と鵜飼開始が別。乗ってから始まるまで1時間ほど空くので、食べ物を用意しておく。",
        en: "On the Nagara boats, boarding is about an hour before the fishing starts—bring something to eat in the gap.",
      },
      {
        ja: "屋外・船上は夜が冷える。5月と10月の鵜飼、夏でも海辺の海女小屋は羽織るものを。",
        en: "Boats and open huts get cold after dark—carry a layer, especially for May and October river trips.",
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
      "morioka-wanko-soba-azumaya",
      "toba-ama-hut-hachiman-kamado",
      "tohoku-emotion-restaurant-train",
      "zauo-next-experience-restaurants",
    ],
  },
  {
    slug: "morioka-wanko-soba-azumaya",
    publishedAt: "2026-08-24",
    region: "tohoku",
    place: { ja: "岩手・盛岡", en: "Morioka, Iwate" },
    title: {
      ja: "盛岡のわんこそば：東家で100杯の手形を取りに行く",
      en: "Wanko soba in Morioka: going for the hundred-bowl certificate",
    },
    excerpt: {
      ja: "椀に蕎麦を投げ込まれ続ける盛岡の名物。大食い企画に見えて、実際は給仕との呼吸と薬味の使い方の話です。料金・予約・杯数の目安をまとめました。",
      en: "Morioka's bottomless soba looks like an eating contest but is really about pacing and condiments. Prices, reservation rules, and how many bowls people actually manage.",
    },
    xHook: {
      ja: "盛岡のわんこそば、100杯で手形。予約は原則平日だけという落とし穴↓",
      en: "A hundred bowls of soba earns you a certificate in Morioka—but weekends can't be booked↓",
    },
    sections: [
      {
        heading: { ja: "何が起きるのか", en: "What actually happens" },
        body: {
          ja: "席につくと薬味と付け合わせが並び、給仕の人が横に立ちます。あとは「はい、じゃんじゃん」の掛け声とともに、ひと口分の蕎麦が次々と椀へ。止めたいときは、椀が空の状態で蓋を閉めるのが合図です。\n15杯でかけ蕎麦およそ1杯分。全員に証明書、100杯を超えると証明手形が出ます。よく言われる目安は男性で50〜60杯、女性で30〜50杯くらいですが、薬味を変えながら食べるほうが結果的に伸びます。",
          en: "You sit down to a tray of condiments and side dishes, and a server takes up position beside you. From there it is one mouthful of soba after another, chanted in as they go. To stop, you put the lid on the bowl while it is empty—that is the signal.\nFifteen bowls is roughly one normal serving. Everyone gets a certificate, and passing a hundred earns the wooden tally. People often cite fifty to sixty bowls for men and thirty to fifty for women, though switching condiments as you go tends to carry you further than brute force.",
        },
      },
      {
        heading: { ja: "予約の落とし穴", en: "The reservation trap" },
        body: {
          ja: "わんこそばは事前予約が必須ではありませんが、席の予約を受けているのは原則平日のみ。土日祝、GW、海の日から8月末までは事前予約不可で、当日の受付順になります。旅行者が集中する時期ほど予約できない仕組みなので、混雑期は開店前後を狙うのが現実的です。\n当日の受付状況は公式サイトで案内されているので、出発前に見ておくと空振りを避けられます。",
          en: "You do not need a reservation, but seats can generally only be booked on weekdays. Weekends, holidays, Golden Week and the stretch from Marine Day to the end of August are same-day only, in order of arrival—that is, exactly when tourists show up. In those periods, aim for opening time.\nThe restaurant posts the day's wanko soba status on its site, which is worth checking before you set out.",
        },
      },
      {
        heading: { ja: "本店と駅前店", en: "Main shop or station shop" },
        body: {
          ja: "本店は中ノ橋通で、盛岡バスセンターの近く。老舗らしい構えで、盛岡駅からは徒歩30分ほどなのでバスかタクシーが無難です。定休は毎月第1水曜（5月のGWと8月は除く）。\n駅前店は盛岡駅前通の地下道A1出口すぐで、列車の待ち時間に寄れます。定休は毎週火曜（同じくGWと8月は除く）。どちらも専用駐車場はなく、近隣の有料駐車場を使い、会計時に伝えると一部が還元されます。",
          en: "The main shop sits on Nakanohashi-dori near the Morioka bus centre—old-school and about thirty minutes on foot from the station, so take a bus or taxi. Closed the first Wednesday of the month, except during Golden Week and August.\nThe station branch is right by exit A1 of the underpass in front of Morioka Station, easy to fit into a train connection. Closed Tuesdays, with the same exceptions. Neither has its own car park; use a nearby paid lot and mention it when you pay for a partial refund.",
        },
      },
    ],
    tips: [
      {
        ja: "給仕付きコースは4,500円から（2025年12月改定）。上のコースは薬味と付け合わせが増える。",
        en: "The served course starts at 4,500 yen (revised December 2025); pricier courses add condiments and side dishes.",
      },
      {
        ja: "わんこそばのラストオーダーは通常メニューより早い。夜に行くなら18:30前後が締切と考える。",
        en: "Last orders for wanko soba come earlier than for the regular menu—treat about 18:30 as the cut-off for dinner.",
      },
      {
        ja: "同行者がそば以外でもいい。丼物などを頼んで同席できるので、全員で挑む必要はない。",
        en: "Not everyone has to compete—companions can order regular dishes at the same table.",
      },
    ],
    offers: [
      {
        goId: "travel-hotel",
        label: { ja: "盛岡の宿を探す", en: "Find a Morioka hotel" },
      },
      {
        goId: "travel-book",
        label: { ja: "東北ガイド本（Amazon）", en: "Tohoku guidebook (Amazon)" },
      },
    ],
    related: [
      "unusual-dining-performance-and-place",
      "tohoku-emotion-restaurant-train",
    ],
  },
  {
    slug: "toba-ama-hut-hachiman-kamado",
    publishedAt: "2026-08-24",
    region: "chubu",
    place: { ja: "三重・鳥羽（相差）", en: "Osatsu, Toba" },
    title: {
      ja: "海女小屋はちまんかまど：現役の海女さんの炭火で食べる",
      en: "Hachiman Kamado: lunch grilled by a working ama diver",
    },
    excerpt: {
      ja: "鳥羽・相差の海女小屋で、素潜り漁の話を聞きながら炭火の魚介を食べる体験。完全予約制で時間割が決まっているので、行程の組み方だけ先に知っておくと楽です。",
      en: "In a diver's hut on the Toba coast you eat charcoal-grilled seafood while a working ama diver talks about her dives. It is reservation-only and runs to a timetable, so the trick is fitting it into the day.",
    },
    xHook: {
      ja: "鳥羽の海女小屋、完全予約制。海女さんの目の前でサザエを焼いてもらう↓",
      en: "A reservation-only ama diver's hut in Toba, where she grills your shellfish in front of you↓",
    },
    sections: [
      {
        heading: { ja: "どんな時間か", en: "What the visit is like" },
        body: {
          ja: "海女さんが漁の合間に体を温めていた小屋を、そのまま食事の場にしています。中央の炭火でサザエや干物、イカなどを焼きながら、素潜り漁や海女の生活の話を聞く、という時間割です。相差はあさり浜に面していて、小屋の外は海。\n観光ショーというより、話し相手のいる食事という感触に近く、ひとりでも参加できます。海女に扮する衣装の貸し出しもあります。",
          en: "The hut is where divers used to warm themselves between dives, now used for meals. Shellfish, dried fish and squid cook on the charcoal in the middle while a diver talks about free-diving and the life around it. Osatsu faces Asari beach, and the sea is right outside.\nIt reads less like a staged show than a meal with someone to talk to, and solo visitors are welcome. Diver costumes can be borrowed for photos.",
        },
      },
      {
        heading: { ja: "コースと時間割", en: "Courses and time slots" },
        body: {
          ja: "軽食とお話のAコースが50分で大人2,900円、こども1,450円。サザエ2個・干物・とこぶし・伊勢エビ汁・ご飯などの料理コースが1時間15分で大人4,700円、こども2,600円。伊勢海老や鮑を足した上のコースは9,200円前後から用意されています。\n体験の時間帯は11:45／13:15／14:45の3部制が基本で、Aコースには10:00の枠もあります。夕食利用（17:00〜）は6名以上・電話のみ・サービス料10%という条件です。",
          en: "The short course—light food, tea and conversation—is 50 minutes, 2,900 yen for adults and 1,450 for children. The meal course, 75 minutes, brings turban shells, dried fish, abalone-family shellfish, lobster broth and rice for 4,700 yen (2,600 for children). Courses adding spiny lobster or abalone start around 9,200 yen.\nSlots are generally 11:45, 13:15 and 14:45, with a 10:00 option for the short course. Dinner sittings from 17:00 need six or more people, are booked by phone only, and add a 10% service charge.",
        },
      },
      {
        heading: { ja: "予約と行き方", en: "Booking and getting there" },
        body: {
          ja: "完全予約制で、原則2日前まで。公式サイトのフォームか電話で申し込み、返信をもって予約成立です。台風などで海が荒れた場合は中止になります。\n鳥羽駅から車で約25分、伊勢神宮内宮からは約30分。車がない場合は鳥羽駅発の送迎バス（要予約）があり、11:15／12:45／14:15発が案内されています。伊勢志摩を1日で回るなら、内宮参拝を午前、海女小屋を昼過ぎ、という並びが組みやすいです。",
          en: "Reservation-only, generally two days ahead, by web form or phone; the booking is confirmed when they reply. Storms and rough seas cancel it.\nIt is about 25 minutes by car from Toba Station and 30 from Ise Jingu's inner shrine. Without a car, there is a shuttle from Toba Station by reservation, listed at 11:15, 12:45 and 14:15. For a one-day Ise-Shima loop, the inner shrine in the morning and the hut in the early afternoon fits neatly.",
        },
      },
    ],
    tips: [
      {
        ja: "完全予約制・2日前まで。当日ふらっと寄る店ではない。",
        en: "Reservation-only, about two days ahead—this is not a walk-in.",
      },
      {
        ja: "炭火の前に座るので、においがついてもいい服で。夏でも海風で冷えることがある。",
        en: "You sit at a charcoal fire, so wear something you don't mind smelling of smoke; sea wind can be cool even in summer.",
      },
      {
        ja: "近くに海女の信仰を集める神明神社・石神さんがあり、待ち時間や前後に寄りやすい。",
        en: "Shinmei Shrine and its Ishigami-san hall, long venerated by divers, are close enough to visit before or after.",
      },
    ],
    offers: [
      {
        goId: "travel-hotel",
        label: { ja: "鳥羽・伊勢志摩の宿", en: "Stay in Toba & Ise-Shima" },
      },
      {
        goId: "travel-tour",
        label: { ja: "伊勢志摩の体験・ツアー", en: "Ise-Shima tours & activities" },
      },
    ],
    related: [
      "unusual-dining-performance-and-place",
      "zauo-next-experience-restaurants",
    ],
  },
  {
    slug: "tohoku-emotion-restaurant-train",
    publishedAt: "2026-08-24",
    region: "tohoku",
    place: { ja: "青森・八戸〜岩手・久慈", en: "Hachinohe to Kuji" },
    title: {
      ja: "TOHOKU EMOTION：三陸を走るレストランに乗る",
      en: "TOHOKU EMOTION: riding a restaurant along the Sanriku coast",
    },
    excerpt: {
      ja: "八戸線を走る列車まるごとのレストラン。往路はランチ、復路はデザートという構成で、予約サイトの条件がやや独特です。乗る前に知っておくことを整理しました。",
      en: "A three-car restaurant that runs the Hachinohe line—lunch outbound, dessert inbound. The booking rules are unusual enough to be worth reading before you plan the trip.",
    },
    xHook: {
      ja: "三陸を走るレストラン列車。往路はランチ、復路はデザートブッフェ↓",
      en: "A restaurant train along the Sanriku coast: lunch one way, dessert buffet the other↓",
    },
    sections: [
      {
        heading: { ja: "列車の中身", en: "What is on board" },
        body: {
          ja: "八戸駅と久慈駅の間、三陸の海沿いを走る3両編成。1号車がコンパートメントの個室、2号車がライブキッチン、3号車がオープンダイニングで、列車全体がひとつのレストランになっています。2013年10月のデビューで、八戸線の運転再開とともに走り始めた列車です。\n景色のいい区間では速度を落として走るので、食事と車窓が競合しにくいのが利点。往路では沿線の人が手を振ってくれることもあります。",
          en: "Three cars run the coast between Hachinohe and Kuji: private compartments in car 1, a live kitchen in car 2, and open dining in car 3, with the whole train working as one restaurant. It debuted in October 2013, when the Hachinohe line reopened after the tsunami.\nThe train slows at the best viewpoints, so the food and the window are not competing. On the outbound run, people along the line sometimes come out to wave.",
        },
      },
      {
        heading: { ja: "往路と復路で違う", en: "Direction decides the meal" },
        body: {
          ja: "八戸から久慈へ向かう往路がランチコース、久慈から八戸へ戻る復路がデザートブッフェです。食事目当てなら往路、甘いもの目当てなら復路と、目的で乗る向きが決まります。料金も往路のほうが高く設定されています。\n復路は本八戸・鮫・種差海岸に停まりますが、下車専用で乗車はできません。久慈での滞在時間は短いので、往復するのか、片道だけ乗って三陸鉄道やレンタカーにつなぐのかは先に決めておくと動きやすいです。",
          en: "Hachinohe to Kuji is the lunch course; Kuji back to Hachinohe is the dessert buffet. Pick your direction by which one you want—the outbound is also the pricier of the two.\nThe return stops at Hon-Hachinohe, Same and Tanesashi-Kaigan, but only to let people off. The turnaround at Kuji is short, so decide in advance whether you are riding both ways or continuing on the Sanriku Railway or by car.",
        },
      },
      {
        heading: { ja: "予約の条件", en: "Booking rules" },
        body: {
          ja: "予約はJR東日本の「のってたのしい列車予約サイト」で、乗車日の4日前まで。みどりの窓口や券売機では買えません。1回の申し込みは2〜4名で、1名では申し込めず、大人1名以上が必要です。支払いはクレジットカードのみ。\n予約後の変更は人数変更も含めてできず、取り消して取り直す形になります。出発10日前からは取消料がかかるので、日程は固めてから申し込むこと。運行日は限られ、一部の日は旅行会社扱いになります。",
          en: "Book through JR East's Joyful Train reservation site, up to four days before departure; station windows and machines cannot sell it. Each booking covers two to four people—solo bookings are not accepted—and must include at least one adult. Credit card only.\nNo changes are possible after booking, not even party size; you cancel and rebook. Cancellation fees start ten days out, so fix your dates first. It runs on limited days, and some dates are sold through travel agencies instead.",
        },
      },
    ],
    tips: [
      {
        ja: "料金は運行期ごとに改定される。最新額と空席は予約サイトで確認。",
        en: "Fares are revised each operating period—check current prices and availability on the reservation site.",
      },
      {
        ja: "八戸side泊なら朝の往路が組みやすい。久慈からは三陸鉄道で南下する手もある。",
        en: "Staying in Hachinohe makes the late-morning outbound easy; from Kuji you can continue south on the Sanriku Railway.",
      },
      {
        ja: "個室は追加料金。少人数でゆっくり話したいときだけ選べば十分。",
        en: "Compartments cost extra—worth it only if your group wants a quiet room.",
      },
    ],
    offers: [
      {
        goId: "travel-hotel",
        label: { ja: "八戸・久慈の宿を探す", en: "Find a hotel in Hachinohe or Kuji" },
      },
      {
        goId: "travel-tour",
        label: { ja: "東北の体験・ツアー", en: "Tohoku tours & activities" },
      },
    ],
    related: [
      "unusual-dining-performance-and-place",
      "morioka-wanko-soba-azumaya",
    ],
  },
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
      "unusual-dining-performance-and-place",
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
    region: "chugoku",
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
  { id: "hokkaido", label: { ja: "北海道", en: "Hokkaido" } },
  { id: "tohoku", label: { ja: "東北", en: "Tohoku" } },
  { id: "kanto", label: { ja: "関東", en: "Kanto" } },
  { id: "chubu", label: { ja: "中部", en: "Chubu" } },
  { id: "kansai", label: { ja: "関西", en: "Kansai" } },
  { id: "chugoku", label: { ja: "中国", en: "Chugoku" } },
  { id: "kyushu", label: { ja: "九州", en: "Kyushu" } },
  { id: "okinawa", label: { ja: "沖縄", en: "Okinawa" } },
  { id: "other", label: { ja: "その他", en: "Other" } },
];

export function regionLabel(region: TravelRegion, locale: Locale): string {
  return travelRegions.find((item) => item.id === region)?.label[locale] ?? region;
}
