export const buzzStyles = [
  { id: "先にオチ", label: "先にオチ" },
  { id: "落差", label: "落差" },
  { id: "数字", label: "数字" },
  { id: "つまり", label: "つまり" },
  { id: "発言", label: "発言だけ" },
  { id: "時系列", label: "時系列" },
  { id: "財布", label: "自分の財布" },
  { id: "問い", label: "問い一つ" },
  { id: "余白", label: "余白" },
  { id: "淡々", label: "淡々" },
] as const;

export type BuzzStyleId = (typeof buzzStyles)[number]["id"];

const STYLE_DEFS = `1. 先にオチ: いちばん具体的な結末を1行目。空行。その直前の事実を1文。感想は足さない。
2. 落差: 記事にある対比（なのに／一方／しかし）はその文のまま。対比がなければ事実を2つ、空行で並べる。対比の言葉は足さない。
3. 数字: 記事にある数字を1行目。空行。その数字が出てくる文。数字がなければ見出しだけ。
4. つまり: 「つまり、」のあとに見出しの主張だけ。
5. 発言: かぎ括弧の発言だけを1行目。空行。その次の事実を1文。発言がなければ、数字のある文か短い事実を1文。
6. 時系列: 事実を最大3つ、起きた順。最後の前だけ空行。感情は入れない。220字まで。
7. 財布: 円の金額を1行目。空行。その金額が出てくる文。円がなければ見出しだけ。別の金額に換算しない。
8. 問い: 事実を1文。空行。問いを1つだけ。円・税なら「誰が払う」。人なら「どこへ行く」。年・期限なら「まだ間に合う」。方針・検討なら「いつ決まる」。どれもなければ「誰が得する」。
9. 余白: 見出しを2〜3切れ。切れのあいだは空行。絵文字なし。
10. 淡々: 記事の文だけを最大3つ並べる。反応は足さない。`;

const FORMAT_RULES = `{"posts":[{"id":1,"text":"本文","style":"構文名","tag":"hook"}]}
・改行は \\n、空行は \\n\\n
・tag は hook`;

export type BuzzPost = {
  id: number;
  text: string;
  style: string;
  tag: string;
};

export function buildBuzzPrompt(topic: string, styles: string[], count: number): string {
  const chosen = styles.length ? styles : ["先にオチ", "落差", "つまり"];
  const perStyle = Math.max(1, Math.floor(count / chosen.length));
  const subject = topic.trim() || "（記事本文）";
  return `以下の記事だけを材料に、Xの投稿を${count}本書いて。JSONだけ返す。

【記事】
${subject}

【構文】
${STYLE_DEFS}

【使う構文】
${chosen.join("、")}
各構文をだいたい${perStyle}本。1本につき構文は1つ。

【ルール】
・記事に書いてある事実だけ使う
・数字、発言、金額を作らない
・「これが日本の現実」「うががが」「生活は豊かになりましたか」「想像の100倍でダメ」で締めない
・各投稿140字以内。時系列だけ220字まで
・話し言葉。絵文字は足さない

${FORMAT_RULES}`;
}

function cleanTitle(title: string): string {
  return title.replace(/[（(][^）)]*[）)]/g, "").replace(/\s+/g, " ").trim();
}

function sentences(excerpt: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of excerpt.split(/[。！？\n]/)) {
    const text = part.replace(/\s+/g, " ").trim();
    if (text.length < 8) continue;
    if (/放送分|著作権|写真は|画像は|画像提供|関連記事|続きを読む/.test(text)) continue;
    if (seen.has(text)) continue;
    seen.add(text);
    out.push(text);
  }
  return out;
}

function withPeriod(text: string): string {
  const value = text.trim();
  if (!value) return value;
  return /[。！？」]$/.test(value) ? value : `${value}。`;
}

function clip(text: string, max: number): string {
  const value = text.trim();
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  const marks = ["。", "\n", "」", "！", "？", "、"];
  let best = -1;
  for (const mark of marks) {
    const at = cut.lastIndexOf(mark);
    if (at > best) best = at;
  }
  if (best >= 40) {
    const end = cut[best] === "\n" ? best : best + 1;
    return cut.slice(0, end).trim();
  }
  return `${cut.slice(0, max - 1).trim()}…`;
}

