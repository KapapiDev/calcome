export type DividendReinvestmentInput = {
  initialInvestment: number;
  initialDividendYieldPercent: number;
  annualPriceGrowthPercent: number;
  annualDividendGrowthPercent: number;
  years: number;
};

export type DividendReinvestmentResult = {
  reinvestedEndingValue: number;
  cashDividendEndingValue: number;
  reinvestmentAdvantage: number;
  reinvestedDividends: number;
  cashDividendsReceived: number;
  finalDividendIncome: number;
  years: number;
};

export function calculateDividendReinvestment(
  input: DividendReinvestmentInput,
): DividendReinvestmentResult {
  const {
    initialInvestment,
    initialDividendYieldPercent,
    annualPriceGrowthPercent,
    annualDividendGrowthPercent,
    years,
  } = input;

  for (const [name, value] of Object.entries(input)) {
    if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite`);
  }
  if (initialInvestment <= 0) {
    throw new RangeError("initialInvestment must be positive");
  }
  if (initialDividendYieldPercent < 0 || initialDividendYieldPercent > 100) {
    throw new RangeError(
      "initialDividendYieldPercent must be between 0 and 100",
    );
  }
  if (annualPriceGrowthPercent <= -100 || annualPriceGrowthPercent > 100) {
    throw new RangeError(
      "annualPriceGrowthPercent must be greater than -100 and at most 100",
    );
  }
  if (
    annualDividendGrowthPercent <= -100 ||
    annualDividendGrowthPercent > 100
  ) {
    throw new RangeError(
      "annualDividendGrowthPercent must be greater than -100 and at most 100",
    );
  }
  if (!Number.isInteger(years) || years < 1 || years > 80) {
    throw new RangeError("years must be an integer between 1 and 80");
  }

  let price = 1;
  let dividendPerShare = initialDividendYieldPercent / 100;
  let reinvestedShares = initialInvestment;
  const cashShares = initialInvestment;
  let reinvestedDividends = 0;
  let cashDividendsReceived = 0;
  let finalDividendIncome = 0;

  for (let year = 1; year <= years; year += 1) {
    price *= 1 + annualPriceGrowthPercent / 100;
    dividendPerShare *= 1 + annualDividendGrowthPercent / 100;

    const reinvestedDividend = reinvestedShares * dividendPerShare;
    const cashDividend = cashShares * dividendPerShare;
    reinvestedDividends += reinvestedDividend;
    cashDividendsReceived += cashDividend;
    reinvestedShares += reinvestedDividend / price;
    finalDividendIncome = reinvestedShares * dividendPerShare;
  }

  const reinvestedEndingValue = reinvestedShares * price;
  const cashDividendEndingValue = cashShares * price + cashDividendsReceived;

  return {
    reinvestedEndingValue,
    cashDividendEndingValue,
    reinvestmentAdvantage: reinvestedEndingValue - cashDividendEndingValue,
    reinvestedDividends,
    cashDividendsReceived,
    finalDividendIncome,
    years,
  };
}
