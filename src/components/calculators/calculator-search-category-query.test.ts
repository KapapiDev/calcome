import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const source = readFileSync(
  "src/components/calculators/calculator-search.tsx",
  "utf8",
);

const normalizeSearchText = (value: string) =>
  value.normalize("NFKC").toLocaleLowerCase("ko-KR").trim();

describe("English directory category query matching", () => {
  it("indexes localized categories only for English search", () => {
    expect(source).toContain("normalizedPrimaryCategory: string | null;");
    expect(source).toContain('locale === "en"');
    expect(source).toContain(
      "? normalizeSearchText(calculator.primaryCategory)",
    );
    expect(source).toContain(": null,");
    expect(source).toContain("[calculators, locale]");
  });

  it("uses the shared search normalization contract for English category queries", () => {
    expect(source).toContain(
      'return value.normalize("NFKC").toLocaleLowerCase("ko-KR").trim();',
    );
    expect(source).toContain(
      "? normalizeSearchText(calculator.primaryCategory)",
    );
    expect(source).toContain(
      "const normalizedQuery = normalizeSearchText(query);",
    );

    expect(normalizeSearchText("  ＴＡＸ  ")).toBe("tax");
    expect(normalizeSearchText("  LOANS & CREDIT  ")).toBe("loans & credit");
    expect(normalizeSearchText("ＳＡＶＩＮＧＳ & ＲＥＴＩＲＥＭＥＮＴ")).toBe(
      "savings & retirement",
    );
  });

  it("ranks category matches below names and aliases but above descriptions", () => {
    const keywordIncludes = source.indexOf(
      "indexed.normalizedKeywords.some((keyword) => keyword.includes(query))",
    );
    const categoryExact = source.indexOf(
      "indexed.normalizedPrimaryCategory === query",
    );
    const categoryStarts = source.indexOf(
      "indexed.normalizedPrimaryCategory?.startsWith(query)",
    );
    const categoryIncludes = source.indexOf(
      "indexed.normalizedPrimaryCategory?.includes(query)",
    );
    const description = source.indexOf(
      "indexed.normalizedDescription.includes(query)",
    );

    expect(keywordIncludes).toBeGreaterThan(-1);
    expect(categoryExact).toBeGreaterThan(keywordIncludes);
    expect(categoryStarts).toBeGreaterThan(categoryExact);
    expect(categoryIncludes).toBeGreaterThan(categoryStarts);
    expect(description).toBeGreaterThan(categoryIncludes);
    expect(source).toContain(
      "a.score - b.score || a.indexed.sourceIndex - b.indexed.sourceIndex",
    );
  });
});
