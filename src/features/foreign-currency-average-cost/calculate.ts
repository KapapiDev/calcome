export type ForeignCurrencyAverageCostInput = {
  currentAmount: number;
  currentAverageRate: number;
  additionalAmount: number;
  additionalRate: number;
};

export type ForeignCurrencyAverageCostResult = {
  currentCost: number;
  additionalCost: number;
  totalForeignAmount: number;
  totalQuoteCost: number;
  newAverageRate: number;
  averageRateChangePercent: number;
};

export function calculateForeignCurrencyAverageCost(
  input: ForeignCurrencyAverageCostInput,
): ForeignCurrencyAverageCostResult {
  const values = [
    input.currentAmount,
    input.currentAverageRate,
    input.additionalAmount,
    input.additionalRate,
  ];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new RangeError("all inputs must be finite and nonnegative");
  }
  if (input.currentAmount === 0 && input.additionalAmount === 0) {
    throw new RangeError("total foreign-currency amount must be greater than zero");
  }
  if (input.currentAmount > 0 && input.currentAverageRate <= 0) {
    throw new RangeError("currentAverageRate must be greater than zero");
  }
  if (input.additionalAmount > 0 && input.additionalRate <= 0) {
    throw new RangeError("additionalRate must be greater than zero");
  }

  const currentCost = input.currentAmount * input.currentAverageRate;
  const additionalCost = input.additionalAmount * input.additionalRate;
  const totalForeignAmount = input.currentAmount + input.additionalAmount;
  const totalQuoteCost = currentCost + additionalCost;
  const newAverageRate = totalQuoteCost / totalForeignAmount;
  const averageRateChangePercent =
    input.currentAmount > 0
      ? ((newAverageRate - input.currentAverageRate) /
          input.currentAverageRate) *
        100
      : 0;

  return {
    currentCost,
    additionalCost,
    totalForeignAmount,
    totalQuoteCost,
    newAverageRate,
    averageRateChangePercent,
  };
}
