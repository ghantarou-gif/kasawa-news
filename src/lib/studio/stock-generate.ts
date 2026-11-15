import { chatJson } from "./llm";
import { appendStock, listStock } from "./stock";
import { TANPUKUNOKAMI } from "./tanpukunokami";
import type { StockPost, SyntaxTemplate } from "./types";

export const STOCK_BATCH = 5;
export const STOCK_NIGHTLY = 20;

const NIGHTLY_TEMPLATE_IDS = ["5", "8", "14", "15", "1", "2", "3", "10", "13"];

function nightlyTemplates(): SyntaxTemplate[] {
  return NIGHTLY_TEMPLATE_IDS.flatMap((id) => {
    const template = TANPUKUNOKAMI.templates.find((item) => item.id === id);
    return template ? [template] : [];
  });
}

function pickTemplates(offset: number, count: number): SyntaxTemplate[] {
  const pool = nightlyTemplates();
  if (pool.length === 0) return [];
  return Array.from({ length: count }, (_, index) => pool[(offset + index) % pool.length]);
}

function asGenerated(value: unknown): Array<Omit<StockPost, "id" | "createdAt" | "copiedAt">> {
  if (!value || typeof value !== "object") return [];
  const posts = (value as { posts?: unknown }).posts;
  if (!Array.isArray(posts)) return [];
  return posts.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    const text = typeof row.text === "string" ? row.text.trim() : "";
    if (!text) return [];
    return [
      {
        text,
        gloss: typeof row.gloss === "string" ? row.gloss.trim() : "",
        templateId: String(row.templateId ?? ""),
        templateName: String(row.templateName ?? ""),
      },
    ];
  });
}

export async function generateStockBatch(count = STOCK_BATCH): Promise<StockPost[]> {
  const size = Math.min(STOCK_BATCH, Math.max(1, count));
  const existing = await listStock();
  const templates = pickTemplates(existing.length, size);
  if (templates.length === 0) throw new Error("No templates for the nightly stock.");

  const recent = existing
    .slice(0, 24)
    .map((post) => post.text.split("\n")[0])
    .filter(Boolean);

  const voice = TANPUKUNOKAMI;
  const drafted = await chatJson(
    [
      {
        role: "system",
        content: [
          `You write X posts in the voice of ${voice.handle}.`,
          "Output language: English.",
          'Return JSON only: {"posts":[{"templateId","templateName","text","gloss"}]}',
          "gloss is a Japanese confirmation of the English post, at most 3 lines.",
          "There is no news article. Write everyday scenes and opinions only.",
          "Do not invent personal names, statistics, years, store names, news events, or quoted replies.",
          "Do not copy the template examples.",
          "No URLs. No hashtags. No 'To everyone'.",
          "Sentence 1 carries the whole claim. Short sentences and line breaks.",
          "Do not repeat an opening that is already in the recent list.",
          voice.rules
            .filter((rule) => !rule.includes("article"))
            .map((rule) => `- ${rule}`)
            .join("\n"),
        ].join("\n"),
      },
      {
        role: "user",
        content: JSON.stringify({
          templates: templates.map((template) => ({
            templateId: template.id,
            templateName: template.name,
            skeleton: template.skeleton,
            intent: template.intent,
          })),
          recentOpenings: recent,
        }),
      },
    ],
    asGenerated,
  );

  const now = new Date().toISOString();
  const items: StockPost[] = drafted.map((post) => ({
    ...post,
    id: crypto.randomUUID(),
    createdAt: now,
    copiedAt: null,
  }));
  await appendStock(items);
  return items;
}
