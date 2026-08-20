import Link from "next/link";

export default function NotFound() {
  return (
    <main className="py-24 text-center">
      <p className="font-display text-5xl tracking-[-0.04em]">404</p>
      <p className="mt-4 text-muted">Page not found. / ページが見つかりません。</p>
      <Link
        href="/ja"
        className="mt-8 inline-block font-sans text-[12px] tracking-[0.18em] uppercase text-accent"
      >
        KASAWA
      </Link>
    </main>
  );
}
