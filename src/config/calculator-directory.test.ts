import { describe, expect, it } from "vitest";

import {
  allPublishedCalculators,
  calculatorDirectoryCategories,
  directorySearchCalculators,
} from "@/config/calculator-directory";

describe("calculator directory", () => {
  it("assigns every published calculator to exactly one primary category", () => {
    const assignedIds = calculatorDirectoryCategories.flatMap(
      (category) => category.calculatorIds,
    );
    const publishedIds = allPublishedCalculators.map(
      (calculator) => calculator.id,
    );

    expect(allPublishedCalculators).toHaveLength(51);
    expect(new Set(assignedIds).size).toBe(assignedIds.length);
    expect([...assignedIds].sort()).toEqual([...publishedIds].sort());
  });

  it("uses primary directory categories in search results", () => {
    const categoryById = new Map(
      calculatorDirectoryCategories.flatMap((category) =>
        category.calculatorIds.map((id) => [id, category.name] as const),
      ),
    );

    expect(directorySearchCalculators).toHaveLength(
      allPublishedCalculators.length,
    );

    for (const calculator of directorySearchCalculators) {
      expect(calculator.primaryCategory).toBe(categoryById.get(calculator.id));
    }

    expect(
      directorySearchCalculators.find(
        (calculator) => calculator.id === "weekly-holiday-pay",
      )?.primaryCategory,
    ).toBe("급여·근로");
  });

  it("includes common Korean aliases in directory search data", () => {
    const aliasesById = new Map(
      directorySearchCalculators.map(
        (calculator) => [calculator.id, calculator.keywords] as const,
      ),
    );

    expect(aliasesById.get("mortgage-payment")).toContain("주담대");
    expect(aliasesById.get("real-estate-brokerage-fee")).toContain("복비");
    expect(aliasesById.get("stock-average-cost")).toContain("물타기");
    expect(aliasesById.get("net-salary")).toContain("연봉 실수령");
    expect(aliasesById.get("freelancer-3-3-tax")).toContain("3.3");
  });
});
