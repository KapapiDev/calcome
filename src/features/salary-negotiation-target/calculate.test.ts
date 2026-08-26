import { describe, expect, it } from "vitest";
import { calculateSalaryNegotiationTarget } from "./calculate";

describe("calculateSalaryNegotiationTarget", () => {
  it("builds minimum, target, and stretch salary anchors", () => {
    const result = calculateSalaryNegotiationTarget({
      currentSalary: 100000,
      minimumIncreasePercent: 5,
      targetIncreasePercent: 12,
      stretchIncreasePercent: 20,
    });

    expect(result.minimumSalary).toBeCloseTo(105000);
    expect(result.targetSalary).toBeCloseTo(112000);
    expect(result.stretchSalary).toBeCloseTo(120000);
    expect(result.targetIncreaseAmount).toBeCloseTo(12000);
    expect(result.targetMonthlyEquivalent).toBeCloseTo(9333.333333, 5);
  });

  it("rejects unordered negotiation anchors", () => {
    expect(() =>
      calculateSalaryNegotiationTarget({
        currentSalary: 100000,
        minimumIncreasePercent: 10,
        targetIncreasePercent: 5,
        stretchIncreasePercent: 20,
      }),
    ).toThrow(RangeError);
  });
});
