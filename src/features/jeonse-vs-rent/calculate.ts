export type JeonseVsRentInput = {
  jeonseDeposit: number;
  jeonseLoanAmount: number;
  jeonseLoanAnnualRatePercent: number;
  monthlyRentDeposit: number;
  monthlyRent: number;
  opportunityAnnualRatePercent: number;
  comparisonMonths: number;
};

export type JeonseVsRentResult = {
  jeonseEquity: number;
  jeonseLoanInterest: number;
  jeonseOpportunityCost: number;
  jeonseEconomicCost: number;
  rentDepositOpportunityCost: number;
  rentPayments: number;
  rentEconomicCost: number;
  costDifference: number;
  cheaperOption: "jeonse" | "rent" | "equal";
  breakEvenMonthlyRent: number;
};

function requireNonNegative(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite non-negative number`);
  }
}

function opportunityCost(
  principal: number,
  annualPercent: number,
  months: number,
) {
  const annualRate = annualPercent / 100;
  return principal * (Math.pow(1 + annualRate, months / 12) - 1);
}

export function calculateJeonseVsRent(
  input: JeonseVsRentInput,
): JeonseVsRentResult {
  requireNonNegative("jeonseDeposit", input.jeonseDeposit);
  requireNonNegative("jeonseLoanAmount", input.jeonseLoanAmount);
  requireNonNegative(
    "jeonseLoanAnnualRatePercent",
    input.jeonseLoanAnnualRatePercent,
  );
  requireNonNegative("monthlyRentDeposit", input.monthlyRentDeposit);
  requireNonNegative("monthlyRent", input.monthlyRent);
  requireNonNegative(
    "opportunityAnnualRatePercent",
    input.opportunityAnnualRatePercent,
  );
  if (!Number.isFinite(input.comparisonMonths) || input.comparisonMonths <= 0) {
    throw new RangeError("comparisonMonths must be greater than zero");
  }
  if (input.jeonseLoanAmount > input.jeonseDeposit) {
    throw new RangeError("jeonseLoanAmount cannot exceed jeonseDeposit");
  }

  const jeonseEquity = input.jeonseDeposit - input.jeonseLoanAmount;
  const jeonseLoanInterest =
    input.jeonseLoanAmount *
    (input.jeonseLoanAnnualRatePercent / 100) *
    (input.comparisonMonths / 12);
  const jeonseOpportunityCost = opportunityCost(
    jeonseEquity,
    input.opportunityAnnualRatePercent,
    input.comparisonMonths,
  );
  const jeonseEconomicCost = jeonseLoanInterest + jeonseOpportunityCost;

  const rentDepositOpportunityCost = opportunityCost(
    input.monthlyRentDeposit,
    input.opportunityAnnualRatePercent,
    input.comparisonMonths,
  );
  const rentPayments = input.monthlyRent * input.comparisonMonths;
  const rentEconomicCost = rentDepositOpportunityCost + rentPayments;
  const costDifference = rentEconomicCost - jeonseEconomicCost;
  const cheaperOption =
    Math.abs(costDifference) < 0.000001
      ? "equal"
      : costDifference > 0
        ? "jeonse"
        : "rent";
  const breakEvenMonthlyRent = Math.max(
    0,
    (jeonseEconomicCost - rentDepositOpportunityCost) / input.comparisonMonths,
  );

  return {
    jeonseEquity,
    jeonseLoanInterest,
    jeonseOpportunityCost,
    jeonseEconomicCost,
    rentDepositOpportunityCost,
    rentPayments,
    rentEconomicCost,
    costDifference,
    cheaperOption,
    breakEvenMonthlyRent,
  };
}
