export type PensionFutureMonthlyIncomeInput = {
  currentBalance: number;
  monthlyContribution: number;
  yearsUntilRetirement: number;
  accumulationAnnualReturnPercent: number;
  payoutYears: number;
  payoutAnnualReturnPercent: number;
};

export type PensionFutureMonthlyIncomeResult = {
  projectedRetirementBalance: number;
  totalContributions: number;
  investmentGrowth: number;
  estimatedMonthlyIncome: number;
  estimatedAnnualIncome: number;
  accumulationMonths: number;
  payoutMonths: number;
};

export function calculatePensionFutureMonthlyIncome(
  input: PensionFutureMonthlyIncomeInput,
): PensionFutureMonthlyIncomeResult {
  const {
    currentBalance,
    monthlyContribution,
    yearsUntilRetirement,
    accumulationAnnualReturnPercent,
    payoutYears,
    payoutAnnualReturnPercent,
  } = input;

  for (const [name, value] of Object.entries(input)) {
    if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite`);
  }
  if (currentBalance < 0) {
    throw new RangeError("currentBalance must be zero or greater");
  }
  if (monthlyContribution < 0) {
    throw new RangeError("monthlyContribution must be zero or greater");
  }
  if (currentBalance === 0 && monthlyContribution === 0) {
    throw new RangeError(
      "currentBalance or monthlyContribution must be positive",
    );
  }
  if (yearsUntilRetirement < 0 || yearsUntilRetirement > 80) {
    throw new RangeError("yearsUntilRetirement must be between 0 and 80");
  }
  if (
    accumulationAnnualReturnPercent <= -100 ||
    accumulationAnnualReturnPercent > 100
  ) {
    throw new RangeError(
      "accumulationAnnualReturnPercent must be greater than -100 and at most 100",
    );
  }
  if (payoutYears <= 0 || payoutYears > 100) {
    throw new RangeError("payoutYears must be between 0 and 100");
  }
  if (payoutAnnualReturnPercent <= -100 || payoutAnnualReturnPercent > 100) {
    throw new RangeError(
      "payoutAnnualReturnPercent must be greater than -100 and at most 100",
    );
  }

  const accumulationMonths = Math.round(yearsUntilRetirement * 12);
  const payoutMonths = Math.round(payoutYears * 12);
  if (payoutMonths <= 0) {
    throw new RangeError("payoutYears must cover at least one month");
  }

  const accumulationMonthlyReturn =
    Math.pow(1 + accumulationAnnualReturnPercent / 100, 1 / 12) - 1;
  let projectedRetirementBalance = currentBalance;

  for (let month = 0; month < accumulationMonths; month += 1) {
    projectedRetirementBalance *= 1 + accumulationMonthlyReturn;
    projectedRetirementBalance += monthlyContribution;
  }

  const totalContributions =
    currentBalance + monthlyContribution * accumulationMonths;
  const investmentGrowth = projectedRetirementBalance - totalContributions;
  const payoutMonthlyReturn =
    Math.pow(1 + payoutAnnualReturnPercent / 100, 1 / 12) - 1;
  const estimatedMonthlyIncome =
    Math.abs(payoutMonthlyReturn) < 1e-12
      ? projectedRetirementBalance / payoutMonths
      : (projectedRetirementBalance * payoutMonthlyReturn) /
        (1 - Math.pow(1 + payoutMonthlyReturn, -payoutMonths));

  return {
    projectedRetirementBalance,
    totalContributions,
    investmentGrowth,
    estimatedMonthlyIncome,
    estimatedAnnualIncome: estimatedMonthlyIncome * 12,
    accumulationMonths,
    payoutMonths,
  };
}
