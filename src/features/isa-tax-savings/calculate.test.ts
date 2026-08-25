import { describe, expect, it } from "vitest";
import { calculateIsaTaxSavings } from "./calculate";

describe("calculateIsaTaxSavings", () => {
  it("applies the general ISA tax-free limit and separate tax rate", () => {
    const result = calculateIsaTaxSavings({
      accountType: "general",
      netProfit: 10_000_000,
    });

    expect(result.taxFreeLimit).toBe(2_000_000);
    expect(result.taxableProfit).toBe(8_000_000);
    expect(result.isaTax).toBeCloseTo(792_000);
    expect(result.ordinaryTax).toBeCloseTo(1_540_000);
    expect(result.taxSavings).toBeCloseTo(748_000);
  });

  it("applies the larger tax-free limit for special eligibility", () => {
    const result = calculateIsaTaxSavings({
      accountType: "special",
      netProfit: 10_000_000,
    });

    expect(result.taxFreeLimit).toBe(4_000_000);
    expect(result.taxableProfit).toBe(6_000_000);
    expect(result.isaTax).toBeCloseTo(594_000);
    expect(result.taxSavings).toBeCloseTo(946_000);
  });

  it("does not tax profits within the tax-free limit", () => {
    const result = calculateIsaTaxSavings({
      accountType: "general",
      netProfit: 2_000_000,
    });

    expect(result.taxableProfit).toBe(0);
    expect(result.isaTax).toBe(0);
    expect(result.taxSavings).toBeCloseTo(308_000);
  });

  it("returns a zero effective rate for zero profit", () => {
    const result = calculateIsaTaxSavings({
      accountType: "general",
      netProfit: 0,
    });

    expect(result.effectiveIsaTaxRate).toBe(0);
  });

  it("rejects invalid profit values", () => {
    expect(() =>
      calculateIsaTaxSavings({ accountType: "general", netProfit: -1 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateIsaTaxSavings({ accountType: "general", netProfit: Number.NaN }),
    ).toThrow(RangeError);
  });
});
