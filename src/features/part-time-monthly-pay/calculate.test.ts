import { describe, expect, it } from "vitest";
import { calculatePartTimeMonthlyPay } from "./calculate";

describe("calculatePartTimeMonthlyPay", () => {
  it("converts a weekly part-time schedule to average monthly and annual gross pay", () => {
    const result = calculatePartTimeMonthlyPay({
      hourlyWage: 12_000,
      hoursPerDay: 5,
      daysPerWeek: 4,
    });

    expect(result.weeklyHours).toBe(20);
    expect(result.weeklyPay).toBe(240_000);
    expect(result.averageMonthlyHours).toBeCloseTo(86.9625, 4);
    expect(result.monthlyPay).toBeCloseTo(1_043_550, 0);
    expect(result.annualPay).toBeCloseTo(12_522_600, 0);
  });

  it("rejects impossible schedules", () => {
    expect(() =>
      calculatePartTimeMonthlyPay({
        hourlyWage: 12_000,
        hoursPerDay: 8,
        daysPerWeek: 8,
      }),
    ).toThrow(RangeError);
  });
});
