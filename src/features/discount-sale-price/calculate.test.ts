import { describe, expect, it } from "vitest";
import { calculateDiscountSalePrice } from "./calculate";

describe("calculateDiscountSalePrice", () => {
  it("calculates sale price and savings for multiple items", () => {
    const result = calculateDiscountSalePrice({
      originalPrice: 120_000,
      discountRatePercent: 25,
      quantity: 3,
    });

    expect(result.salePricePerItem).toBe(90_000);
    expect(result.savingsPerItem).toBe(30_000);
    expect(result.totalOriginalPrice).toBe(360_000);
    expect(result.totalSavings).toBe(90_000);
    expect(result.totalSalePrice).toBe(270_000);
  });

  it("supports zero and full discounts", () => {
    expect(
      calculateDiscountSalePrice({
        originalPrice: 50,
        discountRatePercent: 0,
        quantity: 2,
      }).totalSalePrice,
    ).toBe(100);

    expect(
      calculateDiscountSalePrice({
        originalPrice: 50,
        discountRatePercent: 100,
        quantity: 2,
      }).totalSalePrice,
    ).toBe(0);
  });

  it("rejects invalid prices, rates, and quantities", () => {
    expect(() =>
      calculateDiscountSalePrice({
        originalPrice: 0,
        discountRatePercent: 10,
        quantity: 1,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateDiscountSalePrice({
        originalPrice: 100,
        discountRatePercent: 101,
        quantity: 1,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateDiscountSalePrice({
        originalPrice: 100,
        discountRatePercent: 10,
        quantity: 1.5,
      }),
    ).toThrow(RangeError);
  });
});
