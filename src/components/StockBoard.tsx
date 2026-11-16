"use client";

import { useEffect, useState } from "react";
import { publicHref } from "@/lib/hosting";
import {
  addBrowserDrafts,
  markBrowserCopied,
  maybeNightlyBrowserStock,
  readBrowserStock,
} from "@/lib/studio/stock-browser";
import type { StockPost } from "@/lib/studio/types";

function compareStock(a: StockPost, b: StockPost): number {
  const aCopied = a.copiedAt ? 1 : 0;
  const bCopied = b.copiedAt ? 1 : 0;
  if (aCopied !== bCopied) return aCopied - bCopied;
  return b.createdAt.localeCompare(a.createdAt);
}

function stockUrl(path: string): string {
  return publicHref(`/api/studio/stock${path}`);
}

async function readApi(): Promise<StockPost[] | null> {
  try {
    const response = await fetch(stockUrl(""));
    if (response.status === 404) return null;
    const payload = (await response.json()) as { posts?: StockPost[]; error?: string };
    if (!response.ok) return null;
    return payload.posts ?? [];
  } catch {
    return null;
  }
}

export function StockBoard() {
  const [posts, setPosts] = useState<StockPost[]>([]);
  const [useBrowser, setUseBrowser] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    let cancelled = false;
    readApi().then((fromApi) => {
      if (cancelled) return;
      if (fromApi) {
        setUseBrowser(false);
        setPosts(fromApi);
        return;
      }
      setUseBrowser(true);
      setPosts(maybeNightlyBrowserStock());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function addTwenty() {
    setError("");
    setBusy(true);
    try {
      if (useBrowser) {
        setPosts(addBrowserDrafts(20));
        return;
      }
      for (let index = 0; index < 4; index += 1) {
        const response = await fetch(stockUrl("/replenish"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ count: 5 }),
        });
        const payload = (await response.json()) as { error?: string };
        if (!response.ok) throw new Error(payload.error || "追加に失敗しました。");
      }
      const latest = await readApi();
      if (latest) setPosts(latest);
    } catch (err) {
      setError(err instanceof Error ? err.message : "追加に失敗しました。");
    } finally {
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
    if (useBrowser) {
      const updated = markBrowserCopied(post.id);
      if (updated) setPosts(readBrowserStock());
      return;
    }
    const response = await fetch(stockUrl(`/${post.id}/copied`), { method: "POST" });
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
