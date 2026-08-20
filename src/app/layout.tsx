import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { AdSenseScript } from "@/components/AdSenseScript";
import { siteUrl } from "@/lib/site";
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
  metadataBase: new URL(siteUrl()),
  title: {
    default: "NyanChu",
    template: "%s · NyanChu",
  },
  description: "日付別にまとめたニュース見出し。無料RSSから自動取得。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${fraunces.variable} ${notoSerif.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <AdSenseScript />
        {children}
      </body>
    </html>
  );
}
