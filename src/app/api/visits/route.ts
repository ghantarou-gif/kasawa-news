import { recordVisit } from "@/lib/visits";

export async function POST(request: Request) {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "none") {
    return Response.json({ ok: false }, { status: 403 });
  }

  let body: { path?: unknown; title?: unknown };
  try {
    body = (await request.json()) as { path?: unknown; title?: unknown };
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path : "";
  const title = typeof body.title === "string" ? body.title : "";
  const count = await recordVisit(path, title);
  if (count === null) return Response.json({ ok: false }, { status: 400 });
  return Response.json({ ok: true, count });
}
