import { describe, expect, it } from "vitest";

import { calculateDollarCostAveraging } from "./calculate";

describe("calculateDollarCostAveraging", () => {
  it("handles a zero-return plan without dividing by zero", () => {
    expect(
      calculateDollarCostAveraging({
        initialInvestment: 10_000,
        monthlyContribution: 500,
        annualReturnPercent: 0,
        years: 2,
      }),
    ).toEqual({
      months: 24,
      totalInvested: 22_000,
      endingBalance: 22_000,
      estimatedGain: 0,
      initialInvestmentFutureValue: 10_000,
      contributionFutureValue: 12_000,
    });
  });

  it("treats recurring contributions as end-of-month deposits", () => {
    const result = calculateDollarCostAveraging({
      initialInvestment: 10_000,
      monthlyContribution: 500,
      annualReturnPercent: 6,
      years: 10,
    });

    expect(result.months).toBe(120);
    expect(result.totalInvested).toBe(70_000);
    expect(result.endingBalance).toBeCloseTo(100_133.64, 2);
    expect(result.estimatedGain).toBeCloseTo(30_133.64, 2);
  });

  it("supports negative expected returns above -100%", () => {
    const result = calculateDollarCostAveraging({
      initialInvestment: 12_000,
      monthlyContribution: 1_000,
      annualReturnPercent: -12,
      years: 1,
    });

    expect(result.endingBalance).toBeLessThan(result.totalInvested);
    expect(result.estimatedGain).toBeLessThan(0);
  });

  it.each([
    { initialInvestment: -1, monthlyContribution: 0, annualReturnPercent: 0, years: 1 },
    { initialInvestment: 0, monthlyContribution: -1, annualReturnPercent: 0, years: 1 },
    { initialInvestment: 0, monthlyContribution: 0, annualReturnPercent: -100, years: 1 },
    { initialInvestment: 0, monthlyContribution: 0, annualReturnPercent: 0, years: 0 },
  ])("rejects invalid inputs: %o", (input) => {
    expect(() => calculateDollarCostAveraging(input)).toThrow(RangeError);
  });
});
