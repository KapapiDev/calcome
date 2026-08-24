import { describe, expect, it } from "vitest";

import { calculateInvestmentFeeImpact } from "./calculate";

describe("calculateInvestmentFeeImpact", () => {
  it("returns no fee impact when the annual fee is zero", () => {
    const result = calculateInvestmentFeeImpact({
      initialInvestment: 10_000,
      monthlyContribution: 500,
      annualReturnPercent: 6,
      annualFeePercent: 0,
      years: 10,
    });

    expect(result.endingBalanceAfterFees).toBeCloseTo(
      result.endingBalanceWithoutFees,
      8,
    );
    expect(result.feeImpactAmount).toBeCloseTo(0, 8);
    expect(result.feeImpactPercent).toBeCloseTo(0, 8);
  });

  it("shows the long-term balance drag from an annual asset fee", () => {
    const result = calculateInvestmentFeeImpact({
      initialInvestment: 10_000,
      monthlyContribution: 500,
      annualReturnPercent: 7,
      annualFeePercent: 1,
      years: 20,
    });

    expect(result.months).toBe(240);
    expect(result.totalInvested).toBe(130_000);
    expect(result.endingBalanceWithoutFees).toBeGreaterThan(
      result.endingBalanceAfterFees,
    );
    expect(result.feeImpactAmount).toBeGreaterThan(0);
    expect(result.feeImpactPercent).toBeGreaterThan(0);
  });

  it("supports negative expected returns when the net annual return stays above -100%", () => {
    const result = calculateInvestmentFeeImpact({
      initialInvestment: 12_000,
      monthlyContribution: 1_000,
      annualReturnPercent: -10,
      annualFeePercent: 1,
      years: 1,
    });

    expect(result.endingBalanceAfterFees).toBeLessThan(
      result.endingBalanceWithoutFees,
    );
    expect(result.estimatedGainAfterFees).toBeLessThan(0);
  });

  it.each([
    {
      initialInvestment: -1,
      monthlyContribution: 0,
      annualReturnPercent: 0,
      annualFeePercent: 0,
      years: 1,
    },
    {
      initialInvestment: 0,
      monthlyContribution: -1,
      annualReturnPercent: 0,
      annualFeePercent: 0,
      years: 1,
    },
    {
      initialInvestment: 0,
      monthlyContribution: 0,
      annualReturnPercent: -100,
      annualFeePercent: 0,
      years: 1,
    },
    {
      initialInvestment: 0,
      monthlyContribution: 0,
      annualReturnPercent: 0,
      annualFeePercent: -0.1,
      years: 1,
    },
    {
      initialInvestment: 0,
      monthlyContribution: 0,
      annualReturnPercent: 0,
      annualFeePercent: 100,
      years: 1,
    },
    {
      initialInvestment: 0,
      monthlyContribution: 0,
      annualReturnPercent: 0,
      annualFeePercent: 0,
      years: 0,
    },
  ])("rejects invalid inputs: %o", (input) => {
    expect(() => calculateInvestmentFeeImpact(input)).toThrow(RangeError);
  });
});
