import { describe, expect, it } from "vitest";
import { calculatePercentage } from "./calculate";

describe("calculatePercentage", () => {
  it("calculates a percentage of a value", () => {
    const result = calculatePercentage({
      percent: 15,
      baseValue: 240,
      partValue: 45,
      wholeValue: 180,
      oldValue: 80,
      newValue: 100,
    });

    expect(result.percentOfValue).toBe(36);
    expect(result.partAsPercent).toBe(25);
    expect(result.percentChange).toBe(25);
  });

  it("reports a negative percentage change when the value falls", () => {
    expect(
      calculatePercentage({
        percent: 10,
        baseValue: 50,
        partValue: 1,
        wholeValue: 4,
        oldValue: 200,
        newValue: 150,
      }).percentChange,
    ).toBe(-25);
  });

  it("rejects zero divisors", () => {
    expect(() =>
      calculatePercentage({
        percent: 10,
        baseValue: 100,
        partValue: 10,
        wholeValue: 0,
        oldValue: 100,
        newValue: 110,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculatePercentage({
        percent: 10,
        baseValue: 100,
        partValue: 10,
        wholeValue: 100,
        oldValue: 0,
        newValue: 110,
      }),
    ).toThrow(RangeError);
  });
});
