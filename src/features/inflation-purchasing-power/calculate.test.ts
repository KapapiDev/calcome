import { describe, expect, it } from "vitest";

import { calculateInflationPurchasingPower } from "./calculate";

describe("calculateInflationPurchasingPower", () => {
  it("keeps purchasing power unchanged when inflation is zero", () => {
    const result = calculateInflationPurchasingPower({
      currentAmount: 10_000,
      annualInflationPercent: 0,
      years: 10,
    });

    expect(result.futureNominalCost).toBe(10_000);
    expect(result.futurePurchasingPower).toBe(10_000);
    expect(result.purchasingPowerLoss).toBe(0);
    expect(result.purchasingPowerLossPercent).toBe(0);
    expect(result.cumulativeInflationPercent).toBe(0);
  });

  it("calculates the real purchasing-power erosion from compound inflation", () => {
    const result = calculateInflationPurchasingPower({
      currentAmount: 10_000,
      annualInflationPercent: 3,
      years: 10,
    });

    expect(result.futureNominalCost).toBeCloseTo(13_439.1638, 4);
    expect(result.futurePurchasingPower).toBeCloseTo(7_440.9391, 4);
    expect(result.purchasingPowerLoss).toBeCloseTo(2_559.0609, 4);
    expect(result.purchasingPowerLossPercent).toBeCloseTo(25.5906, 4);
    expect(result.cumulativeInflationPercent).toBeCloseTo(34.3916, 4);
  });

  it("supports deflation above minus one hundred percent", () => {
    const result = calculateInflationPurchasingPower({
      currentAmount: 1_000,
      annualInflationPercent: -2,
      years: 5,
    });

    expect(result.futureNominalCost).toBeLessThan(1_000);
    expect(result.futurePurchasingPower).toBeGreaterThan(1_000);
    expect(result.purchasingPowerLoss).toBeLessThan(0);
  });

  it.each([
    { currentAmount: -1, annualInflationPercent: 3, years: 10 },
    { currentAmount: 1_000, annualInflationPercent: -100, years: 10 },
    { currentAmount: 1_000, annualInflationPercent: 3, years: 0 },
    { currentAmount: Number.NaN, annualInflationPercent: 3, years: 10 },
  ])("rejects invalid inputs: %o", (input) => {
    expect(() => calculateInflationPurchasingPower(input)).toThrow(RangeError);
  });
});
