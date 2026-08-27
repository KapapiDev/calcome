import { describe, expect, it } from "vitest";
import { calculateAge } from "./calculate";

describe("calculateAge", () => {
  it("calculates completed years and elapsed days", () => {
    const result = calculateAge({
      birthDate: "1995-06-15",
      asOfDate: "2026-08-27",
    });

    expect(result.fullYears).toBe(31);
    expect(result.totalDays).toBe(11396);
    expect(result.fullWeeks).toBe(1628);
    expect(result.extraDays).toBe(0);
    expect(result.nextBirthday).toBe("2027-06-15");
    expect(result.daysUntilBirthday).toBe(292);
  });

  it("does not increment age before the birthday", () => {
    const result = calculateAge({
      birthDate: "2000-12-31",
      asOfDate: "2026-12-30",
    });

    expect(result.fullYears).toBe(25);
    expect(result.daysUntilBirthday).toBe(1);
  });

  it("uses February 28 for leap-day birthdays in non-leap years", () => {
    const result = calculateAge({
      birthDate: "2000-02-29",
      asOfDate: "2026-02-28",
    });

    expect(result.fullYears).toBe(26);
    expect(result.nextBirthday).toBe("2027-02-28");
  });

  it("rejects invalid or future birth dates", () => {
    expect(() =>
      calculateAge({ birthDate: "2026-02-30", asOfDate: "2026-08-27" }),
    ).toThrow(RangeError);
    expect(() =>
      calculateAge({ birthDate: "2027-01-01", asOfDate: "2026-08-27" }),
    ).toThrow(RangeError);
  });
});
