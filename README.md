# KASAWA

ニュースが主で、Kindle本のページが脇にあるホームページです。見出しは日付カードに溜まり、クリックするとその日のフィードが開きます。

## 動かし方

```bash
npm run dev
```

http://localhost:3000

## 直す場所

- 本の書名・紹介・Kindle URL: `src/lib/book.ts`
- アフィリエイト先: `src/lib/affiliate.ts`
- X用コメント（記事IDキー）: `data/takes.json`
- 本番URL（OGP用）: `.env` の `NEXT_PUBLIC_SITE_URL`
- NyanChu連動: `.env` の `NEXT_PUBLIC_NYANCHU_URL` / `integrations/README.md`
- RSSの配信元: `src/lib/feeds.ts`
- 画面の文言: `src/lib/i18n.ts`

## X → サイト → アフィリ

1. 日付ページで記事を開き、URL `/ja/n/...` をコピー
2. Xにコメント＋そのURLを貼る
3. 記事ページにアフィリ枠と原文リンクが出る
4. `data/takes.json` にコメントを書くと記事ページにも表示される
