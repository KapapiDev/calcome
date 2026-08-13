import { describe, expect, it } from "vitest";
import { calculateSavingsGoal } from "./calculate";

describe("calculateSavingsGoal", () => {
  it("solves the required monthly contribution at zero return", () => {
    const result = calculateSavingsGoal({
      targetAmount: 13_000_000,
      initialSavings: 1_000_000,
      annualReturnPercent: 0,
      years: 1,
    });

    expect(result.months).toBe(12);
    expect(result.monthlyContribution).toBeCloseTo(1_000_000, 6);
    expect(result.totalContributions).toBeCloseTo(13_000_000, 6);
    expect(result.estimatedGrowth).toBeCloseTo(0, 6);
  });

  it("reduces the required contribution when positive growth is assumed", () => {
    const withGrowth = calculateSavingsGoal({
      targetAmount: 100_000_000,
      initialSavings: 10_000_000,
      annualReturnPercent: 6,
      years: 10,
    });
    const withoutGrowth = calculateSavingsGoal({
      targetAmount: 100_000_000,
      initialSavings: 10_000_000,
      annualReturnPercent: 0,
      years: 10,
    });

    expect(withGrowth.monthlyContribution).toBeLessThan(
      withoutGrowth.monthlyContribution,
    );
    expect(withGrowth.estimatedGrowth).toBeGreaterThan(0);
  });

  it("returns zero monthly contribution when current savings already reach the target", () => {
    const result = calculateSavingsGoal({
      targetAmount: 10_000_000,
      initialSavings: 12_000_000,
      annualReturnPercent: 3,
      years: 5,
    });

    expect(result.monthlyContribution).toBe(0);
  });

  it("rejects invalid targets and periods", () => {
    expect(() =>
      calculateSavingsGoal({
        targetAmount: 0,
        initialSavings: 0,
        annualReturnPercent: 3,
        years: 5,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateSavingsGoal({
        targetAmount: 10_000_000,
        initialSavings: 0,
        annualReturnPercent: 3,
        years: 0,
      }),
    ).toThrow(RangeError);
  });
});
