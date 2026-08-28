import { describe, expect, it } from "vitest";
import { calculateBondYield } from "./calculate";

describe("calculateBondYield", () => {
  it("returns coupon rate as YTM when price equals par", () => {
    const result = calculateBondYield({
      faceValue: 1000,
      marketPrice: 1000,
      annualCouponRatePercent: 5,
      yearsToMaturity: 10,
      paymentsPerYear: 2,
    });
    expect(result.ytmPercent).toBeCloseTo(5, 8);
    expect(result.currentYieldPercent).toBeCloseTo(5, 8);
  });

  it("produces a higher YTM for a discount bond", () => {
    const result = calculateBondYield({
      faceValue: 1000,
      marketPrice: 900,
      annualCouponRatePercent: 5,
      yearsToMaturity: 5,
      paymentsPerYear: 2,
    });
    expect(result.ytmPercent).toBeGreaterThan(5);
    expect(result.currentYieldPercent).toBeCloseTo(5.5555555556, 6);
  });

  it("produces a lower YTM for a premium bond", () => {
    const result = calculateBondYield({
      faceValue: 1000,
      marketPrice: 1100,
      annualCouponRatePercent: 5,
      yearsToMaturity: 5,
      paymentsPerYear: 2,
    });
    expect(result.ytmPercent).toBeLessThan(5);
  });

  it("supports zero-coupon bonds", () => {
    const result = calculateBondYield({
      faceValue: 1000,
      marketPrice: 800,
      annualCouponRatePercent: 0,
      yearsToMaturity: 5,
      paymentsPerYear: 1,
    });
    expect(result.ytmPercent).toBeCloseTo(
      (1000 / 800) ** (1 / 5) * 100 - 100,
      8,
    );
  });

  it("rejects invalid inputs", () => {
    expect(() =>
      calculateBondYield({
        faceValue: 0,
        marketPrice: 1000,
        annualCouponRatePercent: 5,
        yearsToMaturity: 5,
        paymentsPerYear: 2,
      }),
    ).toThrow(RangeError);
  });
});
