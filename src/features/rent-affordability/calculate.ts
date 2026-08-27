export type RentAffordabilityInput = {
  monthlyTakeHomeIncome: number;
  fixedMonthlyObligations: number;
  desiredMonthlyLeftover: number;
  nonRentHousingCosts: number;
  targetHousingPercent: number;
};

export type RentAffordabilityResult = {
  ratioBasedRentCap: number;
  cashFlowRentCap: number;
  recommendedMonthlyRent: number;
  annualRent: number;
  totalMonthlyHousingCost: number;
  totalHousingSharePercent: number;
  remainingAfterPlan: number;
  limitingFactor: "ratio" | "cash-flow" | "both";
};

function requireNonNegative(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite non-negative number`);
  }
}

export function calculateRentAffordability(
  input: RentAffordabilityInput,
): RentAffordabilityResult {
  if (!Number.isFinite(input.monthlyTakeHomeIncome) || input.monthlyTakeHomeIncome <= 0) {
    throw new RangeError("monthlyTakeHomeIncome must be greater than zero");
  }
  requireNonNegative("fixedMonthlyObligations", input.fixedMonthlyObligations);
  requireNonNegative("desiredMonthlyLeftover", input.desiredMonthlyLeftover);
  requireNonNegative("nonRentHousingCosts", input.nonRentHousingCosts);
  if (
    !Number.isFinite(input.targetHousingPercent) ||
    input.targetHousingPercent <= 0 ||
    input.targetHousingPercent > 100
  ) {
    throw new RangeError("targetHousingPercent must be greater than zero and at most 100");
  }

  const ratioBasedRentCap = Math.max(
    0,
    input.monthlyTakeHomeIncome * (input.targetHousingPercent / 100) -
      input.nonRentHousingCosts,
  );
  const cashFlowRentCap = Math.max(
    0,
    input.monthlyTakeHomeIncome -
      input.fixedMonthlyObligations -
      input.desiredMonthlyLeftover -
      input.nonRentHousingCosts,
  );
  const recommendedMonthlyRent = Math.min(
    ratioBasedRentCap,
    cashFlowRentCap,
  );
  const totalMonthlyHousingCost =
    recommendedMonthlyRent + input.nonRentHousingCosts;
  const remainingAfterPlan =
    input.monthlyTakeHomeIncome -
    input.fixedMonthlyObligations -
    totalMonthlyHousingCost;
  const totalHousingSharePercent =
    (totalMonthlyHousingCost / input.monthlyTakeHomeIncome) * 100;

  const limitingFactor =
    Math.abs(ratioBasedRentCap - cashFlowRentCap) < 0.000001
      ? "both"
      : ratioBasedRentCap < cashFlowRentCap
        ? "ratio"
        : "cash-flow";

  return {
    ratioBasedRentCap,
    cashFlowRentCap,
    recommendedMonthlyRent,
    annualRent: recommendedMonthlyRent * 12,
    totalMonthlyHousingCost,
    totalHousingSharePercent,
    remainingAfterPlan,
    limitingFactor,
  };
}
