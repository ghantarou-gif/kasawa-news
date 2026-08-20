import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "./locale";

type TakeEntry = Partial<Record<Locale, string>>;

const TAKES_PATH = path.join(process.cwd(), "data", "takes.json");

let cache: Record<string, TakeEntry> | null = null;

async function loadTakes(): Promise<Record<string, TakeEntry>> {
  if (cache) return cache;
  try {
    const raw = await readFile(TAKES_PATH, "utf8");
    const parsed = JSON.parse(raw) as Record<string, TakeEntry>;
    cache = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    cache = {};
  }
  return cache;
}

export async function getTake(
  articleId: string,
  locale: Locale,
): Promise<string | null> {
  const takes = await loadTakes();
  const entry = takes[articleId];
  const text = entry?.[locale]?.trim();
  return text || null;
}
