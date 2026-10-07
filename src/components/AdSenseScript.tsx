import { adsenseClient } from "@/lib/adsense";

/** Exact AdSense head snippet so the ownership crawler can see it in static HTML. */
export function AdSenseScript() {
  const client = adsenseClient();
  if (!client) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
