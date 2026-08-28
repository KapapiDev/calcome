import { describe, expect, it } from "vitest";
import { calculateCryptoProfitLoss } from "./calculate";

describe("calculateCryptoProfitLoss", () => {
  it("calculates net profit, return, and break-even price with fees", () => {
    const result = calculateCryptoProfitLoss({
      quantity: 2,
      averageEntryPrice: 50_000,
      currentPrice: 60_000,
      buyFeePercent: 0.1,
      sellFeePercent: 0.2,
    });

    expect(result.grossCostBasis).toBe(100_000);
    expect(result.buyFee).toBeCloseTo(100, 10);
    expect(result.totalCostBasis).toBeCloseTo(100_100, 10);
    expect(result.grossCurrentValue).toBe(120_000);
    expect(result.estimatedSellFee).toBeCloseTo(240, 10);
    expect(result.netCurrentValue).toBeCloseTo(119_760, 10);
    expect(result.profitLoss).toBeCloseTo(19_660, 10);
    expect(result.returnPercent).toBeCloseTo(19.6403596404, 8);
    expect(result.breakEvenPrice).toBeCloseTo(50_150.3006012, 8);
  });

  it("returns a loss when the current price is below the entry price", () => {
    const result = calculateCryptoProfitLoss({
      quantity: 0.5,
      averageEntryPrice: 80_000,
      currentPrice: 60_000,
      buyFeePercent: 0,
      sellFeePercent: 0,
    });
    expect(result.profitLoss).toBe(-10_000);
    expect(result.returnPercent).toBe(-25);
    expect(result.breakEvenPrice).toBe(80_000);
  });

  it("rejects invalid positions and fee rates", () => {
    expect(() =>
      calculateCryptoProfitLoss({
        quantity: 0,
        averageEntryPrice: 50_000,
        currentPrice: 60_000,
        buyFeePercent: 0,
        sellFeePercent: 0,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateCryptoProfitLoss({
        quantity: 1,
        averageEntryPrice: 50_000,
        currentPrice: 60_000,
        buyFeePercent: 0,
        sellFeePercent: 100,
      }),
    ).toThrow(RangeError);
  });
});
