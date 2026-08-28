export type BreakEvenSalesInput = {
  fixedCosts: number;
  sellingPricePerUnit: number;
  variableCostPerUnit: number;
};

export type BreakEvenSalesResult = {
  contributionMarginPerUnit: number;
  contributionMarginRatio: number;
  breakEvenUnits: number;
  breakEvenSales: number;
};

export function calculateBreakEvenSales(
  input: BreakEvenSalesInput,
): BreakEvenSalesResult {
  const values = [
    input.fixedCosts,
    input.sellingPricePerUnit,
    input.variableCostPerUnit,
  ];
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new RangeError("all inputs must be finite and nonnegative");
  }
  if (input.sellingPricePerUnit <= 0) {
    throw new RangeError("sellingPricePerUnit must be greater than zero");
  }

  const contributionMarginPerUnit =
    input.sellingPricePerUnit - input.variableCostPerUnit;
  if (contributionMarginPerUnit <= 0) {
    throw new RangeError("contribution margin must be greater than zero");
  }

  const contributionMarginRatio =
    contributionMarginPerUnit / input.sellingPricePerUnit;
  const breakEvenUnits = input.fixedCosts / contributionMarginPerUnit;
  const breakEvenSales = input.fixedCosts / contributionMarginRatio;

  return {
    contributionMarginPerUnit,
    contributionMarginRatio,
    breakEvenUnits,
    breakEvenSales,
  };
}
