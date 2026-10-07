import type { Locale } from "./locale";

/** Subscriber-only principles. Keep this module out of client components. */
export const editorGuide: Record<Locale, { items: readonly string[] }> = {
  ja: {
    items: [
      "投稿を書く前に「誰が反応するか」を決める",
      "ネタは自分の頭の中ではなくタイムラインから拾う",
      "伸びている投稿は文章ではなく「反応が起きた理由」を観察する",
      "投稿には必ず一つだけ主役となる感情を置く",
      "最初の一文は説明ではなく事件から始める",
      "読者が続きを想像できるくらいで止める",
      "書いた文章は「削る→口語化→具体化」の順で磨く",
      "AIには完成品を作らせるのではなく、編集者として使う",
      "投稿結果を「成功・失敗」ではなくデータとして残す",
      "当たった投稿は別角度から何度も再利用する",
      "バズった理由を自分の「型」に変える",
      "最後はフォロー・サイト・商品・収益へつなげる",
    ],
  },
  en: {
    items: [
      "Before you write, decide who will react.",
      "Take the topic from the timeline, not from inside your own head.",
      "On posts that spread, watch why people reacted, not the wording.",
      "Give every post exactly one lead emotion.",
      "Start the first line with an incident, not an explanation.",
      "Stop while the reader can still imagine what comes next.",
      "Revise in this order: cut, make it spoken, then make it concrete.",
      "Use AI as an editor, not as a machine that hands you a finished post.",
      "Keep the result as data, not as success or failure.",
      "Reuse a post that landed, from other angles, more than once.",
      "Turn the reason it spread into your own pattern.",
      "At the end, connect it to a follow, the site, a product, or revenue.",
    ],
  },
};
