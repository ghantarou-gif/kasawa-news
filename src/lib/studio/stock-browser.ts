import { TANPUKUNOKAMI } from "./tanpukunokami";
import type { StockPost } from "./types";

export const STOCK_NIGHTLY = 20;

const STORAGE_KEY = "nyanchu-studio-stock";
const NIGHTLY_KEY = "nyanchu-studio-stock-night";

type Draft = {
  templateId: string;
  text: string;
  gloss: string;
};

const DRAFTS: Draft[] = [
  {
    templateId: "5",
    text: "A lot of people come to Japan for sushi, neon, and bullet trains.\nThen they leave talking about the quiet of a weekday convenience store at 6 a.m.\nI know it sounds stupid.\nBut the lighting is honest, the egg sandwich is hot, and nobody performs for you.",
    gloss: "有名なものより、朝のコンビニの静けさの話。",
  },
  {
    templateId: "8",
    text: "I entered a tiny Tokyo bar with seven seats.\nI froze.\nThe bartender nodded once and put water down before I ordered.\nNo pitch. No playlist fight.\nJust a room that already decided you were allowed to sit.",
    gloss: "入店して間を置いた小さなバーの場面。",
  },
  {
    templateId: "14",
    text: "USA scene, not a lecture.\nAirport carpet. Someone already on a call.\nA refill cup that never quite empties.\nThen a stranger holds a door like it is nothing.\nThat is the country in four beats.",
    gloss: "アメリカを場面4つで書く。",
  },
  {
    templateId: "15",
    text: "Manners are not decoration.\nThey are how strangers share a small space without a fight.\nJapan is not kinder because people are angels.\nIt is quieter because the default is not to spill your mood onto the next person.",
    gloss: "マナーは装飾ではなく共有のルール、という主張。",
  },
  {
    templateId: "1",
    text: "To visitors who treat a packed train like a living room.\nThere is something I want to say honestly.\nThis car is not your content set.\nBags off the seats. Voice down. Phone in your palm, not in someone else's face.\nIf that feels strict, the country already told you how it wants to be used.",
    gloss: "満員電車をリビング扱いする人への呼びかけ。",
  },
  {
    templateId: "2",
    text: "I heard Japan is cold to outsiders.\nSo let me ask one simple question.\nIf I walked into your kitchen at dinner, filmed the table, and asked why nobody clapped,\nwould that make you angry?\nThat is the gap people keep missing.",
    gloss: "冷たいという批判を相手の家に置き換える。",
  },
  {
    templateId: "3",
    text: "To people planning a first week in Japan.\nI prepared a gift for you.\nNot a shrine list.\nNot a ramen list.\nNot a photo spot list.\nA list of hours when the city is actually empty.",
    gloss: "リストを3つ否定して、空いている時間帯で落とす。",
  },
  {
    templateId: "10",
    text: "People ask what surprised me after years here.\nNot the trains.\nThe apology that arrives before the problem is even finished.\nIt can be too much.\nIt can also stop a small friction from becoming a story.",
    gloss: "長年いて驚いたのは電車ではなく先に来る謝罪。",
  },
  {
    templateId: "13",
    text: "I used to think loud confidence was the adult setting.\nThen I watched a shop clerk solve a mess in a voice you could miss.\nThe work still got done.\nVolume is not the same thing as competence.",
    gloss: "声の大きさと仕事ができることは別、という話。",
  },
  {
    templateId: "5",
    text: "A lot of travelers chase the big view from the tower.\nThen they talk about a vending machine that still works at midnight on a side street.\nI know it sounds stupid.\nBut reliability at 1 a.m. is a kind of luxury people only notice when it is gone.",
    gloss: "夜の自販機が動くことを贅沢として書く。",
  },
  {
    templateId: "8",
    text: "I entered the office elevator with four strangers.\nI froze.\nNobody filled the silence with a joke.\nThe doors opened. We left.\nThat quiet is not hostility. It is leaving each other intact.",
    gloss: "エレベーターの沈黙を敵意ではないと書く。",
  },
  {
    templateId: "14",
    text: "USA scene.\nA diner mug with a coffee ring.\nA flag in a parking lot that has seen weather.\nSomeone saying have a good one like it is a job.\nThen the highway, and the radio already arguing.",
    gloss: "アメリカをマグカップと駐車場とラジオで。",
  },
  {
    templateId: "15",
    text: "A public place is a loan, not a stage.\nYou give it back in the same condition.\nThat rule is older than tourism.\nIf you need a camera to prove you were kind, you already spent the moment.",
    gloss: "公共の場は舞台ではなく借り物、という主張。",
  },
  {
    templateId: "1",
    text: "To people filming shrine grounds like a set.\nThere is something I want to say honestly.\nThis is not a backdrop rented by the hour.\nWalk the path. Bow if you entered. Keep the audio off.\nThe photo is cheaper than the quiet you just spent.",
    gloss: "神社をセット撮影する人への呼びかけ。",
  },
  {
    templateId: "2",
    text: "I heard tipping is required because service is a performance.\nSo let me ask one simple question.\nIf the price already includes the work, and the worker still has to smile for extra coins,\nwhose dignity is that system protecting?",
    gloss: "チップ文化を相手の論理で問い返す。",
  },
  {
    templateId: "3",
    text: "To anyone packing for Tokyo in July.\nI prepared a gift for you.\nNot a cute umbrella.\nNot a linen shirt.\nNot a portable fan list.\nA warning: the humidity will edit your personality by 3 p.m.",
    gloss: "七月の東京に対して、湿度で落とす。",
  },
  {
    templateId: "10",
    text: "People ask why I still buy from the same bakery.\nThe bread is fine.\nThe point is they remember the order without making a show of remembering.\nThat is a small city skill. It does not trend. It keeps you coming back.",
    gloss: "同じパン屋に通う理由は演出のない記憶。",
  },
  {
    templateId: "13",
    text: "I used to chase the perfect itinerary.\nThen a rain delay ate the plan and the day got better.\nA covered arcade. A coffee. A train that still came.\nControl is a tourist hobby. Weather is the editor.",
    gloss: "完璧な予定より雨の編集の話。",
  },
  {
    templateId: "5",
    text: "A lot of people come for cherry blossoms.\nThen they leave talking about how the street got cleaned before the petals looked sad.\nI know it sounds stupid.\nBut maintenance is the romance. The flowers are just the deadline.",
    gloss: "桜より、散る前に掃除される街の話。",
  },
  {
    templateId: "8",
    text: "I entered a neighborhood sento with my own towel.\nI froze at the stool height, the tap order, the heat.\nThen it became simple.\nWash. Sit. Say nothing.\nThe room does the talking.",
    gloss: "銭湯に入って動きが分かるまでの場面。",
  },
];

