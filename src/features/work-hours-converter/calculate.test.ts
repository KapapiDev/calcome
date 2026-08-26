import { describe, expect, it } from "vitest";
import {
  AVERAGE_WEEKS_PER_MONTH,
  calculateWorkHoursConverter,
} from "./calculate";

describe("calculateWorkHoursConverter", () => {
  it("converts 40 weekly hours to average monthly and annual hours", () => {
    const result = calculateWorkHoursConverter({
      direction: "weekly-to-monthly",
      hours: 40,
    });

    expect(result.weeklyHours).toBe(40);
    expect(result.averageMonthlyHours).toBeCloseTo(173.925, 3);
    expect(result.annualHours).toBeCloseTo(2_087.1, 1);
    expect(result.averageWeeksPerMonth).toBeCloseTo(
      AVERAGE_WEEKS_PER_MONTH,
      6,
    );
  });

  it("converts average monthly hours back to weekly hours", () => {
    const result = calculateWorkHoursConverter({
      direction: "monthly-to-weekly",
      hours: 160,
    });

    expect(result.weeklyHours).toBeCloseTo(36.79747, 5);
    expect(result.averageMonthlyHours).toBe(160);
    expect(result.annualHours).toBeCloseTo(1_920, 5);
  });

  it("round-trips the average-month conversion", () => {
    const monthly = calculateWorkHoursConverter({
      direction: "weekly-to-monthly",
      hours: 35.5,
    }).averageMonthlyHours;

    const weekly = calculateWorkHoursConverter({
      direction: "monthly-to-weekly",
      hours: monthly,
    }).weeklyHours;

    expect(weekly).toBeCloseTo(35.5, 10);
  });

  it("rejects invalid hours", () => {
    expect(() =>
      calculateWorkHoursConverter({
        direction: "weekly-to-monthly",
        hours: -1,
      }),
    ).toThrow(RangeError);
  });
});
