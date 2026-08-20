export type GenreId = "world" | "japan" | "business" | "tech" | "sports";

export const genres: { id: GenreId; emoji: string }[] = [
  { id: "world", emoji: "🌐" },
  { id: "japan", emoji: "🇯🇵" },
  { id: "business", emoji: "💹" },
  { id: "tech", emoji: "💻" },
  { id: "sports", emoji: "⚽" },
];

export function isGenre(value: string): value is GenreId {
  return genres.some((genre) => genre.id === value);
}

export function primaryGenre(desks: GenreId[] | string[]): GenreId | null {
  return genres.find((genre) => desks.includes(genre.id))?.id ?? null;
}
