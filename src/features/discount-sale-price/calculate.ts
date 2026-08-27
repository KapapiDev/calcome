export type DiscountSalePriceInput = {
  originalPrice: number;
  discountRatePercent: number;
  quantity: number;
};

export type DiscountSalePriceResult = {
  salePricePerItem: number;
  savingsPerItem: number;
  totalOriginalPrice: number;
  totalSavings: number;
  totalSalePrice: number;
};

export function calculateDiscountSalePrice(
  input: DiscountSalePriceInput,
): DiscountSalePriceResult {
  if (!Number.isFinite(input.originalPrice) || input.originalPrice <= 0) {
    throw new RangeError("originalPrice must be greater than zero");
  }
  if (
    !Number.isFinite(input.discountRatePercent) ||
    input.discountRatePercent < 0 ||
    input.discountRatePercent > 100
  ) {
    throw new RangeError("discountRatePercent must be between 0 and 100");
  }
  if (
    !Number.isFinite(input.quantity) ||
    input.quantity <= 0 ||
    !Number.isInteger(input.quantity)
  ) {
    throw new RangeError("quantity must be a positive integer");
  }

  const savingsPerItem =
    input.originalPrice * (input.discountRatePercent / 100);
  const salePricePerItem = input.originalPrice - savingsPerItem;
  const totalOriginalPrice = input.originalPrice * input.quantity;
  const totalSavings = savingsPerItem * input.quantity;
  const totalSalePrice = salePricePerItem * input.quantity;

  return {
    salePricePerItem,
    savingsPerItem,
    totalOriginalPrice,
    totalSavings,
    totalSalePrice,
  };
}
