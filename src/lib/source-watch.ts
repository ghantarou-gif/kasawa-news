import type { Locale } from "./locale";

/**
 * Members-only log of viral claims about Islam and Muslims in Japan, traced
 * back to the original footage. Add new entries to the top. Never mark a
 * claim "confirmed" without a link to the original video or statement.
 */
export type WatchStatus = "confirmed" | "unverified" | "misleading" | "false";

export type WatchLink = { label: string; url: string };

type WatchText = {
  title: string;
  claim: string;
  origin: string;
  checked: string;
};

export type WatchEntry = {
  id: string;
  firstSeen: string;
  status: WatchStatus;
  spreaders: WatchLink[];
  sources: WatchLink[];
  text: Record<Locale, WatchText>;
};

export const watchEntries: readonly WatchEntry[] = [
  {
    id: "2026-10-tariq-masood-japan",
    firstSeen: "2026-10-11",
    status: "unverified",
    spreaders: [
      { label: "@Crazyunfill94 (Alpha Wolf)", url: "https://x.com/Crazyunfill94" },
      {
        label: "Colonel Otaku Gatekeeper (X mirror)",
        url: "https://www.24vids.com/video/we-will-turn-japan-into-japankhanpakistani-imam-mufti-tariq-masood-says-they-p-tw-2090041123507204234",
      },
    ],
    sources: [
      {
        label: "Japan 5th Bayan 2026 (DeenLife)",
        url: "https://www.deenlife.com/japan-5th-bayan-2026-mufti-tariq-masood-speeches-%f0%9f%95/",
      },
      {
        label: "The Last Bayan Of The Japan Tour 2026 (DeenLife)",
        url: "https://www.deenlife.com/the-last-bayan-of-the-japan-tour-2026-mufti-tariq-masood-speeches-%f0%9f%95/",
      },
      {
        label: "Geo News Tokyo interview (MAG The Weekly)",
        url: "https://magtheweekly.com/detail/27526-mufti-tariq-masood-defends-his-advocacy-of-multiple-marriages-highlights-support-for-widows-and-divorcees",
      },
    ],
    text: {
      ja: {
        title: "タリク・マスード師「日本人女性と結婚して70年で日本人は消える」",
        claim:
          "パキスタンの説教師が、日本のムスリムに日本人女性との結婚と多産を勧め、70年で日本人が消えると言った、という英語字幕つきの切り抜き。",
        origin:
          "2026年9月下旬の来日講話（ウルドゥー語、YouTubeで公開）からの切り抜きとみられる。日本語の投稿より約1か月前に、英語圏のX（旧Twitter）アカウントが「Japankhan」発言として拡散していた。",
        checked:
          "来日して講話を重ねたことは確認できる。「70年」「日本人が消える」という言い回しが元の講話にあるかは未確認。元動画の該当箇所と時刻を特定するまで、字幕は引用しない。",
      },
      en: {
        title: "Tariq Masood: “Marry Japanese women and the Japanese will be gone in 70 years”",
        claim:
          "An English-subtitled clip says a Pakistani preacher urged Muslims in Japan to marry Japanese women, have many children, and that the Japanese would vanish in 70 years.",
        origin:
          "Appears to be cut from his Urdu lectures on a Japan tour in late September 2026, published on YouTube. English-language X accounts spread it as the “Japankhan” remark about a month before the Japanese post.",
        checked:
          "The Japan tour and lectures are confirmed. Whether the original says “70 years” or “the Japanese will vanish” is not. Do not quote the subtitles until the timestamp in the original is found.",
      },
    },
  },
  {
    id: "2026-10-halal-street-interview",
    firstSeen: "2026-10-11",
    status: "unverified",
    spreaders: [{ label: "@Crazyunfill94 (Alpha Wolf)", url: "https://x.com/Crazyunfill94" }],
    sources: [],
    text: {
      ja: {
        title: "街頭インタビュー「ムスリムの要求に応え始めたら終わりがない」",
        claim:
          "日本の女性2人がハラール対応について聞かれ、1人が「応じ始めたら要求は増え続ける」と答え、もう1人も同意した、という英語字幕つきの動画。",
        origin:
          "元の街頭インタビュー動画（YouTubeかTikTok）はまだ見つかっていない。字幕の画面にもアルファウルフの透かしが入っており、字幕を付けたのは転載した側とみられる。",
        checked:
          "日本語の音声と英語字幕が一致しているかは未確認。元の動画を見つけて、発言の前後を聞いてから判断する。",
      },
      en: {
        title: "Street interview: “If we start catering to Muslims, there will be no end”",
        claim:
          "A subtitled clip says two Japanese women were asked about halal options; one said the demands would keep growing and the other agreed.",
        origin:
          "The original street interview (YouTube or TikTok) has not been found yet. The subtitled frames carry the Alpha Wolf watermark, so the reposter likely added the subtitles.",
        checked:
          "Whether the English subtitles match the Japanese audio is not confirmed. Find the original and hear the full exchange before using it.",
      },
    },
  },
];
