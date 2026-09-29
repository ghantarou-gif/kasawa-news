"use client";

import { useMemo, useState } from "react";
import { buzzStyles, buildBuzzPrompt, parseBuzzPosts, type BuzzPost } from "@/lib/buzz-prompt";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";

const COUNTS = [5, 10, 20] as const;

function xIntentUrl(text: string, url: string): string {
  const params = new URLSearchParams();
  params.set("text", text);
  params.set("url", url);
  return `https://x.com/intent/tweet?${params.toString()}`;
}

export function ArticleBuzz({
  title,
  excerpt,
  url,
  locale,
}: {
  title: string;
  excerpt?: string | null;
  url: string;
  locale: Locale;
}) {
  const copy = t(locale);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(() => buzzStyles.map((style) => style.id));
  const [count, setCount] = useState<(typeof COUNTS)[number]>(10);
  const [paste, setPaste] = useState("");
  const [posts, setPosts] = useState<BuzzPost[]>([]);
  const [notice, setNotice] = useState("");

  const source = useMemo(
    () => [title.trim(), excerpt?.trim()].filter(Boolean).join("\n\n"),
    [title, excerpt],
  );

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  async function copyPrompt() {
    if (selected.length === 0) {
      flash(copy.buzzNeedStyle);
      return;
    }
    try {
      await navigator.clipboard.writeText(buildBuzzPrompt(source, selected, count));
      flash(copy.copied);
    } catch {
      flash(copy.buzzCopyFailed);
    }
  }

  function importPosts() {
    try {
      const next = parseBuzzPosts(paste);
      if (next.length === 0) {
        flash(copy.buzzBadJson);
        return;
      }
      setPosts(next);
      flash(copy.buzzImported.replace("{count}", String(next.length)));
    } catch {
      flash(copy.buzzBadJson);
    }
  }

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <div className="mt-4 border-t border-line pt-4" id="article-buzz">
      <button type="button" className="ghost-btn" onClick={() => setOpen((value) => !value)}>
        {copy.buzzShape}
      </button>
      {open ? (
        <div className="mt-4">
          <p className="text-[13px] leading-6 text-muted">{copy.buzzHint}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {buzzStyles.map((style) => (
              <button
                key={style.id}
                type="button"
                className={`chip ${selected.includes(style.id) ? "chip-active" : ""}`}
                onClick={() => toggle(style.id)}
              >
                {style.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[12px] text-muted">{copy.buzzCount}</span>
            {COUNTS.map((value) => (
              <button
                key={value}
                type="button"
                className={`chip ${count === value ? "chip-active" : ""}`}
                onClick={() => setCount(value)}
              >
                {value}
              </button>
            ))}
            <button type="button" className="open-btn text-[13px]" onClick={copyPrompt}>
              {copy.buzzCopyPrompt}
            </button>
          </div>
          <label className="mt-4 block text-[12px] text-muted" htmlFor="buzz-paste">
            {copy.buzzPasteLabel}
          </label>
          <textarea
            id="buzz-paste"
            className="buzz-paste"
            rows={5}
            value={paste}
            placeholder='{"posts":[{"text":"...","style":"...","tag":"breaking"}]}'
            onChange={(event) => setPaste(event.target.value)}
          />
          <button type="button" className="ghost-btn mt-2" onClick={importPosts}>
            {copy.buzzImport}
          </button>
          {notice ? <p className="mt-2 text-[13px] text-accent">{notice}</p> : null}
          {posts.length > 0 ? (
            <ol className="mt-4">
              {posts.map((post) => (
                <li key={post.id} className="buzz-post">
                  <p className="text-[11px] text-muted">
                    {post.style}
                    <span className="mx-2 text-ink/25">·</span>
                    {post.text.length}
                    {copy.buzzChars}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-[15px] leading-7">{post.text}</p>
                  <a
                    className="share-btn share-btn-x mt-3"
                    href={xIntentUrl(post.text, url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      event.preventDefault();
                      const live = window.location.href.split("#")[0];
                      window.open(xIntentUrl(post.text, live), "_blank", "noopener,noreferrer");
                    }}
                  >
                    {copy.buzzPostOnX}
                  </a>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
