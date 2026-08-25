export type PensionSavingsTaxCreditIncomeType = "salary" | "other";

export type PensionSavingsTaxCreditInput = {
  incomeType: PensionSavingsTaxCreditIncomeType;
  incomeAmount: number;
  pensionSavingsContribution: number;
  retirementPensionContribution: number;
};

export type PensionSavingsTaxCreditResult = {
  rate: number;
  pensionSavingsEligible: number;
  retirementPensionEligible: number;
  eligibleContribution: number;
  incomeTaxCredit: number;
  unusedContribution: number;
};

const PENSION_SAVINGS_LIMIT = 6_000_000;
const COMBINED_PENSION_ACCOUNT_LIMIT = 9_000_000;
const SALARY_RATE_THRESHOLD = 55_000_000;
const OTHER_INCOME_RATE_THRESHOLD = 45_000_000;

export function calculatePensionSavingsTaxCredit(
  input: PensionSavingsTaxCreditInput,
): PensionSavingsTaxCreditResult {
  const {
    incomeType,
    incomeAmount,
    pensionSavingsContribution,
    retirementPensionContribution,
  } = input;

  if (
    !Number.isFinite(incomeAmount) ||
    !Number.isFinite(pensionSavingsContribution) ||
    !Number.isFinite(retirementPensionContribution) ||
    incomeAmount < 0 ||
    pensionSavingsContribution < 0 ||
    retirementPensionContribution < 0
  ) {
    throw new RangeError("Invalid pension savings tax credit input");
  }

  const pensionSavingsEligible = Math.min(
    pensionSavingsContribution,
    PENSION_SAVINGS_LIMIT,
  );
  const retirementPensionEligible = Math.min(
    retirementPensionContribution,
    Math.max(0, COMBINED_PENSION_ACCOUNT_LIMIT - pensionSavingsEligible),
  );
  const eligibleContribution =
    pensionSavingsEligible + retirementPensionEligible;
  const threshold =
    incomeType === "salary"
      ? SALARY_RATE_THRESHOLD
      : OTHER_INCOME_RATE_THRESHOLD;
  const rate = incomeAmount <= threshold ? 0.15 : 0.12;
  const totalContribution =
    pensionSavingsContribution + retirementPensionContribution;

  return {
    rate,
    pensionSavingsEligible,
    retirementPensionEligible,
    eligibleContribution,
    incomeTaxCredit: eligibleContribution * rate,
    unusedContribution: Math.max(0, totalContribution - eligibleContribution),
  };
}
