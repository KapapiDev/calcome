import { describe, expect, it } from "vitest";
import { calculateDDay } from "./calculate";

describe("calculateDDay", () => {
  it("calculates a future D-Day countdown", () => {
    const result = calculateDDay({
      asOfDate: "2026-08-27",
      targetDate: "2026-12-31",
    });

    expect(result.signedDays).toBe(126);
    expect(result.absoluteDays).toBe(126);
    expect(result.fullWeeks).toBe(18);
    expect(result.extraDays).toBe(0);
    expect(result.status).toBe("future");
  });

  it("returns D-Day for the same calendar date", () => {
    const result = calculateDDay({
      asOfDate: "2026-08-27",
      targetDate: "2026-08-27",
    });

    expect(result.signedDays).toBe(0);
    expect(result.status).toBe("today");
  });

  it("uses D+ semantics for a past target", () => {
    const result = calculateDDay({
      asOfDate: "2026-08-27",
      targetDate: "2026-08-20",
    });

    expect(result.signedDays).toBe(-7);
    expect(result.absoluteDays).toBe(7);
    expect(result.fullWeeks).toBe(1);
    expect(result.extraDays).toBe(0);
    expect(result.status).toBe("past");
  });

  it("handles leap-day boundaries as calendar days", () => {
    const result = calculateDDay({
      asOfDate: "2028-02-28",
      targetDate: "2028-03-01",
    });

    expect(result.signedDays).toBe(2);
  });

  it("rejects invalid dates", () => {
    expect(() =>
      calculateDDay({ asOfDate: "2026-02-30", targetDate: "2026-12-31" }),
    ).toThrow(RangeError);
    expect(() =>
      calculateDDay({ asOfDate: "2026-08-27", targetDate: "not-a-date" }),
    ).toThrow(RangeError);
  });
});
