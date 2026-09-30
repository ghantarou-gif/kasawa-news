import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type PageVisit = {
  path: string;
  title: string;
  count: number;
  lastSeen: string;
};

const FILE_PATHS = [
  path.join(process.cwd(), "data", "visits.json"),
  path.join("/tmp", "nyanchu-visits.json"),
];

const MAX_PAGES = 400;

type Store = Record<string, { title: string; count: number; lastSeen: string }>;

let memory: Store | null = null;
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

function mergeStores(left: Store, right: Store): Store {
  const merged: Store = { ...left };
  for (const [key, row] of Object.entries(right)) {
    const current = merged[key];
    if (!current || row.count > current.count) merged[key] = row;
    else if (row.count === current.count && row.lastSeen > current.lastSeen) merged[key] = row;
  }
  return merged;
}

async function readStore(): Promise<Store> {
  let fromFile: Store = {};
  for (const file of FILE_PATHS) {
    try {
      const parsed = JSON.parse(await readFile(file, "utf8")) as Store;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        fromFile = mergeStores(fromFile, parsed);
      }
    } catch {
      /* try the next file */
    }
  }
  memory = mergeStores(memory ?? {}, fromFile);
  return memory;
}

async function writeStore(store: Store): Promise<void> {
  memory = store;
  const body = JSON.stringify(store);
  await Promise.all(
    FILE_PATHS.map(async (file) => {
      try {
        await mkdir(path.dirname(file), { recursive: true });
        await writeFile(file, body, "utf8");
      } catch {
        /* read-only deploy: keep the in-memory count */
      }
    }),
  );
}

export function cleanVisitPath(value: string): string | null {
  const pathOnly = value.split("?")[0]?.split("#")[0] ?? "";
  if (!/^\/(ja|en)(\/|$)/.test(pathOnly)) return null;
  if (pathOnly.includes("..") || pathOnly.length > 300) return null;
  if (pathOnly.length > 1 && pathOnly.endsWith("/")) return pathOnly.slice(0, -1);
  return pathOnly;
}

function cleanTitle(value: string): string {
  return value.replace(/\s+/g, " ").replace(/[<>]/g, "").trim().slice(0, 140);
}

function trimStore(store: Store): Store {
  const entries = Object.entries(store);
  if (entries.length <= MAX_PAGES) return store;
  entries.sort((a, b) => b[1].count - a[1].count || b[1].lastSeen.localeCompare(a[1].lastSeen));
  return Object.fromEntries(entries.slice(0, MAX_PAGES));
}

export async function recordVisit(pathname: string, title: string): Promise<number | null> {
  const key = cleanVisitPath(pathname);
  if (!key || key.endsWith("/visits")) return null;
  return enqueue(async () => {
    const store = await readStore();
    const current = store[key];
    const next = {
      title: cleanTitle(title) || current?.title || key,
      count: (current?.count ?? 0) + 1,
      lastSeen: new Date().toISOString(),
    };
    store[key] = next;
    await writeStore(trimStore(store));
    return next.count;
  });
}

export async function visitCount(pathname: string): Promise<number> {
  const key = cleanVisitPath(pathname);
  if (!key) return 0;
  const store = await readStore();
  return store[key]?.count ?? 0;
}

export async function listVisits(): Promise<PageVisit[]> {
  const store = await readStore();
  return Object.entries(store)
    .map(([pagePath, row]) => ({
      path: pagePath,
      title: row.title || pagePath,
      count: row.count,
      lastSeen: row.lastSeen,
    }))
    .sort((a, b) => b.count - a.count || b.lastSeen.localeCompare(a.lastSeen));
}
