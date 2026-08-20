import type { Locale } from "./locale";

/**
 * Kindle本の情報。発売が決まったらここだけ直す。
 * kindleUrl が空のあいだは「近日発売」になる。
 */
export const book = {
  author: "Gota Kasawa",
  title: {
    ja: "書名未定",
    en: "Untitled",
  },
  subtitle: {
    ja: "Kindleにて近日発売",
    en: "Coming soon on Kindle",
  },
  description: {
    ja: "著者の最初の電子書籍です。書名・紹介文・表紙・Amazonの商品URLが決まり次第、このページを更新します。",
    en: "The author's first ebook. Title, blurb, cover, and Amazon product URL will be filled in once the Kindle listing is live.",
  },
  kindleUrl: "",
  priceLabel: {
    ja: "",
    en: "",
  },
};

export function bookCopy(locale: Locale) {
  return {
    author: book.author,
    title: book.title[locale],
    subtitle: book.subtitle[locale],
    description: book.description[locale],
    kindleUrl: book.kindleUrl,
    priceLabel: book.priceLabel[locale],
  };
}