function templateName(id: string): string {
  return TANPUKUNOKAMI.templates.find((item) => item.id === id)?.name ?? "ポスト";
}

function asPosts(value: unknown): StockPost[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as StockPost;
    if (typeof row.id !== "string" || typeof row.text !== "string") return [];
    return [
      {
        ...row,
        gloss: typeof row.gloss === "string" ? row.gloss : "",
        templateId: row.templateId ?? "",
        templateName: row.templateName ?? "",
        createdAt: row.createdAt ?? new Date(0).toISOString(),
        copiedAt: row.copiedAt ?? null,
      },
    ];
  });
}

function sortStock(posts: StockPost[]): StockPost[] {
  return [...posts].sort((a, b) => {
    const aCopied = a.copiedAt ? 1 : 0;
    const bCopied = b.copiedAt ? 1 : 0;
    if (aCopied !== bCopied) return aCopied - bCopied;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export function readBrowserStock(): StockPost[] {
  try {
    return sortStock(asPosts(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")));
  } catch {
    return [];
  }
}

function writeBrowserStock(posts: StockPost[]): StockPost[] {
  const next = sortStock(posts);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

export function markBrowserCopied(id: string): StockPost | null {
  const posts = readBrowserStock();
  const index = posts.findIndex((post) => post.id === id);
  if (index < 0) return null;
  if (!posts[index].copiedAt) {
    posts[index] = { ...posts[index], copiedAt: new Date().toISOString() };
    writeBrowserStock(posts);
  }
  return posts[index];
}

export function addBrowserDrafts(count = STOCK_NIGHTLY): StockPost[] {
  const size = Math.max(1, count);
  const existing = readBrowserStock();
  const used = new Set(existing.filter((post) => !post.copiedAt).map((post) => post.text));
  const now = new Date().toISOString();
  const added: StockPost[] = [];
  let cursor = existing.length;
  let guard = 0;
  while (added.length < size && guard < DRAFTS.length * 3) {
    const draft = DRAFTS[cursor % DRAFTS.length];
    cursor += 1;
    guard += 1;
    if (used.has(draft.text)) continue;
    used.add(draft.text);
    added.push({
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `stock-${now}-${added.length}`,
      text: draft.text,
      gloss: draft.gloss,
      templateId: draft.templateId,
      templateName: templateName(draft.templateId),
      createdAt: now,
      copiedAt: null,
    });
  }
  if (added.length === 0) return existing;
  return writeBrowserStock([...added, ...existing]);
}

export function japanDayKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return `${year}-${month}-${day}`;
}

export function maybeNightlyBrowserStock(): StockPost[] {
  const today = japanDayKey();
  try {
    if (localStorage.getItem(NIGHTLY_KEY) === today) return readBrowserStock();
    localStorage.setItem(NIGHTLY_KEY, today);
  } catch {
    return addBrowserDrafts(STOCK_NIGHTLY);
  }
  return addBrowserDrafts(STOCK_NIGHTLY);
}
