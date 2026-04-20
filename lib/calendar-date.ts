/** Partes de fecha para UI del calendario (es-MX). */
export function getMerceDateParts(isoDate: string): {
  weekday: string;
  dayMonth: string;
  year: number;
} {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) {
    return { weekday: "—", dayMonth: "—", year: new Date().getFullYear() };
  }
  const weekday = d
    .toLocaleDateString("es-MX", { weekday: "short" })
    .replace(/\./g, "")
    .toUpperCase();
  const dayMonth = d
    .toLocaleDateString("es-MX", { day: "numeric", month: "short" })
    .replace(/\./g, "")
    .toUpperCase();
  return { weekday, dayMonth, year: d.getFullYear() };
}

export function groupGamesByYear<T extends { rawDate: string }>(
  games: T[],
  order: "asc" | "desc",
): { year: number; games: T[] }[] {
  const map = new Map<number, T[]>();
  for (const g of games) {
    const y = new Date(g.rawDate).getFullYear();
    if (Number.isNaN(y)) continue;
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(g);
  }
  const years = [...map.keys()].sort((a, b) => (order === "desc" ? b - a : a - b));
  return years.map((year) => ({
    year,
    games: map.get(year)!,
  }));
}
