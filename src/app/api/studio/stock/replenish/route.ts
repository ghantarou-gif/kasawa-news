import { NextResponse } from "next/server";
import { cronRequestOk, memberRequestOpen } from "@/lib/studio/access";
import { generateStockBatch, STOCK_BATCH } from "@/lib/studio/stock-generate";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!cronRequestOk(request) && !memberRequestOpen(request)) {
    return NextResponse.json({ error: "Locked." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { count?: unknown } | null;
  const count =
    typeof body?.count === "number" && Number.isFinite(body.count) ? body.count : STOCK_BATCH;

  try {
    const posts = await generateStockBatch(count);
    return NextResponse.json({ added: posts.length, posts });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stock replenish failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
