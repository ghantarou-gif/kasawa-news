import { adsenseClient } from "@/lib/adsense";

/** Load AdSense after first paint so Safari is not competing with the news list. */
export function AdSenseScript() {
  const client = adsenseClient();
  if (!client) return null;
  const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){function load(){var s=document.createElement("script");s.async=true;s.src=${JSON.stringify(src)};s.crossOrigin="anonymous";document.head.appendChild(s);}if("requestIdleCallback" in window){requestIdleCallback(load,{timeout:2500});}else{window.addEventListener("load",load);}})();`,
      }}
    />
  );
}
