import { describe, expect, it } from "vitest";
import { calculateBondPrice } from "./calculate";

describe("calculateBondPrice", () => {
  it("prices a par bond at face value when coupon rate equals market yield", () => {
    const result = calculateBondPrice({
      faceValue: 1000,
      annualCouponRatePercent: 5,
      annualMarketYieldPercent: 5,
      yearsToMaturity: 10,
      paymentsPerYear: 2,
    });
    expect(result.bondPrice).toBeCloseTo(1000, 8);
    expect(result.premiumDiscountAmount).toBeCloseTo(0, 8);
  });

  it("prices a bond below par when market yield exceeds coupon rate", () => {
    const result = calculateBondPrice({
      faceValue: 1000,
      annualCouponRatePercent: 5,
      annualMarketYieldPercent: 6,
      yearsToMaturity: 5,
      paymentsPerYear: 2,
    });
    expect(result.bondPrice).toBeCloseTo(957.3489858161, 8);
    expect(result.premiumDiscountAmount).toBeLessThan(0);
  });

  it("prices a bond above par when coupon rate exceeds market yield", () => {
    const result = calculateBondPrice({
      faceValue: 1000,
      annualCouponRatePercent: 5,
      annualMarketYieldPercent: 4,
      yearsToMaturity: 5,
      paymentsPerYear: 2,
    });
    expect(result.bondPrice).toBeCloseTo(1044.9129250312, 8);
    expect(result.premiumDiscountAmount).toBeGreaterThan(0);
  });

  it("supports zero-coupon and zero-yield bonds", () => {
    const zeroCoupon = calculateBondPrice({
      faceValue: 1000,
      annualCouponRatePercent: 0,
      annualMarketYieldPercent: 8,
      yearsToMaturity: 5,
      paymentsPerYear: 1,
    });
    expect(zeroCoupon.bondPrice).toBeCloseTo(680.5831970338, 8);

    const zeroYield = calculateBondPrice({
      faceValue: 1000,
      annualCouponRatePercent: 5,
      annualMarketYieldPercent: 0,
      yearsToMaturity: 2,
      paymentsPerYear: 2,
    });
    expect(zeroYield.bondPrice).toBeCloseTo(1100, 8);
  });

  it("rejects invalid inputs", () => {
    expect(() =>
      calculateBondPrice({
        faceValue: 0,
        annualCouponRatePercent: 5,
        annualMarketYieldPercent: 6,
        yearsToMaturity: 5,
        paymentsPerYear: 2,
      }),
    ).toThrow(RangeError);
  });
});
