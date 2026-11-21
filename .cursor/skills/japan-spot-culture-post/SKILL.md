---
name: japan-spot-culture-post
description: >-
  @tanpukunokami（日本人視点・米国読者向け英語X）で、日本の観光スポット紹介・日本の仕組みへの驚き・食や文化の比較の投稿を、3つの型（保存型・拡散型・リプ型）から選んで書くとき、同じネタを別の型に派生させるとき、ネタを量産するときに使う。重い事件ニュースは対象外。
---

# 日本スポット・カルチャー投稿（3つの型）

このスキルは、Cursor 上の Gemini など、X を閲覧できず、過去の対話も見られないモデルが、このファイルだけを読んで投稿を書けるようにした手順書である。

対象アカウントは @tanpukunokami。日本人の「私」の視点で、主に米国の読者に英語で書く。フォロワーはおよそ 4.18 万（スキル作成時点）。

ここに書く本文の引用と数字は、アカウントの 2026年4月〜8月の投稿 24 本の取得データだけを根拠にする。数字を丸めて「約」と書くときは、その根拠の正確な数も添える。データにない数字・本文は作らない。以前の短い版で「26本」「卵かけご飯 リプ1,116」とあった箇所は、この 24 本では確認できないので採用しない（卵かけご飯の本文はデータに含まれていない。リポスト 1,116 はシェーキーズの投稿の数字であり、別物）。

投稿日時はすべて日本時間（JST）。指標はデータ取得時点の公開メトリクス（いいね・ブックマーク・リプ・リポスト・引用・表示、および画像枚数）である。

ネタは同じでも、型によって伸びる指標が違う。最初に型を1つ決め、その型の作り方で書く。

## 0. 毎回の手順（最初に決めること）

Gemini は、ユーザーの指示が短くても、この手順を飛ばさない。X は見に行かない前提で動く。

### 0.1 ユーザーから受け取るもの

必須:

- ネタ（場所・食べ物・仕組み・習慣）。固有名詞があるとよい。

任意:

- 型（A 保存型 / B 拡散型 / C リプ型）
- 投稿したい時期、または「いつ頃出すか」
- 本人が現地に行ったか、写真があるか
- 使いたい数字、避けたい言い回し、前回の続きかどうか

型も時期もネタの粒度も足りなければ、本文を書き始める前に、足りないものだけ短く聞く。ただしユーザーが「おまかせで書いて」と明示したら、下の早見表で型を決め、選んだ理由を出力の先頭に書いて進む。

聞いてよい質問の例（一度に必要な分だけ）:

- 型は A（保存・行き方案内）、B（仕組みの驚き）、C（賛否・質問）のどれか。指定がなければこう選ぶ、でよいか。
- その場所や店に、本人は行ったことがあるか。行ったことがないなら「I stood there」のような偽の体験は書かない。
- 投稿は何月何日頃か（季節ネタは投稿日の1〜2か月先に合わせるため）。

### 0.2 型の早見表

迷ったらこれで1つに決める。

- 行けば体験できる場所や店 → **A 保存型**（ブックマーク狙い）
- 日本の仕組み・人・数字が「信じられない」もの → **B 拡散型**（いいね・リポスト狙い）
- 賛否が割れる食べ物や習慣、日米の違い → **C リプ型**（リプ狙い）

同じネタを別の型でも書けないか、手順の最後に必ず考える（6章）。

### 0.3 書いて出すまでの手順

1. **ネタと型を固定する。** 11章の既出一覧に、同じ切り口の投稿が無いか確認する。同じ場所でも、型と切り口を変えて、間を数週間あける（6章）。
2. **投稿時期を見る。** 季節のあるネタは、投稿日の1〜2か月先が旬になるものを選ぶ。11月下旬なら、1〜2月の流氷・樹氷・冬の北海道が合う。桜を11月に出さない。9章のネタ帳を、指定が無いときの候補に使う。
3. **事実を裏取る。** 5章の手順で、公式サイトや一次情報に当たる。料金・時間・営業・本数は今シーズンのものを使う。確認できない数字は本文に入れず、出典リストで `[要確認]` と書く。
4. **ドル換算のレートを取る。** 当日（または直近営業日）の USD/JPY を公式または大手の相場で確認し、出典にレートと日付を残す。本文では丸めて `about` を付ける（1.5）。
5. **書き出しを10案出す。** 1.8 の実績のある型を参考にする。本文に使うのは1つだけ。
6. **選んだ型のテンプレートに沿って下書きを1本書く。** 英語、1文1行、段落の間は空行。声と禁止表現は1章を守る。
7. **画像指定を書く。** 景色・スポットは3枚が効く（雲海テラス、野毛）。仕組みや食は1枚でもよい。何を写すかを具体的に。本文にリンクは入れない。
8. **出典リストと、派生ネタ3つを付ける。**
9. **8章の投稿前チェック（型ごと）を自分で通す。** 落ちた項目があれば直してから出す。
10. **7章の形で出力する。** 解説だけで終わらず、投稿できる本文を必ず含める。

## 1. 全型共通のルール

- 英語で書く。1文1行、段落の間は空行。1行は短く（多くは12語以内）。
- 視点は日本人の「私」。"In Japan, we..." "As a Japanese person..." "Here in Japan" を自然に入れる。上から目線や日本自慢で締めない。
- 本文の目安は120〜300語。長文ポスト（280字超）で問題ない。ただし実績では、短い投稿が大きく伸びた例もある（野毛 67語、ファミチキ 65語、アンブロシア 51語）。120語に満たなくても、水増ししない。足りないのは形容詞ではなく、固有名詞と数字である。
- 画像は1枚か3枚。景色やスポットなら3枚が効く（雲海テラス、野毛）。
- 数字を必ず入れる。料金はドル換算を添える（`¥30,000 (about $200)`）。
- 本文にリンクは入れない。
- 事実は投稿前に裏取りする（5章）。

### 1.1 声と視点（詳しく）

- 読者は主に英語圏、とくに米国の読者。日本の固有名詞はローマ字＋短い英語を添える（Unkai Terrace. Sea of Clouds Terrace. / They're called koban.）。
- 「私」は日本人だが、教師や旅行会社の案内口調にはしない。説明は具体で、説教はしない。
- 本人が行っていない体験を、行ったかのように書かない。行っていないスポットは、雲海テラス型の "you" の案内（There is a place... you wake up...）か、"In Japan, we..." で書く。"I stood on the deck this morning" は、ユーザーがそう言ったときだけ。
- 釣り居酒屋の失敗例は、"Apparently" と "it looks like" で距離が開き、保存する情報が無かった。伝聞だけで書くなら、なおさら店名・場所・料金が要る。
- 締めの一文で日本を褒めちぎらない。"Japan is the best"、"This is why Japan is special"、"The world should learn from Japan" は使わない。型Bの TESSEI にある "They invented the dignity of doing small things perfectly." は実績のある終わり方だが、毎回同じ格言調をコピーしない。静かな事実か、行動の一言で終わる。

### 1.2 行の長さと段落

- 原則は1文1行。ピリオドで行を終える。
- 多くは12語以内。例外は、体験を一文で描く書き出し（雲海テラスの第1段落は3行に分けた長いイメージ）や、どうしても切れない固有名詞の列だけ。
- 箇条書きは、TESSEI のように工程を分解するときだけ使う。毎回使わない。
- 短い行を連続させると、型C（アンブロシア、たまごサンドの食感の列）と型Aの数字の列が引き締まる。
- 段落のあいだは空行1つ。空行なしの壁は作らない。逆に、毎行空行にはしない。

### 1.3 使ってはいけない表現

AI が書きがちな英語、旅行パンフレット調、過剰な飾りは禁止する。

本文で使わない語・句の例:

