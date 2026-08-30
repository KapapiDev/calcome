import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { visibleCalculatorDirectory } from "@/config/calculator-directory";
import { englishDirectoryCategoryCopy } from "@/config/calculator-directory-copy";

describe("directory category name locale parity", () => {
  it("keeps every Korean category heading paired with ordered explicit English copy", () => {
    const englishSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/[locale]/calculators/page.tsx"),
      "utf8",
    );

    expect(visibleCalculatorDirectory.length).toBeGreaterThan(0);
    expect(Object.keys(englishDirectoryCategoryCopy)).toEqual(
      visibleCalculatorDirectory.map((category) => category.id),
    );

    for (const category of visibleCalculatorDirectory) {
      expect(category.name.trim().length).toBeGreaterThan(0);
      const englishName = englishDirectoryCategoryCopy[category.id].name;
      expect(englishName.trim().length).toBeGreaterThan(0);
      expect(englishName).not.toBe(category.id);
      expect(englishName).toMatch(/^[\x00-\x7F]+$/);
    }

    expect(englishSource).toContain(
      'import { englishDirectoryCategoryCopy } from "@/config/calculator-directory-copy";',
    );
    expect(englishSource).toContain(
      "const copy = englishDirectoryCategoryCopy[category.id];",
    );
    expect(englishSource).not.toContain("const categoryCopy");
    expect(englishSource).toContain("id={category.id}");
    expect(englishSource).toContain(
      "aria-labelledby={`${category.id}-heading`}",
    );
    expect(englishSource).toContain(
      "{category.calculators.map((calculator) => {",
    );
  });
});
