export type ApartmentManagementFeeBudgetInput = {
  monthlyManagementFee: number;
  monthlyUtilities: number;
  monthlyParkingAndOtherFee: number;
  annualSpecialAssessment: number;
  homeSizeSqm: number;
  monthlyNetIncome: number;
};

export type ApartmentManagementFeeBudgetResult = {
  monthlyRecurringCost: number;
  monthlySpecialAssessmentEquivalent: number;
  monthlyBudgetedCost: number;
  annualBudgetedCost: number;
  monthlyCostPerSqm: number;
  incomeSharePercent: number;
};

function requireNonNegative(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite non-negative number`);
  }
}

export function calculateApartmentManagementFeeBudget(
  input: ApartmentManagementFeeBudgetInput,
): ApartmentManagementFeeBudgetResult {
  requireNonNegative("monthlyManagementFee", input.monthlyManagementFee);
  requireNonNegative("monthlyUtilities", input.monthlyUtilities);
  requireNonNegative(
    "monthlyParkingAndOtherFee",
    input.monthlyParkingAndOtherFee,
  );
  requireNonNegative("annualSpecialAssessment", input.annualSpecialAssessment);

  if (!Number.isFinite(input.homeSizeSqm) || input.homeSizeSqm <= 0) {
    throw new RangeError("homeSizeSqm must be greater than zero");
  }
  if (!Number.isFinite(input.monthlyNetIncome) || input.monthlyNetIncome <= 0) {
    throw new RangeError("monthlyNetIncome must be greater than zero");
  }

  const monthlyRecurringCost =
    input.monthlyManagementFee +
    input.monthlyUtilities +
    input.monthlyParkingAndOtherFee;
  const monthlySpecialAssessmentEquivalent = input.annualSpecialAssessment / 12;
  const monthlyBudgetedCost =
    monthlyRecurringCost + monthlySpecialAssessmentEquivalent;
  const annualBudgetedCost = monthlyRecurringCost * 12 + input.annualSpecialAssessment;
  const monthlyCostPerSqm = monthlyBudgetedCost / input.homeSizeSqm;
  const incomeSharePercent =
    (monthlyBudgetedCost / input.monthlyNetIncome) * 100;

  return {
    monthlyRecurringCost,
    monthlySpecialAssessmentEquivalent,
    monthlyBudgetedCost,
    annualBudgetedCost,
    monthlyCostPerSqm,
    incomeSharePercent,
  };
}
