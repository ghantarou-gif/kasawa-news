import { imageUrlFromToken, isPlaceholderImage } from "@/lib/card-image";

const TYPES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);

async function loadImage(url: string): Promise<Response> {
  const remote = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(8000),
    headers: {
      Accept: "image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8",
      "User-Agent": "NyanChu/1.0",
    },
  });
  const type = (remote.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!remote.ok || !TYPES.has(type) || isPlaceholderImage(remote.url)) {
    return new Response(null, { status: 404 });
  }
  const bytes = await remote.arrayBuffer();
  if (bytes.byteLength < 2000 || bytes.byteLength > 5_000_000) {
    return new Response(null, { status: 404 });
  }
  return new Response(bytes, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const url = imageUrlFromToken(decodeURIComponent(token));
  if (!url) return new Response(null, { status: 404 });
  try {
    return await loadImage(url);
  } catch {
    return new Response(null, { status: 404 });
  }
}
