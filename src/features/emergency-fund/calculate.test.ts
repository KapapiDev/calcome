import { describe, expect, it } from "vitest";
import { calculateEmergencyFund } from "./calculate";

describe("calculateEmergencyFund", () => {
  it("calculates the target, gap, coverage, and months to goal", () => {
    const result = calculateEmergencyFund({
      monthlyEssentialExpenses: 2_000_000,
      targetMonths: 6,
      currentSavings: 5_000_000,
      monthlyContribution: 700_000,
    });

    expect(result.targetFund).toBe(12_000_000);
    expect(result.fundingGap).toBe(7_000_000);
    expect(result.surplus).toBe(0);
    expect(result.currentCoverageMonths).toBe(2.5);
    expect(result.monthsToGoal).toBe(10);
  });

  it("reports zero gap and zero months when the target is already funded", () => {
    const result = calculateEmergencyFund({
      monthlyEssentialExpenses: 1_500_000,
      targetMonths: 3,
      currentSavings: 6_000_000,
      monthlyContribution: 0,
    });

    expect(result.fundingGap).toBe(0);
    expect(result.surplus).toBe(1_500_000);
    expect(result.monthsToGoal).toBe(0);
  });

  it("leaves months to goal unavailable when there is a gap but no contribution", () => {
    expect(
      calculateEmergencyFund({
        monthlyEssentialExpenses: 1_000_000,
        targetMonths: 6,
        currentSavings: 1_000_000,
        monthlyContribution: 0,
      }).monthsToGoal,
    ).toBeNull();
  });

  it("rejects invalid inputs", () => {
    expect(() =>
      calculateEmergencyFund({
        monthlyEssentialExpenses: 0,
        targetMonths: 6,
        currentSavings: 0,
        monthlyContribution: 0,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateEmergencyFund({
        monthlyEssentialExpenses: 1_000_000,
        targetMonths: 37,
        currentSavings: 0,
        monthlyContribution: 0,
      }),
    ).toThrow(RangeError);
  });
});
