# NyanChu

ニュースが主で、旅ガイドとKindle本のページが脇にあるホームページです。見出しは日付カードに溜まり、クリックするとその日のフィードが開きます。

## 動かし方

```bash
npm run dev
```

http://localhost:3000

Vercel 本番（https://kasawa-news.vercel.app）が `402 DEPLOYMENT_DISABLED` のときは、GitHub Pages が代替公開先です: https://ghantarou-gif.github.io/kasawa-news/ja/

## 直す場所

- 旅ガイド記事: `src/lib/travel.ts`（配列の先頭に追加）
- 本の書名・紹介・Kindle URL: `src/lib/book.ts`
- アフィリエイト先: `src/lib/affiliate.ts`（`travel-hotel` / `travel-tour` / `travel-book`）
- Google AdSense: `.env` の `NEXT_PUBLIC_ADSENSE_*`（下記）
- X用コメント（記事IDキー）: `data/takes.json`
- 本番URL（OGP用）: `.env` の `NEXT_PUBLIC_SITE_URL`
- X検索ツール連動: `.env` の `NEXT_PUBLIC_NYANCHU_URL` / `integrations/README.md`
- RSSの配信元: `src/lib/feeds.ts`
- 画面の文言: `src/lib/i18n.ts`
- 会員限定ページ（`/ja/members/x`）: `.env` の `MEMBER_ACCESS_CODES`（カンマ区切り）と、任意で `MEMBER_SECRET`

## 会員限定（編集者思考）

`/ja/members/x` と `/en/members/x` は、会員コードを入れたブラウザだけ本文を出します。`kasawa.news` は名前が引けないので使いません。

いま開ける公開ページは https://ghantarou-gif.github.io/kasawa-news/ja/members/x/ です。ここはブラウザでコードを照合します。照合用のSHA-256は GitHub Actions の `NEXT_PUBLIC_MEMBER_CODE_SHA256` です。

Vercel（https://kasawa-news.vercel.app/ja/members/x）はサーバーで照合します。環境変数 `MEMBER_ACCESS_CODES` が無いと項目は出ません。

```bash
MEMBER_ACCESS_CODES="会員に配るコード"
MEMBER_SECRET="クッキー署名用の長いランダム文字列"
```

Vercel の環境変数に入れて再デプロイします。`MEMBER_SECRET` を変えると、入っている人は一度外れます。

## 旅ガイド（X → サイト → 旅行アフィリ）

1. `src/lib/travel.ts` に観光地の記事を追加
2. アフィリURLを設定（下記「アフィリエイトリンク」）
3. Xに `xHook` の文＋URL `/ja/travel/スラッグ` を投稿
4. 読者が詳細を読み、宿・ツアー枠から遷移

例: `/ja/travel/kyoto-arashiyama`

## アフィリエイトリンク

`/go/<id>` が各アフィリ先へ302リダイレクトします（`utm_source/medium/campaign` を引き継ぐ）。リンク先URLはアカウント固有なので **`.env` に貼るだけ** で有効化できます（コード変更不要・URLはコミットされません）。各ASP（楽天／A8.net／もしもアフィリエイト／Booking.com／Amazonアソシエイト／Klook／KKday 等）で生成したURLをそのまま入れてください。

```bash
# 旅ガイド（記事下の宿・ツアー・本の枠）
AFF_TRAVEL_HOTEL_URL="https://..."   # 宿（楽天トラベル / Booking / じゃらん 等）
AFF_TRAVEL_TOUR_URL="https://..."    # ツアー・体験（未設定ならViatorパートナーリンクが既定で有効）
AFF_TRAVEL_BOOK_URL="https://..."    # ガイド本（Amazonアソシエイト 等）

# ニュース記事のジャンル別枠（任意）
AFF_TECH_URL="https://..."
AFF_BUSINESS_URL="https://..."
AFF_WORLD_URL="https://..."
AFF_JAPAN_URL="https://..."
AFF_SPORTS_URL="https://..."
```

- 各変数は `NEXT_PUBLIC_AFF_*`（例 `NEXT_PUBLIC_AFF_TRAVEL_HOTEL_URL`）でも読めます。
- **`travel-tour` は未設定でも動きます**: Viatorのパートナーリンク（`pid` = ViatorバナーのパートナーID）に飛びます。
- それ以外は未設定の場合、`travel-*` は `/ja/travel` に、その他は `/ja/book` にフォールバックします。
- 優先順位: 環境変数 → `src/lib/affiliate.ts` の `goLinks[id].url`（直書き）→ フォールバック。
- Vercel/Netlify では上記を環境変数に登録して再デプロイ。

### Viator バナー

旅ガイドの一覧（`/ja/travel`）と各記事に Viator のアフィバナー（728×90）を表示します。パートナーID・サイズ等は `src/lib/viator.ts` で設定（既定 `P00316100`）。

- 実装: `src/components/ViatorBanner.tsx`。公式 `banners.js` と同じURL構成でサーバーレンダリングするため、クライアントJS不要で確実に表示されます。
- 記事内の位置: `src/lib/travel.ts` の記事に `viatorBanner: true` を付けると本文上部（ヒーロー直下）、指定なしの記事はアフィ枠の下に表示。
- テキストリンク側: `/go/viator`（Viator直リンク）と `/go/travel-tour`（既定でViator、`AFF_TRAVEL_TOUR_URL` で差し替え可）。

## Google AdSense

サイト確認用の `ca-pub-9222859203841922` は全ページの `<head>` に埋め込んである（`src/lib/adsense.ts`）。スロット未設定のあいだ広告枠は出ない。

1. [Google AdSense](https://www.google.com/adsense/) で所有権確認（コードスニペット）
2. 審査通過後、**表示広告** を3つ作成（ホーム / 日付一覧 / 記事）
3. 環境変数にスロットIDを設定:
   - `NEXT_PUBLIC_ADSENSE_SLOT_HOME`
   - `NEXT_PUBLIC_ADSENSE_SLOT_FEED`
   - `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE`
4. 再デプロイすると広告枠が表示される（審査中は空白のことがある）

## X → サイト → 広告・アフィリ（ニュース）

1. 日付ページで記事を開き、URL `/ja/n/...` をコピー
2. Xにコメント＋そのURLを貼る
3. 記事ページに広告枠・アフィリ枠と原文リンクが出る
4. `data/takes.json` にコメントを書くと記事ページにも表示される
