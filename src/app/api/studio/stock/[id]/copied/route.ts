import { NextResponse } from "next/server";
import { memberRequestOpen } from "@/lib/studio/access";
import { markStockCopied } from "@/lib/studio/stock";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!memberRequestOpen(request)) {
    return NextResponse.json({ error: "Locked." }, { status: 401 });
  }
  const { id } = await context.params;
  const post = await markStockCopied(id);
  if (!post) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ post });
}
