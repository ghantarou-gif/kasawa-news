# NyanChu

ニュースが主で、旅ガイドとKindle本のページが脇にあるホームページです。見出しは日付カードに溜まり、クリックするとその日のフィードが開きます。

## 動かし方

```bash
npm run dev
```

http://localhost:3000

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
AFF_TRAVEL_TOUR_URL="https://..."    # ツアー・体験・eSIM/WiFi（Klook / KKday / じゃらん体験 等）
AFF_TRAVEL_BOOK_URL="https://..."    # ガイド本（Amazonアソシエイト 等）

# ニュース記事のジャンル別枠（任意）
AFF_TECH_URL="https://..."
AFF_BUSINESS_URL="https://..."
AFF_WORLD_URL="https://..."
AFF_JAPAN_URL="https://..."
AFF_SPORTS_URL="https://..."
```

- 各変数は `NEXT_PUBLIC_AFF_*`（例 `NEXT_PUBLIC_AFF_TRAVEL_HOTEL_URL`）でも読めます。
- 未設定の場合、`travel-*` は `/ja/travel` に、その他は `/ja/book` にフォールバックします。
- コードに直書きしたい場合は `src/lib/affiliate.ts` の `goLinks[id].url` に設定（`urlEnv` より優先）。
- Vercel/Netlify では上記を環境変数に登録して再デプロイ。

### Viator バナー

旅ガイドの一覧（`/ja/travel`）と各記事の下部に Viator の公式アフィバナー（`ViatorBanner`）を表示します。パートナーIDは既定で `P00316100`。変更する場合のみ設定:

```bash
NEXT_PUBLIC_VIATOR_PARTNER_ID="Pxxxxxxxx"
```

- 実装: `src/components/ViatorBanner.tsx`（ID: `src/lib/viator.ts`）。Viator公式の `banners.js` を読み込み、`div[data-id=viator-banner]` を画像リンクに置換します。
- 既定は 728×90・英語。サイズ・言語を変える場合は `ViatorBanner` に `width` / `height` / `language` / `selection` を渡す。

## Google AdSense

1. [Google AdSense](https://www.google.com/adsense/) に申請（サイトURLを本番URLに）
2. 審査通過後、**表示広告** を3つ作成（ホーム / 日付一覧 / 記事）
3. Vercel の環境変数に設定:
   - `NEXT_PUBLIC_ADSENSE_CLIENT` — `ca-pub-...`
   - `NEXT_PUBLIC_ADSENSE_SLOT_HOME`
   - `NEXT_PUBLIC_ADSENSE_SLOT_FEED`
   - `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE`
4. 再デプロイすると広告枠が表示される（審査中は空白のことがある）

## X → サイト → 広告・アフィリ（ニュース）

1. 日付ページで記事を開き、URL `/ja/n/...` をコピー
2. Xにコメント＋そのURLを貼る
3. 記事ページに広告枠・アフィリ枠と原文リンクが出る
4. `data/takes.json` にコメントを書くと記事ページにも表示される
