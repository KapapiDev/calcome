import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { visibleCalculatorDirectory } from "@/config/calculator-directory";

describe("directory category count locale parity", () => {
  it("shows source-driven localized counts in Korean and English without duplicating inventory", () => {
    const koreanSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/calculators/page.tsx"),
      "utf8",
    );
    const englishSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/[locale]/calculators/page.tsx"),
      "utf8",
    );

    expect(visibleCalculatorDirectory.length).toBeGreaterThan(0);
    expect(koreanSource).toContain("{category.calculators.length}개");
    expect(englishSource).toContain(
      "{category.calculators.length} calculators",
    );
    expect(koreanSource).toContain(
      'className="flex flex-wrap items-end justify-between gap-3 border-b pb-4"',
    );
    expect(englishSource).toContain(
      'className="flex flex-wrap items-end justify-between gap-3 border-b pb-4"',
    );
    expect(koreanSource).toContain("category.calculators.map");
    expect(englishSource).toContain("category.calculators.map");
  });
});
