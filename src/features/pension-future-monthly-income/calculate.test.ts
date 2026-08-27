import { describe, expect, it } from "vitest";
import { calculatePensionFutureMonthlyIncome } from "./calculate";

describe("calculatePensionFutureMonthlyIncome", () => {
  it("projects contributions and zero-return monthly income", () => {
    const result = calculatePensionFutureMonthlyIncome({
      currentBalance: 120_000,
      monthlyContribution: 1_000,
      yearsUntilRetirement: 10,
      accumulationAnnualReturnPercent: 0,
      payoutYears: 20,
      payoutAnnualReturnPercent: 0,
    });

    expect(result.projectedRetirementBalance).toBe(240_000);
    expect(result.totalContributions).toBe(240_000);
    expect(result.investmentGrowth).toBe(0);
    expect(result.estimatedMonthlyIncome).toBe(1_000);
    expect(result.estimatedAnnualIncome).toBe(12_000);
  });

  it("uses effective annual return during accumulation", () => {
    const result = calculatePensionFutureMonthlyIncome({
      currentBalance: 100_000,
      monthlyContribution: 0,
      yearsUntilRetirement: 1,
      accumulationAnnualReturnPercent: 12,
      payoutYears: 10,
      payoutAnnualReturnPercent: 0,
    });

    expect(result.projectedRetirementBalance).toBeCloseTo(112_000, 6);
    expect(result.investmentGrowth).toBeCloseTo(12_000, 6);
    expect(result.estimatedMonthlyIncome).toBeCloseTo(933.333333, 6);
  });

  it("calculates a level payout using the retirement return assumption", () => {
    const result = calculatePensionFutureMonthlyIncome({
      currentBalance: 300_000,
      monthlyContribution: 0,
      yearsUntilRetirement: 0,
      accumulationAnnualReturnPercent: 5,
      payoutYears: 25,
      payoutAnnualReturnPercent: 3,
    });

    expect(result.projectedRetirementBalance).toBe(300_000);
    expect(result.estimatedMonthlyIncome).toBeGreaterThan(1_000);
    expect(result.estimatedAnnualIncome).toBeCloseTo(
      result.estimatedMonthlyIncome * 12,
      8,
    );
  });

  it("rejects invalid inputs", () => {
    expect(() =>
      calculatePensionFutureMonthlyIncome({
        currentBalance: 0,
        monthlyContribution: 0,
        yearsUntilRetirement: 20,
        accumulationAnnualReturnPercent: 5,
        payoutYears: 25,
        payoutAnnualReturnPercent: 3,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculatePensionFutureMonthlyIncome({
        currentBalance: 100_000,
        monthlyContribution: 1_000,
        yearsUntilRetirement: 20,
        accumulationAnnualReturnPercent: -100,
        payoutYears: 25,
        payoutAnnualReturnPercent: 3,
      }),
    ).toThrow(RangeError);
  });
});
