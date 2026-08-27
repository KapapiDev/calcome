import { describe, expect, it } from "vitest";
import { calculateRentalYield } from "./calculate";

const baseInput = {
  purchasePrice: 500_000_000,
  monthlyRent: 2_000_000,
  annualOtherIncome: 0,
  annualOperatingCosts: 4_000_000,
  vacancyRatePercent: 5,
};

describe("calculateRentalYield", () => {
  it("calculates gross and net rental yield", () => {
    const result = calculateRentalYield(baseInput);
    expect(result.grossAnnualIncome).toBe(24_000_000);
    expect(result.effectiveAnnualIncome).toBe(22_800_000);
    expect(result.netOperatingIncome).toBe(18_800_000);
    expect(result.grossYieldPercent).toBeCloseTo(4.8, 6);
    expect(result.netYieldPercent).toBeCloseTo(3.76, 6);
  });

  it("supports other income and zero vacancy", () => {
    const result = calculateRentalYield({
      ...baseInput,
      annualOtherIncome: 1_200_000,
      vacancyRatePercent: 0,
    });
    expect(result.grossAnnualIncome).toBe(25_200_000);
    expect(result.effectiveAnnualIncome).toBe(25_200_000);
  });

  it("allows negative NOI when operating costs exceed effective income", () => {
    const result = calculateRentalYield({
      ...baseInput,
      annualOperatingCosts: 30_000_000,
    });
    expect(result.netOperatingIncome).toBeLessThan(0);
    expect(result.netYieldPercent).toBeLessThan(0);
  });

  it("rejects invalid inputs", () => {
    expect(() =>
      calculateRentalYield({ ...baseInput, purchasePrice: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateRentalYield({ ...baseInput, monthlyRent: -1 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateRentalYield({ ...baseInput, vacancyRatePercent: 101 }),
    ).toThrow(RangeError);
  });
});
