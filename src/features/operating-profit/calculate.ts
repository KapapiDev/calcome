export type OperatingProfitInput = {
  revenue: number;
  costOfGoodsSold: number;
  operatingExpenses: number;
};

export type OperatingProfitResult = {
  grossProfit: number;
  operatingProfit: number;
  operatingMargin: number;
};

export function calculateOperatingProfit(
  input: OperatingProfitInput,
): OperatingProfitResult {
  const values = [input.revenue, input.costOfGoodsSold, input.operatingExpenses];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new RangeError("all inputs must be finite and nonnegative");
  }
  if (input.revenue <= 0) {
    throw new RangeError("revenue must be greater than zero");
  }

  const grossProfit = input.revenue - input.costOfGoodsSold;
  const operatingProfit = grossProfit - input.operatingExpenses;
  const operatingMargin = operatingProfit / input.revenue;

  return { grossProfit, operatingProfit, operatingMargin };
}