- hidden gem, nestled, breathtaking, stunning, picturesque, iconic, magical, mesmerizing
- delve, tapestry, embark, unlock, realm, vibrant, lush, boasts
- must-visit, bucket list, wanderlust, off the beaten path
- "It's important to note", "In conclusion", "Moreover", "Furthermore", "Additionally" で文を始めない
- "Definitely worth adding to your Japan trip"（釣り居酒屋の締め。パンフレット調で、保存理由にならない）
- ハッシュタグ（実績投稿の本文にも、基本的に付いていない）
- 絵文字の多用。使うなら末尾に1つまで。実績では交番と釣り居酒屋が 🇯🇵、いちごが 🍓。絵文字に頼らない。釣りの失敗は絵文字が原因ではないが、絵文字で印象を補わない

ダッシュの扱い:

- 地の文で em dash（—）や en dash（–）を接続詞代わりに使わない。"The ship — which leaves at 9:30 — is popular" のような AI 調は禁止。ピリオドかカンマ、または行を分ける。
- 例外: 醤油の投稿は、リストのラベル区切りに "—" を使っている（`Shiro — super pale.`）。ラベルと説明を分けるときだけ、同じ使い方は可。地の文では使わない。

その他:

- 本文に URL、@言及、CTA（"Follow for more", "Link in bio"）を入れない。
- "According to my research"、"As an AI"、スキル名や「このアカウントの型A」のようなメタ発言を本文に入れない。
- 感嘆符は稀に1つまで。連続させない。

### 1.4 数字と円からドルへの換算

- 年、件数、所要時間、標高、料金、本数など、検証できる数字を本文に入れる。
- 円建ての料金は、本文でドルを添える。形式は次のいずれか。
  - `¥30,000 (about $200)`（ご祝儀の投稿。正確には当時の概算）
  - `7,000 yen (about $44)`
- レートは投稿を書く日の、直近の USD/JPY を使う（公式レートや大手の相場。休日なら直前の営業日）。出典リストに「1ドル＝約159円（2026-11-21、直近終値は約158.5円）」のように日付と概数を残す。
- 本文のドルは必ず `about` を付け、きりのよい数字に丸める。1ドル＝158.5円なら、7,000円は about $44、3,500円は about $22。細かいセントまで書かない（ファミチキの `$1.60` は本文が最初からドルだけだった例で、円を併記するときの標準形ではない）。
- ご祝儀の投稿は ¥30,000 を about $200 としており、多少大きめに丸めている。大きく外さず、いちばん近いきりのよい数にする。
- 雲海テラスの本文は「Adult gondola ticket: 2,500 yen.」と円だけで、ドルが無かった。ルールとしては、今後はドルも付ける。
- 「世界で〇か国だけ」のような強い主張は、出典を本文に入れる。確認できない数字は使わない（5章）。

### 1.5 本文の終わり方

型によって締めは変える。どれも、自慢やパンフレットで終わらない。

- 型A: 読者が取る行動を一言。"If you're tired of Shinjuku, take the train." / "Set your alarm for 3:30 a.m. / The mountain owes you nothing. / Go anyway."
- 型B: 静かな一言。誇張しない。"Generated by a cat. In a hat." のような短い事実でもよい。
- 型C: 答えやすい問いが基本。"Which one would you try first?" が醤油。アンブロシアは問いではなく "I'm sorry, in what universe." で、リプがいいねを超えた。迷ったら問いで閉じる。

### 1.6 実績のある書き出し（そのまま使える）

括弧内の数字は、この 24 本で確認できたものだけを書く。

- You won't believe this, but...（神社の参道、結婚式のご祝儀、いちご）
- This might be hard to believe, but...（猫の駅長たま、野毛）
- Forget X. Forget Y.（Forget sushi. Forget ramen. → ファミチキ いいね 7,621・表示 2,077,147）
- There is a place in Japan where...（雲海テラス）
- In Tokyo, there's a [人や組織] that does the impossible every [時間].（TESSEI いいね 33,749）
- Japan has [もの] everywhere.（交番 いいね 14,314）
- You probably think X is just... X. Nope.（醤油6種 ブックマーク 1,010）
- A lot of foreigners come to Japan for sushi, ramen, and wagyu. Then somehow they leave talking about...（たまごサンド いいね 9,867）
- There's a [食べ物] that the rest of the world hates.（以前の版で卵かけご飯のフックとして記録されている。この 24 本に本文は無いので、数字は書かない。型Cの書き出し案には使ってよい）


## 2. 型A 保存型（観光スポット紹介）

ねらう数字はブックマーク÷いいね。実績は雲海テラス 53.9%（いいね 2,049 / ブックマーク 1,105）、野毛 61.5%（いいね 2,986 / ブックマーク 1,835）で、この 24 本のうち重い事件ニュースを除いたブックマーク率の中央値（約 12%）のおよそ 4〜5 倍。いいねは 2,000〜3,000 前後に収まりやすい（この2本は 2,049 と 2,986）。型Aの成功は、いいねの大きさより「あとで行くために残す」情報の密度で見る。

### 2.1 構成

1. 一文で体験を描く（There is a place in Japan where you wake up before 4 a.m., ride a gondola into the dark, and watch the clouds turn into an ocean at your feet.）
2. 名前（ローマ字）と英訳（Unkai Terrace. Sea of Clouds Terrace.）
3. 計画にそのまま使える具体情報を3〜6行並べる。
   - 場所と行き方（about 90 minutes by train from New Chitose Airport / 30 minutes from Tokyo）
   - 時間（The gondola opens at 5 a.m.）
   - 規模や比較の数字（Noge has 600 bars. Three times as many.）
   - 料金・季節・ベストな時間帯
4. 有名な場所との対比を入れると強い（ゴールデン街200軒 → 野毛600軒。外国人観光客はほとんど知らない）。
5. 締めは行動を一言（If you're tired of Shinjuku, take the train.）

### 2.2 穴埋めテンプレート（英語）

括弧は書き換え箇所。不要な行は削ってよいが、名前・行き方・時期または時間・（店や有料施設なら）料金は残す。

```
There is a place in Japan where [読者が体験する場面を1〜3行で].

It is called [ローマ字の名前].
[短い英訳、または一言の説明].

It is in [地域], [よく知られた起点] about [所要時間] away.
[電車 / バス / ゴンドラなど、具体的な行き方を1〜2行].

[営業時間・始発・所要].
[季節または見頃、およびその確率や条件があれば].
[料金: yen (about $X)].
[予約の要否、混雑を避けるヒント].

[有名な比較対象] has [よく知られた数字].
[ここ] has [対比になる数字].
[外国人観光客はほとんど知らない、など、保存する理由を1行].

[行けなかった日の代替、服装、注意].

[行動の一言].
```

### 2.3 実例1: 野毛（高い保存率・短い本文）

https://x.com/tanpukunokami/status/2045103080589648183  
2026-04-17 20:32 JST。いいね 2,986、ブックマーク 1,835（61.5%）、リプ 82、リポスト 128、引用 21、表示 290,839。画像 3枚。67語。

本文（一字も変えず）:

```
This might be hard to believe, but

Golden Gai in Shinjuku, Tokyo has about 200 bars.

Everyone knows Golden Gai.

Every tourist queues outside Golden Gai.

Every Instagram photo is from Golden Gai.

30 minutes from Tokyo,
in Yokohama,
there's a place called Noge.

Noge has 600 bars.

Three times as many.

Almost no foreign tourists know it exists.

If you're tired of Shinjuku, take the train.
```

行ごとの効き方:

