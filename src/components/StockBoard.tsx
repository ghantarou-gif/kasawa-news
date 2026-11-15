"use client";

import { useEffect, useState } from "react";
import type { StockPost } from "@/lib/studio/types";

function compareStock(a: StockPost, b: StockPost): number {
  const aCopied = a.copiedAt ? 1 : 0;
  const bCopied = b.copiedAt ? 1 : 0;
  if (aCopied !== bCopied) return aCopied - bCopied;
  return b.createdAt.localeCompare(a.createdAt);
}

export function StockBoard() {
  const [posts, setPosts] = useState<StockPost[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  async function refresh() {
    const response = await fetch("/api/studio/stock");
    const payload = (await response.json()) as { posts?: StockPost[] };
    if (response.ok) setPosts(payload.posts ?? []);
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/studio/stock")
      .then((response) => response.json())
      .then((payload: { posts?: StockPost[] }) => {
        if (!cancelled) setPosts(payload.posts ?? []);
      })
      .catch(() => {
        if (!cancelled) setError("在庫を読み込めませんでした。");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function addTwenty() {
    setError("");
    setBusy(true);
    try {
      for (let index = 0; index < 4; index += 1) {
        const response = await fetch("/api/studio/stock/replenish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ count: 5 }),
        });
        const payload = (await response.json()) as { error?: string };
        if (!response.ok) throw new Error(payload.error || "追加に失敗しました。");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "追加に失敗しました。");
    } finally {
      await refresh().catch(() => undefined);
      setBusy(false);
    }
  }

  async function copyPost(post: StockPost) {
    setError("");
    try {
      await navigator.clipboard.writeText(post.text);
    } catch {
      setError("コピーできませんでした。");
      return;
    }
    setCopied(post.id);
    window.setTimeout(() => setCopied(""), 1600);
    const response = await fetch(`/api/studio/stock/${post.id}/copied`, { method: "POST" });
    const payload = (await response.json()) as { post?: StockPost; error?: string };
    if (!response.ok || !payload.post) {
      setError(payload.error || "印を付けられませんでした。");
      return;
    }
    const updated = payload.post;
    setPosts((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)).sort(compareStock),
    );
  }

  const unused = posts.filter((post) => !post.copiedAt).length;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <button className="open-btn px-5" type="button" onClick={addTwenty} disabled={busy}>
          {busy ? "作業中…" : "20本足す"}
        </button>
        <p className="text-sm text-muted">未使用 {unused}</p>
      </div>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        未使用が上です。コピーすると済が付きます。夜3時（日本時間）に20本足します。
      </p>
      {error ? (
        <p className="mt-3 text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-6 flex flex-col gap-3">
        {posts.length === 0 ? <p className="text-sm text-muted">まだ在庫がありません。</p> : null}
        {posts.map((post) => (
          <article
            key={post.id}
            className={`rounded-2xl border border-line bg-card p-5 ${post.copiedAt ? "opacity-70" : ""}`}
          >
            <p className="font-sans text-[12px] tracking-[0.14em] uppercase text-accent">
              {post.templateName || "ポスト"}
              {post.copiedAt ? (
                <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[11px] text-paper">済</span>
              ) : null}
            </p>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-[16px] leading-7">{post.text}</pre>
            {post.gloss ? <p className="mt-3 text-sm leading-6 text-muted">{post.gloss}</p> : null}
            <button className="open-btn mt-4 px-5" type="button" onClick={() => copyPost(post)}>
              {copied === post.id ? "コピーしました" : "本文をコピー"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