function figuresIn(text: string): string[] {
  const re =
    /[0-9０-９]+(?:[,，][0-9０-９]{3})*(?:[.．][0-9０-９]+)?[万億兆]?(?:円|％|%|人|件|年|倍|社|ポイント|ドル)?/g;
  const out: string[] = [];
  for (const match of text.matchAll(re)) {
    const token = match[0].replace(/[,，\s]/g, "");
    const digits = token.replace(/[^0-9０-９]/g, "");
    if (/^[12１２][0-9０-９]{3}年?$/.test(token)) continue;
    const hasUnit = /[円％%人件倍社]|ポイント|ドル|[万億兆]/.test(token);
    if (/年$/.test(token) && digits.length > 2) continue;
    if (!hasUnit && digits.length < 3) continue;
    out.push(token);
  }
  return out;
}

function bestFigure(text: string, yenOnly: boolean): string | null {
  const all = figuresIn(text);
  const yen = all.filter((token) => token.includes("円"));
  if (yenOnly) return yen[0] ?? null;
  return yen[0] ?? all[0] ?? null;
}

function digitsOf(token: string): string {
  return token.replace(/[^0-9０-９]/g, "");
}

function lineWith(lines: string[], head: string, token: string): string {
  const digits = digitsOf(token);
  return lines.find((line) => line.includes(digits)) ?? (head.includes(digits) ? head : lines[0] ?? head);
}

function titleFragments(title: string): string[] {
  const head = cleanTitle(title);
  const spaced = head
    .split(/[\s　、。・／/|｜]+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 2);
  if (spaced.length >= 2) return spaced.slice(0, 3);
  const chunks: string[] = [];
  let rest = head;
  while (rest.length > 8 && chunks.length < 2) {
    const rel = rest.slice(4, 16).search(/[はがをにでとへ]/);
    if (rel < 0) break;
    const at = 4 + rel + 1;
    chunks.push(rest.slice(0, at).trim());
    rest = rest.slice(at).trim();
  }
  if (rest) chunks.push(rest);
  const usable = chunks.filter((part) => part.length >= 2);
  return (usable.length >= 2 ? usable : [head]).slice(0, 3);
}

function sharpest(lines: string[], head: string): string {
  const numbered = lines.find((line) => bestFigure(line, false));
  if (numbered) return numbered;
  return lines[0] || head;
}

function punchDraft(lines: string[], head: string): string {
  const concrete = lines.filter((line) => !line.includes("「"));
  const pool = concrete.length ? concrete : lines;
  if (!pool.length) return clip(head, 140);
  const punch = pool[pool.length - 1];
  const cause = pool.length > 1 ? pool[pool.length - 2] : "";
  if (!cause) return clip(withPeriod(punch), 140);
  return clip(`${withPeriod(punch)}\n\n${withPeriod(cause)}`, 140);
}

function gapDraft(lines: string[], head: string): string {
  const contrast = lines.find((line) => /なのに|一方|しかし|にもかかわらず|反面/.test(line));
  if (contrast) return clip(withPeriod(contrast), 140);
  const facts = lines.length ? lines : [head];
  if (facts.length < 2) return clip(withPeriod(facts[0] ?? head), 140);
  const numbered = facts.find((line) => bestFigure(line, false));
  const first = numbered ?? facts[0];
  const second = facts.find((line) => line !== first);
  if (!second) return clip(withPeriod(first), 140);
  return clip(`${withPeriod(first)}\n\n${withPeriod(second)}`, 140);
}

function numberDraft(lines: string[], head: string): string {
  const figure = bestFigure(`${head}\n${lines.join("\n")}`, false);
  if (!figure) return clip(head, 140);
  const owner = lineWith(lines, head, figure);
  return clip(`${figure}。\n\n${withPeriod(owner)}`, 140);
}

function quoteDraft(lines: string[], head: string): string {
  const found = lines.join("\n").match(/「([^」]{4,120})」/);
  if (!found) return clip(withPeriod(sharpest(lines, head)), 140);
  const quote = `「${found[1].trim()}」`;
  const index = lines.findIndex((line) => line.includes(found[1]));
  const follow =
    lines.slice(index + 1).find((line) => !line.includes("「")) ??
    lines.slice(0, Math.max(index, 0)).reverse().find((line) => !line.includes("「"));
  if (!follow) return clip(quote, 140);
  return clip(`${quote}\n\n${withPeriod(follow)}`, 140);
}

