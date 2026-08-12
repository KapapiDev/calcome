export type DollarCostAveragingInput = {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturnPercent: number;
  years: number;
};

export type DollarCostAveragingResult = {
  months: number;
  totalInvested: number;
  endingBalance: number;
  estimatedGain: number;
  initialInvestmentFutureValue: number;
  contributionFutureValue: number;
};

export function calculateDollarCostAveraging(
  input: DollarCostAveragingInput,
): DollarCostAveragingResult {
  const { initialInvestment, monthlyContribution, annualReturnPercent, years } =
    input;

  if (
    !Number.isFinite(initialInvestment) ||
    !Number.isFinite(monthlyContribution) ||
    !Number.isFinite(annualReturnPercent) ||
    !Number.isFinite(years) ||
    initialInvestment < 0 ||
    monthlyContribution < 0 ||
    annualReturnPercent <= -100 ||
    years <= 0
  ) {
    throw new RangeError("Invalid dollar-cost averaging input");
  }

  const months = Math.round(years * 12);
  if (months < 1)
    throw new RangeError("Investment period must be at least one month");

  const monthlyRate = annualReturnPercent / 100 / 12;
  const growthFactor = (1 + monthlyRate) ** months;
  const initialInvestmentFutureValue = initialInvestment * growthFactor;
  const contributionFutureValue =
    monthlyRate === 0
      ? monthlyContribution * months
      : monthlyContribution * ((growthFactor - 1) / monthlyRate);
  const totalInvested = initialInvestment + monthlyContribution * months;
  const endingBalance =
    initialInvestmentFutureValue + contributionFutureValue;

  return {
    months,
    totalInvested,
    endingBalance,
    estimatedGain: endingBalance - totalInvested,
    initialInvestmentFutureValue,
    contributionFutureValue,
  };
}