- 書き出しは実績のある "This might be hard to believe, but"。
- 最初に有名な比較対象（ゴールデン街、約200軒）を出し、読者の地図を先に置く。
- "Everyone / Every tourist / Every Instagram" の反復で「もう飽きた」を作り、野毛へ転じる。
- 「東京から30分、横浜、Noge」が行き方と固有名詞。料金や営業時間は無いが、保存に足るほど具体的。
- 「600軒、3倍、外国人はほとんど知らない」が、わざわざ残す理由。
- 締めは行動だけ。"If you're tired of Shinjuku, take the train."
- 67語で、120語の目安を下回る。短いこと自体は弱点ではない。弱いのは具体情報の欠落である。
- 画像は3枚（街の気配が伝わる写真が保存を助ける）。

### 2.4 実例2: 雲海テラス（型Aの手本）

https://x.com/tanpukunokami/status/2046891768428306698  
2026-04-22 19:00 JST。いいね 2,049、ブックマーク 1,105（53.9%）、リプ 16、リポスト 172、引用 9、表示 97,974。画像 3枚。279語。

本文（一字も変えず）:

```
There is a place in Japan where you wake up before 4 a.m., 
ride a gondola into the dark, 
and watch the clouds turn into an ocean at your feet.

It is called Unkai Terrace.
Sea of Clouds Terrace.

It sits at 1,088 meters on a mountain in Hokkaido, 
part of Hoshino Resorts Tomamu, 
about 90 minutes by train from New Chitose Airport.

The gondola opens at 5 a.m., 
while the sky is still dark.
Thirteen minutes later, you step out onto a three-story wooden deck 
and wait for the sun.

On the right morning, 
the entire valley below fills with cloud. 
The peaks of the Hidaka Mountains rise out of it like islands.
The sunrise turns the whole sea pink, then gold, then white.

It happens about 40 percent of mornings 
between May and October.

The resort forecasts the probability every evening, 
so you know your odds before you set the alarm.

For 2026, the season opens May 13 and runs to October 13.
Adult gondola ticket: 2,500 yen.
Resort guests ride for free.

New this year:
reservations are required for gondola time slots.
The resort added this to reduce crowding,
so early booking matters.

Beyond the main deck,
seven smaller viewing platforms are scattered along the mountain paths.
One is a curved mirror frame with a floating bench.
One is a bar built into the cliff.
The project is called Cloud 9,
from the English expression.

If the clouds do not come that morning,
you still get the Hidaka range at sunrise,
an empty mountain,
and coffee in the cold air at 1,088 meters.

Set your alarm for 3:30 a.m.

The mountain owes you nothing.
Go anyway.
```

行ごとの効き方:

- 書き出しは体験の映像で、固有名詞より先に「何が起きるか」を置く。実績のある "There is a place in Japan where..."。
- すぐ本名と英訳。検索できる形。
- 標高 1,088 m、星野リゾートトマム、新千歳から約90分、ゴンドラ5時、13分、3階のデッキ、5〜10月で約40%、毎晩の予報、2026年の開閉日、大人 2,500円、宿泊客は無料、時間帯予約が必要、デッキがほかに7つ、と、旅程に貼れる数字が続く。
- 「雲が無い朝」の代替まで書いてあり、期待の裏切りを先に処理している。
- 締めはアラームの時刻と、"The mountain owes you nothing. / Go anyway." 誇張しない行動。
- 改善点（今後のルール）: 2,500 yen にドル換算が無い。今後は付ける。
- 画像は3枚。景色の型Aは3枚を基本にする。

### 2.5 失敗例: 釣り居酒屋（何が欠けていたか）

https://x.com/tanpukunokami/status/2091586266609459305  
2026-08-24 03:00 JST。いいね 487、ブックマーク 37（7.6%）、リプ 53、リポスト 43、引用 11、表示 22,988。画像 1枚。96語。

本文（一字も変えず）:

```
Apparently, there’s a restaurant in Tokyo where you can catch your own dinner.

You sit next to a huge fish tank, grab a rod, and try your luck.

If you catch something, the staff takes it straight to the kitchen and prepares it for you. Sashimi, grilled, fried, whatever suits the fish.

Watching someone catch their first fish is half the fun. 

It’s loud, a little chaotic, and kind of ridiculous.

But honestly, it looks like one of the most fun dining experiences you can have in Tokyo.

Definitely worth adding to your Japan trip. 🇯🇵
```

欠けていたもの:

- 店名が無い。場所は "Tokyo" だけ。保存しても検索できない。
- 料金、営業時間、予約、最寄り駅が無い。
- "Apparently" と "it looks like" で、案内する人の足元が定まっていない。
- 締めの "Definitely worth adding to your Japan trip." はパンフレットで、次の行動が無い。
- 体験の楽しさ自体は書けている。型Aで足りないのは形容ではなく、固有名詞と行くための数字である。
- ブックマーク÷いいね 7.6% は、型Aの目安（40%以上）を大きく下回る。いいね 487 も、成功した型Aの 2,000台より小さい。

→ 型Aでは固有名詞と、行くための数字を必ず入れる。

### 2.6 派生ネタの探し方

- 「有名な〇〇の代わりにここ」（浅草の代わり、京都の混雑の代わり）
- 時間限定の景色（雲海、朝霧、紅葉の夜明け、流氷、桜の夜）
- 日本人は知っているが外国人は知らない街（野毛型）
- 地域別のシリーズ（北海道 → 東北 → 九州…）。季節は投稿日の1〜2か月先に合わせる。

候補の具体は9章。

## 3. 型B 拡散型（日本の仕組みへの驚き）

ねらう数字はいいねとリポスト。実績は TESSEI いいね 33,749・リポスト 6,380（リポスト÷いいね 18.9%）、交番 いいね 14,314・リポスト 1,497（10.5%）、新幹線と地震 いいね 6,281・リポスト 1,387（22.1%）、猫の駅長たま いいね 6,002・リポスト 1,080（18.0%）、ランドセル いいね 6,978・リポスト 492（7.1%）。目安はリポスト÷いいね 15%以上、かついいね 5,000以上（8章）。交番はいいねは十分だが、リポスト率は目安をやや下回る。ランドセルはいいねは届き、リポスト率は届いていない。書き方の手本にはなるが、指標は正確に見る。

### 3.1 構成

1. 不可能そうな事実を一文で（does the impossible every 12 minutes）
2. 名前と、何をしているか
3. 数字で分解する（12分のうち2分は降車、3分は乗車、残りは7分。その間に100席を…）
4. なぜ日本ではそうなるのか、人や歴史の話を1〜2段落
5. 静かな一言で締める（誇張しない）

### 3.2 穴埋めテンプレート（英語）

```
[場所 or Japan] has / there's a [人・組織・仕組み] that [信じにくい事実] every [単位].

They're called [名前]. They [一文で仕事の内容].

[全体の時間や規模の数字].

[その内訳を短い行で分解する].

That leaves [核心の数字].

In that time, [誰] must:
- [作業1]
- [作業2]
- [作業3]

[核心の数字を、行を変えて繰り返す].

[第三者の出典があるなら、確認できたときだけ1行].
[現場の人の条件、年齢、給与の仕組みなど、確認できた事実].

[歴史や「なぜそうなったか」を1〜2段落。説教しない].

[静かな一言].
```

箇条書きが不要なら、たま・交番のように地の文の短い行で数字を並べる。

### 3.3 実例1: TESSEI（型Bの手本）

https://x.com/tanpukunokami/status/2045721743281836081  
2026-04-19 13:30 JST。いいね 33,749、ブックマーク 2,245（6.7%）、リプ 678、リポスト 6,380（18.9%）、引用 410、表示 1,187,105。画像 1枚。181語。

本文（一字も変えず）:

