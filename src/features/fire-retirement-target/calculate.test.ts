import { describe, expect, it } from "vitest";
import { calculateFireRetirementTarget } from "./calculate";

describe("calculateFireRetirementTarget", () => {
  it("calculates a 25x target at a 4% withdrawal rate", () => {
    const result = calculateFireRetirementTarget({
      monthlyExpenses: 3_000,
      withdrawalRatePercent: 4,
      currentPortfolio: 200_000,
      monthlyContribution: 2_000,
      expectedAnnualReturnPercent: 5,
    });

    expect(result.annualExpenses).toBe(36_000);
    expect(result.targetPortfolio).toBe(900_000);
    expect(result.fundingGap).toBe(700_000);
    expect(result.fundedPercent).toBeCloseTo(22.2222, 3);
    expect(result.annualWithdrawalAtTarget).toBeCloseTo(36_000, 8);
    expect(result.monthsToTarget).not.toBeNull();
  });

  it("returns zero months when the target is already funded", () => {
    const result = calculateFireRetirementTarget({
      monthlyExpenses: 2_000,
      withdrawalRatePercent: 4,
      currentPortfolio: 700_000,
      monthlyContribution: 0,
      expectedAnnualReturnPercent: 0,
    });

    expect(result.targetPortfolio).toBe(600_000);
    expect(result.fundingGap).toBe(0);
    expect(result.monthsToTarget).toBe(0);
  });

  it("returns null when the target cannot be reached within the planning horizon", () => {
    const result = calculateFireRetirementTarget({
      monthlyExpenses: 4_000,
      withdrawalRatePercent: 4,
      currentPortfolio: 0,
      monthlyContribution: 0,
      expectedAnnualReturnPercent: 0,
    });

    expect(result.monthsToTarget).toBeNull();
  });

  it("rejects invalid inputs", () => {
    expect(() =>
      calculateFireRetirementTarget({
        monthlyExpenses: 0,
        withdrawalRatePercent: 4,
        currentPortfolio: 0,
        monthlyContribution: 0,
        expectedAnnualReturnPercent: 5,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateFireRetirementTarget({
        monthlyExpenses: 3_000,
        withdrawalRatePercent: 0,
        currentPortfolio: 0,
        monthlyContribution: 0,
        expectedAnnualReturnPercent: 5,
      }),
    ).toThrow(RangeError);
  });
});
