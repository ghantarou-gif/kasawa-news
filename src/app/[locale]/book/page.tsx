import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bookCopy } from "@/lib/book";
import { t } from "@/lib/i18n";
import { isLocale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const book = bookCopy(locale);
  return {
    title: book.title,
    description: book.subtitle,
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = t(locale);
  const book = bookCopy(locale);
  const listed = Boolean(book.kindleUrl);

  return (
    <article className="grid gap-10 py-12 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-14">
        <div
          className="aspect-[3/4] border border-ink bg-ink text-paper shadow-[8px_8px_0_0_rgba(26,22,18,0.12)]"
          aria-hidden="true"
        >
          <div className="flex h-full flex-col justify-between p-6">
            <p className="font-sans text-[11px] tracking-[0.28em] uppercase">
              {copy.bookKicker}
            </p>
            <div>
              <p className="font-display text-[2rem] leading-tight tracking-[-0.03em]">
                {book.title}
              </p>
              <p className="mt-4 font-sans text-[12px] tracking-[0.16em] uppercase">
                {book.author}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-accent">
            {copy.bookKicker}
          </p>
          <h2 className="font-display mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-[1.1] tracking-[-0.03em]">
            {book.title}
          </h2>
          <p className="mt-3 text-[17px] text-muted">{book.subtitle}</p>
          <p className="mt-2 font-sans text-[13px] tracking-[0.14em] uppercase text-ink">
            {book.author}
          </p>
          {book.priceLabel ? (
            <p className="mt-2 text-sm text-muted">{book.priceLabel}</p>
          ) : null}
          <p className="mt-8 max-w-xl text-[17px] leading-8">{book.description}</p>

          {listed ? (
            <a
              href={book.kindleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="open-btn mt-8 inline-flex px-5 py-3 text-[12px] tracking-[0.18em] uppercase"
            >
              {copy.bookCta}
            </a>
          ) : (
            <p className="mt-8 inline-flex border border-ink/40 px-5 py-3 font-sans text-[12px] tracking-[0.18em] uppercase text-muted">
              {copy.bookSoon}
            </p>
          )}
        </div>
      </article>
  );
}
