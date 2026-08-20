import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ARCHIVE_KEEP_MS, isPaywalledUrl } from "./config";
import { feeds } from "./feeds";
import { articleAgeMs } from "./time";
import type { Article } from "./types";

const STORE_PATH = path.join(process.cwd(), "data", "headlines.json");

/** Warm-instance cache; helps on serverless when disk writes do not persist. */
let memoryStore: Article[] | null = null;

let chain: Promise<void> = Promise.resolve();

function enqueue<T>(work: () => Promise<T>): Promise<T> {
  let result!: Promise<T>;
  chain = chain.then(
    () => {
      result = work();
      return result.then(
        () => undefined,
        () => undefined,
      );
    },
    () => {
      result = work();
      return result.then(
        () => undefined,
        () => undefined,
      );
    },
  );
  return chain.then(() => result);
}

async function readAll(): Promise<Article[]> {
  if (memoryStore) return memoryStore;
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Article[];
    const list = Array.isArray(parsed) ? parsed : [];
    memoryStore = list;
    return list;
  } catch {
    return [];
  }
}

async function writeAll(articles: Article[]): Promise<void> {
  memoryStore = articles;
  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await writeFile(STORE_PATH, JSON.stringify(articles), "utf8");
  } catch {
    /* Netlify/serverless: keep in-memory only for this instance */
  }
}

function union<T>(left: T[], right: T[]): T[] {
  return [...new Set([...left, ...right])];
}

export async function mergeArticles(incoming: Article[]): Promise<Article[]> {
  return enqueue(async () => {
    const now = new Date().toISOString();
    const byUrl = new Map<string, Article>();

    for (const article of await readAll()) {
      byUrl.set(article.url, article);
    }

    for (const article of incoming) {
      const previous = byUrl.get(article.url);
      if (!previous) {
        byUrl.set(article.url, { ...article, firstSeenAt: now });
        continue;
      }
      byUrl.set(article.url, {
        ...previous,
        title: article.title || previous.title,
        excerpt: article.excerpt || previous.excerpt,
        publishedAt: article.publishedAt ?? previous.publishedAt,
        source: article.source,
        sourceId: article.sourceId,
        image: article.image || previous.image,
        desks: union(previous.desks, article.desks),
        locales: union(previous.locales, article.locales),
      });
    }

    const knownIds = new Set(feeds.map((feed) => feed.id));
    const kept = [...byUrl.values()].filter(
      (article) =>
        knownIds.has(article.sourceId) &&
        !isPaywalledUrl(article.url) &&
        articleAgeMs(article) <= ARCHIVE_KEEP_MS,
    );
    await writeAll(kept);
    return kept;
  });
}
