import { describe, expect, it } from "vitest";
import { calculatePortfolioRebalancing } from "./calculate";

describe("calculatePortfolioRebalancing", () => {
  it("calculates balanced buy and sell trades", () => {
    const result = calculatePortfolioRebalancing({
      assets: [
        { currentValue: 6_000, targetWeightPercent: 50 },
        { currentValue: 3_000, targetWeightPercent: 30 },
        { currentValue: 1_000, targetWeightPercent: 20 },
      ],
    });

    expect(result.totalPortfolioValue).toBe(10_000);
    expect(result.totalBuyAmount).toBe(1_000);
    expect(result.totalSellAmount).toBe(1_000);
    expect(result.turnoverAmount).toBe(1_000);
    expect(result.turnoverPercent).toBe(10);
    expect(result.assets[0]?.tradeAmount).toBe(-1_000);
    expect(result.assets[1]?.tradeAmount).toBe(0);
    expect(result.assets[2]?.tradeAmount).toBe(1_000);
  });

  it("returns zero turnover for an already balanced portfolio", () => {
    const result = calculatePortfolioRebalancing({
      assets: [
        { currentValue: 5_000, targetWeightPercent: 50 },
        { currentValue: 3_000, targetWeightPercent: 30 },
        { currentValue: 2_000, targetWeightPercent: 20 },
      ],
    });

    expect(result.turnoverAmount).toBeCloseTo(0, 8);
    expect(result.turnoverPercent).toBeCloseTo(0, 8);
  });

  it("supports a zero-current-value asset with a positive target", () => {
    const result = calculatePortfolioRebalancing({
      assets: [
        { currentValue: 8_000, targetWeightPercent: 80 },
        { currentValue: 2_000, targetWeightPercent: 10 },
        { currentValue: 0, targetWeightPercent: 10 },
      ],
    });

    expect(result.assets[2]?.targetValue).toBe(1_000);
    expect(result.assets[2]?.tradeAmount).toBe(1_000);
  });

  it("rejects invalid totals and empty portfolios", () => {
    expect(() =>
      calculatePortfolioRebalancing({
        assets: [
          { currentValue: 5_000, targetWeightPercent: 50 },
          { currentValue: 5_000, targetWeightPercent: 40 },
        ],
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculatePortfolioRebalancing({
        assets: [
          { currentValue: 0, targetWeightPercent: 50 },
          { currentValue: 0, targetWeightPercent: 50 },
        ],
      }),
    ).toThrow(RangeError);
  });
});
