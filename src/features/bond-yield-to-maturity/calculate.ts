export type BondYieldInput = {
  faceValue: number;
  marketPrice: number;
  annualCouponRatePercent: number;
  yearsToMaturity: number;
  paymentsPerYear: 1 | 2 | 4 | 12;
};

export type BondYieldResult = {
  annualCouponAmount: number;
  couponPerPeriod: number;
  currentYieldPercent: number;
  ytmPercent: number;
  totalCouponPayments: number;
  redemptionAmount: number;
  totalNominalCashFlow: number;
};

function presentValue(input: BondYieldInput, annualYield: number) {
  const periods = Math.round(input.yearsToMaturity * input.paymentsPerYear);
  const periodYield = annualYield / input.paymentsPerYear;
  const coupon =
    (input.faceValue * (input.annualCouponRatePercent / 100)) /
    input.paymentsPerYear;

  let value = 0;
  for (let period = 1; period <= periods; period += 1) {
    value += coupon / (1 + periodYield) ** period;
  }
  value += input.faceValue / (1 + periodYield) ** periods;
  return value;
}

export function calculateBondYield(input: BondYieldInput): BondYieldResult {
  const values = [
    input.faceValue,
    input.marketPrice,
    input.annualCouponRatePercent,
    input.yearsToMaturity,
  ];
  if (values.some((value) => !Number.isFinite(value))) {
    throw new RangeError("all values must be finite");
  }
  if (input.faceValue <= 0 || input.marketPrice <= 0) {
    throw new RangeError("faceValue and marketPrice must be greater than zero");
  }
  if (input.annualCouponRatePercent < 0 || input.annualCouponRatePercent > 100) {
    throw new RangeError("annualCouponRatePercent must be between 0 and 100");
  }
  if (input.yearsToMaturity <= 0 || input.yearsToMaturity > 100) {
    throw new RangeError("yearsToMaturity must be greater than zero and at most 100");
  }
  if (![1, 2, 4, 12].includes(input.paymentsPerYear)) {
    throw new RangeError("paymentsPerYear is unsupported");
  }

  const periods = input.yearsToMaturity * input.paymentsPerYear;
  if (Math.abs(periods - Math.round(periods)) > 1e-9) {
    throw new RangeError("yearsToMaturity must resolve to a whole payment period");
  }

  let low = -0.99;
  let high = 10;
  const lowValue = presentValue(input, low) - input.marketPrice;
  const highValue = presentValue(input, high) - input.marketPrice;
  if (lowValue * highValue > 0) {
    throw new RangeError("yield could not be bracketed for the supplied inputs");
  }

  for (let index = 0; index < 160; index += 1) {
    const mid = (low + high) / 2;
    const difference = presentValue(input, mid) - input.marketPrice;
    if (Math.abs(difference) < 1e-10) {
      low = mid;
      high = mid;
      break;
    }
    if (difference > 0) low = mid;
    else high = mid;
  }

  const annualCouponAmount =
    input.faceValue * (input.annualCouponRatePercent / 100);
  const couponPerPeriod = annualCouponAmount / input.paymentsPerYear;
  const totalCouponPayments = annualCouponAmount * input.yearsToMaturity;

  return {
    annualCouponAmount,
    couponPerPeriod,
    currentYieldPercent: (annualCouponAmount / input.marketPrice) * 100,
    ytmPercent: ((low + high) / 2) * 100,
    totalCouponPayments,
    redemptionAmount: input.faceValue,
    totalNominalCashFlow: totalCouponPayments + input.faceValue,
  };
}