```
In Tokyo, there's a cleaning crew that does the impossible every 12 minutes.

They're called TESSEI. They clean the Shinkansen bullet trains at Tokyo Station.

When a train arrives, it stops for 12 minutes before departing again.

Two minutes for passengers to exit.
Three more for the next batch to board.

That leaves seven.

In those seven minutes, one person must:
- Clean 100 seats
- Wipe every tray table
- Vacuum the floor
- Rotate every seat to face the new direction of travel
- Replace all headrest covers
- Check the overhead bins
- Bow to incoming passengers

Seven. Minutes.

They do this hundreds of times a day.

Harvard Business School published a case study about them.
The New York Times called it "the 7-minute miracle."
Tourists now stand on the platform just to watch.

Before they start, they bow to the train.
When they finish, they line up and bow to the passengers.

They're paid by the hour. Many are in their 50s and 60s.

Japan didn't invent cleaning.
They invented the dignity of doing small things perfectly.
```

行ごとの効き方:

- 1行目で場所・主体・「不可能」・12分が揃う。実績のある書き出し。
- すぐに TESSEI と仕事内容。検索できる。
- 12分を 2＋3＋7 に分解し、7分の中身を箇条書きにする。読者がリポストしたくなるのは、この分解である。
- "Seven. Minutes." で数字を一度だけ叩く。同じ技を何回も使わない。
- Harvard と NYT は、確認できた第三者の呼称。似た権威付けを、出典なしで作らない。
- 「時給、50〜60代が多い」は、ヒーロー化せず、人を地面に戻す。
- 締めは静かな一般化。効いているが、型Bのたびに "Japan didn't invent X" を使い回さない。

### 3.4 実例2: 交番

https://x.com/tanpukunokami/status/2053067461231091983  
2026-05-09 20:00 JST。いいね 14,314、ブックマーク 899（6.3%）、リプ 395、リポスト 1,497（10.5%）、引用 137、表示 556,555。画像 1枚。111語。

本文（一字も変えず）:

```
Japan has police boxes everywhere.

They're called koban. Tiny ones on street corners, run by a few officers in shifts. About 14,000 across the country if you count the rural ones too.

You go there for stuff like asking directions, turning in a wallet you found, or reporting something. Honestly, a lot of people just stop by to say hi.

The officers walk around the neighborhood. They know who lives where. Kids wave at them on the way to school.

Singapore copied the whole system in 1983. Their crime rates dropped. Brazil and parts of the US have done the same.

Japan didn't make policing better.

They made it friendlier. 🇯🇵
```

行ごとの効き方:

- "Japan has [もの] everywhere." の型。名前 koban と "About 14,000" がすぐ出る。"About" が、概数の正しい出し方。
- 用事の列が具体（道を聞く、財布を届ける）。"Honestly, a lot of people just stop by to say hi." で、日本人の日常の声になる。
- シンガポール 1983 年は強い数字なので、こういう行を書くなら必ず裏取りする（5章）。
- 締めは短い対比。末尾の旗絵文字は1つだけ。
- いいねは型Bの目安（5,000以上）を超えた。リポスト率 10.5% は 15% の目安をやや下回る。フックと日常の声は手本にしてよい。もっと「分解できる数字」（TESSEI の 12分）があると、リポストはさらに狙える。

補足の実績（全文は長いのでここでは数字と型だけ）:

- たま: https://x.com/tanpukunokami/status/2045230820789498258 ／ いいね 6,002、リポスト 1,080（18.0%）。「野良猫が駅長、初年で旅客 55,000人増、地域経済に 11億円（about $10 million）」と、一人（一匹）が仕組みを変えた話。
- 新幹線と地震: https://x.com/tanpukunokami/status/2047088062493245470 ／ いいね 6,281、リポスト 1,387（22.1%）。2011-03-11 14:46、走行中 33本、死者ゼロ、システム名まで分解。627語と長い。事実の密度で持っている。同じ震災をすぐに繰り返さない。
- ランドセル: https://x.com/tanpukunokami/status/2045365179161170353 ／ いいね 6,978、リポスト 492（7.1%）。平均 $400、組み立て 40時間、200部品、1887年から、6歳から12歳。数字の列は強いが、リポスト率は目安未達。

### 3.5 派生ネタの探し方

- 「〇分で」「〇件」「〇年間変わらない」がある日本の仕組み（清掃、落とし物、時刻表、学校給食、水道）
- 米国読者が日常で知っているもの（電車、警察、コンビニ、学校）の日本版
- 一人の人物や動物が仕組みを変えた話（たま）

候補の具体は9章。

## 4. 型C リプ型（食べ物・文化の比較と質問）

ねらう数字はリプ÷いいね。実績はアンブロシアサラダがリプ 2,816・いいね 2,011（140.0%。リプのほうが多い）、たまごサンドがリプ 444・いいね 9,867（4.5%）。吉野家はリプ 256・いいね 4,443（5.8%）。型Cの目安はリプ÷いいね 20%以上（8章）。アンブロシアだけが、この 24 本でその目安を大きく超えている。たまごサンドと吉野家はいいね（とたまごサンドはリポスト 1,620）が伸びた一方、リプ率は目安未達。リプを最大化するならアンブロシア型（「これは本当？」、短く割る、はっきりした戸惑い）を優先する。

### 4.1 構成

1. 賛否が割れる一文（that the rest of the world hates / Is this real?）
2. 中身を短い行で並べる（Hot rice. / Raw egg. / Soy sauce. / Mix. Eat.）
3. 予想される反応を先に書く（"Raw egg? That's disgusting."）
4. 日本人としての本音か戸惑いを書く（Shut up and try it first. / I'm sorry, in what universe.）
5. 読者が答えやすい問いで締める（Do you eat pizza with your hands or a fork?）

### 4.2 穴埋めテンプレート（英語）

米国側の不思議を見るとき（アンブロシア型）:

```
A follower showed me something called "[名前]" the other day.

…Is this real? Like, an actual thing people eat?

[材料1].
[材料2].
[材料3].
[材料4].

…all of that? In one [器]? [短い戸惑い].

[これは本当に〇〇なのか、という一言].

[日本人としての本音。嘲笑ではなく、本気で分からない].
```

日本の当たり前を見るとき:

```
[賛否が割れる一文].

[中身を短い行で].

[予想される反応を引用符で].

[日本人としての本音。上から諭さない].

[Yes/No か二択で答えられる問い].
```

### 4.3 実例1: アンブロシアサラダ（型Cの手本）

https://x.com/tanpukunokami/status/2049444733081063624  
2026-04-29 20:04 JST。いいね 2,011、ブックマーク 82（4.1%）、リプ 2,816（140.0%）、リポスト 93、引用 146、表示 120,461。画像 1枚。51語。

本文（一字も変えず）:

```
A follower showed me something called "Ambrosia Salad" the other day.

…Is this real? Like, an actual thing people eat?

Marshmallows.
Whipped cream.
Canned fruit.
Coconut.

…all of that? In one bowl? What is even supposed to go in a salad anymore?

This is a salad??

I'm sorry, in what universe.
```

行ごとの効き方:

- きっかけがフォロワーで、会話の続きに見える。読者が自分の地元の食べ物を返したくなる。
- "Is this real?" が、リプを開く問い。
- 材料を1行ずつ置いて、読者が「それ知ってる／知らない」を言えるようにしている。
- 戸惑いは明確だが、侮辱語は使わない。"in what universe" は冗談の距離。
- 締めは問いではなく短い悲鳴。すでに議論が始まっている題材では、これでもリプが来る。新ネタで迷うときは、最後に答えやすい問いを足す。
- 51語。長くしないことが、リプの敷居を下げている。

### 4.4 実例2: たまごサンド（食の比較。いいねは大きいがリプ率は目安未達）

https://x.com/tanpukunokami/status/2055060594743517335  
2026-05-15 08:00 JST。いいね 9,867、ブックマーク 595（6.0%）、リプ 444（4.5%）、リポスト 1,620（16.4%）、引用 182、表示 557,518。画像 1枚。195語。

