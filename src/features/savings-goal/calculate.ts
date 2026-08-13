export type SavingsGoalInput = {
  targetAmount: number;
  initialSavings: number;
  annualReturnPercent: number;
  years: number;
};

export type SavingsGoalResult = {
  monthlyContribution: number;
  totalContributions: number;
  estimatedGrowth: number;
  months: number;
};

export function calculateSavingsGoal(
  input: SavingsGoalInput,
): SavingsGoalResult {
  const { targetAmount, initialSavings, annualReturnPercent, years } = input;

  for (const [name, value] of Object.entries(input)) {
    if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite`);
  }
  if (targetAmount <= 0) {
    throw new RangeError("targetAmount must be greater than zero");
  }
  if (initialSavings < 0) {
    throw new RangeError("initialSavings must be zero or greater");
  }
  if (annualReturnPercent <= -100) {
    throw new RangeError("annualReturnPercent must be greater than -100");
  }
  if (years <= 0 || years * 12 < 1) {
    throw new RangeError("years must represent at least one month");
  }

  const months = Math.round(years * 12);
  const monthlyRate = annualReturnPercent / 100 / 12;
  const initialFutureValue =
    monthlyRate === 0
      ? initialSavings
      : initialSavings * Math.pow(1 + monthlyRate, months);
  const remainingTarget = Math.max(0, targetAmount - initialFutureValue);

  let monthlyContribution = 0;
  if (remainingTarget > 0) {
    if (monthlyRate === 0) {
      monthlyContribution = remainingTarget / months;
    } else {
      const annuityFactor =
        (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
      monthlyContribution = remainingTarget / annuityFactor;
    }
  }

  const totalContributions = initialSavings + monthlyContribution * months;
  const estimatedGrowth = Math.max(0, targetAmount - totalContributions);

  return { monthlyContribution, totalContributions, estimatedGrowth, months };
}
