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

describe("directory category name locale parity", () => {
  it("keeps every Korean category heading paired with ordered explicit English copy", () => {
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

    let previousPosition = -1;
    for (const [index, category] of visibleCalculatorDirectory.entries()) {
      expect(category.name.trim().length).toBeGreaterThan(0);
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
      const nameMatch = categoryBlock.match(/name:\s*"([^"]+)"/);

      expect(nameMatch).not.toBeNull();
      const englishName = nameMatch?.[1] ?? "";
      expect(englishName.trim().length).toBeGreaterThan(0);
      expect(englishName).not.toBe(category.id);
      expect(englishName).toMatch(/^[\x00-\x7F]+$/);
      previousPosition = position;
    }

    expect(englishSource).toContain("id={category.id}");
    expect(englishSource).toContain(
      "aria-labelledby={`${category.id}-heading`}",
    );
    expect(englishSource).toContain(
      "{category.calculators.map((calculator) => {",
    );
  });
});
