/**
 * Convierte pegados tipo "1-$8,000 2-6,000 3-$4,000" en markdown de lista.
 * Si ya hay markdown explícito (títulos, listas, citas), no toca el texto.
 */
export function normalizePremiosContent(raw: string): {
  markdown: string;
  wasCompactTiers: boolean;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { markdown: raw, wasCompactTiers: false };
  }

  if (
    /^#{1,6}\s/m.test(trimmed) ||
    /^[-*+]\s/m.test(trimmed) ||
    /^\d+\.\s/m.test(trimmed) ||
    /^>\s/m.test(trimmed) ||
    trimmed.includes("```")
  ) {
    return { markdown: raw, wasCompactTiers: false };
  }

  const oneline = trimmed.replace(/\s+/g, " ");
  const parts = oneline
    .split(/\s+(?=\d+[\-\.]\s*)/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length < 2) {
    return { markdown: raw, wasCompactTiers: false };
  }

  const items = parts.map((p) => p.replace(/^\d+\s*[\-\.]\s*/, "").trim());
  if (items.some((i) => !i)) {
    return { markdown: raw, wasCompactTiers: false };
  }

  const markdown = items.map((label, i) => `${i + 1}. **${label}**`).join("\n");
  return { markdown, wasCompactTiers: true };
}
