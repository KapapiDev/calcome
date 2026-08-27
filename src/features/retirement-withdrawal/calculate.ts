export type RetirementWithdrawalInput = {
  startingPortfolio: number;
  monthlyWithdrawal: number;
  expectedAnnualReturnPercent: number;
  retirementYears: number;
};

export type RetirementWithdrawalResult = {
  annualWithdrawal: number;
  initialWithdrawalRatePercent: number;
  projectedEndingBalance: number;
  totalWithdrawn: number;
  depletedAfterMonths: number | null;
  modeledMonths: number;
};

export function calculateRetirementWithdrawal(
  input: RetirementWithdrawalInput,
): RetirementWithdrawalResult {
  const {
    startingPortfolio,
    monthlyWithdrawal,
    expectedAnnualReturnPercent,
    retirementYears,
  } = input;

  for (const [name, value] of Object.entries(input)) {
    if (!Number.isFinite(value)) throw new RangeError(`${name} must be finite`);
  }
  if (startingPortfolio <= 0) {
    throw new RangeError("startingPortfolio must be greater than zero");
  }
  if (monthlyWithdrawal < 0) {
    throw new RangeError("monthlyWithdrawal must be zero or greater");
  }
  if (
    expectedAnnualReturnPercent <= -100 ||
    expectedAnnualReturnPercent > 100
  ) {
    throw new RangeError(
      "expectedAnnualReturnPercent must be greater than -100 and at most 100",
    );
  }
  if (retirementYears <= 0 || retirementYears > 100) {
    throw new RangeError("retirementYears must be between 0 and 100");
  }

  const modeledMonths = Math.round(retirementYears * 12);
  if (modeledMonths <= 0) {
    throw new RangeError("retirementYears must cover at least one month");
  }

  const monthlyReturn =
    Math.pow(1 + expectedAnnualReturnPercent / 100, 1 / 12) - 1;
  let balance = startingPortfolio;
  let totalWithdrawn = 0;
  let depletedAfterMonths: number | null = null;

  for (let month = 1; month <= modeledMonths; month += 1) {
    balance *= 1 + monthlyReturn;
    const withdrawal = Math.min(balance, monthlyWithdrawal);
    balance -= withdrawal;
    totalWithdrawn += withdrawal;

    if (balance <= 1e-8) {
      balance = 0;
      depletedAfterMonths = month;
      break;
    }
  }

  const annualWithdrawal = monthlyWithdrawal * 12;
  return {
    annualWithdrawal,
    initialWithdrawalRatePercent:
      (annualWithdrawal / startingPortfolio) * 100,
    projectedEndingBalance: balance,
    totalWithdrawn,
    depletedAfterMonths,
    modeledMonths,
  };
}
