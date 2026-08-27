export type RentalYieldInput = {
  purchasePrice: number;
  monthlyRent: number;
  annualOtherIncome: number;
  annualOperatingCosts: number;
  vacancyRatePercent: number;
};

export type RentalYieldResult = {
  grossAnnualIncome: number;
  effectiveAnnualIncome: number;
  netOperatingIncome: number;
  grossYieldPercent: number;
  netYieldPercent: number;
};

function requireNonNegative(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite non-negative number`);
  }
}

export function calculateRentalYield(input: RentalYieldInput): RentalYieldResult {
  if (!Number.isFinite(input.purchasePrice) || input.purchasePrice <= 0) {
    throw new RangeError("purchasePrice must be greater than zero");
  }
  requireNonNegative("monthlyRent", input.monthlyRent);
  requireNonNegative("annualOtherIncome", input.annualOtherIncome);
  requireNonNegative("annualOperatingCosts", input.annualOperatingCosts);
  if (!Number.isFinite(input.vacancyRatePercent) || input.vacancyRatePercent < 0 || input.vacancyRatePercent > 100) {
    throw new RangeError("vacancyRatePercent must be between 0 and 100");
  }

  const grossAnnualIncome = input.monthlyRent * 12 + input.annualOtherIncome;
  const effectiveAnnualIncome = grossAnnualIncome * (1 - input.vacancyRatePercent / 100);
  const netOperatingIncome = effectiveAnnualIncome - input.annualOperatingCosts;
  const grossYieldPercent = (grossAnnualIncome / input.purchasePrice) * 100;
  const netYieldPercent = (netOperatingIncome / input.purchasePrice) * 100;

  return { grossAnnualIncome, effectiveAnnualIncome, netOperatingIncome, grossYieldPercent, netYieldPercent };
}
