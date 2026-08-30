import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { visibleCalculatorDirectory } from "@/config/calculator-directory";
import { englishDirectoryCategoryCopy } from "@/config/calculator-directory-copy";

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

    expect(visibleCalculatorDirectory.length).toBeGreaterThan(0);
    expect(Object.keys(englishDirectoryCategoryCopy)).toEqual(
      visibleCalculatorDirectory.map((category) => category.id),
    );
    expect(koreanSource).toContain("{category.description}");

    for (const category of visibleCalculatorDirectory) {
      expect(category.description.trim().length).toBeGreaterThan(0);
      expect(
        englishDirectoryCategoryCopy[category.id].description.trim().length,
      ).toBeGreaterThan(0);
    }

    expect(englishSource).toContain(
      'import { englishDirectoryCategoryCopy } from "@/config/calculator-directory-copy";',
    );
    expect(englishSource).toContain(
      "const copy = englishDirectoryCategoryCopy[category.id];",
    );
    expect(englishSource).not.toContain("const categoryCopy");

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
