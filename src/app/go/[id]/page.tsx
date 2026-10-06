import { redirect } from "next/navigation";
import { book } from "@/lib/book";
import { goLinkUrl, goLinks, resolveGoLink } from "@/lib/affiliate";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(goLinks).map((id) => ({ id }));
}

export default async function GoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const link = resolveGoLink(id);
  if (!link) redirect("/ja");

  let destination = goLinkUrl(id);
  if (id === "kindle" && !book.kindleUrl) {
    destination = new URL("/ja/book", siteUrl()).toString();
  }
  if (!destination) {
    redirect(id.startsWith("travel-") ? "/ja/travel" : "/ja/book");
  }

  redirect(destination);
}
