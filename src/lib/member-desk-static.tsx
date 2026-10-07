"use client";

import { useState } from "react";
import { editorGuide } from "@/lib/editor-guide";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";

const CODE_HASH = process.env.NEXT_PUBLIC_MEMBER_CODE_SHA256 ?? "";

async function sha256(value: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value.trim()));
  return [...new Uint8Array(buf)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function MemberDesk({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const guide = editorGuide[locale];
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const got = await sha256(String(data.get("code") ?? ""));
    if (CODE_HASH && got === CODE_HASH) {
      setDenied(false);
      setOpen(true);
      return;
    }
    setDenied(true);
  }

  return (
    <article className="py-12">
      <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-accent">
        {copy.memberKicker}
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] tracking-[-0.03em]">
        {copy.memberTitle}
      </h1>
      {open ? (
        <>
          <p className="mt-4 max-w-xl text-[17px] leading-8 text-muted">{copy.memberOpenLead}</p>
          <ol className="mt-10 max-w-2xl list-decimal space-y-0 divide-y divide-line border-y border-line pl-6">
            {guide.items.map((item) => (
              <li key={item} className="py-4 pl-2 text-[17px] leading-8">
                {item}
              </li>
            ))}
          </ol>
          <button className="ghost-btn mt-8 px-5" type="button" onClick={() => setOpen(false)}>
            {copy.memberLeave}
          </button>
        </>
      ) : (
        <>
          <p className="mt-4 max-w-xl text-[17px] leading-8 text-muted">{copy.memberLead}</p>
          {CODE_HASH ? (
            <form
              onSubmit={onSubmit}
              className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-center"
            >
              <label className="sr-only" htmlFor="member-code">
                {copy.memberCode}
              </label>
              <input
                id="member-code"
                name="code"
                type="password"
                required
                autoComplete="current-password"
                placeholder={copy.memberCode}
                className="min-h-11 w-full flex-1 rounded-full border border-ink bg-card px-4 text-[15px] outline-none focus:border-accent"
              />
              <button className="open-btn px-5" type="submit">
                {copy.memberOpen}
              </button>
            </form>
          ) : (
            <p className="mt-6 max-w-xl text-sm leading-6 text-muted">{copy.memberClosed}</p>
          )}
          {denied ? (
            <p role="alert" className="mt-4 text-sm text-accent">
              {copy.memberDenied}
            </p>
          ) : null}
        </>
      )}
    </article>
  );
}