function timelineDraft(lines: string[], head: string): string {
  const beats = (lines.length ? lines : [head]).slice(0, 3).map(withPeriod);
  if (beats.length === 1) return clip(beats[0], 220);
  const earlier = beats.slice(0, -1).join("\n");
  return clip(`${earlier}\n\n${beats[beats.length - 1]}`, 220);
}

function walletDraft(lines: string[], head: string): string {
  const figure = bestFigure(`${head}\n${lines.join("\n")}`, true);
  if (!figure) return clip(head, 140);
  const owner = lineWith(lines, head, figure);
  return clip(`${figure}。\n\n${withPeriod(owner)}`, 140);
}

function mentionsPeople(text: string): boolean {
  return /[0-9０-９]+人(?!員)|人々|(?<![員法])人が|(?<![員])人は|(?<![員])人を/.test(text);
}

function askDraft(lines: string[], head: string): string {
  const pool = [...lines, head].filter((line) => line.length > 0);
  const joined = pool.join("\n");
  let question = "誰が得する";
  let fact = lines[0] || head;
  if (/円|税/.test(joined)) {
    question = "誰が払う";
    fact = pool.find((line) => /円|税/.test(line)) ?? fact;
  } else if (mentionsPeople(joined)) {
    question = "どこへ行く";
    fact = pool.find((line) => mentionsPeople(line)) ?? fact;
  } else if (/(?<![0-9０-９])[0-9０-９]{1,2}年|期限|年内|までに/.test(joined)) {
    question = "まだ間に合う";
    fact = pool.find((line) => /(?<![0-9０-９])[0-9０-９]{1,2}年|期限|年内|までに/.test(line)) ?? fact;
  } else if (/方針|検討/.test(joined)) {
    question = "いつ決まる";
    fact = pool.find((line) => /方針|検討/.test(line)) ?? fact;
  }
  return clip(`${withPeriod(fact)}\n\n${question}。`, 140);
}

function styleDraft(styleId: string, title: string, excerpt: string): string {
  const head = cleanTitle(title) || title.trim();
  const lines = sentences(excerpt);
  switch (styleId) {
    case "先にオチ":
      return punchDraft(lines, head);
    case "落差":
      return gapDraft(lines, head);
    case "数字":
      return numberDraft(lines, head);
    case "つまり":
      return clip(`つまり、${head.replace(/[。！？]+$/g, "")}。`, 140);
    case "発言":
      return quoteDraft(lines, head);
    case "時系列":
      return timelineDraft(lines, head);
    case "財布":
      return walletDraft(lines, head);
    case "問い":
      return askDraft(lines, head);
    case "余白":
      return clip(titleFragments(head).join("\n\n"), 140);
    case "淡々":
      return clip((lines.length ? lines : [head]).slice(0, 3).map(withPeriod).join("\n"), 140);
    default:
      return clip(head, 140);
  }
}

export function draftBuzzPosts(
  title: string,
  excerpt: string | null | undefined,
  styles: string[],
  count: number,
): BuzzPost[] {
  return styles.slice(0, count).map((styleId, index) => ({
    id: index + 1,
    text: styleDraft(styleId, title, excerpt ?? ""),
    style: buzzStyles.find((style) => style.id === styleId)?.label ?? styleId,
    tag: "hook",
  }));
}

export function parseBuzzPosts(raw: string): BuzzPost[] {
  const match = raw.match(/\{[\s\S]*"posts"[\s\S]*\}/);
  if (!match) throw new Error("bad json");
  const parsed = JSON.parse(match[0]) as {
    posts?: { text?: string; style?: string; tag?: string }[];
  };
  return (parsed.posts ?? [])
    .map((post, index) => ({
      id: index + 1,
      text: (post.text ?? "").replace(/\\n/g, "\n"),
      style: post.style ?? "",
      tag: post.tag ?? "analysis",
    }))
    .filter((post) => post.text.trim());
}
