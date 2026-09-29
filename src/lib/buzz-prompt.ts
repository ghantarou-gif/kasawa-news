export const buzzStyles = [
  { id: "あーぁ", label: "あーぁ" },
  { id: "いちか", label: "いちか" },
  { id: "ソラピヨ", label: "ソラピヨ" },
] as const;

export type BuzzStyleId = (typeof buzzStyles)[number]["id"];

const STYLE_DEFS = `1. あーぁ: 1行目は【悲報】か【朗報】か【場面】。中身は記事の事実を「・」で最大4つ。発言は「」のまま1行。記事に「一方」「しかし」「なのに」があるときは、その前後を「↓」でつなぐ。箇条のあとに決まり文句は足さない。
2. いちか: 発言があるときは「」を先に置く。空行。「だったら、」のあとは、記事の別の事実を1文。発言がなければ、結末を1行、空行、主体。記事にない感情語は足さない。
3. ソラピヨ: 1行目は問い。数字があるなら「なんで{その数字}も{記事にある動作}するの？」。発言があって数字がなければ「{発言}」ってどういうこと？。空行。【主体】。その下に事実を短く。転回は「▶︎」。数字も発言もなければ、見出しを問いにして事実を積む。`;

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
  const chosen = styles.length ? styles : ["あーぁ", "いちか", "ソラピヨ"];
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
・あーぁは280字まで。いちかは200字まで。ソラピヨは220字まで
・話し言葉。絵文字の連打はしない。⁉️はソラピヨの問いだけ

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
    /[0-9０-９]+(?:[,，][0-9０-９]{3})*(?:[.．][0-9０-９]+)?(?:[万億兆][0-9０-９]+)*(?:[万億兆])?(?:千[0-9０-９]*)?(?:円|％|%|人|件|年|倍|社|ポイント|ドル)/g;
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

function shorten(text: string, max: number): string {
  const value = text.replace(/\s+/g, " ").trim();
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  let best = -1;
  for (const mark of ["、", "。", "」", " "]) {
    const at = cut.lastIndexOf(mark);
    if (at > best) best = at;
  }
  if (best >= 12) return cut.slice(0, best + (cut[best] === " " ? 0 : 1)).trim();
  return `${cut.slice(0, max - 1).trim()}…`;
}

function actor(head: string): string {
  const first = head.split(/[、\s　]/).find((part) => part.length >= 2) ?? head;
  return shorten(first, 18).replace(/[。！？]+$/g, "");
}

function frame(head: string): string {
  const scene = shorten(head, 36).replace(/[。！？]+$/g, "");
  if (/死亡|逮捕|誤|下落|被害|不起訴|炎上|批判|停止|殺到|流出/.test(head)) return `【悲報】${scene}`;
  if (/受賞|優勝|成功|回復|首位/.test(head)) return `【朗報】${scene}`;
  return `【${scene}】`;
}

function quoteIn(lines: string[]): { quote: string; index: number } | null {
  for (let index = 0; index < lines.length; index += 1) {
    const found = lines[index].match(/「([^」]{4,100})」/);
    if (found) return { quote: found[1].trim(), index };
  }
  return null;
}

function beat(line: string): string {
  const found = line.match(/「([^」]{4,80})」/);
  if (found) return `「${found[1].trim()}」`;
  return shorten(line, 96);
}

const ACTION = /誤送付|値上げ|値下げ|下落|上昇|供与|支援|逮捕|不起訴|廃止|増税|減税|閉鎖|流出|停止|殺到|改定|減額|増額|送付|破損/;

function aaaDraft(lines: string[], head: string): string {
  const label = frame(head);
  const contrast = lines.find((line) => /なのに|一方|しかし|にもかかわらず|反面/.test(line));
  if (contrast) {
    const other = lines.find((line) => line !== contrast) ?? head;
    return clip(`${label}\n${beat(other)}\n↓\n${beat(contrast)}`, 280);
  }
  const facts = (lines.length ? lines : [head]).slice(0, 4).map((line) => `・${beat(line)}`);
  return clip(`${label}\n${facts.join("\n")}`, 280);
}

function ichikaDraft(lines: string[], head: string): string {
  const found = quoteIn(lines);
  if (found) {
    const rest = lines.filter((line) => !line.includes(found.quote));
    const other = rest.find((line) => bestFigure(line, false)) ?? rest[rest.length - 1];
    if (other) return clip(`「${found.quote}」\n\nだったら、${shorten(other, 72)}。`, 200);
    return clip(`「${found.quote}」`, 200);
  }
  const facts = lines.length ? lines : [head];
  const punch = facts.find((line) => bestFigure(line, false)) ?? facts[facts.length - 1];
  const mid = facts.find((line) => line !== punch);
  const tail = [mid ? shorten(mid, 88) : "", actor(head)].filter(Boolean).join("\n");
  return clip(`${withPeriod(shorten(punch, 72))}\n\n${tail}`, 200);
}

function soraDraft(lines: string[], head: string): string {
  const who = actor(head);
  const figure = bestFigure(`${head}\n${lines.join("\n")}`, false);
  const found = quoteIn(lines);
  if (figure) {
    const owner = lineWith(lines, head, figure);
    const action = owner.match(ACTION)?.[0];
    const question = action ? `なんで${figure}も${action}するの？` : `なんで${figure}？`;
    return clip(`${question}\n\n【${who}】\n${shorten(owner, 120)}`, 220);
  }
  if (found) {
    const fact = lines.find((line) => !line.includes(found.quote)) ?? head;
    return clip(`「${shorten(found.quote, 42)}」ってどういうこと？\n\n【${who}】\n${shorten(fact, 52)}\n▶︎「${shorten(found.quote, 42)}」`, 220);
  }
  const stacked = (lines.length ? lines : [head]).slice(0, 3).map((line) => shorten(line, 42));
  return clip(`${shorten(head, 28)}？\n\n【${who}】\n${stacked.join("\n")}`, 220);
}

function styleDraft(styleId: string, title: string, excerpt: string): string {
  const head = cleanTitle(title) || title.trim();
  const lines = sentences(excerpt);
  switch (styleId) {
    case "あーぁ":
      return aaaDraft(lines, head);
    case "いちか":
      return ichikaDraft(lines, head);
    case "ソラピヨ":
      return soraDraft(lines, head);
    default:
      return clip(head, 200);
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
