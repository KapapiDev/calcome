import { describe, expect, it } from "vitest";
import { calculateCurrencyConversion } from "./calculate";

describe("calculateCurrencyConversion", () => {
  it("converts an amount with the supplied quote rate", () => {
    expect(calculateCurrencyConversion({ amount: 100, rate: 1.25 })).toEqual({
      convertedAmount: 125,
      inverseRate: 0.8,
    });
  });

  it("allows a zero amount", () => {
    expect(calculateCurrencyConversion({ amount: 0, rate: 1300 }).convertedAmount).toBe(0);
  });

  it("rejects invalid rates and amounts", () => {
    expect(() => calculateCurrencyConversion({ amount: -1, rate: 1 })).toThrow(RangeError);
    expect(() => calculateCurrencyConversion({ amount: 1, rate: 0 })).toThrow(RangeError);
  });
});
