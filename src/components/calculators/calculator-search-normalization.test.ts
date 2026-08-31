import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(
  join(process.cwd(), "src/components/calculators/calculator-search.tsx"),
  "utf8",
);

describe("directory search normalization single-source contract", () => {
  it("keeps exactly one normalization implementation", () => {
    expect(source.match(/function normalizeSearchText\(/g)).toHaveLength(1);
    expect(source).toContain(
      'return value.normalize("NFKC").toLocaleLowerCase("ko-KR").trim();',
    );
  });

  it("routes every searchable field and the user query through the same normalizer", () => {
    expect(source).toContain(
      "normalizedName: normalizeSearchText(calculator.name)",
    );
    expect(source).toContain(
      "normalizedDescription: normalizeSearchText(calculator.description)",
    );
    expect(source).toContain(
      "normalizedKeywords: calculator.keywords.map(normalizeSearchText)",
    );
    expect(source).toContain(
      "? normalizeSearchText(calculator.primaryCategory)",
    );
    expect(source).toContain(
      "const normalizedQuery = normalizeSearchText(query);",
    );
  });

  it("prevents direct normalization from bypassing the shared contract", () => {
    const directNormalizeCalls = source.match(/\.normalize\(/g) ?? [];
    const directLocaleLowerCalls = source.match(/\.toLocaleLowerCase\(/g) ?? [];

    expect(directNormalizeCalls).toHaveLength(1);
    expect(directLocaleLowerCalls).toHaveLength(1);
  });
});
