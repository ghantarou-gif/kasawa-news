import {
  viatorBanner,
  viatorBannerAlt,
  viatorBannerHref,
  viatorBannerImageSrc,
} from "@/lib/viator";

export function ViatorBanner({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`viator-banner ${className}`.trim()}
      aria-label="Advertisement"
      data-id="viator-banner"
      data-partner-id="P00316100"
    >
      <a
        href={viatorBannerHref()}
        rel="sponsored noopener noreferrer"
        target="_blank"
      >
        <img
          src={viatorBannerImageSrc()}
          alt={viatorBannerAlt()}
          width={viatorBanner.width}
          height={viatorBanner.height}
        />
      </a>
    </aside>
  );
}
