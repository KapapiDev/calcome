export type FireRetirementTargetInput = {
  monthlyExpenses: number;
  withdrawalRatePercent: number;
  currentPortfolio: number;
  monthlyContribution: number;
  expectedAnnualReturnPercent: number;
};

export type FireRetirementTargetResult = {
  annualExpenses: number;
  targetPortfolio: number;
  fundingGap: number;
  fundedPercent: number;
  annualWithdrawalAtTarget: number;
  monthsToTarget: number | null;
};

export function calculateFireRetirementTarget(
  input: FireRetirementTargetInput,
): FireRetirementTargetResult {
  const {
    monthlyExpenses,
    withdrawalRatePercent,
    currentPortfolio,
    monthlyContribution,
    expectedAnnualReturnPercent,
  } = input;

  for (const [name, value] of Object.entries(input)) {
    if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite`);
  }
  if (monthlyExpenses <= 0) {
    throw new RangeError("monthlyExpenses must be greater than zero");
  }
  if (withdrawalRatePercent <= 0 || withdrawalRatePercent > 20) {
    throw new RangeError("withdrawalRatePercent must be between 0 and 20");
  }
  if (currentPortfolio < 0 || monthlyContribution < 0) {
    throw new RangeError("portfolio values must be zero or greater");
  }
  if (
    expectedAnnualReturnPercent <= -100 ||
    expectedAnnualReturnPercent > 100
  ) {
    throw new RangeError(
      "expectedAnnualReturnPercent must be greater than -100 and at most 100",
    );
  }

  const annualExpenses = monthlyExpenses * 12;
  const withdrawalRate = withdrawalRatePercent / 100;
  const targetPortfolio = annualExpenses / withdrawalRate;
  const fundingGap = Math.max(0, targetPortfolio - currentPortfolio);
  const fundedPercent =
    targetPortfolio === 0 ? 100 : (currentPortfolio / targetPortfolio) * 100;
  const annualWithdrawalAtTarget = targetPortfolio * withdrawalRate;

  let monthsToTarget: number | null =
    currentPortfolio >= targetPortfolio ? 0 : null;

  if (monthsToTarget === null) {
    const monthlyReturn =
      Math.pow(1 + expectedAnnualReturnPercent / 100, 1 / 12) - 1;
    let balance = currentPortfolio;

    for (let month = 1; month <= 1200; month += 1) {
      balance = balance * (1 + monthlyReturn) + monthlyContribution;
      if (balance >= targetPortfolio) {
        monthsToTarget = month;
        break;
      }
      if (balance < 0) break;
    }
  }

  return {
    annualExpenses,
    targetPortfolio,
    fundingGap,
    fundedPercent,
    annualWithdrawalAtTarget,
    monthsToTarget,
  };
}
