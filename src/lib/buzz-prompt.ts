export const buzzStyles = [
  { id: "悲報", label: "悲報" },
  { id: "矢印", label: "矢印" },
  { id: "なんで", label: "なんで" },
  { id: "どういうこと", label: "どういうこと" },
  { id: "だったら", label: "だったら" },
  { id: "一言", label: "一言" },
  { id: "白枠", label: "白枠" },
  { id: "左右", label: "左右" },
  { id: "経緯", label: "経緯" },
  { id: "数字", label: "数字" },
] as const;

export type BuzzStyleId = (typeof buzzStyles)[number]["id"];

const STYLE_DEFS = `1. 悲報: 1行目は【悲報】か【朗報】か【場面】。記事の事実を「・」で最大4つ。発言は「」のまま1行。決まり文句は足さない。この並びは、2万いいねを超える速報（あーぁの箇条）で繰り返されている。
2. 矢印: 記事にある2つの事実を「↓」でつなぐ。対比の語（一方、しかし、なのに）が記事にあるときは、その語を残して前後をつなぐ。発言と別の事実があるときも「↓」でつなぐ。「なのに」は記事に無いなら書かない。
3. なんで: 数字があるときだけ、1行目を「なんで{その数字}も{記事にある動作}するの？」にする。空行。【主体】。その数字を含む文。数字が無い記事では「なんで」を書かない。この問いはそらぴよ型。
4. どういうこと: 記事に「」があるときだけ、「{発言}」ってどういうこと？。空行。【主体】。別の事実。▶︎「発言」。発言が無い記事ではこの問いも「」も書かない。
5. だったら: 記事に「」と別の事実があるときだけ、「」を先に置く。空行。「だったら、」のあとは、数字を含むほうの事実を1文。発言が無い記事では「だったら、」を書かない。いちか型。
6. 一言: 数字を含む文を1行。空行。別の事実。主体。記事に無い感情語は足さない。
7. 白枠: 先頭は「⬜️」。1行目は見出しを圧縮した事実。2行目は記事の次の事実。印象や評価は足さない。フィフィ型の白枠。
8. 左右: ▶︎主体、その事実。次の印は▶︎発言、▶︎その後、または見出しに実際にあるもう一つの名前。見出しに無い相手は作らない。
9. 経緯: 【経緯】。事実を「・」で最大4つ。最後に「←今ここ」。これは最後の事実を指す印で、新しい主張ではない。
10. 数字: 数字だけを1行目に置く。空行。その数字を含む文。数字が無い記事は見出しだけ。`;

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
  const chosen = styles.length ? styles : ["悲報", "なんで", "だったら"];
  const perStyle = Math.max(1, Math.floor(count / chosen.length));
  const subject = topic.trim() || "（記事本文）";
  return `以下の記事だけを材料に、Xの投稿を${count}本書いて。JSONだけ返す。

この10種は、2万いいねを超える日本人の投稿で繰り返されている切り方です。アカウントの文章は写さない。この記事の事実だけを、1投稿につき1つの切り方へ入れる。

【記事】
${subject}

【構文】
${STYLE_DEFS}

【使う構文】
${chosen.join("、")}
各構文をだいたい${perStyle}本。1本につき構文は1つ。

【ルール】
・記事に書いてある事実だけ使う
・数字、発言、金額、相手を作らない
・「なんで」「だったら」「ってどういうこと」は、記事にその材料があるときだけ
・「これが日本の現実」「うががが」「生活は豊かになりましたか」「想像の100倍でダメ」「マジで狂ってる」「これが日本のリアル」で締めない
・悲報と経緯は280字まで。それ以外は220字まで
・話し言葉。絵文字の連打はしない

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
  let end = best >= 12 ? best + (cut[best] === " " ? 0 : 1) : max - 1;
  for (const token of figuresIn(value)) {
    const at = value.indexOf(token);
    if (at >= 0 && at < end && at + token.length > end) end = at + token.length;
  }
  const sliced = value.slice(0, end).trim();
  if (end < value.length && best < 12) return `${sliced}…`;
  return sliced;
}

function actor(head: string): string {
  const first = head.split(/[、\s　]/).find((part) => part.length >= 2) ?? head;
  return shorten(first, 18).replace(/[。！？]+$/g, "");
}

function frame(head: string, lines: string[]): string {
  const scene = shorten(head, 36).replace(/[。！？]+$/g, "");
  const blob = `${head}\n${lines.join("\n")}`;
  if (/死亡|逮捕|誤|下落|被害|不起訴|炎上|批判|停止|殺到|流出/.test(blob)) return `【悲報】${scene}`;
  if (/受賞|優勝|成功|回復|首位/.test(blob)) return `【朗報】${scene}`;
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

function secondName(head: string, first: string): string | null {
  const rest = head.split(/[、]/).slice(1).join("、").trim();
  if (rest.length < 2) return null;
  const cut = (rest.split(/[のがをはでにとへ、\s　]/)[0] ?? "").replace(/[。！？]+$/g, "");
  const named = cut.match(/^([A-Za-z0-9&.]+|[一-龯]*[ァ-ヶー]{2,}[A-Za-z0-9]*|[一-龯]{2,8}(?:社|省|庁|党|銀行|会|大学|新聞|放送))/);
  const name = named?.[1] ?? "";
  if (name.length < 2 || name.length > 16 || name === first) return null;
  return name;
}

const ACTION =
  /誤送付|値上げ|値下げ|下落|上昇|供与|支援|逮捕|不起訴|廃止|増税|減税|閉鎖|流出|停止|殺到|改定|減額|増額|送付|破損/;

function hihoDraft(lines: string[], head: string): string {
  const label = frame(head, lines);
  const facts = (lines.length ? lines : [head]).slice(0, 4).map((line) => `・${beat(line)}`);
  return clip(`${label}\n${facts.join("\n")}`, 280);
}

function arrowDraft(lines: string[], head: string): string {
  const contrast = lines.find((line) => /なのに|一方|しかし|にもかかわらず|反面/.test(line));
  if (contrast) {
    const other = lines.find((line) => line !== contrast) ?? head;
    return clip(`${beat(other)}\n↓\n${beat(contrast)}`, 220);
  }
  const found = quoteIn(lines);
  if (found) {
    const other = lines.find((line) => !line.includes(found.quote)) ?? head;
    return clip(`${beat(other)}\n↓\n「${found.quote}」`, 220);
  }
  const facts = lines.length ? lines : [head];
  if (facts.length >= 2) return clip(`${beat(facts[0])}\n↓\n${beat(facts[1])}`, 220);
  return clip(beat(facts[0] ?? head), 220);
}

function nandeDraft(lines: string[], head: string): string {
  const who = actor(head);
  const figure = bestFigure(`${head}\n${lines.join("\n")}`, false);
  if (!figure) {
    const stacked = (lines.length ? lines : [head]).slice(0, 2).map((line) => shorten(line, 96));
    return clip(`【${who}】\n${stacked.join("\n")}`, 220);
  }
  const owner = lineWith(lines, head, figure);
  const action = owner.match(ACTION)?.[0] ?? head.match(ACTION)?.[0];
  const question = action ? `なんで${figure}も${action}するの？` : `なんで${figure}？`;
  return clip(`${question}\n\n【${who}】\n${shorten(owner, 120)}`, 220);
}

function douDraft(lines: string[], head: string): string {
  const who = actor(head);
  const found = quoteIn(lines);
  if (!found) {
    const stacked = (lines.length ? lines : [head]).slice(0, 2).map((line) => shorten(line, 96));
    return clip(`【${who}】\n${stacked.join("\n")}`, 220);
  }
  const fact = lines.find((line) => !line.includes(found.quote)) ?? head;
  return clip(
    `「${shorten(found.quote, 42)}」ってどういうこと？\n\n【${who}】\n${shorten(fact, 80)}\n▶︎「${shorten(found.quote, 42)}」`,
    220,
  );
}

function hitokotoDraft(lines: string[], head: string): string {
  const facts = lines.length ? lines : [head];
  const punch = facts.find((line) => bestFigure(line, false)) ?? facts[facts.length - 1];
  const mid = facts.find((line) => line !== punch);
  const tail = [mid ? shorten(mid, 88) : "", actor(head)].filter(Boolean).join("\n");
  return clip(`${withPeriod(shorten(punch, 96))}\n\n${tail}`, 220);
}

function dattaraDraft(lines: string[], head: string): string {
  const found = quoteIn(lines);
  if (!found) return hitokotoDraft(lines, head);
  const rest = lines.filter((line) => !line.includes(found.quote));
  const other = rest.find((line) => bestFigure(line, false)) ?? rest[rest.length - 1];
  if (!other) return clip(`「${found.quote}」`, 220);
  return clip(`「${found.quote}」\n\nだったら、${shorten(other, 96)}。`, 220);
}

function shiroDraft(lines: string[], head: string): string {
  const news = shorten(head, 72);
  const next = lines.find((line) => !news.includes(line.slice(0, 12)));
  return clip(next ? `⬜️${news}\n${shorten(next, 96)}` : `⬜️${news}`, 220);
}

function sayuuDraft(lines: string[], head: string): string {
  const who = actor(head);
  const facts = lines.length ? lines : [head];
  const found = quoteIn(lines);
  if (found) {
    const other = facts.find((line) => !line.includes(found.quote)) ?? head;
    return clip(`▶︎${who}\n${beat(other)}\n▶︎発言\n「${found.quote}」`, 220);
  }
  const named = secondName(head, who);
  const about = named ? facts.find((line) => line.includes(named)) : undefined;
  if (named && about) {
    const other = facts.find((line) => line !== about) ?? head;
    return clip(`▶︎${who}\n${beat(other)}\n▶︎${named}\n${beat(about)}`, 220);
  }
  const second = facts.find((line) => line !== facts[0]);
  if (!second) return clip(`▶︎${who}\n${beat(facts[0] ?? head)}`, 220);
  return clip(`▶︎${who}\n${beat(facts[0])}\n▶︎その後\n${beat(second)}`, 220);
}

function keiiDraft(lines: string[], head: string): string {
  const facts = (lines.length ? lines : [head]).slice(0, 4).map((line) => `・${beat(line)}`);
  return clip(`【経緯】\n${facts.join("\n")}\n←今ここ`, 280);
}

function numberDraft(lines: string[], head: string): string {
  const figure = bestFigure(`${head}\n${lines.join("\n")}`, false);
  if (!figure) return clip(shorten(head, 80), 220);
  const owner = lineWith(lines, head, figure);
  return clip(`${figure}\n\n${withPeriod(shorten(owner, 140))}`, 220);
}

function styleDraft(styleId: string, title: string, excerpt: string): string {
  const head = cleanTitle(title) || title.trim();
  const lines = sentences(excerpt);
  switch (styleId) {
    case "悲報":
      return hihoDraft(lines, head);
    case "矢印":
      return arrowDraft(lines, head);
    case "なんで":
      return nandeDraft(lines, head);
    case "どういうこと":
      return douDraft(lines, head);
    case "だったら":
      return dattaraDraft(lines, head);
    case "一言":
      return hitokotoDraft(lines, head);
    case "白枠":
      return shiroDraft(lines, head);
    case "左右":
      return sayuuDraft(lines, head);
    case "経緯":
      return keiiDraft(lines, head);
    case "数字":
      return numberDraft(lines, head);
    default:
      return clip(head, 220);
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
