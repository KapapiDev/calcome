import { describe, expect, it } from "vitest";
import { calculateForeignCurrencyAverageCost } from "./calculate";

describe("calculateForeignCurrencyAverageCost", () => {
  it("calculates a weighted average exchange rate after an additional purchase", () => {
    const result = calculateForeignCurrencyAverageCost({
      currentAmount: 1_000,
      currentAverageRate: 1_350,
      additionalAmount: 500,
      additionalRate: 1_290,
    });

    expect(result.currentCost).toBe(1_350_000);
    expect(result.additionalCost).toBe(645_000);
    expect(result.totalForeignAmount).toBe(1_500);
    expect(result.totalQuoteCost).toBe(1_995_000);
    expect(result.newAverageRate).toBe(1_330);
    expect(result.averageRateChangePercent).toBeCloseTo(-1.4814814815, 8);
  });

  it("supports a first foreign-currency purchase", () => {
    const result = calculateForeignCurrencyAverageCost({
      currentAmount: 0,
      currentAverageRate: 0,
      additionalAmount: 250,
      additionalRate: 1.08,
    });

    expect(result.totalForeignAmount).toBe(250);
    expect(result.totalQuoteCost).toBeCloseTo(270, 10);
    expect(result.newAverageRate).toBeCloseTo(1.08, 10);
    expect(result.averageRateChangePercent).toBe(0);
  });

  it("keeps the average rate unchanged when the added rate matches it", () => {
    const result = calculateForeignCurrencyAverageCost({
      currentAmount: 2_000,
      currentAverageRate: 150,
      additionalAmount: 1_000,
      additionalRate: 150,
    });

    expect(result.newAverageRate).toBe(150);
    expect(result.averageRateChangePercent).toBe(0);
  });

  it("rejects empty, negative, and zero-rate funded positions", () => {
    expect(() =>
      calculateForeignCurrencyAverageCost({
        currentAmount: 0,
        currentAverageRate: 0,
        additionalAmount: 0,
        additionalRate: 0,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateForeignCurrencyAverageCost({
        currentAmount: 100,
        currentAverageRate: 0,
        additionalAmount: 0,
        additionalRate: 0,
      }),
    ).toThrow(RangeError);
  });
});
