import { NextResponse } from "next/server";
import { memberRequestOpen } from "@/lib/studio/access";
import { listStock } from "@/lib/studio/stock";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!memberRequestOpen(request)) {
    return NextResponse.json({ error: "Locked." }, { status: 401 });
  }
  return NextResponse.json({ posts: await listStock() });
}
