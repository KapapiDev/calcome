import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { visibleCalculatorDirectory } from "@/config/calculator-directory";
import { englishDirectoryCategoryCopy } from "@/config/calculator-directory-copy";

describe("directory category navigation locale parity", () => {
  it("keeps every English navigation label explicit, ordered, and single-sourced", () => {
    const navigationSource = fs.readFileSync(
      path.join(
        process.cwd(),
        "src/components/calculators/directory-category-navigation.tsx",
      ),
      "utf8",
    );
    const englishPageSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/[locale]/calculators/page.tsx"),
      "utf8",
    );

    expect(visibleCalculatorDirectory.length).toBeGreaterThan(0);
    expect(Object.keys(englishDirectoryCategoryCopy)).toEqual(
      visibleCalculatorDirectory.map((category) => category.id),
    );

    for (const category of visibleCalculatorDirectory) {
      const copy = englishDirectoryCategoryCopy[category.id];
      expect(copy.name.trim().length).toBeGreaterThan(0);
      expect(copy.name).not.toBe(category.id);
      expect(copy.name).toMatch(/^[\x00-\x7F]+$/);
      expect(copy.description.trim().length).toBeGreaterThan(0);
    }

    expect(navigationSource).toContain(
      'import { englishDirectoryCategoryCopy } from "@/config/calculator-directory-copy";',
    );
    expect(englishPageSource).toContain(
      'import { englishDirectoryCategoryCopy } from "@/config/calculator-directory-copy";',
    );
    expect(navigationSource).toContain(
      "englishDirectoryCategoryCopy[category.id].name",
    );
    expect(englishPageSource).toContain(
      "const copy = englishDirectoryCategoryCopy[category.id];",
    );
    expect(navigationSource).not.toContain("const englishCategoryNames");
    expect(englishPageSource).not.toContain("const categoryCopy");
    expect(navigationSource).toContain("href={`#${category.id}`}");
    expect(navigationSource).toContain("aria-controls={category.id}");
    expect(navigationSource).toContain("min-h-11");
    expect(navigationSource).toContain("{category.calculators.length}");
  });

  it("renders one source-derived calculator count for both locale labels", () => {
    const source = fs.readFileSync(
      path.join(
        process.cwd(),
        "src/components/calculators/directory-category-navigation.tsx",
      ),
      "utf8",
    );

    const countExpression = "{category.calculators.length}";
    expect(source.split(countExpression)).toHaveLength(2);
    expect(source).toContain("englishDirectoryCategoryCopy[category.id].name");
    expect(source).not.toMatch(/isEnglish[\s\S]{0,120}calculators\.length/);
    expect(source).not.toMatch(/calculators\.length[\s\S]{0,120}isEnglish/);

    const expectedCounts = visibleCalculatorDirectory.map((category) => ({
      id: category.id,
      count: category.calculators.length,
    }));

    expect(expectedCounts.length).toBeGreaterThan(0);
    expect(expectedCounts.every(({ count }) => count > 0)).toBe(true);
    expect(new Set(expectedCounts.map(({ id }) => id)).size).toBe(
      expectedCounts.length,
    );
    expect(source).toContain("href={`#${category.id}`}");
    expect(source).toContain("aria-controls={category.id}");
    expect(source).toContain("min-h-11");
  });

  it("keeps localized navigation semantics linked to keyboard-focusable category targets", () => {
    const navigationSource = fs.readFileSync(
      path.join(
        process.cwd(),
        "src/components/calculators/directory-category-navigation.tsx",
      ),
      "utf8",
    );
    const koreanPageSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/calculators/page.tsx"),
      "utf8",
    );
    const englishPageSource = fs.readFileSync(
      path.join(process.cwd(), "src/app/[locale]/calculators/page.tsx"),
      "utf8",
    );

    expect(navigationSource).toContain(
      'aria-label={isEnglish ? "Calculator categories" : "계산기 카테고리"}',
    );
    expect(navigationSource).toContain("href={`#${category.id}`}");
    expect(navigationSource).toContain("aria-controls={category.id}");
    expect(navigationSource).toContain("focus-visible:outline-none");
    expect(navigationSource).toContain("focus-visible:ring-3");

    for (const pageSource of [koreanPageSource, englishPageSource]) {
      expect(pageSource).toContain("id={category.id}");
      expect(pageSource).toContain("tabIndex={-1}");
      expect(pageSource).toContain(
        "aria-labelledby={`${category.id}-heading`}",
      );
      expect(pageSource).toContain("id={`${category.id}-heading`}");
      expect(pageSource).toContain("scroll-mt-24 focus:outline-none");
    }

    expect(koreanPageSource).toContain(
      "aria-label={`${category.name} 계산기`}",
    );
    expect(englishPageSource).toContain(
      "aria-label={`${copy.name} calculators`}",
    );
  });
});
