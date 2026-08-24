export type InvestmentFeeImpactInput = {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturnPercent: number;
  annualFeePercent: number;
  years: number;
};

export type InvestmentFeeImpactResult = {
  months: number;
  totalInvested: number;
  endingBalanceWithoutFees: number;
  endingBalanceAfterFees: number;
  feeImpactAmount: number;
  feeImpactPercent: number;
  estimatedGainAfterFees: number;
};

function futureValue(
  initialInvestment: number,
  monthlyContribution: number,
  monthlyRate: number,
  months: number,
): number {
  const growthFactor = (1 + monthlyRate) ** months;
  const initialFutureValue = initialInvestment * growthFactor;
  const contributionFutureValue =
    monthlyRate === 0
      ? monthlyContribution * months
      : monthlyContribution * ((growthFactor - 1) / monthlyRate);

  return initialFutureValue + contributionFutureValue;
}

export function calculateInvestmentFeeImpact(
  input: InvestmentFeeImpactInput,
): InvestmentFeeImpactResult {
  const {
    initialInvestment,
    monthlyContribution,
    annualReturnPercent,
    annualFeePercent,
    years,
  } = input;

  if (
    !Number.isFinite(initialInvestment) ||
    !Number.isFinite(monthlyContribution) ||
    !Number.isFinite(annualReturnPercent) ||
    !Number.isFinite(annualFeePercent) ||
    !Number.isFinite(years) ||
    initialInvestment < 0 ||
    monthlyContribution < 0 ||
    annualReturnPercent <= -100 ||
    annualFeePercent < 0 ||
    annualFeePercent >= 100 ||
    years <= 0
  ) {
    throw new RangeError("Invalid investment fee impact input");
  }

  const months = Math.round(years * 12);
  if (months < 1) {
    throw new RangeError("Investment period must be at least one month");
  }

  const grossMonthlyRate = annualReturnPercent / 100 / 12;
  const annualNetReturnPercent = annualReturnPercent - annualFeePercent;
  if (annualNetReturnPercent <= -100) {
    throw new RangeError("Annual fee produces an invalid net return");
  }
  const netMonthlyRate = annualNetReturnPercent / 100 / 12;

  const endingBalanceWithoutFees = futureValue(
    initialInvestment,
    monthlyContribution,
    grossMonthlyRate,
    months,
  );
  const endingBalanceAfterFees = futureValue(
    initialInvestment,
    monthlyContribution,
    netMonthlyRate,
    months,
  );
  const totalInvested = initialInvestment + monthlyContribution * months;
  const feeImpactAmount = endingBalanceWithoutFees - endingBalanceAfterFees;

  return {
    months,
    totalInvested,
    endingBalanceWithoutFees,
    endingBalanceAfterFees,
    feeImpactAmount,
    feeImpactPercent:
      endingBalanceWithoutFees === 0
        ? 0
        : (feeImpactAmount / endingBalanceWithoutFees) * 100,
    estimatedGainAfterFees: endingBalanceAfterFees - totalInvested,
  };
}
