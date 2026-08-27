import { describe, expect, it } from "vitest";
import { calculateRetirementWithdrawal } from "./calculate";

describe("calculateRetirementWithdrawal", () => {
  it("keeps the portfolio unchanged when return exactly offsets withdrawals", () => {
    const result = calculateRetirementWithdrawal({
      startingPortfolio: 1_000_000,
      monthlyWithdrawal: 0,
      expectedAnnualReturnPercent: 0,
      retirementYears: 30,
    });

    expect(result.projectedEndingBalance).toBe(1_000_000);
    expect(result.totalWithdrawn).toBe(0);
    expect(result.depletedAfterMonths).toBeNull();
  });

  it("calculates a 4.8 percent initial withdrawal rate", () => {
    const result = calculateRetirementWithdrawal({
      startingPortfolio: 500_000,
      monthlyWithdrawal: 2_000,
      expectedAnnualReturnPercent: 0,
      retirementYears: 10,
    });

    expect(result.annualWithdrawal).toBe(24_000);
    expect(result.initialWithdrawalRatePercent).toBeCloseTo(4.8, 8);
    expect(result.projectedEndingBalance).toBe(260_000);
    expect(result.totalWithdrawn).toBe(240_000);
    expect(result.depletedAfterMonths).toBeNull();
  });

  it("reports the month when withdrawals exhaust the portfolio", () => {
    const result = calculateRetirementWithdrawal({
      startingPortfolio: 12_000,
      monthlyWithdrawal: 1_000,
      expectedAnnualReturnPercent: 0,
      retirementYears: 5,
    });

    expect(result.depletedAfterMonths).toBe(12);
    expect(result.projectedEndingBalance).toBe(0);
    expect(result.totalWithdrawn).toBe(12_000);
  });

  it("rejects invalid inputs", () => {
    expect(() =>
      calculateRetirementWithdrawal({
        startingPortfolio: 0,
        monthlyWithdrawal: 1_000,
        expectedAnnualReturnPercent: 4,
        retirementYears: 30,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateRetirementWithdrawal({
        startingPortfolio: 100_000,
        monthlyWithdrawal: -1,
        expectedAnnualReturnPercent: 4,
        retirementYears: 30,
      }),
    ).toThrow(RangeError);
  });
});
