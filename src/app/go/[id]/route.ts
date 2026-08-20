import { NextResponse } from "next/server";
import { book } from "@/lib/book";
import { resolveGoLink } from "@/lib/affiliate";
import { siteUrl } from "@/lib/site";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const link = resolveGoLink(id);

  if (!link) {
    return NextResponse.redirect(new URL("/ja", siteUrl()), 302);
  }

  let destination = link.url;
  if (id === "kindle" && !book.kindleUrl) {
    destination = new URL("/ja/book", siteUrl()).toString();
  }

  if (!destination) {
    if (id.startsWith("travel-")) {
      return NextResponse.redirect(new URL("/ja/travel", siteUrl()), 302);
    }
    return NextResponse.redirect(new URL("/ja/book", siteUrl()), 302);
  }

  const url = new URL(destination);
  const incoming = new URL(request.url);
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const value = incoming.searchParams.get(key);
    if (value) url.searchParams.set(key, value);
  }

  return NextResponse.redirect(url.toString(), 302);
}
