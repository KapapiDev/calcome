export type CryptoProfitLossInput = {
  quantity: number;
  averageEntryPrice: number;
  currentPrice: number;
  buyFeePercent: number;
  sellFeePercent: number;
};

export type CryptoProfitLossResult = {
  grossCostBasis: number;
  buyFee: number;
  totalCostBasis: number;
  grossCurrentValue: number;
  estimatedSellFee: number;
  netCurrentValue: number;
  profitLoss: number;
  returnPercent: number;
  breakEvenPrice: number;
};

export function calculateCryptoProfitLoss(
  input: CryptoProfitLossInput,
): CryptoProfitLossResult {
  const values = [
    input.quantity,
    input.averageEntryPrice,
    input.currentPrice,
    input.buyFeePercent,
    input.sellFeePercent,
  ];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new RangeError("all inputs must be finite and nonnegative");
  }
  if (input.quantity <= 0 || input.averageEntryPrice <= 0) {
    throw new RangeError("quantity and averageEntryPrice must be greater than zero");
  }
  if (input.buyFeePercent >= 100 || input.sellFeePercent >= 100) {
    throw new RangeError("fee percentages must be below 100");
  }

  const buyFeeRate = input.buyFeePercent / 100;
  const sellFeeRate = input.sellFeePercent / 100;
  const grossCostBasis = input.quantity * input.averageEntryPrice;
  const buyFee = grossCostBasis * buyFeeRate;
  const totalCostBasis = grossCostBasis + buyFee;
  const grossCurrentValue = input.quantity * input.currentPrice;
  const estimatedSellFee = grossCurrentValue * sellFeeRate;
  const netCurrentValue = grossCurrentValue - estimatedSellFee;
  const profitLoss = netCurrentValue - totalCostBasis;
  const returnPercent = (profitLoss / totalCostBasis) * 100;
  const breakEvenPrice = totalCostBasis / (input.quantity * (1 - sellFeeRate));

  return {
    grossCostBasis,
    buyFee,
    totalCostBasis,
    grossCurrentValue,
    estimatedSellFee,
    netCurrentValue,
    profitLoss,
    returnPercent,
    breakEvenPrice,
  };
}
