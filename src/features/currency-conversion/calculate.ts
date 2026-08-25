export type CurrencyConversionInput = {
  amount: number;
  rate: number;
};

export type CurrencyConversionResult = {
  convertedAmount: number;
  inverseRate: number;
};

export function calculateCurrencyConversion(
  input: CurrencyConversionInput,
): CurrencyConversionResult {
  const { amount, rate } = input;

  if (!Number.isFinite(amount) || !Number.isFinite(rate) || amount < 0 || rate <= 0) {
    throw new RangeError("Invalid currency conversion input");
  }

  return {
    convertedAmount: amount * rate,
    inverseRate: 1 / rate,
  };
}
