"use client";

import { useCallback, useState } from "react";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";

export function ShareBar({
  url,
  title,
  locale,
  take,
}: {
  url: string;
  title: string;
  locale: Locale;
  take?: string | null;
}) {
  const copy = t(locale);
  const [copied, setCopied] = useState(false);

  const tweet = take?.trim()
    ? `${take.trim()}\n\n${url}`
    : `${title.slice(0, 100)}${title.length > 100 ? "…" : ""}\n\n${url}`;

  const xIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback ignored */
    }
  }, [url]);

  return (
    <div className="share-bar">
      <p className="share-kicker">{copy.shareKicker}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a href={xIntent} target="_blank" rel="noopener noreferrer" className="share-btn share-btn-x">
          {copy.shareOnX}
        </a>
        <button type="button" onClick={copyLink} className="share-btn share-btn-ghost">
          {copied ? copy.copied : copy.copyLink}
        </button>
      </div>
      <p className="mt-3 break-all font-mono text-[11px] leading-5 text-muted">{url}</p>
    </div>
  );
}
