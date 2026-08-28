import { describe, expect, it } from "vitest";
import { calculateOperatingProfit } from "./calculate";

describe("calculateOperatingProfit", () => {
  it("calculates gross profit, operating profit, and operating margin", () => {
    const result = calculateOperatingProfit({
      revenue: 100_000,
      costOfGoodsSold: 55_000,
      operatingExpenses: 25_000,
    });

    expect(result.grossProfit).toBe(45_000);
    expect(result.operatingProfit).toBe(20_000);
    expect(result.operatingMargin).toBeCloseTo(0.2, 10);
  });

  it("supports an operating loss", () => {
    const result = calculateOperatingProfit({
      revenue: 100_000,
      costOfGoodsSold: 70_000,
      operatingExpenses: 40_000,
    });

    expect(result.operatingProfit).toBe(-10_000);
    expect(result.operatingMargin).toBeCloseTo(-0.1, 10);
  });

  it("rejects zero revenue and negative costs", () => {
    expect(() =>
      calculateOperatingProfit({
        revenue: 0,
        costOfGoodsSold: 0,
        operatingExpenses: 0,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateOperatingProfit({
        revenue: 100,
        costOfGoodsSold: -1,
        operatingExpenses: 10,
      }),
    ).toThrow(RangeError);
  });
});
