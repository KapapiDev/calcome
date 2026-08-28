import { describe, expect, it } from "vitest";
import { calculateAprApy } from "./calculate";

describe("calculateAprApy", () => {
  it("converts 12% APR compounded monthly to APY", () => {
    const result = calculateAprApy({
      mode: "apr-to-apy",
      annualRatePercent: 12,
      compoundsPerYear: 12,
    });
    expect(result.convertedRatePercent).toBeCloseTo(12.6825030132, 8);
    expect(result.periodicRatePercent).toBeCloseTo(1, 10);
  });

  it("converts APY back to the equivalent nominal APR", () => {
    const result = calculateAprApy({
      mode: "apy-to-apr",
      annualRatePercent: 12.6825030132,
      compoundsPerYear: 12,
    });
    expect(result.convertedRatePercent).toBeCloseTo(12, 8);
  });

  it("keeps APR and APY equal with annual compounding", () => {
    const result = calculateAprApy({
      mode: "apr-to-apy",
      annualRatePercent: 7.5,
      compoundsPerYear: 1,
    });
    expect(result.convertedRatePercent).toBeCloseTo(7.5, 10);
  });

  it("supports zero rates and daily compounding", () => {
    expect(
      calculateAprApy({
        mode: "apr-to-apy",
        annualRatePercent: 0,
        compoundsPerYear: 365,
      }).convertedRatePercent,
    ).toBe(0);
  });

  it("rejects invalid rates and compounding frequencies", () => {
    expect(() =>
      calculateAprApy({
        mode: "apr-to-apy",
        annualRatePercent: -1,
        compoundsPerYear: 12,
      }),
    ).toThrow(RangeError);
  });
});
