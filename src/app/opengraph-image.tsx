import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "NyanChu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const revalidate = 1800;

export default async function Image() {
  const font = await readFile(
    path.join(process.cwd(), "src/assets/NotoSansJP-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf6df",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c45c26",
          }}
        >
          NYANCHU
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            lineHeight: 1.15,
            color: "#1c1915",
            maxWidth: 980,
          }}
        >
          日付ごとのニュース見出し
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6b6356" }}>
          無料RSSから自動取得
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Noto Sans JP", data: font, weight: 700, style: "normal" }],
    },
  );
}
