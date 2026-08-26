import { describe, expect, it } from "vitest";
import { calculateTotalCompensationComparison } from "./calculate";

const offerA = {
  baseSalary: 100_000,
  annualBonus: 10_000,
  annualEquity: 15_000,
  annualBenefits: 5_000,
  signOnBonus: 20_000,
};

const offerB = {
  baseSalary: 110_000,
  annualBonus: 5_000,
  annualEquity: 10_000,
  annualBenefits: 4_000,
  signOnBonus: 5_000,
};

describe("calculateTotalCompensationComparison", () => {
  it("compares two offers over a multi-year horizon", () => {
    const result = calculateTotalCompensationComparison({
      offerA,
      offerB,
      horizonYears: 3,
    });

    expect(result.offerA.recurringAnnualCompensation).toBe(130_000);
    expect(result.offerA.horizonTotalCompensation).toBe(410_000);
    expect(result.offerB.recurringAnnualCompensation).toBe(129_000);
    expect(result.offerB.horizonTotalCompensation).toBe(392_000);
    expect(result.absoluteDifference).toBe(18_000);
    expect(result.higherOffer).toBe("A");
  });

  it("annualizes one-time signing bonuses across the selected horizon", () => {
    const result = calculateTotalCompensationComparison({
      offerA,
      offerB,
      horizonYears: 2,
    });

    expect(result.offerA.averageAnnualCompensation).toBe(140_000);
    expect(result.offerB.averageAnnualCompensation).toBe(131_500);
  });

  it("reports a tie when horizon totals match", () => {
    const result = calculateTotalCompensationComparison({
      offerA: { ...offerA, signOnBonus: 0 },
      offerB: {
        baseSalary: 130_000,
        annualBonus: 0,
        annualEquity: 0,
        annualBenefits: 0,
        signOnBonus: 0,
      },
      horizonYears: 1,
    });

    expect(result.higherOffer).toBe("tie");
    expect(result.absoluteDifference).toBe(0);
  });

  it("rejects negative compensation and invalid horizons", () => {
    expect(() =>
      calculateTotalCompensationComparison({
        offerA: { ...offerA, baseSalary: -1 },
        offerB,
        horizonYears: 3,
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateTotalCompensationComparison({
        offerA,
        offerB,
        horizonYears: 0,
      }),
    ).toThrow(RangeError);
  });
});
