# KASAWA ↔ NyanChu 連動

## KASAWA側（このリポジトリ）

- ヘッダーに **X検索** → NyanChu へ
- 記事ページ `/ja/n/...` に **Xで反応を探す** ブロック
  - 「Xで検索」→ X 最新順
  - 「NyanChuで詳しく」→ 見出し・媒体・24時間・言語をクエリで渡す

環境変数:

```
NEXT_PUBLIC_NYANCHU_URL=https://candid-cassata-bceae7.netlify.app
NEXT_PUBLIC_SITE_URL=https://（KASAWAのNetlify URL）
```

## NyanChu側（1回だけ）

`index.html` の末尾、`build();` の **直前** に `nyanchu-prefill.js` の中身を貼る。
KASAWA から `?kw=...&url=...&wt=24&wtUnit=h&lang=ja` が付いた URL を開くと、フォームが自動入力されます。

### 任意: KASAWAへのリンク

NyanChu の `<footer>` あたりに追加:

```html
<p style="margin-top:12px">
  <a href="https://（KASAWAのURL）/ja">KASAWA — ニュースアーカイブ</a>
</p>
```

## 運用フロー

1. KASAWA でネタを選ぶ → `/ja/n/...` を X に貼る
2. 記事ページで X / NyanChu から反応を調べる
3. コメントを書いて X 投稿 → 同じ `/ja/n/...` へ誘導
4. 記事ページのアフィリエイト枠で収益
