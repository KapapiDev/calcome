export type SalaryNegotiationTargetInput = {
  currentSalary: number;
  minimumIncreasePercent: number;
  targetIncreasePercent: number;
  stretchIncreasePercent: number;
};

export type SalaryNegotiationTargetResult = {
  currentSalary: number;
  minimumSalary: number;
  targetSalary: number;
  stretchSalary: number;
  minimumIncreaseAmount: number;
  targetIncreaseAmount: number;
  stretchIncreaseAmount: number;
  currentMonthlyEquivalent: number;
  targetMonthlyEquivalent: number;
};

function salaryAt(currentSalary: number, increasePercent: number) {
  return currentSalary * (1 + increasePercent / 100);
}

export function calculateSalaryNegotiationTarget(
  input: SalaryNegotiationTargetInput,
): SalaryNegotiationTargetResult {
  if (
    !Number.isFinite(input.currentSalary) ||
    input.currentSalary <= 0 ||
    !Number.isFinite(input.minimumIncreasePercent) ||
    !Number.isFinite(input.targetIncreasePercent) ||
    !Number.isFinite(input.stretchIncreasePercent) ||
    input.minimumIncreasePercent < 0 ||
    input.targetIncreasePercent < input.minimumIncreasePercent ||
    input.stretchIncreasePercent < input.targetIncreasePercent ||
    input.stretchIncreasePercent > 300
  ) {
    throw new RangeError("Invalid salary negotiation target input");
  }

  const minimumSalary = salaryAt(
    input.currentSalary,
    input.minimumIncreasePercent,
  );
  const targetSalary = salaryAt(
    input.currentSalary,
    input.targetIncreasePercent,
  );
  const stretchSalary = salaryAt(
    input.currentSalary,
    input.stretchIncreasePercent,
  );

  return {
    currentSalary: input.currentSalary,
    minimumSalary,
    targetSalary,
    stretchSalary,
    minimumIncreaseAmount: minimumSalary - input.currentSalary,
    targetIncreaseAmount: targetSalary - input.currentSalary,
    stretchIncreaseAmount: stretchSalary - input.currentSalary,
    currentMonthlyEquivalent: input.currentSalary / 12,
    targetMonthlyEquivalent: targetSalary / 12,
  };
}
