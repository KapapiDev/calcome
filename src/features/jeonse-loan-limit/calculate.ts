import Decimal from "decimal.js";

export type JeonseLoanLimitInput = {
  deposit: Decimal;
  requestedAmount: Decimal;
  existingGuaranteeBalance: Decimal;
  recognizedAnnualIncome: Decimal;
  annualDebtService: Decimal;
  repaymentPreferenceAmount: Decimal;
  oneHomeHousehold: boolean;
  capitalOrRegulatedArea: boolean;
};

export type JeonseLoanLimitResult = {
  subjectLimit: Decimal;
  fundingLimit: Decimal;
  repaymentLimit: Decimal;
  rawLimit: Decimal;
  areaAdjustedLimit: Decimal;
  limitingFactor: "subject" | "funding" | "repayment" | "multiple";
};

function requireNonNegative(name: string, value: Decimal) {
  if (!value.isFinite() || value.lt(0)) {
    throw new RangeError(`${name} must be a finite value of zero or greater`);
  }
}

export function calculateJeonseLoanLimit(
  input: JeonseLoanLimitInput,
): JeonseLoanLimitResult {
  requireNonNegative("deposit", input.deposit);
  requireNonNegative("requestedAmount", input.requestedAmount);
  requireNonNegative("existingGuaranteeBalance", input.existingGuaranteeBalance);
  requireNonNegative("recognizedAnnualIncome", input.recognizedAnnualIncome);
  requireNonNegative("annualDebtService", input.annualDebtService);
  requireNonNegative("repaymentPreferenceAmount", input.repaymentPreferenceAmount);

  const subjectCap = input.oneHomeHousehold
    ? new Decimal(input.capitalOrRegulatedArea ? 180_000_000 : 200_000_000)
    : new Decimal(400_000_000);
  const subjectLimit = Decimal.max(
    0,
    subjectCap.minus(input.existingGuaranteeBalance),
  );
  const fundingFromDeposit = Decimal.max(
    0,
    input.deposit
      .mul(0.8)
      .minus(input.existingGuaranteeBalance),
  );
  const fundingLimit = Decimal.min(
    fundingFromDeposit,
    input.requestedAmount,
  );
  const repaymentLimit = Decimal.max(
    0,
    input.recognizedAnnualIncome
      .minus(input.annualDebtService)
      .plus(input.repaymentPreferenceAmount)
      .minus(input.existingGuaranteeBalance),
  );
  const rawLimit = Decimal.min(subjectLimit, fundingLimit, repaymentLimit);
  const areaAdjustedLimit = input.capitalOrRegulatedArea
    ? rawLimit.mul(8).div(9)
    : rawLimit;

  const matches = [subjectLimit, fundingLimit, repaymentLimit].filter((value) =>
    value.eq(rawLimit),
  ).length;
  let limitingFactor: JeonseLoanLimitResult["limitingFactor"] = "multiple";
  if (matches === 1) {
    if (subjectLimit.eq(rawLimit)) limitingFactor = "subject";
    else if (fundingLimit.eq(rawLimit)) limitingFactor = "funding";
    else limitingFactor = "repayment";
  }

  return {
    subjectLimit,
    fundingLimit,
    repaymentLimit,
    rawLimit,
    areaAdjustedLimit,
    limitingFactor,
  };
}
