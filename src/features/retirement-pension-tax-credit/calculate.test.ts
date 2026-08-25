import { describe, expect, it } from "vitest";
import { calculateRetirementPensionTaxCredit } from "./calculate";

describe("calculateRetirementPensionTaxCredit", () => {
  it("calculates remaining IRP room after pension savings", () => {
    const result = calculateRetirementPensionTaxCredit({
      incomeType: "salary",
      incomeAmount: 55_000_000,
      pensionSavingsContribution: 6_000_000,
      retirementPensionContribution: 1_000_000,
    });

    expect(result.rate).toBe(0.15);
    expect(result.retirementPensionEligible).toBe(1_000_000);
    expect(result.remainingRetirementPensionLimit).toBe(3_000_000);
    expect(result.additionalContributionToMax).toBe(2_000_000);
    expect(result.currentIncomeTaxCredit).toBe(1_050_000);
    expect(result.additionalIncomeTaxCreditToMax).toBe(300_000);
    expect(result.maximumIncomeTaxCredit).toBe(1_350_000);
  });

  it("caps retirement-pension eligibility at the combined limit", () => {
    const result = calculateRetirementPensionTaxCredit({
      incomeType: "salary",
      incomeAmount: 70_000_000,
      pensionSavingsContribution: 6_000_000,
      retirementPensionContribution: 5_000_000,
    });

    expect(result.rate).toBe(0.12);
    expect(result.retirementPensionEligible).toBe(3_000_000);
    expect(result.additionalContributionToMax).toBe(0);
    expect(result.contributionAboveLimit).toBe(2_000_000);
    expect(result.maximumIncomeTaxCredit).toBe(1_080_000);
  });

  it("rejects invalid input through the shared statutory calculator", () => {
    expect(() =>
      calculateRetirementPensionTaxCredit({
        incomeType: "other",
        incomeAmount: 40_000_000,
        pensionSavingsContribution: -1,
        retirementPensionContribution: 0,
      }),
    ).toThrow(RangeError);
  });
});
