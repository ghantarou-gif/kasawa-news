import type { Locale } from "./locale";

/** Subscriber-only chapters built from @tanpukunokami analytics (x-playbook/). */

export type Template = {
  no: string;
  name: string;
  goal: string;
  skeleton: string;
  proof: string;
};

export type ChecklistGroup = { heading: string; items: readonly string[] };

export type FrequencyRow = { posts: string; reach: string; follows: string; peak?: boolean };

export type MemberChapters = {
  intro: string;
  templates: {
    title: string;
    lead: string;
    purposeHeading: string;
    purposes: readonly { goal: string; use: string }[];
    items: readonly Template[];
  };
  checklist: {
    title: string;
    lead: string;
    groups: readonly ChecklistGroup[];
    stop: { heading: string; items: readonly string[] };
  };
  frequency: {
    title: string;
    lead: string;
    columns: readonly [string, string, string];
    rows: readonly FrequencyRow[];
    points: readonly string[];
    splitHeading: string;
    split: string;
  };
  tool: {
    title: string;
    lead: string;
    pick: string;
    draft: string;
    placeholder: string;
    length: string;
    target: string;
    warnLink: string;
    warnJapanese: string;
    warnShort: string;
    warnLong: string;
    ok: string;
    copy: string;
    copied: string;
    save: string;
    saved: string;
    empty: string;
    remove: string;
  };
};

const skeletons = {
  to: `To [the people who disagree with you], there is something I want to say honestly.
[The one fact you will not give up, in one line].
[Example 1]. [Example 2]. [Example 3].
[A cold closing line, or a question].`,
  flip: `I heard [their criticism].
So let me ask one simple question.
If I went to your country and demanded:
"[Demand 1]" "[Demand 2]" "[Demand 3]"
Wouldn't that make you angry?`,
  three: `To [audience], I prepared [a gift / a guide] for you.
Not [ordinary thing 1]. Not [ordinary thing 2]. Not [ordinary thing 3].
[The twist, in a few words].`,
  confess: `[I / my company / my family] used to [what we did].
But now, [we never will again / I changed my mind].
The reason is very real. [The concrete reasons from the ground].`,
  contrast: `A lot of [people] come to Japan for [three famous things].
Then somehow they leave talking about [something plain].
I know it sounds stupid. But [describe its charm, flatly].`,
  flags: `Me: "[The question you raised]"
Then people overseas replied:
🇺🇸 "..." 🇨🇦 "..." 🇰🇷 "..." 🇬🇧 "..." 🇫🇷 "..."
[The realization, or the irony].`,
  punch: `[A surprising confession]. [One strong claim]. [One short final push].`,
  selfJoke: `In Japan, [describe the polite, careful culture].
In [Texas / America], I [my own big failure, as a scene].
[An exaggerated punchline against myself].`,
  trivia: `[Did you know / In Japan] [the surprising fact].
[Details, levels, history, or numbers].
[A light question or a punchline].`,
  ask: `[A light opener from your own life].
[A genuine question for the reader]?`,
  alarm: `This is what's happening in Japan right now.
[Facts, data, a concrete case from the ground].
[A closing warning or question].`,
  story: `[A chance encounter].
[How I got hooked, in order].
Then one day, [the turning point].
[Stop here so they want the rest].`,
  vote: `[The topic, in one line].
① [Option 1] ② [Option 2] ③ [Option 3] ④ [Option 4]
Which one [goes first / wins]?`,
  usa: `USA. [Place]. [What I did].
"[What they said]."
[That one word]. I froze.
In my land, [the ritual it takes years to earn].`,
  thesis: `I think [your claim].
They say "[the pushback]".
The answer is pretty simple. Because [the reason from the ground].`,
  name: `There's a [chain / word / person] in Japan called [proper noun].
[Origin, era, numbers].
[What it means now, or a light punchline].`,
  feeling: `I can't stop crying. / I'm not crying, you're crying.
[What happened]. [Who did it?]
[+ image]`,
} as const;

