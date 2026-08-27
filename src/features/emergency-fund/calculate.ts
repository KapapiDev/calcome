export type EmergencyFundInput = {
  monthlyEssentialExpenses: number;
  targetMonths: number;
  currentSavings: number;
  monthlyContribution: number;
};

export type EmergencyFundResult = {
  targetFund: number;
  fundingGap: number;
  surplus: number;
  currentCoverageMonths: number;
  monthsToGoal: number | null;
};

export function calculateEmergencyFund(
  input: EmergencyFundInput,
): EmergencyFundResult {
  const {
    monthlyEssentialExpenses,
    targetMonths,
    currentSavings,
    monthlyContribution,
  } = input;

  for (const [name, value] of Object.entries(input)) {
    if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite`);
  }
  if (monthlyEssentialExpenses <= 0) {
    throw new RangeError("monthlyEssentialExpenses must be greater than zero");
  }
  if (targetMonths <= 0 || targetMonths > 36) {
    throw new RangeError("targetMonths must be between 0 and 36");
  }
  if (currentSavings < 0 || monthlyContribution < 0) {
    throw new RangeError("savings values must be zero or greater");
  }

  const targetFund = monthlyEssentialExpenses * targetMonths;
  const fundingGap = Math.max(0, targetFund - currentSavings);
  const surplus = Math.max(0, currentSavings - targetFund);
  const currentCoverageMonths = currentSavings / monthlyEssentialExpenses;
  const monthsToGoal =
    fundingGap === 0
      ? 0
      : monthlyContribution > 0
        ? Math.ceil(fundingGap / monthlyContribution)
        : null;

  return {
    targetFund,
    fundingGap,
    surplus,
    currentCoverageMonths,
    monthsToGoal,
  };
}
