import { describe, expect, it } from "vitest";
import { calculateParentalLeaveBenefit } from "./calculate";

describe("calculateParentalLeaveBenefit", () => {
  it("applies the 2026 general benefit caps for a 12-month leave", () => {
    const result = calculateParentalLeaveBenefit({
      monthlyOrdinaryWage: 3000000,
      leaveMonths: 12,
    });

    expect(result.firstThreeMonthly).toBe(2500000);
    expect(result.monthsFourToSixMonthly).toBe(2000000);
    expect(result.monthSevenPlusMonthly).toBe(1600000);
    expect(result.totalBenefit).toBe(23100000);
  });

  it("uses ordinary wage below the caps and 80% from month seven", () => {
    const result = calculateParentalLeaveBenefit({
      monthlyOrdinaryWage: 1500000,
      leaveMonths: 12,
    });

    expect(result.firstThreeMonthly).toBe(1500000);
    expect(result.monthsFourToSixMonthly).toBe(1500000);
    expect(result.monthSevenPlusMonthly).toBe(1200000);
    expect(result.totalBenefit).toBe(16200000);
  });

  it("applies the statutory monthly floor", () => {
    const result = calculateParentalLeaveBenefit({
      monthlyOrdinaryWage: 500000,
      leaveMonths: 7,
    });

    expect(result.firstThreeMonthly).toBe(700000);
    expect(result.monthsFourToSixMonthly).toBe(700000);
    expect(result.monthSevenPlusMonthly).toBe(700000);
    expect(result.totalBenefit).toBe(4900000);
  });

  it("supports an eligible extended leave up to 18 months", () => {
    const result = calculateParentalLeaveBenefit({
      monthlyOrdinaryWage: 3000000,
      leaveMonths: 18,
    });

    expect(result.totalBenefit).toBe(32700000);
  });

  it("rejects invalid values", () => {
    expect(() =>
      calculateParentalLeaveBenefit({
        monthlyOrdinaryWage: 0,
        leaveMonths: 12,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateParentalLeaveBenefit({
        monthlyOrdinaryWage: 3000000,
        leaveMonths: 19,
      }),
    ).toThrow(RangeError);
  });
});
