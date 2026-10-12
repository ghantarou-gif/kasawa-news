import type { Dictionary } from "./i18n";
import type { Locale } from "./locale";

/** Content pages inside the member area (hub `/members/x` is separate). */
export const memberSections = [
  "guide",
  "news",
  "sources",
  "templates",
  "checklist",
  "frequency",
  "tool",
] as const;

export type MemberSection = (typeof memberSections)[number];

const pathBySection: Record<MemberSection, string> = {
  guide: "guide",
  news: "news",
  sources: "sources",
  templates: "templates",
  checklist: "checklist",
  frequency: "frequency",
  tool: "tool",
};

const labelKey: Record<MemberSection, keyof Dictionary> = {
  guide: "memberNavGuide",
  news: "memberNavNews",
  sources: "memberNavSources",
  templates: "memberNavTemplates",
  checklist: "memberNavChecklist",
  frequency: "memberNavFrequency",
  tool: "memberNavTool",
};

const blurbKey: Record<MemberSection, keyof Dictionary> = {
  guide: "memberBlurbGuide",
  news: "memberBlurbNews",
  sources: "memberBlurbSources",
  templates: "memberBlurbTemplates",
  checklist: "memberBlurbChecklist",
  frequency: "memberBlurbFrequency",
  tool: "memberBlurbTool",
};

export function isMemberSection(value: string): value is MemberSection {
  return (memberSections as readonly string[]).includes(value);
}

export function memberHubHref(locale: Locale): string {
  return `/${locale}/members/x`;
}

export function memberHref(locale: Locale, section: MemberSection): string {
  return `/${locale}/members/x/${pathBySection[section]}`;
}

export function memberSectionLabel(copy: Dictionary, section: MemberSection): string {
  return String(copy[labelKey[section]]);
}

export function memberSectionBlurb(copy: Dictionary, section: MemberSection): string {
  return String(copy[blurbKey[section]]);
}
