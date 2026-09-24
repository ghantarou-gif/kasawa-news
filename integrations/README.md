# NyanChu ↔ X検索ツール 連動

## X検索ツール 独自ドメイン（Netlify）

1. [Netlify](https://app.netlify.com) で `candid-cassata-bceae7` を開く（または新規サイト）
2. **Deploys** に `integrations/nyanchu-site/index.html` をドラッグ＆ドロップ  
   （prefill 済み・NyanChu リンク更新済み）
3. **Domain management** → **Add domain** → 例: `search.あなたのドメイン`
4. Cloudflare / レジストラで Netlify 指示の DNS（CNAME → `xxx.netlify.app`）を設定
5. NyanChu ニュースサイトの Vercel 環境変数を更新:
   ```
   NEXT_PUBLIC_NYANCHU_URL=https://（X検索ツールの独自ドメイン）
   ```

## ニュースサイト側（このリポジトリ）

- ヘッダー／記事ページの **NyanChu検索する** → 検索ツールへ
- 検索ツール本体は `public/search.html` として同サイト内で配信（デフォルト URL: `/search.html`）
- 外部ホストに置く場合だけ環境変数で上書き:

```
NEXT_PUBLIC_NYANCHU_URL=https://（X検索ツールの独自ドメイン）
NEXT_PUBLIC_SITE_URL=https://（NyanChuニュースサイトのURL）
```

以前の Netlify デフォルト（`candid-cassata-bceae7.netlify.app`）はニュースサイト本体に上書きされて死んだため、同梱配信に切り替えました。Vercel に古い `NEXT_PUBLIC_NYANCHU_URL` が残っている場合は削除してください。

## X検索ツール側（1回だけ）

`index.html` の末尾、`build();` の **直前** に prefill スクリプトがある。
ニュースサイトから `?kw=...&url=...&wt=24&wtUnit=h&lang=ja` が付いた URL を開くと、フォームが自動入力されます。

### 任意: ニュースサイトへのリンク

NyanChu の `<footer>` あたりに追加:

```html
<p style="margin-top:12px">
  <a href="https://（ニュースサイトのURL）/ja">NyanChu — ニュース</a>
</p>
```

## 運用フロー

1. NyanChu でネタを選ぶ → `/ja/n/...` を X に貼る
2. 記事ページで X / 検索ツールから反応を調べる
3. コメントを書いて X 投稿 → 同じ `/ja/n/...` へ誘導
4. 記事ページの広告枠・アフィリエイト枠で収益