本文（一字も変えず）:

```
A lot of foreigners come to Japan for sushi, ramen, and wagyu.

Then somehow they leave talking about the convenience store egg sandwich.

I know it sounds stupid.

It’s just bread, egg, and mayo.

But if you’ve had one in Japan, you get it.

The bread is soft.
The egg is creamy.
There’s no crust.
The mayo is mild.
And somehow the whole thing just works.

In many countries, a gas station or convenience store sandwich is something you buy when you have no other choice.

You eat it because you’re hungry, not because you expect it to be good.
But in Japan, people try a cheap egg sandwich from 7-Eleven, Lawson, or FamilyMart and go:
“Wait, why is this so good?”
That’s the funny part.
For Japanese people, it’s not special.

It’s just something you grab before work, at the station, or late at night when you’re too tired to think.

But for visitors, it feels weirdly impressive.

Not because Japan invented the egg sandwich.

It didn’t.

Japan just took a very normal food and made it soft, clean, cheap, and reliable.

And honestly, that might be one of the most Japanese things ever.
```

行ごとの効き方:

- 実績のある書き出し（寿司・ラーメン・和牛のあとで、意外なもの）。
- "I know it sounds stupid." で自慢を先に折っている。
- 食感を短い行で並べる型は、型Cの「中身の列」と同じ。
- 「日本人には特別ではない」が、上から目線を防ぐ。
- 店名（7-Eleven, Lawson, FamilyMart）があり、読者が日本で試せる。
- 締めは観察で、問いが無い。ここが、アンブロシアとの違い。いいねとリポストは伸び、リプ率は 4.5% に留まった。同じ題材を型Cとして再掲するなら、末尾を "What's the most disappointing convenience-store food in your country?" のような二択・実名の問いに変える。

補足: 吉野家 https://x.com/tanpukunokami/status/2054271724720681089 ／ いいね 4,443、リプ 256（5.8%）。"gyudon nami"、Thirty seconds、Three bucks、1899年創業、127年、うまい安い早い。個人の回想（18歳で東京、給料日前）が温度を作る。これも問い無し。低価格チェーンの思い出は派生の型として使えるが、リプ率の手本はアンブロシア。

醤油6種（https://x.com/tanpukunokami/status/2051263068701647297 、いいね 2,846、ブックマーク 1,010＝35.5%、リプ 105）は、リストが保存され、末尾が "Which one would you try first?"。型Aと型Cのあいだ。一覧で残る知識には、問いを付けると両方を狙える。

### 4.5 派生ネタの探し方

- 米国の不思議な食べ物を日本人として見る（アンブロシアサラダ型）
- 日本の当たり前で海外が驚くもの（生卵、コンビニ飯、お通し）
- 量・値段・サイズの日米比較（牛乳パック、ピザの食べ方）
- 低価格チェーンの思い出（吉野家 いいね 4,443）

候補の具体は9章。


## 5. 事実確認（Gemini が実際にできる手順）

X は見に行けない前提で、ウェブ検索と公式ページの閲覧で裏取る。記憶や訓練データだけで料金・時間・本数を書かない。季節営業や料金は今年度（今シーズン）のものを使う。

### 5.1 手順

1. 公式サイトを探す。施設名・会社名・「公式」で検索し、公式ドメインを開く。観光協会、自治体、JR、バス会社、省庁も一次情報になりうる。まとめサイトやブログだけに頼らない。
2. 今シーズンのページか確認する。日付、年度、注意書きを見る。去年の料金を今年の本文に使わない。
3. 本文に入れる数字ごとに出典を控える。年、件数、料金、所要時間、標高、開業年、本数、確率。
4. 店や施設がいまも営業しているか、運休・改装・予約変更が無いか確認する。
5. 「世界で〇か国だけ」「犯罪率が下がった」のような強い主張は、本文に出典を入れるか、主張自体を落とす。水道水の投稿は、以前の版で国土交通省を本文に明記したと記録されている（その本文はこの 24 本に無い）。ルールだけ守る。
6. ドル換算用のレートを、書く日の直近値で取る（1.4）。
7. 出力の出典リストに、事実・数値・URL・確認日（日本時間の日付）を並べる。

公式に当たりやすいものの例:

- 施設・船・ゴンドラ: 運営会社の料金・時刻・アクセスページ、よくある質問
- 鉄道・バス: 公式の所要時間と運賃。乗換案内アプリの概数を使うなら「about」を付け、出典に明記する
- 制度・件数: 省庁、警察、鉄道会社、自治体の統計や発表
- 歴史の年: 公的な沿革、博物館、会社の公式沿革。ウィキペディアだけに依存しない

### 5.2 確認できないときの扱い

- 確認できない数字は使わない。推測で埋めない。
- 本文に残したいが公式で取れないことは、本文から外し、出典リストに `[要確認]` と理由を書く。ユーザーが知っているなら、そこで補ってもらう。
- 公式ページに年が書いていないが、日付と文脈から今シーズンと読める場合は、本文で使ってよい。出典に「公式は日付のみ。年は〇の記載／今シーズンと判断した理由」を残す。確信が持てない年は `[要確認]`。
- 英語公式と日本語公式が食い違うとき（所要時間の分数、支払い方法など）は、日本語公式を優先し、古い英語 FAQ をそのまま信じない。例: 網走の砕氷船は、日本語 FAQ では一部クレジットカードとコード決済可。古い英語案内の "cash only" は使わない。
- 営業時間・料金・予約規則は、少しでも古いか矛盾したら本文に書かず `[要確認]`。
- 「必ず見られる」「世界一」「唯一」は、公式がそう書いていて出典を示せるとき以外、使わない。雲海は "about 40 percent of mornings"、流氷は「保証されない」と公式が言う。不確実性は、型Aではむしろ保存される情報になる。

### 5.3 やってはいけないこと

- 存在しない営業時間、料金、本数、引用を作る。
- 確認していない Harvard / NYT / Guinness / 省庁を、TESSEI の行の真似で足す。
- ユーザーが行っていない体験を、行った体で書く。
- 対象外の事件・虐待ニュースを、数字が伸びそうだから書く。

## 6. 1つのネタを3つの型に派生させる

例として雲海テラスの場合。

- A 保存型：起きる時間、ゴンドラ、新千歳からの行き方、季節（既出。すぐには繰り返さない）
- B 拡散型：「雲海が出るかを毎朝予報するスタッフがいる」のような運営の仕組み（裏取りできた場合だけ）
- C リプ型：「朝4時に起きて雲を見に行くのはアリ？ あなたなら行く？」

同じネタは型を変えて、間を数週間あけて出す。切り口が同じなら、場所を変える（雲海なら阿蘇、竹田城跡など。流氷なら網走の次は紋別や知床）。

派生を考えるときの質問:

- この体験を「行く人のためのメモ」にすると A。
- 「なぜ毎日それが成立するか」の数字にすると B。
- 「自分ならやるか／これは食べ物か」の賛否にすると C。

## 7. 出力の形

毎回、この6つをこの順で出す。本文の下書き以外で終わらせない。

1. 型の名前と、ねらう数字
2. 書き出し10案（1.8 の実績のある書き出しを参考に）
3. 本文の下書き1本（1文1行、空行で区切る）
4. 推奨画像（1枚か3枚、何を写すか）
5. 裏取りした事実と出典のリスト（確認日、レート、`[要確認]` があれば明示）
6. 派生ネタ3つ（別の型や、同じ型の別の場所）

書き出し10案は、本文で使わなかったものも残す。ユーザーが差し替えられるようにする。

## 8. 投稿前のセルフチェックと、投稿後の数字の返し方

### 8.1 全型共通のチェック（出す前に通す）

