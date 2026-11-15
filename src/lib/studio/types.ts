export const GOAL_TAGS = [
  "viral",
  "follow",
  "replies",
  "timely",
  "safe",
] as const;

export type GoalTag = (typeof GOAL_TAGS)[number];

export type SyntaxTemplate = {
  id: string;
  name: string;
  skeleton: string;
  intent: string;
  goals: GoalTag[];
  example: string;
};

export type Voice = {
  id: string;
  handle: string;
  displayName: string;
  language: "en" | "ja";
  rules: string[];
  templates: SyntaxTemplate[];
  builtin?: boolean;
};

export type StoryInput = {
  title: string;
  url: string;
  excerpt: string;
  source: string;
  notes: string;
};

export type GeneratedPost = {
  templateId: string;
  templateName: string;
  text: string;
  gloss: string;
  chars: number;
};

export type HeadlineOption = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  source: string;
};

export type StockPost = {
  id: string;
  text: string;
  gloss: string;
  templateId: string;
  templateName: string;
  createdAt: string;
  copiedAt: string | null;
};
