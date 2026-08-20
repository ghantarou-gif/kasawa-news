import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { AdSenseScript } from "@/components/AdSenseScript";
import { publicSiteUrl } from "@/lib/brand";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-serif-jp",
  display: "swap",
});

const plex = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl()),
  title: {
    default: "NyanChu",
    template: "%s · NyanChu",
  },
  description: "日付別にまとめたニュース見出し。無料RSSから自動取得。",
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
      className={`${fraunces.variable} ${notoSerif.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="site-body min-h-full bg-paper text-ink">
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
