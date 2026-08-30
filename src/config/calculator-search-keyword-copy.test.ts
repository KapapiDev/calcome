import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "./calculator-directory";
import {
  englishCalculatorSearchAliases,
  getEnglishCalculatorSearchAliases,
} from "./calculator-search-keyword-copy";

const asciiOnly = /^[\x00-\x7F]+$/;
const englishDirectoryPageSource = readFileSync(
  "src/app/[locale]/calculators/page.tsx",
  "utf8",
);

describe("English calculator search keyword copy", () => {
  it("uses explicit English aliases instead of filtering Korean source keywords", () => {
    expect(englishDirectoryPageSource).toContain(
      "keywords: getEnglishCalculatorSearchAliases(calculator.id)",
    );
    expect(englishDirectoryPageSource).not.toContain(
      "calculator.keywords.filter",
    );
  });

  it("keeps English aliases source-driven, non-blank, ASCII, and published-only", () => {
    const publishedIds = new Set(
      allPublishedCalculators.map((calculator) => calculator.id),
    );

    for (const [id, aliases] of Object.entries(
      englishCalculatorSearchAliases,
    )) {
      expect(publishedIds.has(id)).toBe(true);
      expect(aliases.length).toBeGreaterThan(0);
      for (const alias of aliases) {
        expect(alias.trim()).not.toBe("");
        expect(alias).toMatch(asciiOnly);
      }
    }
  });

  it("provides useful English aliases for representative search intents", () => {
    expect(getEnglishCalculatorSearchAliases("net-salary")).toContain(
      "take home pay",
    );
    expect(getEnglishCalculatorSearchAliases("ltv")).toContain(
      "loan to value",
    );
    expect(getEnglishCalculatorSearchAliases("value-added-tax")).toContain(
      "vat",
    );
    expect(getEnglishCalculatorSearchAliases("dollar-cost-averaging")).toContain(
      "dca",
    );
    expect(getEnglishCalculatorSearchAliases("business-cash-runway")).toContain(
      "burn rate",
    );
  });
});
