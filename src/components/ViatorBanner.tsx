"use client";

import { useEffect } from "react";
import { viatorPartnerId } from "@/lib/viator";

const BANNER_SCRIPT_SRC =
  "https://partners.vtrcdn.com/static/scripts/banners/banners.js";

/**
 * Viator affiliate banner.
 *
 * Viator's banners.js is a one-shot script: it scans for
 * `div[data-id=viator-banner]` and injects the banner once on load, guarding
 * each div via `dataset.processed`. That means banners added during client-side
 * navigation are never processed, so we (re)load the script on mount to process
 * this div wherever it renders.
 */
export function ViatorBanner({
  width = 728,
  height = 90,
  language = "en",
  selection = "banner1",
  url = "https://www.viator.com/",
  className = "",
}: {
  width?: number;
  height?: number;
  language?: string;
  selection?: string;
  url?: string;
  className?: string;
}) {
  const partnerId = viatorPartnerId();

  useEffect(() => {
    if (!partnerId) return;
    const script = document.createElement("script");
    script.src = BANNER_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [partnerId]);

  if (!partnerId) return null;

  return (
    <aside className={`viator-banner ${className}`.trim()} aria-label="Viator">
      <div
        data-id="viator-banner"
        data-partner-id={partnerId}
        data-url={url}
        data-banner-width={width}
        data-banner-height={height}
        data-banner-language={language}
        data-banner-selection={selection}
      />
    </aside>
  );
}
