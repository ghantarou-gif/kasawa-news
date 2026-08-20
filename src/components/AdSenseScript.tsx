import Script from "next/script";
import { adsenseClient } from "@/lib/adsense";

export function AdSenseScript() {
  const client = adsenseClient();
  if (!client) return null;

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
