import { describe, expect, it } from "vitest";
import { calculatePensionSavingsTaxCredit } from "./calculate";

describe("calculatePensionSavingsTaxCredit", () => {
  it("applies the 15% rate for salary income up to 55 million won", () => {
    expect(
      calculatePensionSavingsTaxCredit({
        incomeType: "salary",
        incomeAmount: 55_000_000,
        pensionSavingsContribution: 6_000_000,
        retirementPensionContribution: 3_000_000,
      }),
    ).toMatchObject({
      rate: 0.15,
      pensionSavingsEligible: 6_000_000,
      retirementPensionEligible: 3_000_000,
      eligibleContribution: 9_000_000,
      incomeTaxCredit: 1_350_000,
      unusedContribution: 0,
    });
  });

  it("applies the 12% rate above the salary threshold", () => {
    expect(
      calculatePensionSavingsTaxCredit({
        incomeType: "salary",
        incomeAmount: 55_000_001,
        pensionSavingsContribution: 6_000_000,
        retirementPensionContribution: 0,
      }).incomeTaxCredit,
    ).toBe(720_000);
  });

  it("uses the 45 million won threshold for non-salary comprehensive income", () => {
    expect(
      calculatePensionSavingsTaxCredit({
        incomeType: "other",
        incomeAmount: 45_000_000,
        pensionSavingsContribution: 6_000_000,
        retirementPensionContribution: 0,
      }).rate,
    ).toBe(0.15);
    expect(
      calculatePensionSavingsTaxCredit({
        incomeType: "other",
        incomeAmount: 45_000_001,
        pensionSavingsContribution: 6_000_000,
        retirementPensionContribution: 0,
      }).rate,
    ).toBe(0.12);
  });

  it("caps pension savings at 6 million won and combined pension accounts at 9 million won", () => {
    expect(
      calculatePensionSavingsTaxCredit({
        incomeType: "salary",
        incomeAmount: 40_000_000,
        pensionSavingsContribution: 8_000_000,
        retirementPensionContribution: 5_000_000,
      }),
    ).toMatchObject({
      pensionSavingsEligible: 6_000_000,
      retirementPensionEligible: 3_000_000,
      eligibleContribution: 9_000_000,
      unusedContribution: 4_000_000,
    });
  });

  it("rejects negative inputs", () => {
    expect(() =>
      calculatePensionSavingsTaxCredit({
        incomeType: "salary",
        incomeAmount: 40_000_000,
        pensionSavingsContribution: -1,
        retirementPensionContribution: 0,
      }),
    ).toThrow(RangeError);
  });
});