export const memberChapters: Record<Locale, MemberChapters> = {
  ja: {
    intro:
      "ここから下は、@tanpukunokami の実データ（オリジナル投稿700本・1,690万インプ、1年分のアカウント集計4,094本・1.22億インプ）から作った会員向けの章です。",
    templates: {
      title: "勝ち型17構文",
      lead:
        "伸びた投稿を骨格だけにしたものです。[ ] を埋めて英語で書きます。英語は日本語の約2.3倍インプが出ました。数字はその型の代表投稿の実績です。",
      purposeHeading: "目的で選ぶ",
      purposes: [
        { goal: "最大リーチ", use: "① ② ④ ⑮" },
        { goal: "安全に伸ばす（炎上しにくい）", use: "⑯ ⑤ ⑨" },
        { goal: "リプと会話を増やす", use: "⑩ ⑬ ⑥" },
        { goal: "フォロワーを増やす", use: "⑭ ⑫ と、場面のある⑧" },
        { goal: "時事・社会問題", use: "② ⑪。⑰と⑦は本物の速報のときだけ" },
      ],
      items: [
        {
          no: "①",
          name: "直接呼びかけ",
          goal: "相手に正面から語りかけ、賛否を割って引用とリプを呼ぶ。呼びかける相手は、反論してくる側にする。",
          skeleton: skeletons.to,
          proof: "最大 224万インプ",
        },
        {
          no: "②",
          name: "立場逆転の問いかけ",
          goal: "相手の理屈をそのまま相手に返し、読者に「確かに」と言わせる。",
          skeleton: skeletons.flip,
          proof: "73万インプ",
        },
        {
          no: "③",
          name: "三段オチ",
          goal: "否定を3回重ねてリズムを作り、最後の一言で裏切る。エンゲージ率が最強クラス。",
          skeleton: skeletons.three,
          proof: "28万インプ・エンゲージ5.9万",
        },
        {
          no: "④",
          name: "告白・体験",
          goal: "一人称の内情で、信頼と当事者感を出す。",
          skeleton: skeletons.confess,
          proof: "49万インプ",
        },
        {
          no: "⑤",
          name: "意外な対比",
          goal: "期待と現実のずれで「わかる」を起こす。炎上しにくい。",
          skeleton: skeletons.contrast,
          proof: "56万インプ",
        },
        {
          no: "⑥",
          name: "海外リアクション列挙",
          goal: "国旗と一言を並べ、「世界共通なんだ」という共感で広げる。",
          skeleton: skeletons.flags,
          proof: "25万インプ",
        },
        {
          no: "⑦",
          name: "短い一撃",
          goal: "一言がそのままニュースになる時事のときだけ使う。日常の埋め草にすると中央値4,350まで落ちる。",
          skeleton: skeletons.punch,
          proof: "46万インプ（当たった回のみ）",
        },
        {
          no: "⑧",
          name: "日米対比の自虐",
          goal: "日本の気遣いと自分の失敗談で、笑いと文化紹介を両立する。場面（I entered / I froze）が無いなら⑨にする。",
          skeleton: skeletons.selfJoke,
          proof: "70万インプ／場面ありで1本281フォロー",
        },
        {
          no: "⑨",
          name: "意外な日本の豆知識",
          goal: "「へぇ」を渡す。保存と引用が付きやすい。",
          skeleton: skeletons.trivia,
          proof: "19万インプ",
        },
        {
          no: "⑩",
          name: "問いかけ・巻き込み",
          goal: "インプは中くらいだがリプが大量に付き、初速が上がる。",
          skeleton: skeletons.ask,
          proof: "2.6万〜3.3万インプ",
        },
        {
          no: "⑪",
          name: "警鐘・現状報告",
          goal: "「今こうなっている」を事実で示す。立場がはっきりした投稿と相性がいい。",
          skeleton: skeletons.alarm,
          proof: "2.9万〜3.3万インプ",
        },
        {
          no: "⑫",
          name: "物語・学びの旅",
          goal: "時系列で感情移入させ、プロフィールに飛ばす。途中で切る。",
          skeleton: skeletons.story,
          proof: "21万インプ・1本で1,115フォロー",
        },
        {
          no: "⑬",
          name: "選択・投票",
          goal: "選ばせてリプと引用を呼ぶ。軽く量産できる。",
          skeleton: skeletons.vote,
          proof: "2.6万インプ",
        },
        {
          no: "⑭",
          name: "USA場面の短文連打",
          goal: "場所を一言で置き、相手の一語で固まり、日本側の儀式で返す。フォローが付く効率は①の約10倍。",
          skeleton: skeletons.usa,
          proof: "7本すべて2万超・1万インプあたり13.9フォロー",
        },
        {
          no: "⑮",
          name: "主張＋Because",
          goal: "1文目で言い切り、反論を引用し、Because で折る。量産しても2万を割りにくいリーチの安定枠。",
          skeleton: skeletons.thesis,
          proof: "13本すべて2万超・中央値5.5万",
        },
        {
          no: "⑯",
          name: "名前の由来",
          goal: "固有名詞を1文目に置いて由来を語る。炎上しない安全な2万。フォローは弱い。",
          skeleton: skeletons.name,
          proof: "6本すべて2万超・最大19万",
        },
        {
          no: "⑰",
          name: "感情先置き（速報のみ）",
          goal: "1文目を感情だけにする。再現は運なので日常運用に入れない。同じ書き出しの再投稿は5千で止まった。",
          skeleton: skeletons.feeling,
          proof: "150万インプ（1回限り）",
        },
      ],
    },
    checklist: {
      title: "毎日のチェックリスト",
      lead: "投稿ボタンを押す前に上から確認します。チェックはこの画面の中だけで、保存はされません。",
      groups: [
        {
          heading: "書く前",
          items: [
            "今日の目的を決めた（リーチの日か、フォローの日か）",
            "使う構文を17の中から決めた",
            "①なら、呼びかける相手は反論してくる側にした",
          ],
        },
        {
          heading: "書いたあと",
          items: [
            "英語で書いた",
            "1文目だけで主張が伝わる",
            "250〜300字ある（途中で切れて Show more が出てもいい）",
            "立場がはっきりしている",
            "本文に外部リンクを入れていない（貼るならリプ欄）",
            "⑧なら場面（I entered / I froze）がある。豆知識だけなら⑯か⑨にした",
          ],
        },
        {
          heading: "出すとき",
          items: [
            "9〜11時（日本時間）に出す。⑭なら22〜4時も可。15〜17時は避ける",
            "今日は勝ち型だけで3〜5本。増やしても10本まで",
            "フォローの日は⑭を1〜2本入れた",
          ],
        },
      ],
      stop: {
        heading: "やめること（8月に伸びが薄まった原因）",
        items: [
          "日本語の雑談投稿",
          "食べ物の写真とリンクだけの投稿",
          "サービスやサイトのリンク宣伝",
          "返信の量産（インプの5%、フォロワー増の1%以下しか生まなかった）",
        ],
      },
    },
    frequency: {
      title: "1日の投稿本数",
      lead: "1年分（365日・4,094本・純増フォロワー+30,961）の集計です。本数を増やしても1日の合計インプは増えませんでした。",
      columns: ["1日の投稿数", "1本あたりの中央値インプ", "1日の純増フォロー"],
      rows: [
        { posts: "1〜5本", reach: "14,625", follows: "+103" },
        { posts: "6〜10本", reach: "44,092", follows: "+207", peak: true },
        { posts: "11〜20本", reach: "19,326", follows: "+167" },
        { posts: "21〜40本", reach: "11,262", follows: "+163" },
        { posts: "41〜80本", reach: "5,166", follows: "+103" },
        { posts: "81本以上", reach: "3,047", follows: "+45" },
      ],
      points: [
        "投稿数と1日の合計インプの相関は -0.07。11〜20本で頭打ちになります。",
        "81本以上の日は、フォロー増が +207 から +45 まで落ちました。",
        "フォローを生むのは量ではなく「見られる質」です（インプとフォローの相関 0.56、プロフィール訪問とフォローの相関 0.58）。",
        "5〜6月の投稿単位で見ると3〜5本の日の中央値が最も高く（17,263 対 11,976）、6〜10本にするなら足す分は⑭⑮⑤だけにします。",
        "結論：勝ち型以外を足して本数を稼がない。11本以上はやらない。",
      ],
      splitHeading: "リーチとフォローは別のゲーム",
      split:
        "同じ1万インプでも、⑭は①の約10倍フォローが付きました（13.9 対 1.4）。リーチを取る週とフォローを取る週を混ぜて回します。",
    },
    tool: {
      title: "構文メーカー＆ネタ帳",
      lead: "構文を選ぶと骨格が入ります。[ ] を埋めると、チェックリストの一部を自動で確認します。下書きはこのブラウザだけに保存されます。",
      pick: "構文",
      draft: "下書き",
      placeholder: "構文を選ぶか、ここに書く",
      length: "文字数",
      target: "目安 250〜300字",
      warnLink: "本文にリンクがあります。リプ欄へ移してください。",
      warnJapanese: "日本語が混ざっています。英語のほうが約2.3倍伸びます。",
      warnShort: "短すぎます。⑦以外は250字前後まで書きます。",
      warnLong: "長すぎます。X の上限に近づいています。",
      ok: "形はOK。1文目で主張が伝わるかだけ読み直してください。",
      copy: "コピー",
      copied: "コピーしました",
      save: "ネタ帳に保存",
      saved: "ネタ帳",
      empty: "まだ保存はありません。",
      remove: "削除",
    },
  },
  en: {
    intro:
      "The chapters below come from @tanpukunokami's own data: 700 original posts with 16.9M impressions, plus a full year of account totals (4,094 posts, 122M impressions).",
    templates: {
      title: "17 winning templates",
      lead:
        "Each one is a post that spread, cut down to its skeleton. Fill the [ ] and write in English, which drew about 2.3x the impressions of Japanese. The number is the result of the post that defines the template.",
      purposeHeading: "Pick by goal",
      purposes: [
        { goal: "Maximum reach", use: "① ② ④ ⑮" },
        { goal: "Grow safely (low backlash)", use: "⑯ ⑤ ⑨" },
        { goal: "More replies and conversation", use: "⑩ ⑬ ⑥" },
        { goal: "More followers", use: "⑭ ⑫, and ⑧ with a scene" },
        { goal: "News and social issues", use: "② ⑪. ⑰ and ⑦ only for real breaking news" },
      ],
      items: [
        { no: "①", name: "Direct address", goal: "Speak straight to the people who push back, split opinion, and draw quotes and replies.", skeleton: skeletons.to, proof: "Up to 2.24M impressions" },
        { no: "②", name: "Turn the tables", goal: "Hand their logic back to them so readers say, \"fair point.\"", skeleton: skeletons.flip, proof: "733K impressions" },
        { no: "③", name: "Three nots and a twist", goal: "Three denials set a rhythm; the last line breaks it. Top-tier engagement rate.", skeleton: skeletons.three, proof: "283K impressions, 59K engagements" },
        { no: "④", name: "Confession", goal: "Inside detail in the first person builds trust.", skeleton: skeletons.confess, proof: "487K impressions" },
        { no: "⑤", name: "Unexpected contrast", goal: "The gap between expectation and reality makes people nod. Low backlash.", skeleton: skeletons.contrast, proof: "557K impressions" },
        { no: "⑥", name: "Reactions from abroad", goal: "Flags and one-liners show it is the same everywhere.", skeleton: skeletons.flags, proof: "246K impressions" },
        { no: "⑦", name: "Short punch", goal: "Only when the one-liner is itself the news. As daily filler the median fell to 4,350.", skeleton: skeletons.punch, proof: "460K impressions (hits only)" },
        { no: "⑧", name: "Japan vs America, at my expense", goal: "Japanese courtesy plus my own failure: a laugh and a culture lesson. No scene (I entered / I froze)? Use ⑨.", skeleton: skeletons.selfJoke, proof: "703K impressions; 281 follows from one scene post" },
        { no: "⑨", name: "Surprising Japan fact", goal: "Give readers a \"huh.\" Gets saved and quoted.", skeleton: skeletons.trivia, proof: "190K impressions" },
        { no: "⑩", name: "Ask the reader", goal: "Middling reach, but lots of replies, which lifts early momentum.", skeleton: skeletons.ask, proof: "26K–33K impressions" },
        { no: "⑪", name: "Ground report", goal: "Show what is happening now, with facts. Pairs well with a clear stance.", skeleton: skeletons.alarm, proof: "29K–33K impressions" },
        { no: "⑫", name: "Story of a journey", goal: "Pull readers in over time and send them to your profile. Cut it off midway.", skeleton: skeletons.story, proof: "207K impressions, 1,115 follows from one post" },
        { no: "⑬", name: "Pick one", goal: "Make people choose to draw replies and quotes. Light and easy to repeat.", skeleton: skeletons.vote, proof: "26K impressions" },
        { no: "⑭", name: "USA scene, short lines", goal: "Set the place, freeze on one word, answer with a Japanese ritual. About 10x the follows of ①.", skeleton: skeletons.usa, proof: "7 of 7 over 20K; 13.9 follows per 10K impressions" },
        { no: "⑮", name: "Thesis + because", goal: "State it in line one, quote the pushback, break it with Because. Reach that holds when repeated.", skeleton: skeletons.thesis, proof: "13 of 13 over 20K; median 55K" },
        { no: "⑯", name: "Where the name comes from", goal: "Put the proper noun first and tell its origin. A safe 20K; weak on follows.", skeleton: skeletons.name, proof: "6 of 6 over 20K; up to 190K" },
        { no: "⑰", name: "Feeling first (breaking news only)", goal: "Line one is only emotion. It is luck, so keep it out of daily use. A repeat opener stalled at 5K.", skeleton: skeletons.feeling, proof: "1.5M impressions (once)" },
      ],
    },
    checklist: {
      title: "Daily checklist",
      lead: "Go top to bottom before you post. Ticks stay on this screen only and are not saved.",
      groups: [
        {
          heading: "Before writing",
          items: [
            "Decided today's goal: reach or follows",
            "Picked one of the 17 templates",
            "For ①, the person addressed is the side that pushes back",
          ],
        },
        {
          heading: "After writing",
          items: [
            "Written in English",
            "The first sentence carries the whole claim",
            "250–300 characters (a Show more cut is fine)",
            "The stance is clear",
            "No outside link in the body (put it in a reply)",
            "For ⑧, there is a scene (I entered / I froze); trivia alone goes to ⑯ or ⑨",
          ],
        },
        {
          heading: "When posting",
          items: [
            "Post 9–11 a.m. JST; ⑭ also works 10 p.m.–4 a.m.; avoid 3–5 p.m.",
            "3–5 posts today, winning templates only; never more than 10",
            "On a follows day, include one or two ⑭",
          ],
        },
      ],
      stop: {
        heading: "Stop doing (what thinned growth in August)",
        items: [
          "Casual posts in Japanese",
          "A food photo with only a link",
          "Link posts promoting a service or site",
          "Mass replies (5% of impressions, under 1% of follower growth)",
        ],
      },
    },
    frequency: {
      title: "Posts per day",
      lead: "One year of totals: 365 days, 4,094 posts, +30,961 net followers. More posts did not raise total daily impressions.",
      columns: ["Posts per day", "Median impressions per post", "Net follows per day"],
      rows: [
        { posts: "1–5", reach: "14,625", follows: "+103" },
        { posts: "6–10", reach: "44,092", follows: "+207", peak: true },
        { posts: "11–20", reach: "19,326", follows: "+167" },
        { posts: "21–40", reach: "11,262", follows: "+163" },
        { posts: "41–80", reach: "5,166", follows: "+103" },
        { posts: "81+", reach: "3,047", follows: "+45" },
      ],
      points: [
        "The correlation between post count and total daily impressions is -0.07. It plateaus at 11–20.",
        "On days with 81 or more posts, follows fell from +207 to +45.",
        "Follows come from being seen, not from volume (impressions vs follows 0.56; profile visits vs follows 0.58).",
        "Per post in May–June, 3–5 a day had the best median (17,263 vs 11,976). If you go to 6–10, add only ⑭ ⑮ ⑤.",
        "Bottom line: never pad the count with weaker posts. Never go past 10.",
      ],
      splitHeading: "Reach and follows are different games",
      split:
        "Per 10K impressions, ⑭ drew about 10x the follows of ① (13.9 vs 1.4). Alternate reach weeks and follows weeks.",
    },
    tool: {
      title: "Template maker & idea notebook",
      lead: "Pick a template to load its skeleton. Fill the [ ] and part of the checklist is checked for you. Drafts are saved in this browser only.",
      pick: "Template",
      draft: "Draft",
      placeholder: "Pick a template or start writing",
      length: "Characters",
      target: "Aim for 250–300",
      warnLink: "There is a link in the body. Move it to a reply.",
      warnJapanese: "There is Japanese in it. English drew about 2.3x more.",
      warnShort: "Too short. Except for ⑦, aim for about 250.",
      warnLong: "Too long. You are near X's limit.",
      ok: "Shape is fine. Reread only to check line one carries the claim.",
      copy: "Copy",
      copied: "Copied",
      save: "Save to notebook",
      saved: "Notebook",
      empty: "Nothing saved yet.",
      remove: "Delete",
    },
  },
};