- 英語、1文1行、段落のあいだは空行。多くは12語以内。
- 日本人の視点。日本自慢の締めになっていない。
- 偽の体験談が無い。
- 禁止語（hidden gem, nestled, breathtaking, delve など）、地の文の em dash、ハッシュタグ、絵文字の多用が無い。
- 本文にリンクが無い。
- 数字がある。円には `about $` がある。レートと日付を出典に書いた。
- 料金・時間・本数を発明していない。弱い数字は本文から外し `[要確認]` にした。
- 7章の6項目が揃っている。
- 11章の既出と、同じ切り口の重複が無い。

### 8.2 型Aの追加チェック

- 固有名詞（ローマ字名＋短い英語）がある。
- 行き方（よく知られた起点からの所要）がある。
- 時期または時間、有料なら料金がある。
- 保存する理由（対比の数字、予約の要否、見られない日の話）がある。
- 締めが行動の一言で、パンフレット（"Definitely worth adding..."）でない。
- 景色・スポットなら画像は3枚の指定がある。
- 釣り居酒屋テスト: 店名・場所・料金のどれかが欠けていたら出し直す。

### 8.3 型Bの追加チェック

- 1行目に、信じにくい事実と数字がある。
- 名前と、何をしているかがすぐ分かる。
- 数字が分解されている（内訳、前後の比較、一人あたり）。
- 強い主張に出典がある。
- 締めが静かで、誇張していない。"Japan invented..." を毎回使っていない。
- ねらい（いいね 5,000、リポスト率 15%）を、出力の1行目に書いた。

### 8.4 型Cの追加チェック

- 賛否が割れる題材か、日米のズレがある。
- 中身が短い行に分解されている。
- 日本人の本音がある。嘲笑やヘイトになっていない。
- 答えやすい問い、またはアンブロシア型の短い戸惑いで閉じている。
- リプ率を狙うなら、たまごサンド型の長い観察だけで終わっていない。

### 8.5 投稿から24〜48時間後に、ユーザーが返してほしい数字

Gemini は投稿後の X の数字を自分で取れない。ユーザーが次を貼ると、型の目安と比べて、書き出しと具体情報を見直せる。

返してほしい項目（コピーして使える形）:

```
投稿URL:
型（A/B/C）:
投稿日時（JST）:
使った書き出し（1行目）:
いいね:
ブックマーク:
リプ:
リポスト:
引用:
表示:
画像枚数（1 or 3）:
所感（任意）:
```

型ごとの目安:

- A：ブックマーク÷いいね 40%以上
- B：リポスト÷いいね 15%以上、いいね 5,000以上
- C：リプ÷いいね 20%以上

外れた投稿は、書き出しと具体情報を見直し、11章の表と 1.8 の書き出しリストを更新する。更新はユーザー（またはこのスキルを保守する側）が行う。Gemini は、返ってきた数字を見て「何が足りなかったか」を短く分析し、次の下書きに反映する。数字が無いのに成功・失敗を断定しない。

## 9. ネタ帳

指定が無いとき、または量産するときの候補。すでに書いた切り口（11章）は、間をあけて型を変えるか、場所を変える。事実の数字はここに書かない。採用したら5章で裏取る。

季節の原則: 投稿日の1〜2か月先が旬のものを選ぶ。11月下旬〜12月なら、1〜2月の流氷・樹氷・冬の北海道。1月なら3〜4月の桜の夜や春の北陸。8月なら10月の紅葉の夜明け。通年の仕組み・食はいつでもよいが、年末年始・卒業・入学・お盆など、読者の生活カレンダーに重なると強い。

### 10.1 型A（保存型）候補

時間限定の景色:

1. 網走の流氷砕氷船（1〜3月。10章の完成例）
2. 紋別の砕氷船（網走の代わり、同じ季節）
3. 知床の流氷ウォーク（要確認の上、装備と案内の数字）
4. 蔵王の樹氷（1〜3月）
5. 層雲峡の氷瀑（冬）
6. 白金青池の冬（雪と青い池。混雑と代替の時間帯を書く）
7. 別の雲海（阿蘇、竹田城跡、吉野など。トマム既出なので切り口を変える）
8. 朝霧の橋や湖（東北・九州の、外国人に薄い場所）
9. 紅葉の夜明け（十和田・奥入瀬、香嵐渓の開場前、高野山。8〜9月に投稿）
10. 桜の夜（夜桜のライトアップ。場所は有名地の代わりを優先。1〜2月に投稿）
11. 灘の吊り橋や渓谷の朝（四国など、東京起点の所要を必ず書く）

有名な場所の代わり、外国人に薄い街:

12. 浅草の代わり（谷中、柴又、川越の朝、佐原）
13. 京都の混雑の代わり（鞍馬・貴船、大原、朝早い伏見、金沢の朝）
14. 新宿ゴールデン街の代わりの飲み街（野毛は既出。大阪のテンマ、福岡の屋台は「今も何軒か」を公式・現地情報で確認してから）
15. 高山の代わりの中山道（妻籠・馬籠）
16. 尾道・瀬戸内の港町（日帰り可否と船の時間）
17. 飛騨や角館など、朝の町並み（開く時間と交通）

地域シリーズ（北海道の次）:

18. 東北の温泉街の朝（銀山、乳頭。アクセスと冬の運行）
19. 九州の峡谷やカルデラ（高千穂、阿蘇。雲海と重ねてもよい）
20. 山陰の砂丘や海岸の朝（鳥取。東京からの行き方）
21. 北陸の雪の温泉と朝市（冬、金沢以外の小さな港）
22. 沖縄の、真夏を外した海と集落（時期を投稿日の1〜2か月先に）

体験そのものが案内になる場所:

23. 地獄谷の猿（冬。予約・観察ルール・行き方。有名なので「代わりの時間帯」を書く）
24. 出羽三山の時期と装備（巡礼の季節）
25. 奥日光・湯元の冬または紅葉
26. 夜の工場夜景や漁港の競り（一般見学の可否を確認してから。時間と入場条件）

### 10.2 型B（拡散型）候補

「〇分で」「〇件」「〇年」がある仕組み:

1. 鉄道の落とし物の返還率、交番に届く財布
2. 列車の定時率、遅延の定義、復旧の速さ（新幹線の震災話は既出。別の路線や別の数字で）
3. 学校給食（同じ献立、全員が食べる、費目の数字）
4. 水道水が飲める範囲と基準（本文に公式出典）
5. コンビニの密度、24時間、公共料金の支払い
6. 宅急便の時間指定と再配達
7. 学生が教室を掃除するという、何十年も変わらない習慣
8. 夜間の道路工事が朝に終わる手順
9. 自動販売機の台数や、暖かい缶コーヒーという当たり前
10. 地震速報が携帯電話に届くまでの秒数（3.11 の再掲にしない。日常の仕組みに寄せる）
11. 駅の時計と、秒単位のダイヤ
12. ゴミの分別と、路上のゴミ箱が少ないのに街がきれい、という数字が取れる範囲だけ

米国読者が知っているものの日本版:

13. 警察（交番は既出。パトロールや遺失物の数字の別切り口）
14. タクシー（ドア、手袋、初乗り。確認できた数字だけ）
15. 学校の制服と、持ち物の標準化（ランドセルは既出。別の六年単位の習慣）
16. 病院の受診や救急車の自己負担（制度は慎重に。公式の数字と条件）
17. ICカード（Suica など）が電車以外でどこまで使えるか
18. キヨスクや駅弁が、短い停車で回る現場

人と動物が仕組みを変えた話:

19. たま以外の駅の猫や、地域を動かした一人の係員（先に一次情報）
20. 小さな路線を残すために始まった観光列車や、地元の切符の仕組み

### 10.3 型C（リプ型）候補

