export type CryptoAverageCostInput = {
  currentQuantity: number;
  currentAveragePrice: number;
  additionalQuantity: number;
  additionalPrice: number;
};

export type CryptoAverageCostResult = {
  currentCost: number;
  additionalCost: number;
  totalQuantity: number;
  totalCost: number;
  newAveragePrice: number;
  averagePriceChangePercent: number;
};

export function calculateCryptoAverageCost(
  input: CryptoAverageCostInput,
): CryptoAverageCostResult {
  const values = [
    input.currentQuantity,
    input.currentAveragePrice,
    input.additionalQuantity,
    input.additionalPrice,
  ];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new RangeError("all inputs must be finite and nonnegative");
  }
  if (input.currentQuantity === 0 && input.additionalQuantity === 0) {
    throw new RangeError("total quantity must be greater than zero");
  }
  if (input.currentQuantity > 0 && input.currentAveragePrice <= 0) {
    throw new RangeError("currentAveragePrice must be greater than zero");
  }
  if (input.additionalQuantity > 0 && input.additionalPrice <= 0) {
    throw new RangeError("additionalPrice must be greater than zero");
  }

  const currentCost = input.currentQuantity * input.currentAveragePrice;
  const additionalCost = input.additionalQuantity * input.additionalPrice;
  const totalQuantity = input.currentQuantity + input.additionalQuantity;
  const totalCost = currentCost + additionalCost;
  const newAveragePrice = totalCost / totalQuantity;
  const averagePriceChangePercent =
    input.currentQuantity > 0
      ? ((newAveragePrice - input.currentAveragePrice) /
          input.currentAveragePrice) *
        100
      : 0;

  return {
    currentCost,
    additionalCost,
    totalQuantity,
    totalCost,
    newAveragePrice,
    averagePriceChangePercent,
  };
}
