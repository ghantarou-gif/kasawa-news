import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { AdSenseScript } from "@/components/AdSenseScript";
import { adsenseClient } from "@/lib/adsense";
import { publicSiteUrl } from "@/lib/brand";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ui",
  display: "swap",
});

const adsensePublisher = adsenseClient();

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl()),
  title: {
    default: "NyanChu",
    template: "%s · NyanChu",
  },
  description: "日付別にまとめたニュース見出し。無料RSSから自動取得。",
  ...(adsensePublisher
    ? { other: { "google-adsense-account": adsensePublisher } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf6df",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${notoSans.variable} h-full antialiased`}
    >
      <head>
        <AdSenseScript />
      </head>
      <body className="site-body min-h-full bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
