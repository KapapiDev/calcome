import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateDividendYieldRate } from "./calculate";

describe("calculateDividendYieldRate", () => {
  it("calculates yield and estimated income", () => {
    const result = calculateDividendYieldRate({
      sharePrice: new Decimal(50_000),
      annualDividendPerShare: new Decimal(2_000),
      investmentAmount: new Decimal(1_000_000),
    });
    expect(result.dividendYield.toNumber()).toBe(4);
    expect(result.estimatedShares.toNumber()).toBe(20);
    expect(result.estimatedAnnualDividend.toNumber()).toBe(40_000);
    expect(result.estimatedMonthlyAverage.toDecimalPlaces(2).toNumber()).toBe(
      3_333.33,
    );
  });
});
