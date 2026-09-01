import { describe, expect, it } from "vitest";

import { resolveFavoriteDirectoryCalculators } from "@/components/calculators/directory-favorites";

const calculators = [
  { id: "compound-interest", name: "복리 계산기", href: "/ko/finance/compound-interest" },
  { id: "vat", name: "부가가치세 계산기", href: "/ko/finance/vat" },
  { id: "salary", name: "연봉 계산기", href: "/ko/employment/salary" },
] as const;

describe("favorites-first directory discovery", () => {
  it("preserves the user's favorite order and ignores retired ids", () => {
    expect(
      resolveFavoriteDirectoryCalculators(
        ["vat", "retired", "compound-interest"],
        calculators,
      ),
    ).toEqual([calculators[1], calculators[0]]);
  });

  it("returns no client-only directory shortcuts for an empty favorite list", () => {
    expect(resolveFavoriteDirectoryCalculators([], calculators)).toEqual([]);
  });
});
