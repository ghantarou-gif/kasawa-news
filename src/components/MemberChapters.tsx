import { MemberTool } from "@/components/MemberTool";
import type { MemberChapters as Chapters } from "@/lib/member-chapters";

export function MemberTemplates({ chapters }: { chapters: Chapters }) {
  const { templates } = chapters;

  return (
    <div className="max-w-3xl">
      <p className="text-[16px] leading-7 text-muted">{chapters.intro}</p>
      <h2 className="mt-8 font-sans text-[13px] tracking-[0.12em] uppercase text-muted">
        {templates.purposeHeading}
      </h2>
      <dl className="mt-2 divide-y divide-line border-y border-line">
        {templates.purposes.map((row) => (
          <div key={row.goal} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
            <dt className="sm:w-60 sm:shrink-0">{row.goal}</dt>
            <dd className="font-sans text-[15px] text-accent">{row.use}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 space-y-6">
        {templates.items.map((item) => (
          <article key={item.no} className="rounded-2xl border border-line bg-card p-5">
            <h3 className="text-[19px] font-semibold">
              {item.no} {item.name}
            </h3>
            <p className="mt-2 text-[15px] leading-7">{item.goal}</p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-surface p-4 font-mono text-[13px] leading-6">
              {item.skeleton}
            </pre>
            <p className="mt-3 font-sans text-[13px] text-muted">{item.proof}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function MemberChecklist({ chapters }: { chapters: Chapters }) {
  const { checklist } = chapters;

  return (
    <div className="max-w-3xl">
      {checklist.groups.map((group) => (
        <div key={group.heading} className="mt-6 first:mt-0">
          <h2 className="font-sans text-[13px] tracking-[0.12em] uppercase text-muted">{group.heading}</h2>
          <ul className="mt-2 divide-y divide-line border-y border-line">
            {group.items.map((item) => (
              <li key={item}>
                <label className="flex cursor-pointer items-start gap-3 py-3 text-[16px] leading-7">
                  <input type="checkbox" className="mt-1.5 size-4 shrink-0 accent-[var(--color-accent)]" />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2 className="mt-8 font-sans text-[13px] tracking-[0.12em] uppercase text-accent">
        {checklist.stop.heading}
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-6 text-[16px] leading-7">
        {checklist.stop.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function MemberFrequency({ chapters }: { chapters: Chapters }) {
  const { frequency } = chapters;

  return (
    <div className="max-w-3xl">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-sans text-[15px]">
          <thead>
            <tr className="border-b-2 border-ink text-left">
              {frequency.columns.map((column) => (
                <th key={column} className="py-2 pr-4 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {frequency.rows.map((row) => (
              <tr
                key={row.posts}
                className={`border-b border-line ${row.peak ? "bg-brand/30 font-semibold" : ""}`}
              >
                <td className="py-2 pr-4">{row.posts}</td>
                <td className="py-2 pr-4 tabular-nums">{row.reach}</td>
                <td className="py-2 pr-4 tabular-nums">{row.follows}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-6 list-disc space-y-2 pl-6 text-[16px] leading-7">
        {frequency.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <h2 className="mt-8 text-[19px] font-semibold">{frequency.splitHeading}</h2>
      <p className="mt-2 text-[16px] leading-7">{frequency.split}</p>
    </div>
  );
}

export function MemberToolChapter({ chapters }: { chapters: Chapters }) {
  return (
    <div className="max-w-3xl">
      <MemberTool chapters={chapters} />
    </div>
  );
}
