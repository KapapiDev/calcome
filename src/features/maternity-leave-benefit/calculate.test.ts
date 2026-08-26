import { describe, expect, it } from "vitest";
import { calculateMaternityLeaveBenefit } from "./calculate";

describe("calculateMaternityLeaveBenefit", () => {
  it("applies the current 90-day priority-supported employer structure", () => {
    const result = calculateMaternityLeaveBenefit({
      monthlyOrdinaryWage: 3000000,
      multipleBirth: false,
      prioritySupportedEmployer: true,
    });

    expect(result.leaveDays).toBe(90);
    expect(result.governmentPaidDays).toBe(90);
    expect(result.governmentBenefit).toBe(6300000);
    expect(result.employerPayment).toBe(1800000);
    expect(result.estimatedTotalIncome).toBe(8100000);
  });

  it("applies the 30-day government portion for a large employer", () => {
    const result = calculateMaternityLeaveBenefit({
      monthlyOrdinaryWage: 3000000,
      multipleBirth: false,
      prioritySupportedEmployer: false,
    });

    expect(result.employerPaidDays).toBe(60);
    expect(result.governmentPaidDays).toBe(30);
    expect(result.employerPayment).toBe(6000000);
    expect(result.governmentBenefit).toBe(2100000);
    expect(result.estimatedTotalIncome).toBe(8100000);
  });

  it("uses 120 days and a 45-day final insurance period for multiple births", () => {
    const result = calculateMaternityLeaveBenefit({
      monthlyOrdinaryWage: 2100000,
      multipleBirth: true,
      prioritySupportedEmployer: false,
    });

    expect(result.leaveDays).toBe(120);
    expect(result.employerPaidDays).toBe(75);
    expect(result.governmentPaidDays).toBe(45);
    expect(result.employerPayment).toBe(5250000);
    expect(result.governmentBenefit).toBe(3150000);
    expect(result.estimatedTotalIncome).toBe(8400000);
  });

  it("does not manufacture an employer top-up when ordinary wage is below the cap", () => {
    const result = calculateMaternityLeaveBenefit({
      monthlyOrdinaryWage: 1800000,
      multipleBirth: false,
      prioritySupportedEmployer: true,
    });

    expect(result.governmentBenefit).toBe(5400000);
    expect(result.employerPayment).toBe(0);
    expect(result.estimatedTotalIncome).toBe(5400000);
  });

  it("rejects invalid ordinary wage", () => {
    expect(() =>
      calculateMaternityLeaveBenefit({
        monthlyOrdinaryWage: 0,
        multipleBirth: false,
        prioritySupportedEmployer: true,
      }),
    ).toThrow(RangeError);
  });
});
