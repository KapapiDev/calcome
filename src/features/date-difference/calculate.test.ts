import { describe, expect, it } from "vitest";
import { calculateDateDifference } from "./calculate";

describe("calculateDateDifference", () => {
  it("calculates total days, weeks, and calendar breakdown", () => {
    const result = calculateDateDifference({
      startDate: "2024-01-15",
      endDate: "2026-08-27",
    });

    expect(result.signedDays).toBe(955);
    expect(result.absoluteDays).toBe(955);
    expect(result.fullWeeks).toBe(136);
    expect(result.extraDays).toBe(3);
    expect(result.calendarYears).toBe(2);
    expect(result.calendarMonths).toBe(7);
    expect(result.calendarDays).toBe(12);
    expect(result.direction).toBe("forward");
  });

  it("returns zero for the same calendar date", () => {
    const result = calculateDateDifference({
      startDate: "2026-08-27",
      endDate: "2026-08-27",
    });

    expect(result.absoluteDays).toBe(0);
    expect(result.calendarYears).toBe(0);
    expect(result.calendarMonths).toBe(0);
    expect(result.calendarDays).toBe(0);
    expect(result.direction).toBe("same");
  });

  it("preserves reverse direction while using an absolute duration", () => {
    const result = calculateDateDifference({
      startDate: "2026-08-27",
      endDate: "2026-08-20",
    });

    expect(result.signedDays).toBe(-7);
    expect(result.absoluteDays).toBe(7);
    expect(result.fullWeeks).toBe(1);
    expect(result.extraDays).toBe(0);
    expect(result.direction).toBe("reverse");
  });

  it("handles leap-day boundaries as calendar days", () => {
    const result = calculateDateDifference({
      startDate: "2028-02-28",
      endDate: "2028-03-01",
    });

    expect(result.absoluteDays).toBe(2);
    expect(result.calendarYears).toBe(0);
    expect(result.calendarMonths).toBe(0);
    expect(result.calendarDays).toBe(2);
  });

  it("clamps leap-day anniversaries for calendar-year breakdown", () => {
    const result = calculateDateDifference({
      startDate: "2024-02-29",
      endDate: "2025-02-28",
    });

    expect(result.calendarYears).toBe(1);
    expect(result.calendarMonths).toBe(0);
    expect(result.calendarDays).toBe(0);
  });

  it("rejects invalid dates", () => {
    expect(() =>
      calculateDateDifference({
        startDate: "2026-02-30",
        endDate: "2026-08-27",
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateDateDifference({ startDate: "bad", endDate: "2026-08-27" }),
    ).toThrow(RangeError);
  });
});
