export type InflationPurchasingPowerInput = {
  currentAmount: number;
  annualInflationPercent: number;
  years: number;
};

export type InflationPurchasingPowerResult = {
  futureNominalCost: number;
  futurePurchasingPower: number;
  purchasingPowerLoss: number;
  purchasingPowerLossPercent: number;
  cumulativeInflationPercent: number;
};

export function calculateInflationPurchasingPower(
  input: InflationPurchasingPowerInput,
): InflationPurchasingPowerResult {
  const { currentAmount, annualInflationPercent, years } = input;

  if (
    !Number.isFinite(currentAmount) ||
    !Number.isFinite(annualInflationPercent) ||
    !Number.isFinite(years) ||
    currentAmount < 0 ||
    annualInflationPercent <= -100 ||
    years <= 0
  ) {
    throw new RangeError("Invalid inflation purchasing power input");
  }

  const inflationFactor = (1 + annualInflationPercent / 100) ** years;
  const futureNominalCost = currentAmount * inflationFactor;
  const futurePurchasingPower = currentAmount / inflationFactor;
  const purchasingPowerLoss = currentAmount - futurePurchasingPower;

  return {
    futureNominalCost,
    futurePurchasingPower,
    purchasingPowerLoss,
    purchasingPowerLossPercent:
      currentAmount === 0 ? 0 : (purchasingPowerLoss / currentAmount) * 100,
    cumulativeInflationPercent: (inflationFactor - 1) * 100,
  };
}
