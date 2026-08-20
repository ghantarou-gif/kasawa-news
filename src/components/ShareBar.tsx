"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";

function xIntentUrl(text: string, url: string): string {
  const params = new URLSearchParams();
  params.set("text", text);
  params.set("url", url);
  return `https://x.com/intent/tweet?${params.toString()}`;
}

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
  const [shareUrl, setShareUrl] = useState(url);

  useEffect(() => {
    setShareUrl(window.location.href.split("#")[0]);
  }, [url]);

  const tweetText = useMemo(() => {
    const body = take?.trim() || title.trim();
    const max = 220;
    return body.length > max ? `${body.slice(0, max)}…` : body;
  }, [take, title]);

  const xIntent = useMemo(
    () => xIntentUrl(tweetText, shareUrl),
    [tweetText, shareUrl],
  );

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback ignored */
    }
  }, [shareUrl]);

  const openShare = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      window.open(xIntent, "_blank", "noopener,noreferrer");
    },
    [xIntent],
  );

  return (
    <div className="share-bar">
      <p className="share-kicker">{copy.shareKicker}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={xIntent}
          onClick={openShare}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn share-btn-x"
        >
          {copy.shareOnX}
        </a>
        <button type="button" onClick={copyLink} className="share-btn share-btn-ghost">
          {copied ? copy.copied : copy.copyLink}
        </button>
      </div>
    </div>
  );
}
