import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getStore } from "@netlify/blobs";
import type { StockPost } from "./types";

const STORE = "studio-stock";
const KEY = "posts";
const LOCAL_FILE = path.join(process.cwd(), ".data", "studio-stock.json");

function onNetlify(): boolean {
  return process.env.NETLIFY === "true";
}

function isStockPost(value: unknown): value is StockPost {
  if (!value || typeof value !== "object") return false;
  const row = value as StockPost;
  return typeof row.id === "string" && typeof row.text === "string";
}

function asPosts(value: unknown): StockPost[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isStockPost).map((post) => ({
    ...post,
    gloss: typeof post.gloss === "string" ? post.gloss : "",
    templateId: post.templateId ?? "",
    templateName: post.templateName ?? "",
    createdAt: post.createdAt ?? new Date(0).toISOString(),
    copiedAt: post.copiedAt ?? null,
  }));
}

export function sortStock(posts: StockPost[]): StockPost[] {
  return [...posts].sort((a, b) => {
    const aCopied = a.copiedAt ? 1 : 0;
    const bCopied = b.copiedAt ? 1 : 0;
    if (aCopied !== bCopied) return aCopied - bCopied;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

async function readLocal(): Promise<StockPost[]> {
  try {
    return asPosts(JSON.parse(await readFile(LOCAL_FILE, "utf8")));
  } catch {
    return [];
  }
}

async function writeLocal(posts: StockPost[]): Promise<void> {
  await mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await writeFile(LOCAL_FILE, JSON.stringify(posts));
}

async function readAll(): Promise<StockPost[]> {
  if (!onNetlify()) return readLocal();
  const store = getStore(STORE);
  return asPosts(await store.get(KEY, { type: "json" }));
}

async function writeAll(posts: StockPost[]): Promise<void> {
  if (!onNetlify()) {
    await writeLocal(posts);
    return;
  }
  const store = getStore(STORE);
  await store.setJSON(KEY, posts);
}

export async function listStock(): Promise<StockPost[]> {
  return sortStock(await readAll());
}

export async function appendStock(items: StockPost[]): Promise<StockPost[]> {
  if (items.length === 0) return listStock();
  const posts = await readAll();
  await writeAll([...items, ...posts]);
  return sortStock([...items, ...posts]);
}

export async function markStockCopied(id: string): Promise<StockPost | null> {
  const posts = await readAll();
  const index = posts.findIndex((post) => post.id === id);
  if (index < 0) return null;
  if (!posts[index].copiedAt) {
    posts[index] = { ...posts[index], copiedAt: new Date().toISOString() };
    await writeAll(posts);
  }
  return posts[index];
}
