import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { popularCalculators } from "@/config/calculator-directory";

describe("directory popular calculator locale parity", () => {
  it("keeps Korean and English popular shortcuts source-driven and touch accessible", () => {
    const koreanSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/calculators/page.tsx"),
      "utf8",
    );
    const englishSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/[locale]/calculators/page.tsx"),
      "utf8",
    );

    expect(popularCalculators.length).toBeGreaterThan(0);
    expect(koreanSource).toContain("popularCalculators.map");
    expect(englishSource).toContain(
      "popularCalculators.map(englishCalculator)",
    );
    expect(koreanSource).toContain("min-h-11");
    expect(englishSource).toContain("min-h-11");
    expect(englishSource).toContain('replace(/^\\/ko\\//, "/en/")');
    expect(englishSource).toContain("Popular calculators");
  });
});
