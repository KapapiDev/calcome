export type HomePurchaseTotalCostInput = {
  purchasePrice: number;
  loanAmount: number;
  acquisitionTax: number;
  brokerageFee: number;
  registrationLegalCost: number;
  loanAppraisalCost: number;
  movingSetupCost: number;
  renovationFurnitureCost: number;
  otherCost: number;
};

export type HomePurchaseTotalCostResult = {
  transactionCosts: number;
  totalPurchaseCost: number;
  estimatedCashRequired: number;
  additionalCostRatePercent: number;
  financedSharePercent: number;
};

function requireNonNegative(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a finite non-negative number`);
  }
}

export function calculateHomePurchaseTotalCost(
  input: HomePurchaseTotalCostInput,
): HomePurchaseTotalCostResult {
  if (!Number.isFinite(input.purchasePrice) || input.purchasePrice <= 0) {
    throw new RangeError("purchasePrice must be greater than zero");
  }

  requireNonNegative("loanAmount", input.loanAmount);
  requireNonNegative("acquisitionTax", input.acquisitionTax);
  requireNonNegative("brokerageFee", input.brokerageFee);
  requireNonNegative("registrationLegalCost", input.registrationLegalCost);
  requireNonNegative("loanAppraisalCost", input.loanAppraisalCost);
  requireNonNegative("movingSetupCost", input.movingSetupCost);
  requireNonNegative("renovationFurnitureCost", input.renovationFurnitureCost);
  requireNonNegative("otherCost", input.otherCost);

  if (input.loanAmount > input.purchasePrice) {
    throw new RangeError("loanAmount cannot exceed purchasePrice");
  }

  const transactionCosts =
    input.acquisitionTax +
    input.brokerageFee +
    input.registrationLegalCost +
    input.loanAppraisalCost +
    input.movingSetupCost +
    input.renovationFurnitureCost +
    input.otherCost;
  const totalPurchaseCost = input.purchasePrice + transactionCosts;
  const estimatedCashRequired = totalPurchaseCost - input.loanAmount;
  const additionalCostRatePercent =
    (transactionCosts / input.purchasePrice) * 100;
  const financedSharePercent = (input.loanAmount / input.purchasePrice) * 100;

  return {
    transactionCosts,
    totalPurchaseCost,
    estimatedCashRequired,
    additionalCostRatePercent,
    financedSharePercent,
  };
}
