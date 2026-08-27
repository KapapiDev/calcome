import { describe, expect, it } from "vitest";
import { calculateHomeSaleNetProceeds } from "./calculate";

const baseInput = {
  salePrice: 800_000_000,
  mortgagePayoff: 300_000_000,
  brokerageFee: 4_000_000,
  transferTax: 0,
  legalClosingCost: 1_000_000,
  repairStagingCost: 3_000_000,
  movingCost: 2_000_000,
  otherCost: 0,
};

describe("calculateHomeSaleNetProceeds", () => {
  it("subtracts selling costs and mortgage payoff from the sale price", () => {
    const result = calculateHomeSaleNetProceeds(baseInput);

    expect(result.sellingCosts).toBe(10_000_000);
    expect(result.proceedsBeforeLoanPayoff).toBe(790_000_000);
    expect(result.netProceeds).toBe(490_000_000);
    expect(result.sellingCostRatePercent).toBeCloseTo(1.25, 6);
    expect(result.mortgagePayoffRatePercent).toBeCloseTo(37.5, 6);
  });

  it("supports a debt-free sale", () => {
    const result = calculateHomeSaleNetProceeds({
      ...baseInput,
      mortgagePayoff: 0,
    });

    expect(result.netProceeds).toBe(result.proceedsBeforeLoanPayoff);
    expect(result.mortgagePayoffRatePercent).toBe(0);
  });

  it("allows negative net proceeds when payoff and costs exceed sale price", () => {
    const result = calculateHomeSaleNetProceeds({
      ...baseInput,
      mortgagePayoff: 795_000_000,
    });

    expect(result.netProceeds).toBe(-5_000_000);
  });

  it("rejects invalid prices and negative amounts", () => {
    expect(() =>
      calculateHomeSaleNetProceeds({ ...baseInput, salePrice: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateHomeSaleNetProceeds({ ...baseInput, brokerageFee: -1 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateHomeSaleNetProceeds({ ...baseInput, mortgagePayoff: -1 }),
    ).toThrow(RangeError);
  });
});
