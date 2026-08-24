# NyanChu

ニュースが主で、旅ガイドとKindle本のページが脇にあるホームページです。見出しは日付カードに溜まり、クリックするとその日のフィードが開きます。

## 動かし方

```bash
npm run dev
```

http://localhost:3000

## 直す場所

- 旅ガイド記事: `src/lib/travel.ts`（配列の先頭に追加。`related` に他記事のスラッグを入れると末尾に相互リンクが出る）
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
2. `src/lib/affiliate.ts` の `travel-hotel` などに予約・Amazon URLを入れる
3. Xに `xHook` の文＋URL `/ja/travel/スラッグ` を投稿
4. 読者が詳細を読み、宿・ツアー枠から遷移

例: `/ja/travel/kyoto-arashiyama`

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