米国側の不思議を、日本人として見る:

1. アンブロシア以外の「サラダ」やキャセロール（名前を1つに絞る）
2. ランチに何でもかける習慣
3. ピーナッツバターとジャム、ルートビア、甘いコーンブレッド
4. 大きなアイス、巨大なドリンクサイズ
5. チップの計算（日本とのズレを、罵らず質問で）

日本の当たり前で海外が驚くもの:

6. 卵かけご飯（本文の既出は無し。生卵の安全の話は公式の範囲だけ。問いを付ける）
7. 納豆
8. お通し（座っただけで出る、料金がある）
9. コンビニの弁当、温め、揚げ物（ファミチキ・たまごサンドは既出。別の一品）
10. 電車の中で食べるか、電話するか
11. 家で靴を脱ぐ、トイレのスリッパ
12. マスクを、病気のときにする理由
13. 暖かい缶コーヒー、自動販売機の熱い缶
14. 年末の唐揚げ、義理チョコ、クリスマスケーキのいちご（いちごの歴史投稿は既出。習慣の比較に寄せる）

量・値段・サイズの日米比較:

15. 牛乳パックのサイズ
16. ピザを手で食べるか、フォークか
17. レストランの一人前の量
18. 卵の冷蔵、氷を大量に入れる飲み物
19. 100円ショップの「100円」が、今もそうか（価格は必ず今の公式）

低価格チェーンと日常の食:

20. 吉野家以外の、給料日前の店（すき家、松屋、日高屋など。個人の記憶はユーザーが語ったときだけ）
21. 学食、給食の味の思い出（数字より問い）
22. 回転寿司の価格帯（今の価格を確認）
23. カップ麺を家でどう食べるか

答えやすい問いになる習慣:

24. こたつで寝るのはありか
25. 電車で寝て、降りる駅で起きられるか
26. 結婚式のご祝儀（既出。金額の比較や、米国のギフト登録との違いを問いにするなら間をあける）

## 10. 出力例（7章の形の完成見本）

以下は、新しいネタ（北海道・網走の流氷、型A）を、7章どおりに出した見本である。本文は見本であり、投稿前に公式を再確認する。確認日は 2026-11-21（JST）。レートは直近営業日（2026-11-20）の USD/JPY 終値およそ 158.5円。7,000円は about $44、3,500円は about $22。

### 1. 型の名前と、ねらう数字

型A 保存型。ねらう数字はブックマーク÷いいね 40%以上。いいねの大きさより、行き方案内として残されることを優先する。投稿時期の目安は、見頃の1〜2か月前（11月下旬〜1月）。

### 2. 書き出し10案

1. There is a place in Japan where the sea turns solid, and you ride a ship that breaks the ice to go forward.
2. You won't believe this, but in eastern Hokkaido, a sightseeing ship has to crush the ocean to move.
3. This might be hard to believe, but the Sea of Okhotsk freezes, and you can sail into it.
4. Forget Sapporo for a weekend. Forget the ski slopes.
5. In Abashiri, Hokkaido, there's a ship that breaks the winter sea.
6. Japan has a season when the sea itself turns into a white field.
7. You probably think icebreakers are only for cargo and research ships. Nope.
8. A lot of foreigners come to Hokkaido for Sapporo and powder snow. Then somehow they leave talking about a boat that breaks the ice.
9. There is a morning on the Okhotsk coast when the ocean looks like a field of white.
10. If you're tired of Tokyo in winter, take the plane north.

本文では1を使う。

### 3. 本文の下書き1本

```
There is a place in Japan where the sea turns solid,
and you ride a ship that breaks the ice to go forward.

It is called Aurora.
A drift ice sightseeing icebreaker.
In Abashiri, on Hokkaido's Okhotsk coast.

The nearest airport is Memanbetsu.
A bus runs from the airport to the ship in about 40 minutes,
but only during the icebreaker season.

From Sapporo, the train takes about five and a half hours.
This is not a day trip.
Stay a night in Abashiri.

The large ship Aurora runs about one hour.
Adult ticket: 7,000 yen (about $44).
Elementary school children: 3,500 yen (about $22).

For 2027, the season runs January 20 to March 31.
The best odds are usually mid-February to early March.

In February, the first regular boat leaves at 9:30 a.m.
Be at the dock 20 minutes early.
The gate closes 5 minutes before departure.

Reservations are recommended.
If the boat is full, they will turn you away.

The ice is not guaranteed.
It moves with the wind and the tide.
The ship has about one hour,
and can go only 10 kilometers one way.
If the ice is out of range that morning,
the large ship still sails toward Cape Notoro.

On the open deck, it is about -10 to 0°C.
Colder over the water.
Dress for that.

The sea owes you nothing.
Go anyway.
```

### 4. 推奨画像

3枚。

1. 砕氷船オーロラの船首が、白い流氷を割って進むところ。
2. 地平線まで続く流氷の海（雲海テラスの「足元の海」に相当する画）。
3. 甲板から見る人の気配、または道の駅「流氷街道網走」の船着き場と冬の港。

顔がはっきり分かる乗客の無断掲載は避ける。公式やフリー写真を使う場合は、権利とクレジットを投稿前に確認する。

### 5. 裏取りした事実と出典のリスト

確認日: 2026-11-21（JST）。

- 船名は網走流氷観光砕氷船「おーろら」（英語 Aurora）。運航は道東観光開発株式会社。発着は北海道網走市、道の駅「流氷街道網走」。公式: https://www.ms-aurora.com/abashiri/
- 運航期間: 1月20日〜3月31日。公式料金ページは年を本文に書いていない。じゃらん、ぐうたび北海道（2026-10-02 更新）は 2027年1月20日〜3月31日と明記。今シーズンは2027年と判断した。https://www.ms-aurora.com/abashiri/prices/ ／ https://www.jalan.net/event/evt_364185/ ／ https://www.gutabi.jp/spot/detail/1471
- 大型船おーろら、おとな（中学生以上）7,000円、小学生 3,500円（税込）。所要は約1時間（流氷の状況で前後）。https://www.ms-aurora.com/abashiri/prices/
- 2月の定期便の1便は 9:30。公式時刻表。
- 出航の20分前までに乗船手続き。出航5分前に受付締め切り。公式 FAQ。https://www.ms-aurora.com/abashiri/faq/
- 完全予約制ではないが、満員なら断ることがあるので予約した方がよい。同 FAQ。
- 流氷の見頃は例年2月中旬〜3月上旬。ただし接岸の遅れや面積の減少がある、と公式。流氷は風と潮で動き、毎日見られるとは限らない。所要1時間、片道 10 km まで。届かなければ流氷帯に行けないこともある。流氷が無いとき、大型船は能取岬までの海上遊覧、小型船おーろら3は運休。同公式料金ページと FAQ。
- 屋外デッキはおよそ -10〜0°C、海上はさらに寒い。公式 FAQ（服装）。
- 最寄り空港は女満別。砕氷船おーろら運航中のみ、空港からおーろらターミナルまでバスで約40分。網走バス公式: https://www.abashiribus.com/memanbetsu/ （英語案内 https://www.abashiribus.com/en/memanbetsu/ にも約40分、運賃 1,150円の記載がある。運賃は本文に入れず、シーズン中の運賃改定の可能性を見た）。
- 札幌駅から網走駅まで特急で約5時間30分。網走市公式観光: https://visit-abashiri.jp/en/access/
- USD/JPY: 2026-11-20 終値およそ 158.5円（Yahoo!ファイナンス等の直近終値。休日のため翌21日は市場休場）。7,000÷158.5 ≒ 44.16 → about $44。

本文に入れなかった／入れない判断:

