import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "./calculator-directory";
import { englishCalculatorNames } from "./calculator-directory-calculator-copy";
import {
  englishCalculatorSearchAliases,
  getEnglishCalculatorSearchAliases,
} from "./calculator-search-keyword-copy";

const asciiOnly = /^[\x00-\x7F]+$/;
const englishDirectoryPageSource = readFileSync(
  "src/app/[locale]/calculators/page.tsx",
  "utf8",
);
const calculatorSearchSource = readFileSync(
  "src/components/calculators/calculator-search.tsx",
  "utf8",
);

const normalizeEnglishSearchCopy = (value: string) =>
  value.normalize("NFKC").toLocaleLowerCase("ko-KR").trim();

describe("English calculator search keyword copy", () => {
  it("uses explicit English aliases instead of filtering Korean source keywords", () => {
    expect(englishDirectoryPageSource).toContain(
      "keywords: getEnglishCalculatorSearchAliases(calculator.id)",
    );
    expect(englishDirectoryPageSource).not.toContain(
      "calculator.keywords.filter",
    );
  });

  it("uses the same normalization contract as directory search for English names and aliases", () => {
    expect(calculatorSearchSource).toContain(
      'return value.normalize("NFKC").toLocaleLowerCase("ko-KR").trim();',
    );

    expect(normalizeEnglishSearchCopy("  CAGR  ")).toBe("cagr");
    expect(normalizeEnglishSearchCopy("ＶＡＴ")).toBe("vat");

    for (const calculator of allPublishedCalculators) {
      const normalizedName = normalizeEnglishSearchCopy(
        englishCalculatorNames[calculator.id],
      );
      expect(normalizedName).not.toBe("");

      for (const alias of getEnglishCalculatorSearchAliases(calculator.id)) {
        expect(normalizeEnglishSearchCopy(`  ${alias.toUpperCase()}  `)).toBe(
          normalizeEnglishSearchCopy(alias),
        );
      }
    }
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

      const normalized = aliases.map(normalizeEnglishSearchCopy);
      expect(new Set(normalized).size).toBe(normalized.length);

      for (const alias of aliases) {
        expect(alias.trim()).not.toBe("");
        expect(alias).toMatch(asciiOnly);
      }
    }
  });

  it("prevents cross-calculator alias collisions and name shadowing", () => {
    const aliasOwners = new Map<string, string[]>();
    const publishedNameOwners = new Map(
      Object.entries(englishCalculatorNames).map(([id, name]) => [
        normalizeEnglishSearchCopy(name),
        id,
      ]),
    );

    for (const calculator of allPublishedCalculators) {
      for (const alias of getEnglishCalculatorSearchAliases(calculator.id)) {
        const normalizedAlias = normalizeEnglishSearchCopy(alias);
        const owners = aliasOwners.get(normalizedAlias) ?? [];
        owners.push(calculator.id);
        aliasOwners.set(normalizedAlias, owners);

        const shadowedNameOwner = publishedNameOwners.get(normalizedAlias);
        expect(
          shadowedNameOwner === undefined ||
            shadowedNameOwner === calculator.id,
          `English alias "${alias}" for ${calculator.id} shadows the published name of ${shadowedNameOwner}`,
        ).toBe(true);
      }
    }

    const collisions = [...aliasOwners.entries()].filter(
      ([, owners]) => new Set(owners).size > 1,
    );
    expect(
      collisions,
      "Cross-calculator English aliases must be unique unless an intentional ambiguity is documented with deterministic source-order evidence.",
    ).toEqual([]);
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
