"use client";

import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://partners.vtrcdn.com/static/scripts/banners/banners.js";
const SCRIPT_ID = "viator-banners-js";

/**
 * Official Viator Banner Builder embed:
 * <div data-id=viator-banner data-partner-id=P00316100 ...></div>
 * <script async src="https://partners.vtrcdn.com/static/scripts/banners/banners.js"></script>
 */
export function ViatorBanner({ className = "" }: { className?: string }) {
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    delete slot.dataset.processed;
    slot.innerHTML = "";

    document.getElementById(SCRIPT_ID)?.remove();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <aside className={`viator-banner ${className}`.trim()} aria-label="Advertisement">
      <div
        ref={slotRef}
        data-id="viator-banner"
        data-partner-id="P00316100"
        data-url="https://www.viator.com/"
        data-banner-width="728"
        data-banner-height="90"
        data-banner-language="en"
        data-banner-selection="banner1"
      />
    </aside>
  );
}
