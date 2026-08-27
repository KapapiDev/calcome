import { describe, expect, it } from "vitest";
import { calculateDividendReinvestment } from "./calculate";

describe("calculateDividendReinvestment", () => {
  it("shows the compounding advantage of reinvested dividends", () => {
    const result = calculateDividendReinvestment({
      initialInvestment: 10_000,
      initialDividendYieldPercent: 4,
      annualPriceGrowthPercent: 5,
      annualDividendGrowthPercent: 3,
      years: 10,
    });

    expect(result.reinvestedEndingValue).toBeCloseTo(23_208.689275, 6);
    expect(result.cashDividendEndingValue).toBeCloseTo(21_012.064544, 6);
    expect(result.reinvestmentAdvantage).toBeCloseTo(2_196.624731, 6);
    expect(result.reinvestedDividends).toBeCloseTo(5_647.320977, 6);
    expect(result.cashDividendsReceived).toBeCloseTo(4_723.118276, 6);
  });

  it("matches the cash-dividend scenario when yield is zero", () => {
    const result = calculateDividendReinvestment({
      initialInvestment: 10_000,
      initialDividendYieldPercent: 0,
      annualPriceGrowthPercent: 5,
      annualDividendGrowthPercent: 3,
      years: 10,
    });

    expect(result.reinvestedEndingValue).toBeCloseTo(
      result.cashDividendEndingValue,
      8,
    );
    expect(result.reinvestmentAdvantage).toBeCloseTo(0, 8);
    expect(result.reinvestedDividends).toBe(0);
  });

  it("supports falling prices without fabricating negative shares", () => {
    const result = calculateDividendReinvestment({
      initialInvestment: 10_000,
      initialDividendYieldPercent: 4,
      annualPriceGrowthPercent: -5,
      annualDividendGrowthPercent: 0,
      years: 5,
    });

    expect(result.reinvestedEndingValue).toBeGreaterThan(0);
    expect(result.reinvestedDividends).toBeGreaterThan(0);
  });

  it("rejects invalid assumptions", () => {
    expect(() =>
      calculateDividendReinvestment({
        initialInvestment: 0,
        initialDividendYieldPercent: 4,
        annualPriceGrowthPercent: 5,
        annualDividendGrowthPercent: 3,
        years: 10,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateDividendReinvestment({
        initialInvestment: 10_000,
        initialDividendYieldPercent: 4,
        annualPriceGrowthPercent: -100,
        annualDividendGrowthPercent: 3,
        years: 10,
      }),
    ).toThrow(RangeError);
  });
});
