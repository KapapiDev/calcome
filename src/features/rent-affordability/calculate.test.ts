import { describe, expect, it } from "vitest";
import { calculateRentAffordability } from "./calculate";

const baseInput = {
  monthlyTakeHomeIncome: 5000,
  fixedMonthlyObligations: 500,
  desiredMonthlyLeftover: 2500,
  nonRentHousingCosts: 300,
  targetHousingPercent: 30,
};

describe("calculateRentAffordability", () => {
  it("uses the lower ratio-based rent cap when it is more conservative", () => {
    const result = calculateRentAffordability(baseInput);

    expect(result.ratioBasedRentCap).toBe(1200);
    expect(result.cashFlowRentCap).toBe(1700);
    expect(result.recommendedMonthlyRent).toBe(1200);
    expect(result.annualRent).toBe(14400);
    expect(result.totalMonthlyHousingCost).toBe(1500);
    expect(result.totalHousingSharePercent).toBe(30);
    expect(result.remainingAfterPlan).toBe(3000);
    expect(result.limitingFactor).toBe("ratio");
  });

  it("uses the cash-flow cap when the desired leftover is more restrictive", () => {
    const result = calculateRentAffordability({
      ...baseInput,
      desiredMonthlyLeftover: 3500,
    });

    expect(result.ratioBasedRentCap).toBe(1200);
    expect(result.cashFlowRentCap).toBe(700);
    expect(result.recommendedMonthlyRent).toBe(700);
    expect(result.remainingAfterPlan).toBe(3500);
    expect(result.limitingFactor).toBe("cash-flow");
  });

  it("reports both constraints when the caps are equal", () => {
    const result = calculateRentAffordability({
      monthlyTakeHomeIncome: 5000,
      fixedMonthlyObligations: 500,
      desiredMonthlyLeftover: 3000,
      nonRentHousingCosts: 0,
      targetHousingPercent: 30,
    });

    expect(result.ratioBasedRentCap).toBe(1500);
    expect(result.cashFlowRentCap).toBe(1500);
    expect(result.recommendedMonthlyRent).toBe(1500);
    expect(result.limitingFactor).toBe("both");
  });

  it("never returns a negative rent budget", () => {
    const result = calculateRentAffordability({
      ...baseInput,
      nonRentHousingCosts: 2000,
    });

    expect(result.ratioBasedRentCap).toBe(0);
    expect(result.recommendedMonthlyRent).toBe(0);
  });

  it("rejects invalid values", () => {
    expect(() =>
      calculateRentAffordability({ ...baseInput, monthlyTakeHomeIncome: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateRentAffordability({ ...baseInput, fixedMonthlyObligations: -1 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateRentAffordability({ ...baseInput, targetHousingPercent: 101 }),
    ).toThrow(RangeError);
  });
});
