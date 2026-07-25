import Decimal from "decimal.js";

export type DividendYieldRateInput = {
  sharePrice: Decimal;
  annualDividendPerShare: Decimal;
  investmentAmount: Decimal;
};

export type DividendYieldRateResult = {
  dividendYield: Decimal;
  estimatedShares: Decimal;
  estimatedAnnualDividend: Decimal;
  estimatedMonthlyAverage: Decimal;
};

export function calculateDividendYieldRate({
  sharePrice,
  annualDividendPerShare,
  investmentAmount,
}: DividendYieldRateInput): DividendYieldRateResult {
  const dividendYield = annualDividendPerShare.div(sharePrice).mul(100);
  const estimatedShares = investmentAmount.div(sharePrice);
  const estimatedAnnualDividend = estimatedShares.mul(annualDividendPerShare);

  return {
    dividendYield,
    estimatedShares,
    estimatedAnnualDividend,
    estimatedMonthlyAverage: estimatedAnnualDividend.div(12),
  };
}