- 小型船おーろら3（約2時間、おとな 9,800円）は、本筋を単純にするため見本では省略。書くなら公式の「3月予定」を再確認する。
- バス運賃 1,150円は、2027年シーズンの公示を見てから。いまは `[要確認]`。
- 古い英語案内の「現金のみ」は、日本語公式 FAQ（一部カード・コード決済可）と矛盾するため使わない。
- 流氷の起源（アムール川から流れる、等）は型B向き。型Aの行程には必須でないので本文に入れていない。

### 6. 派生ネタ3つ

- 型B: 流氷は毎朝保証されない。1時間・片道 10 km の制約、欠航は出航約1時間前に判断、予約者へ個別連絡は無い、という運航の仕組み（すべて公式 FAQ。数字を分解する）。
- 型C: 「札幌から特急で約5時間半。着いても氷が無いことがある。あなたは行く？」答えやすい可否の問い。
- 型Aの別場所: 紋別の砕氷船、または知床側の流氷ウォーク。網走と切り口が重ならないよう、アクセスと装備の数字を公式で取り直す。同じ週に出さない。

## 11. 参考: この24本の実績一覧

Gemini は X を見られないので、既出の切り口と正確な数字は、この表だけを信じる。本文の引用は、上の実例に書いたもの以外は想像で補わない。指標はデータ取得時点。日時は JST。

| 投稿（JST） | 題材 | 型の目安 | いいね | BM | BM% | リプ | リプ% | RP | RP% | 表示 | 画像 | URL |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 2026-04-17 20:32 | 野毛 | A | 2986 | 1835 | 61.5 | 82 | 2.7 | 128 | 4.3 | 290839 | 3 | https://x.com/tanpukunokami/status/2045103080589648183 |
| 2026-04-18 05:00 | 駅長たま | B | 6002 | 279 | 4.6 | 111 | 1.8 | 1080 | 18.0 | 97406 | 1 | https://x.com/tanpukunokami/status/2045230820789498258 |
| 2026-04-18 10:17 | 事件ニュース | 対象外 | 29935 | 2866 | 9.6 | 306 | 1.0 | 3692 | 12.3 | 2254749 | 1 | （本文は使わない） |
| 2026-04-18 13:53 | ランドセル | B | 6978 | 855 | 12.3 | 224 | 3.2 | 492 | 7.1 | 492267 | 1 | https://x.com/tanpukunokami/status/2045365179161170353 |
| 2026-04-19 13:30 | TESSEI | B | 33749 | 2245 | 6.7 | 678 | 2.0 | 6380 | 18.9 | 1187105 | 1 | https://x.com/tanpukunokami/status/2045721743281836081 |
| 2026-04-19 15:50 | 事件ニュース | 対象外 | 7164 | 1100 | 15.4 | 141 | 2.0 | 2380 | 33.2 | 651335 | 3 | （本文は使わない） |
| 2026-04-20 23:01 | Hello Kitty とスヌーピー | B寄り | 5046 | 516 | 10.2 | 257 | 5.1 | 594 | 11.8 | 147984 | 1 | https://x.com/tanpukunokami/status/2046227880829665664 |
| 2026-04-21 10:30 | 事件ニュース | 対象外 | 7030 | 617 | 8.8 | 125 | 1.8 | 2971 | 42.3 | 218638 | 1 | （本文は使わない） |
| 2026-04-21 18:51 | 事件ニュース | 対象外 | 31722 | 1415 | 4.5 | 165 | 0.5 | 4020 | 12.7 | 689460 | 1 | （本文は使わない） |
| 2026-04-21 20:00 | 結婚式のご祝儀 | B/C | 2171 | 395 | 18.2 | 267 | 12.3 | 147 | 6.8 | 241865 | 1 | https://x.com/tanpukunokami/status/2046544482078708028 |
| 2026-04-22 15:37 | 事件ニュース | 対象外 | 12698 | 2333 | 18.4 | 86 | 0.7 | 1769 | 13.9 | 2351698 | 3 | （本文は使わない） |
| 2026-04-22 19:00 | 雲海テラス | A | 2049 | 1105 | 53.9 | 16 | 0.8 | 172 | 8.4 | 97974 | 3 | https://x.com/tanpukunokami/status/2046891768428306698 |
| 2026-04-23 08:00 | 新幹線と地震 | B | 6281 | 739 | 11.8 | 99 | 1.6 | 1387 | 22.1 | 271867 | 1 | https://x.com/tanpukunokami/status/2047088062493245470 |
| 2026-04-23 12:00 | ファミチキ | B/C | 7621 | 773 | 10.1 | 374 | 4.9 | 926 | 12.2 | 2077147 | 1 | https://x.com/tanpukunokami/status/2047148458134339925 |
| 2026-04-29 20:04 | アンブロシアサラダ | C | 2011 | 82 | 4.1 | 2816 | 140.0 | 93 | 4.6 | 120461 | 1 | https://x.com/tanpukunokami/status/2049444733081063624 |
| 2026-04-30 11:21 | シェーキーズ | B寄り | 5050 | 726 | 14.4 | 330 | 6.5 | 1116 | 22.1 | 391418 | 4 | https://x.com/tanpukunokami/status/2049675537061396971 |
| 2026-04-30 20:37 | 出生率と親の投稿 | （このスキルの中心ではない） | 5690 | 790 | 13.9 | 473 | 8.3 | 650 | 11.4 | 249973 | 1 | https://x.com/tanpukunokami/status/2049815518186754409 |
| 2026-05-04 20:30 | 醤油6種 | A/C | 2846 | 1010 | 35.5 | 105 | 3.7 | 425 | 14.9 | 107185 | 1 | https://x.com/tanpukunokami/status/2051263068701647297 |
| 2026-05-06 07:30 | 神社の参道 | B | 3073 | 365 | 11.9 | 219 | 7.1 | 425 | 13.8 | 82366 | 1 | https://x.com/tanpukunokami/status/2051791548975632491 |
| 2026-05-06 21:52 | いちごの歴史 | B | 2320 | 434 | 18.7 | 78 | 3.4 | 386 | 16.6 | 81213 | 1 | https://x.com/tanpukunokami/status/2052008610717397133 |
| 2026-05-09 20:00 | 交番 | B | 14314 | 899 | 6.3 | 395 | 2.8 | 1497 | 10.5 | 556555 | 1 | https://x.com/tanpukunokami/status/2053067461231091983 |
| 2026-05-13 03:45 | 吉野家 | C寄り | 4443 | 447 | 10.1 | 256 | 5.8 | 523 | 11.8 | 123311 | 3 | https://x.com/tanpukunokami/status/2054271724720681089 |
| 2026-05-15 08:00 | たまごサンド | C寄り | 9867 | 595 | 6.0 | 444 | 4.5 | 1620 | 16.4 | 557518 | 1 | https://x.com/tanpukunokami/status/2055060594743517335 |
| 2026-08-24 03:00 | 釣り居酒屋 | A（失敗例） | 487 | 37 | 7.6 | 53 | 10.9 | 43 | 8.8 | 22988 | 1 | https://x.com/tanpukunokami/status/2091586266609459305 |

BM% はブックマーク÷いいね、リプ% はリプ÷いいね、RP% はリポスト÷いいね。パーセントは小数第1位。シェーキーズの画像はデータ上 4枚（このスキルの「1枚か3枚」から外れている。新規では1か3にする）。

対象外の5本は、いいねが3万前後になることもあるが、事実確認と炎上リスクの扱いが別物なので、このスキルでは書かない。出生率の投稿も、スポット・仕組み・食文化の3型からは外して扱う。

## 対象外

虐待・殺人・事件などの重いニュースは、いいねは大きい（この 24 本でも 29,935 や 31,722 の例がある）が、事実確認と炎上リスクの扱いが別物なので、このスキルでは書かない。それらの本文を、書き出しの手本にも使わない。
