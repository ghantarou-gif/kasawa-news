"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { MemberChapters } from "@/lib/member-chapters";

const STORE_KEY = "nyanchu-member-notebook";

type Note = { id: string; text: string; at: string };

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRaw(): string {
  try {
    return localStorage.getItem(STORE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parseNotes(raw: string): Note[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Note[]) : [];
  } catch {
    return [];
  }
}

function warnings(text: string, copy: MemberChapters["tool"]): string[] {
  const out: string[] = [];
  const length = [...text].length;
  if (/https?:\/\/|www\./i.test(text)) out.push(copy.warnLink);
  if (/[\u3040-\u30ff\u4e00-\u9fff]/.test(text.replace(/[①-⑳]/g, ""))) out.push(copy.warnJapanese);
  if (length > 0 && length < 200) out.push(copy.warnShort);
  if (length > 320) out.push(copy.warnLong);
  return out;
}

export function MemberTool({ chapters }: { chapters: MemberChapters }) {
  const copy = chapters.tool;
  const [draft, setDraft] = useState("");
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  const notes = useMemo(() => parseNotes(raw), [raw]);
  const [copied, setCopied] = useState(false);

  function store(next: Note[]) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {}
    listeners.forEach((listener) => listener());
  }

  async function onCopy() {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const length = [...draft].length;
  const issues = draft.trim() ? warnings(draft, copy) : [];

  return (
    <div className="mt-6 max-w-2xl">
      <label className="block font-sans text-[13px] text-muted" htmlFor="member-template">
        {copy.pick}
      </label>
      <select
        id="member-template"
        defaultValue=""
        onChange={(event) => {
          const picked = chapters.templates.items.find((item) => item.no === event.target.value);
          if (picked) setDraft(picked.skeleton);
        }}
        className="mt-2 min-h-11 w-full rounded-full border border-ink bg-card px-4 text-[15px]"
      >
        <option value="" disabled>
          —
        </option>
        {chapters.templates.items.map((item) => (
          <option key={item.no} value={item.no}>
            {item.no} {item.name}
          </option>
        ))}
      </select>

      <label className="mt-5 block font-sans text-[13px] text-muted" htmlFor="member-draft">
        {copy.draft}
      </label>
      <textarea
        id="member-draft"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={copy.placeholder}
        rows={8}
        className="mt-2 w-full rounded-2xl border border-ink bg-card p-4 font-mono text-[14px] leading-6 outline-none focus:border-accent"
      />
      <p className="mt-2 font-sans text-[13px] text-muted">
        {copy.length}: {length} · {copy.target}
      </p>

      {draft.trim() ? (
        <ul className="mt-3 space-y-1 text-[15px] leading-7">
          {issues.length ? (
            issues.map((issue) => (
              <li key={issue} className="text-accent">
                {issue}
              </li>
            ))
          ) : (
            <li>{copy.ok}</li>
          )}
        </ul>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button className="open-btn px-5" type="button" onClick={onCopy} disabled={!draft.trim()}>
          {copied ? copy.copied : copy.copy}
        </button>
        <button
          className="ghost-btn px-5"
          type="button"
          disabled={!draft.trim()}
          onClick={() =>
            store([{ id: crypto.randomUUID(), text: draft, at: new Date().toISOString() }, ...notes])
          }
        >
          {copy.save}
        </button>
      </div>

      <h4 className="mt-8 font-sans text-[13px] tracking-[0.12em] uppercase text-muted">{copy.saved}</h4>
      {notes.length ? (
        <ul className="mt-2 divide-y divide-line border-y border-line">
          {notes.map((note) => (
            <li key={note.id} className="flex items-start gap-3 py-3">
              <button
                type="button"
                onClick={() => setDraft(note.text)}
                className="flex-1 whitespace-pre-line text-left text-[15px] leading-7"
              >
                {note.text}
              </button>
              <button
                type="button"
                onClick={() => store(notes.filter((item) => item.id !== note.id))}
                className="shrink-0 font-sans text-[13px] text-accent"
              >
                {copy.remove}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-[15px] text-muted">{copy.empty}</p>
      )}
    </div>
  );
}
