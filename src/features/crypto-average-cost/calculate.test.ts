import { describe, expect, it } from "vitest";
import { calculateCryptoAverageCost } from "./calculate";

describe("calculateCryptoAverageCost", () => {
  it("calculates a weighted average after an additional purchase", () => {
    const result = calculateCryptoAverageCost({
      currentQuantity: 2,
      currentAveragePrice: 50_000,
      additionalQuantity: 1,
      additionalPrice: 35_000,
    });

    expect(result.currentCost).toBe(100_000);
    expect(result.additionalCost).toBe(35_000);
    expect(result.totalQuantity).toBe(3);
    expect(result.totalCost).toBe(135_000);
    expect(result.newAveragePrice).toBe(45_000);
    expect(result.averagePriceChangePercent).toBeCloseTo(-10, 10);
  });

  it("supports a first purchase with no existing position", () => {
    const result = calculateCryptoAverageCost({
      currentQuantity: 0,
      currentAveragePrice: 0,
      additionalQuantity: 0.25,
      additionalPrice: 80_000,
    });
    expect(result.newAveragePrice).toBe(80_000);
    expect(result.totalCost).toBe(20_000);
  });

  it("rejects invalid positions", () => {
    expect(() =>
      calculateCryptoAverageCost({
        currentQuantity: 0,
        currentAveragePrice: 0,
        additionalQuantity: 0,
        additionalPrice: 0,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateCryptoAverageCost({
        currentQuantity: -1,
        currentAveragePrice: 10,
        additionalQuantity: 1,
        additionalPrice: 10,
      }),
    ).toThrow(RangeError);
  });
});
