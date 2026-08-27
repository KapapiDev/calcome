import { describe, expect, it } from "vitest";
import { calculateApartmentManagementFeeBudget } from "./calculate";

const baseInput = {
  monthlyManagementFee: 180_000,
  monthlyUtilities: 120_000,
  monthlyParkingAndOtherFee: 30_000,
  annualSpecialAssessment: 600_000,
  homeSizeSqm: 84,
  monthlyNetIncome: 5_000_000,
};

describe("calculateApartmentManagementFeeBudget", () => {
  it("turns recurring and annual apartment fees into a monthly budget", () => {
    const result = calculateApartmentManagementFeeBudget(baseInput);

    expect(result.monthlyRecurringCost).toBe(330_000);
    expect(result.monthlySpecialAssessmentEquivalent).toBe(50_000);
    expect(result.monthlyBudgetedCost).toBe(380_000);
    expect(result.annualBudgetedCost).toBe(4_560_000);
    expect(result.monthlyCostPerSqm).toBeCloseTo(4_523.8095, 4);
    expect(result.incomeSharePercent).toBeCloseTo(7.6, 6);
  });

  it("supports zero optional fees", () => {
    const result = calculateApartmentManagementFeeBudget({
      ...baseInput,
      monthlyUtilities: 0,
      monthlyParkingAndOtherFee: 0,
      annualSpecialAssessment: 0,
    });

    expect(result.monthlyBudgetedCost).toBe(baseInput.monthlyManagementFee);
    expect(result.annualBudgetedCost).toBe(baseInput.monthlyManagementFee * 12);
  });

  it("rejects invalid amounts and zero denominators", () => {
    expect(() =>
      calculateApartmentManagementFeeBudget({
        ...baseInput,
        monthlyManagementFee: -1,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateApartmentManagementFeeBudget({ ...baseInput, homeSizeSqm: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateApartmentManagementFeeBudget({ ...baseInput, monthlyNetIncome: 0 }),
    ).toThrow(RangeError);
  });
});
