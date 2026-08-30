import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { visibleCalculatorDirectory } from "@/config/calculator-directory";

function categoryKeyPosition(source: string, id: string, fromIndex = 0) {
  const positions = [`${id}:`, `"${id}":`, `'${id}':`]
    .map((needle) => source.indexOf(needle, fromIndex))
    .filter((position) => position >= 0);

  return positions.length > 0 ? Math.min(...positions) : -1;
}

describe("directory category description locale parity", () => {
  it("keeps every Korean category description paired with ordered English copy and stable compact anchors", () => {
    const koreanSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/calculators/page.tsx"),
      "utf8",
    );
    const englishSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/[locale]/calculators/page.tsx"),
      "utf8",
    );

    const copyStart = englishSource.indexOf("const categoryCopy");
    const copyEnd = englishSource.indexOf("\n};", copyStart);
    const englishCopy = englishSource.slice(copyStart, copyEnd);

    expect(copyStart).toBeGreaterThanOrEqual(0);
    expect(copyEnd).toBeGreaterThan(copyStart);
    expect(visibleCalculatorDirectory.length).toBeGreaterThan(0);
    expect(koreanSource).toContain("{category.description}");

    let previousPosition = -1;
    for (const [index, category] of visibleCalculatorDirectory.entries()) {
      expect(category.description.trim().length).toBeGreaterThan(0);
      const position = categoryKeyPosition(
        englishCopy,
        category.id,
        previousPosition + 1,
      );
      expect(position).toBeGreaterThan(previousPosition);

      const nextCategory = visibleCalculatorDirectory[index + 1];
      const blockEnd = nextCategory
        ? categoryKeyPosition(englishCopy, nextCategory.id, position + 1)
        : englishCopy.length;
      const categoryBlock = englishCopy.slice(position, blockEnd);

      expect(categoryBlock).toMatch(/description:\s*\n?\s*"[^"]+"/);
      previousPosition = position;
    }

    for (const source of [koreanSource, englishSource]) {
      expect(source).toContain("id={category.id}");
      expect(source).toContain("aria-labelledby={`${category.id}-heading`}");
      expect(source).toContain(
        'className="flex flex-wrap items-end justify-between gap-3 border-b pb-4"',
      );
      expect(source).toContain(
        'className="mt-2 text-sm leading-6 text-muted-foreground"',
      );
    }
  });
});
