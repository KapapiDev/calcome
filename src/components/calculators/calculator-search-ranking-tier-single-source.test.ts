import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  join(process.cwd(), "src/components/calculators/calculator-search.tsx"),
  "utf8",
);

describe("directory search ranking tier single-source contract", () => {
  it("keeps one shared scoring implementation", () => {
    expect(source.match(/function getSearchScore/g)).toHaveLength(1);
    expect(
      source.match(/getSearchScore\(indexed, normalizedQuery\)/g),
    ).toHaveLength(1);
  });

  it("preserves canonical tier scores and source-order ties", () => {
    for (let score = 0; score <= 9; score += 1) {
      expect(source).toContain(`return ${score};`);
    }
    expect(source).toContain(
      "a.score - b.score || a.indexed.sourceIndex - b.indexed.sourceIndex",
    );
  });
});
