"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CUP_GRADES,
  CUP_MAP_COLS,
  cupGradeCount,
  cupGradeMeta,
  cupMapCopy,
  cupPrefectures,
  cupPrefecturesByGrade,
  type CupPrefecture,
} from "@/lib/cupmap";
import type { Locale } from "@/lib/locale";

const GACHA_TICKS = 14;
const GACHA_INTERVAL_MS = 80;

function textOn(grade: CupPrefecture["grade"]): string {
  return grade === "E" ? "#ffffff" : "#141414";
}

export function CupSizeMap({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<CupPrefecture | null>(null);
  const [rolling, setRolling] = useState(false);
  const [gachaUsed, setGachaUsed] = useState(false);
  const [rollId, setRollId] = useState(0);
  const rollTimer = useRef<number | null>(null);

  const stopRoll = useCallback(() => {
    if (rollTimer.current !== null) {
      window.clearInterval(rollTimer.current);
      rollTimer.current = null;
    }
  }, []);

  useEffect(() => stopRoll, [stopRoll]);

  const startGacha = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setGachaUsed(true);
    let ticks = 0;
    rollTimer.current = window.setInterval(() => {
      ticks += 1;
      const next =
        cupPrefectures[Math.floor(Math.random() * cupPrefectures.length)];
      setSelected(next);
      if (ticks >= GACHA_TICKS) {
        stopRoll();
        setRolling(false);
        setRollId((id) => id + 1);
      }
    }, GACHA_INTERVAL_MS);
  }, [rolling, stopRoll]);

  const pick = useCallback(
    (pref: CupPrefecture) => {
      if (rolling) return;
      setGachaUsed(false);
      setSelected(pref);
      setRollId((id) => id + 1);
    },
    [rolling],
  );

  const meta = selected ? cupGradeMeta(selected.grade) : null;
  const rankText = selected
    ? cupMapCopy.detailRank[locale]
        .replace("{grade}", selected.grade)
        .replace("{n}", String(cupGradeCount(selected.grade)))
    : "";

  return (
    <section className="take-block mt-8" aria-label={cupMapCopy.mapTitle[locale]}>
      <p className="take-kicker">{cupMapCopy.kicker[locale]}</p>
      <h2 className="font-display mt-2 text-[1.25rem] tracking-[-0.02em]">
        {cupMapCopy.mapTitle[locale]}
      </h2>
      <p className="mt-2 text-[13px] leading-6 text-muted">
        {cupMapCopy.mapLead[locale]}
      </p>

      <ul
        className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-muted"
        aria-label={cupMapCopy.legendHeading[locale]}
      >
        {CUP_GRADES.map((grade) => (
          <li key={grade.id} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block h-3 w-3 rounded-full border border-ink/20"
              style={{ backgroundColor: grade.color }}
            />
            <span>{grade.label[locale]}</span>
            <span className="text-ink/40">
              {cupGradeCount(grade.id)}
              {cupMapCopy.rankingUnit[locale]}
            </span>
          </li>
        ))}
      </ul>

      <div
        role="group"
        aria-label={cupMapCopy.mapTitle[locale]}
        className="mt-4 grid gap-[3px] sm:gap-1"
        style={{
          gridTemplateColumns: `repeat(${CUP_MAP_COLS}, minmax(0, 1fr))`,
        }}
      >
        {cupPrefectures.map((pref) => {
          const grade = cupGradeMeta(pref.grade);
          const active = selected?.id === pref.id;
          return (
            <button
              key={pref.id}
              type="button"
              aria-label={`${pref.name[locale]}: ${pref.grade}`}
              aria-pressed={active}
              onMouseEnter={() => pick(pref)}
              onFocus={() => pick(pref)}
              onClick={() => pick(pref)}
              className={`flex aspect-square items-center justify-center rounded-[4px] font-bold transition-transform duration-100 ${
                active
                  ? "z-10 scale-125 shadow-md ring-2 ring-ink"
                  : "hover:scale-110 hover:ring-1 hover:ring-ink/40"
              } ${pref.tile.length >= 3 ? "text-[8px] sm:text-[10px]" : "text-[9px] sm:text-[11px]"}`}
              style={{
                gridColumnStart: pref.col + 1,
                gridRowStart: pref.row + 1,
                backgroundColor: grade.color,
                color: textOn(pref.grade),
              }}
            >
              {pref.tile}
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className="mt-4 min-h-[92px] rounded-xl border border-line bg-surface p-4"
      >
        {selected && meta ? (
          <div
            key={`${selected.id}-${rollId}`}
            className="cup-pop flex items-start gap-3 sm:gap-4"
          >
            <span
              aria-hidden
              className="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-ink text-[22px] font-extrabold"
              style={{
                backgroundColor: meta.color,
                color: textOn(selected.grade),
              }}
            >
              {selected.grade}
            </span>
            <div className="min-w-0">
              {gachaUsed ? (
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-accent">
                  {cupMapCopy.gachaResult[locale]}
                </p>
              ) : null}
              <p className="font-display text-[17px] leading-6">
                {selected.name[locale]}
                {locale === "en" ? (
                  <span className="ml-2 text-[13px] font-normal text-muted">
                    {selected.tile}
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-[14px] leading-6 text-ink/90">
                {selected.note[locale]}
              </p>
              <p className="mt-1 text-[12px] text-muted">
                {cupMapCopy.detailGradeLabel[locale]}: {selected.grade} — {rankText}
              </p>
            </div>
          </div>
        ) : (
          <p className="flex h-full items-center text-[13px] text-muted">
            {cupMapCopy.detailEmpty[locale]}
          </p>
        )}
      </div>

      <div className="action-row mt-4">
        <button
          type="button"
          onClick={startGacha}
          disabled={rolling}
          className="open-btn disabled:opacity-60"
        >
          {rolling
            ? cupMapCopy.gachaRolling[locale]
            : cupMapCopy.gachaButton[locale]}
        </button>
      </div>

      <div className="mt-6">
        <p className="take-kicker">{cupMapCopy.rankingHeading[locale]}</p>
        <ul className="mt-3 flex flex-col gap-3">
          {CUP_GRADES.map((grade) => {
            const prefs = cupPrefecturesByGrade(grade.id);
            return (
              <li key={grade.id} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-ink text-[13px] font-extrabold"
                  style={{
                    backgroundColor: grade.color,
                    color: textOn(grade.id),
                  }}
                >
                  {grade.id}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {prefs.map((pref) => (
                    <button
                      key={pref.id}
                      type="button"
                      onClick={() => pick(pref)}
                      className={`mini-chip hover:border-accent hover:text-accent ${
                        selected?.id === pref.id
                          ? "border-ink font-bold"
                          : ""
                      }`}
                    >
                      {pref.name[locale]}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-6 text-[12px] leading-5 text-muted">
        {cupMapCopy.disclaimer[locale]}
      </p>
    </section>
  );
}
