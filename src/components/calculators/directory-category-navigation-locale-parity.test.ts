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

describe("directory category navigation locale parity", () => {
  it("keeps every English navigation label explicit, ordered, and source-driven", () => {
    const source = fs.readFileSync(
      path.join(
        process.cwd(),
        "src/components/calculators/directory-category-navigation.tsx",
      ),
      "utf8",
    );

    const namesStart = source.indexOf("const englishCategoryNames");
    const namesEnd = source.indexOf("\n};", namesStart);
    const englishNames = source.slice(namesStart, namesEnd);

    expect(namesStart).toBeGreaterThanOrEqual(0);
    expect(namesEnd).toBeGreaterThan(namesStart);
    expect(visibleCalculatorDirectory.length).toBeGreaterThan(0);

    let previousPosition = -1;
    for (const category of visibleCalculatorDirectory) {
      const position = categoryKeyPosition(
        englishNames,
        category.id,
        previousPosition + 1,
      );
      expect(position).toBeGreaterThan(previousPosition);

      const categoryBlock = englishNames.slice(position);
      const nameMatch = categoryBlock.match(/:\s*"([^"]+)"/);
      expect(nameMatch).not.toBeNull();

      const englishName = nameMatch?.[1] ?? "";
      expect(englishName.trim().length).toBeGreaterThan(0);
      expect(englishName).not.toBe(category.id);
      expect(englishName).toMatch(/^[\x00-\x7F]+$/);
      previousPosition = position;
    }

    expect(source).toContain(
      "{isEnglish ? englishCategoryNames[category.id] : category.name}",
    );
    expect(source).not.toContain(
      "englishCategoryNames[category.id] ?? category.id",
    );
    expect(source).toContain("href={`#${category.id}`}");
    expect(source).toContain("aria-controls={category.id}");
    expect(source).toContain("min-h-11");
    expect(source).toContain("{category.calculators.length}");
  });
});
