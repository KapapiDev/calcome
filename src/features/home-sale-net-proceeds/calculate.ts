export type HomeSaleNetProceedsInput = {
  salePrice: number;
  mortgagePayoff: number;
  brokerageFee: number;
  transferTax: number;
  legalClosingCost: number;
  repairStagingCost: number;
  movingCost: number;
  otherCost: number;
};

export type HomeSaleNetProceedsResult = {
  sellingCosts: number;
  proceedsBeforeLoanPayoff: number;
  netProceeds: number;
  sellingCostRatePercent: number;
  mortgagePayoffRatePercent: number;
};

function requireNonNegative(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite non-negative number`);
  }
}

export function calculateHomeSaleNetProceeds(
  input: HomeSaleNetProceedsInput,
): HomeSaleNetProceedsResult {
  if (!Number.isFinite(input.salePrice) || input.salePrice <= 0) {
    throw new RangeError("salePrice must be greater than zero");
  }

  requireNonNegative("mortgagePayoff", input.mortgagePayoff);
  requireNonNegative("brokerageFee", input.brokerageFee);
  requireNonNegative("transferTax", input.transferTax);
  requireNonNegative("legalClosingCost", input.legalClosingCost);
  requireNonNegative("repairStagingCost", input.repairStagingCost);
  requireNonNegative("movingCost", input.movingCost);
  requireNonNegative("otherCost", input.otherCost);

  const sellingCosts =
    input.brokerageFee +
    input.transferTax +
    input.legalClosingCost +
    input.repairStagingCost +
    input.movingCost +
    input.otherCost;
  const proceedsBeforeLoanPayoff = input.salePrice - sellingCosts;
  const netProceeds = proceedsBeforeLoanPayoff - input.mortgagePayoff;
  const sellingCostRatePercent = (sellingCosts / input.salePrice) * 100;
  const mortgagePayoffRatePercent = (input.mortgagePayoff / input.salePrice) * 100;

  return {
    sellingCosts,
    proceedsBeforeLoanPayoff,
    netProceeds,
    sellingCostRatePercent,
    mortgagePayoffRatePercent,
  };
}
