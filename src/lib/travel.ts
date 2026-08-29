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
  /** Viator Banner Builder 728x90 (partner P00316100). */
  viatorBanner?: boolean;
};

/**
 * 観光地ガイドのストック。
 * 新しい記事は配列の先頭に追加する（新しいものが上）。
 * アフィリURLは src/lib/affiliate.ts の goLinks に設定。
 */
export const travelPosts: TravelPost[] = [
  {
    slug: "japan-esim-sim-wifi",
    publishedAt: "2026-08-29",
    region: "other",
    place: { ja: "全国・訪日データ通信", en: "Nationwide / visitor data" },
    title: {
      ja: "日本のネット回線どれにする？eSIM・SIM・ポケットWiFiの選び方",
      en: "Staying online in Japan: how to choose between eSIM, SIM, and pocket Wi-Fi",
    },
    excerpt: {
      ja: "地図・翻訳・Suicaチャージ・予約確認まで、日本の旅はほぼネット前提。eSIMと物理SIM、ポケットWiFi、無料Wi-Fiの違いと、端末別の失敗しない選び方をまとめました。",
      en: "Maps, translation, topping up Suica, checking bookings—a Japan trip runs on data. Here's how eSIM, physical SIM, pocket Wi-Fi, and free Wi-Fi differ, and how to pick by device.",
    },
    image: "/images/travel/connectivity/hero-wifi.jpg",
    imageAlt: {
      ja: "秋葉原の店先に貼られた「Free WiFi」の案内",
      en: "A 'Free WiFi' sign posted at a shopfront in Akihabara, Tokyo",
    },
    imageCaption: {
      ja: "東京・秋葉原の無料Wi-Fi案内。ただし街歩きの主役にはしないのが安全。写真: Steve Nagata / Wikimedia Commons（CC BY 2.0）",
      en: "A free Wi-Fi sign in Akihabara, Tokyo—handy, but not a backbone for walking around. Photo: Steve Nagata / Wikimedia Commons (CC BY 2.0)",
    },
    xHook: {
      ja: "日本のネット、結論だけ言うとiPhoneはeSIM一択が近い。選び方↓",
      en: "Data in Japan, short version: on iPhone, eSIM is usually the move. How to choose↓",
    },
    sections: [
      {
        heading: { ja: "なぜ最初に決めるべきか", en: "Why sort this out first" },
        body: {
          ja: "日本の旅行はネットにつながっている前提で回ります。Googleマップの乗換案内、翻訳アプリ、飲食店やアクティビティの予約確認、モバイルSuicaのチャージ、配車アプリ、緊急時の連絡——どれも到着直後から使いたいものばかりです。空港の到着ロビーは無料Wi-Fiがありますが、駅に移動して電車に乗った瞬間から切れるので、街歩き用の回線は現地に着く前に用意しておくのが基本です。選択肢は大きく四つ:eSIM、物理SIM、ポケットWiFi(モバイルルーター)、そして施設の無料Wi-Fi。どれを主役にするかは、使う端末・人数・滞在日数・データ量で決まります。",
          en: "A Japan trip assumes you're online. Google Maps transit directions, translation, confirming restaurant and activity bookings, topping up Mobile Suica, ride-hailing, reaching someone in an emergency—you'll want all of it the moment you land. Airport arrival halls have free Wi-Fi, but it drops the second you board a train, so arrange your street-walking connection before you arrive. There are four options: eSIM, physical SIM, pocket Wi-Fi (a mobile router), and venue free Wi-Fi. Which one leads depends on your device, party size, trip length, and data appetite.",
        },
      },
      {
        heading: { ja: "eSIM:いまの本命(対応端末なら)", en: "eSIM: the default now (if your phone supports it)" },
        body: {
          ja: "eSIMは端末に内蔵のSIMへプロファイルを書き込む方式で、SIMカードを差し替えません。海外にいるうちにアプリやサイトで買ってQRを読み込み、日本に着いたら回線を有効化するだけ。空港カウンターに並ばず、SIMピンも不要で、日本の番号を持たなくてもデータ通信が使えます。iPhoneはXR/XS以降がeSIM対応、AndroidはPixelや近年の主要機種が対応しますが、地域版で無効な個体もあるので『設定』からeSIM追加が出るか出発前に確認を。多くの訪日向けeSIMはデータ専用(電話番号なし)で、通話やSMS認証が必要ならその点だけ注意します。容量は1日500MB〜無制限、日数は3〜30日など幅広く、地図と検索が中心なら1日1GB前後、動画やテザリングを多用するなら無制限プランが安心です。",
          en: "An eSIM writes a profile to the phone's built-in SIM—no card swap. Buy it from an app or site while still abroad, scan the QR, and activate the line once you land. No airport queue, no SIM pin, and you get data without holding a Japanese number. iPhone XR/XS and later support eSIM; Pixel and most recent Android flagships do too, though some regional units disable it—before you fly, check that Settings offers 'Add eSIM.' Most visitor eSIMs are data-only (no phone number), so note that if you need calls or SMS codes. Allowances range from 500MB/day to unlimited over 3–30 days; roughly 1GB/day covers maps and search, while heavy video or tethering is calmer on an unlimited plan.",
        },
        image: "/images/travel/connectivity/esim.jpg",
        imageAlt: {
          ja: "スマートフォンの設定画面に表示されたeSIMの管理項目",
          en: "eSIM management options shown in a smartphone's settings screen",
        },
        caption: {
          ja: "eSIMは『設定』からプロファイルを追加・切替する。カードの差し替えは不要。写真: Sinafe / Wikimedia Commons（CC BY-SA 4.0）",
          en: "An eSIM is added and switched from Settings—no card to swap. Photo: Sinafe / Wikimedia Commons (CC BY-SA 4.0)",
        },
      },
      {
        heading: { ja: "物理SIM:安さと汎用性", en: "Physical SIM: cheap and universal" },
        body: {
          ja: "物理SIMは端末のSIMトレイに差し替えて使います。eSIM非対応の古い端末や地域版Androidでも使え、家電量販店・空港・オンラインで訪日向けプリペイドSIMが手に入ります。注意点は二つ。ひとつはSIMロック——自国のキャリアでロックされた端末は日本のSIMが刺さらないので、出発前にSIMフリー化しておくこと。もうひとつは元のSIMの保管——抜いたSIMは小さいので失くしやすく、SIMピン(またはクリップ)も必要です。通話付きは本人確認(パスポート提示)が要る場合がありますが、データ専用プリペイドなら登録が簡単なものが多いです。到着日に空港のカウンターや自販機で買う手もありますが、混雑や在庫切れもあるので、確実に使いたいならオンラインで事前手配→受取か、eSIMの方が読みやすいです。",
          en: "A physical SIM swaps into the tray. It works on older phones or regional Androids that lack eSIM, and visitor prepaid SIMs are sold at electronics stores, airports, and online. Two cautions. First, SIM lock—if your home carrier locked the phone, a Japanese SIM won't work, so unlock before you fly. Second, keep your original SIM safe—it's tiny and easy to lose, and you'll need a SIM pin (or paperclip). Voice plans may require ID (passport); data-only prepaid is usually quick to set up. You can buy at an airport counter or vending machine on arrival, but crowds and stockouts happen, so ordering online for pickup—or just using an eSIM—is more predictable.",
        },
        image: "/images/travel/connectivity/sim.jpg",
        imageAlt: {
          ja: "日本の携帯会社（ソフトバンク）のUSIMカード",
          en: "A Japanese carrier (SoftBank) USIM card",
        },
        caption: {
          ja: "日本のプリペイド物理SIMの例。差し替えにはSIMピンが要り、抜いた元のSIMは失くさないように。写真: Atpons / Wikimedia Commons（CC BY-SA 3.0）",
          en: "A Japanese physical SIM. Swapping needs a SIM pin—don't lose the one you remove. Photo: Atpons / Wikimedia Commons (CC BY-SA 3.0)",
        },
      },
      {
        heading: { ja: "ポケットWiFi:複数人・複数端末に強い", en: "Pocket Wi-Fi: best for groups and many devices" },
        body: {
          ja: "ポケットWiFi(モバイルルーター)は1台のルーターに複数端末をつなぐ方式。家族やグループ旅行、ノートPCやタブレットも一緒につなぎたい人、SIMを差し替えたくない人に向きます。空港受取・返却か宅配受取が一般的で、大容量・無制限プランが多く、地図と写真をみんなでガンガン使っても割り勘なら割安になりがち。弱点は『荷物と充電がひとつ増える』こと。ルーターの電池が切れると全員のネットが止まるので、モバイルバッテリーは必須。また常に持ち歩く必要があり、グループが別行動すると片方がオフラインになります。返却期限・受取カウンターの営業時間・受渡し場所は予約時に必ず確認を。短期の一人旅ならeSIMの方が身軽ですが、3〜4人以上ならポケットWiFiが総額で有利なことが多いです。",
          en: "A pocket Wi-Fi (mobile router) connects several devices to one router. It suits families and groups, anyone bringing a laptop or tablet, and people who don't want to swap SIMs. You typically pick up and return at the airport or receive it by mail; plans are often high-cap or unlimited, so heavy map and photo use split across a group tends to be cheap per person. The downsides: it's one more thing to carry and charge. If the router dies, everyone's offline, so a power bank is mandatory. Someone must always carry it—if the group splits up, one side goes dark. Confirm the return deadline, counter hours, and pickup point when you book. For a short solo trip an eSIM is lighter, but for 3–4+ people pocket Wi-Fi often wins on total cost.",
        },
        image: "/images/travel/connectivity/pocket-wifi.jpg",
        imageAlt: {
          ja: "手のひらサイズのモバイルWi-Fiルーター（ポケットWiFi）",
          en: "A palm-sized mobile Wi-Fi router (pocket Wi-Fi)",
        },
        caption: {
          ja: "ポケットWiFiは1台で複数端末をつなげる。電池が切れると全員止まるのでモバイルバッテリーは必須。写真: daniel julià lundgren / Wikimedia Commons（CC BY-SA 2.0）",
          en: "One pocket Wi-Fi serves several devices—if it dies, everyone's offline, so carry a power bank. Photo: daniel julià lundgren / Wikimedia Commons (CC BY-SA 2.0)",
        },
      },
      {
        heading: { ja: "無料Wi-Fiだけで乗り切れるか", en: "Can you get by on free Wi-Fi alone?" },
        body: {
          ja: "結論から言うと、旅の主役にはしない方が無難です。日本の無料Wi-Fiは空港・主要駅・コンビニ・カフェ・一部の観光施設やバス・電車で使えますが、面で常時つながっている国ではありません。歩いている最中に地図が更新されない、乗換の最中に途切れる、メール認証のためにログインが要る、といった場面が必ず出ます。訪日者向けの共通Wi-Fiアプリ(登録すると各所のスポットに自動接続するタイプ)を入れておくと補助にはなりますが、これを命綱にすると道に迷ったときに一番困ります。無料Wi-Fiは『宿やカフェで大きなダウンロードをするとき』『データを節約したいとき』の補助と位置づけ、街歩き用は必ず自前の回線(eSIM/SIM/ポケットWiFi)を用意するのが安全です。セキュリティ面でも、公衆Wi-Fiでの決済・ログインは避けるか、信頼できる回線に切り替えてから行いましょう。",
          en: "Bottom line: don't make it the backbone of your trip. Japan's free Wi-Fi covers airports, major stations, convenience stores, cafes, and some attractions, buses, and trains—but it isn't blanket coverage. You'll inevitably hit moments where the map won't refresh mid-walk, the signal drops during a transfer, or a spot demands an email login. A visitor Wi-Fi app (register once, auto-connect at partner hotspots) helps as a backup, but relying on it is exactly what fails you when you're lost. Treat free Wi-Fi as a supplement—for big downloads at your hotel or cafe, or to save data—and always carry your own line (eSIM/SIM/pocket Wi-Fi) for walking around. For security, avoid payments and logins on public Wi-Fi, or switch to a trusted connection first.",
        },
        image: "/images/travel/connectivity/free-wifi.jpg",
        imageAlt: {
          ja: "「KYOTO Wi-Fi」の無料公衆無線LAN案内サイン",
          en: "A 'KYOTO Wi-Fi' free public wireless LAN sign",
        },
        caption: {
          ja: "自治体などの公衆無料Wi-Fi（京都の例）。補助としては便利だが常時接続ではない。写真: Nori Norisa / Wikimedia Commons（CC BY 2.0）",
          en: "Municipal free Wi-Fi (Kyoto). Useful as a supplement, but not always-on. Photo: Nori Norisa / Wikimedia Commons (CC BY 2.0)",
        },
      },
      {
        heading: { ja: "端末・人数別のおすすめ", en: "Recommendations by device and party size" },
        body: {
          ja: "・iPhone(XR以降)の一人旅・短期:eSIMが最短。並ばず、着いた瞬間から使える。地図と検索中心なら1日1GB前後、動画やテザリング多めなら無制限。\n・eSIM対応Androidの一人旅:同じくeSIMでOK。ただし地域版で機能無効の個体があるので、出発前に『設定→eSIM追加』が出るか確認。\n・eSIM非対応の古い端末:物理SIM。出発前にSIMロック解除とSIMピンの準備を忘れずに。\n・家族/グループ(3人以上)、PC・タブレットも:ポケットWiFi。無制限プランを割り勘にすると安く、みんなで地図を使える。モバイルバッテリー必須。\n・別行動が多いグループ:各自eSIMの方が安心(ルーター1台だと片方がオフラインになる)。\n・仕事でオンライン会議や大量アップロードがある:無制限のeSIMかポケットWiFi。安定重視ならルーター。\nいずれの場合も、SMS認証が必要なサービス(銀行アプリ等)を使う予定があるなら、自国のSIM/eSIMを『データオフ・SMS受信のみ』で残すか、番号付きプランを検討してください。",
          en: "・Solo, short trip on iPhone (XR+): eSIM is fastest—no queue, live the moment you land. ~1GB/day for maps and search; unlimited if you stream or tether a lot.\n・Solo on an eSIM-capable Android: eSIM works too, but some regional units disable it—before you fly, confirm Settings offers 'Add eSIM.'\n・Older phone without eSIM: physical SIM. Unlock the SIM lock beforehand and pack a SIM pin.\n・Family/group (3+), plus laptop or tablet: pocket Wi-Fi. An unlimited plan split across people is cheap and everyone shares the map. Bring a power bank.\n・Group that often splits up: individual eSIMs are safer (one router leaves the other side offline).\n・Work calls or big uploads: unlimited eSIM or pocket Wi-Fi; the router if you want steadiest speed.\nIn every case, if you'll use services needing SMS codes (banking apps, etc.), keep your home SIM/eSIM set to 'data off, SMS on,' or consider a plan that includes a number.",
        },
      },
      {
        heading: { ja: "セットアップと当日の注意", en: "Setup and day-of tips" },
        body: {
          ja: "eSIMは『安定したネットがあるうちに』インストールまで済ませ、日本到着後に回線を有効化するのが鉄則です(QRの読み込みには元のネットが要るため、機内や現地でゼロから始めると詰みます)。到着したら『設定』でデータ通信に使う回線を訪日eSIMに切り替え、データローミングをオンに。物理SIMは差し替え後にAPN設定が自動で入らないことがあるので、提供元の案内どおりAPNを手入力できるようにメモしておく。ポケットWiFiは受取時にSSIDとパスワードを控え、まず1台つないで通信確認をしてから移動を。共通の注意として、①自国キャリアの高額な国際ローミングを切る(データローミングを訪日回線側だけオンにする/自国SIMはデータオフ)、②バッテリー消費が増えるのでモバイルバッテリーを持つ、③到着前にオフライン地図をダウンロードしておくと、有効化前や電波の弱い場所でも道に迷わない。返却が要るポケットWiFiは返却期限と方法(空港ポスト投函など)を最終日に慌てないよう前日に確認しておきます。",
          en: "For eSIM, install it while you still have solid internet and only activate the line after you land (scanning the QR needs a working connection, so starting from zero on the plane or on-site can trap you). On arrival, switch your data line to the visitor eSIM in Settings and turn on data roaming. Physical SIMs sometimes don't auto-configure the APN, so note how to enter it manually from the provider's instructions. For pocket Wi-Fi, record the SSID and password at pickup and confirm one device connects before you leave the counter. Universally: (1) kill your home carrier's pricey international roaming (roam only on the visitor line; set the home SIM to data off), (2) carry a power bank since battery drain rises, and (3) download offline maps before arrival so you won't get lost pre-activation or in weak-signal spots. If your pocket Wi-Fi needs returning, check the deadline and method (e.g. drop in an airport post box) the day before so the last day isn't a scramble.",
        },
      },
    ],
    tips: [
      {
        ja: "eSIMは日本到着前にインストールまで、有効化は現地で。QR読込には元のネットが要る。",
        en: "Install the eSIM before you arrive; activate on the ground. Scanning the QR needs existing internet.",
      },
      {
        ja: "自国キャリアの国際ローミングは必ずオフ。訪日回線だけデータローミングをオンにする。",
        en: "Turn off your home carrier's international roaming; enable data roaming only on the visitor line.",
      },
      {
        ja: "地図と検索中心なら1日1GB前後で足りる。動画・テザリング多めなら無制限が安心。",
        en: "~1GB/day covers maps and search; go unlimited if you stream or tether heavily.",
      },
      {
        ja: "3〜4人以上・PCも使うならポケットWiFiが総額で有利。ただしモバイルバッテリー必須。",
        en: "For 3–4+ people or a laptop, pocket Wi-Fi wins on total cost—but pack a power bank.",
      },
      {
        ja: "オフライン地図を事前DL。無料Wi-Fiは主役にせず、街歩きは自前回線を用意する。",
        en: "Pre-download offline maps. Don't lead with free Wi-Fi—carry your own line for walking around.",
      },
    ],
    offers: [
      {
        goId: "travel-tour",
        label: { ja: "eSIM・WiFi・体験を予約", en: "Book eSIM, Wi-Fi & activities" },
      },
      {
        goId: "travel-hotel",
        label: { ja: "日本の宿を探す", en: "Find a hotel in Japan" },
      },
      {
        goId: "travel-book",
        label: { ja: "日本旅行のガイド本（Amazon）", en: "Japan travel guidebook (Amazon)" },
      },
    ],
  },
  {
    slug: "suica-how-to",
    publishedAt: "2026-08-28",
    viatorBanner: true,
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
        goId: "viator",
        label: { ja: "東京のツアー・体験（Viator）", en: "Tokyo tours on Viator" },
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
