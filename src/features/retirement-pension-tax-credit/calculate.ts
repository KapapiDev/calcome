import {
  calculatePensionSavingsTaxCredit,
  type PensionSavingsTaxCreditIncomeType,
} from "@/features/pension-savings-tax-credit/calculate";

export type RetirementPensionTaxCreditInput = {
  incomeType: PensionSavingsTaxCreditIncomeType;
  incomeAmount: number;
  pensionSavingsContribution: number;
  retirementPensionContribution: number;
};

export type RetirementPensionTaxCreditResult = {
  rate: number;
  retirementPensionEligible: number;
  remainingRetirementPensionLimit: number;
  additionalContributionToMax: number;
  currentIncomeTaxCredit: number;
  additionalIncomeTaxCreditToMax: number;
  maximumIncomeTaxCredit: number;
  contributionAboveLimit: number;
};

const COMBINED_PENSION_ACCOUNT_LIMIT = 9_000_000;

export function calculateRetirementPensionTaxCredit(
  input: RetirementPensionTaxCreditInput,
): RetirementPensionTaxCreditResult {
  const base = calculatePensionSavingsTaxCredit(input);
  const remainingRetirementPensionLimit = Math.max(
    0,
    COMBINED_PENSION_ACCOUNT_LIMIT - base.pensionSavingsEligible,
  );
  const additionalContributionToMax = Math.max(
    0,
    remainingRetirementPensionLimit - base.retirementPensionEligible,
  );
  const contributionAboveLimit = Math.max(
    0,
    input.retirementPensionContribution - base.retirementPensionEligible,
  );

  return {
    rate: base.rate,
    retirementPensionEligible: base.retirementPensionEligible,
    remainingRetirementPensionLimit,
    additionalContributionToMax,
    currentIncomeTaxCredit: base.incomeTaxCredit,
    additionalIncomeTaxCreditToMax: additionalContributionToMax * base.rate,
    maximumIncomeTaxCredit:
      (base.eligibleContribution + additionalContributionToMax) * base.rate,
    contributionAboveLimit,
  };
}
