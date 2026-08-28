import { describe, expect, it } from "vitest";
import { calculateBreakEvenSales } from "./calculate";

describe("calculateBreakEvenSales", () => {
  it("calculates contribution margin, units, and sales at break-even", () => {
    const result = calculateBreakEvenSales({
      fixedCosts: 10_000_000,
      sellingPricePerUnit: 50_000,
      variableCostPerUnit: 30_000,
    });

    expect(result.contributionMarginPerUnit).toBe(20_000);
    expect(result.contributionMarginRatio).toBeCloseTo(0.4, 10);
    expect(result.breakEvenUnits).toBe(500);
    expect(result.breakEvenSales).toBe(25_000_000);
  });

  it("returns zero break-even sales when fixed costs are zero", () => {
    const result = calculateBreakEvenSales({
      fixedCosts: 0,
      sellingPricePerUnit: 100,
      variableCostPerUnit: 60,
    });

    expect(result.breakEvenUnits).toBe(0);
    expect(result.breakEvenSales).toBe(0);
  });

  it("rejects a non-positive contribution margin", () => {
    expect(() =>
      calculateBreakEvenSales({
        fixedCosts: 1000,
        sellingPricePerUnit: 100,
        variableCostPerUnit: 100,
      }),
    ).toThrow(RangeError);
  });
});
