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

  it("covers every published calculator exactly once with deliberate aliases", () => {
    const publishedIds = allPublishedCalculators.map(
      (calculator) => calculator.id,
    );
    const aliasIds = Object.keys(englishCalculatorSearchAliases);

    expect(aliasIds).toHaveLength(publishedIds.length);
    expect(new Set(aliasIds)).toEqual(new Set(publishedIds));

    for (const id of publishedIds) {
      const aliases = getEnglishCalculatorSearchAliases(id);
      expect(aliases.length).toBeGreaterThan(0);

      const normalized = aliases.map((alias) =>
        alias.trim().toLocaleLowerCase("en-US"),
      );
      expect(new Set(normalized).size).toBe(normalized.length);

      for (const alias of aliases) {
        expect(alias.trim()).not.toBe("");
        expect(alias).toMatch(asciiOnly);
      }
    }
  });

  it("rejects unknown calculator ids instead of silently returning no aliases", () => {
    expect(() => getEnglishCalculatorSearchAliases("not-published")).toThrow(
      "Unknown English calculator search alias id: not-published",
    );
  });

  it("provides useful English aliases for representative search intents", () => {
    expect(getEnglishCalculatorSearchAliases("net-salary")).toContain(
      "take home pay",
    );
    expect(getEnglishCalculatorSearchAliases("ltv")).toContain("loan to value");
    expect(getEnglishCalculatorSearchAliases("value-added-tax")).toContain(
      "vat",
    );
    expect(
      getEnglishCalculatorSearchAliases("dollar-cost-averaging"),
    ).toContain("dca");
    expect(getEnglishCalculatorSearchAliases("business-cash-runway")).toContain(
      "burn rate",
    );
  });
});
