export type BondPriceInput = {
  faceValue: number;
  annualCouponRatePercent: number;
  annualMarketYieldPercent: number;
  yearsToMaturity: number;
  paymentsPerYear: 1 | 2 | 4 | 12;
};

export type BondPriceResult = {
  bondPrice: number;
  annualCouponAmount: number;
  couponPerPeriod: number;
  presentValueCoupons: number;
  presentValueRedemption: number;
  premiumDiscountAmount: number;
  premiumDiscountPercent: number;
};

export function calculateBondPrice(input: BondPriceInput): BondPriceResult {
  const values = [
    input.faceValue,
    input.annualCouponRatePercent,
    input.annualMarketYieldPercent,
    input.yearsToMaturity,
  ];
  if (values.some((value) => !Number.isFinite(value))) {
    throw new RangeError("all values must be finite");
  }
  if (input.faceValue <= 0) {
    throw new RangeError("faceValue must be greater than zero");
  }
  if (
    input.annualCouponRatePercent < 0 ||
    input.annualCouponRatePercent > 100 ||
    input.annualMarketYieldPercent < 0 ||
    input.annualMarketYieldPercent > 100
  ) {
    throw new RangeError("rates must be between 0 and 100");
  }
  if (input.yearsToMaturity <= 0 || input.yearsToMaturity > 100) {
    throw new RangeError(
      "yearsToMaturity must be greater than zero and at most 100",
    );
  }
  if (![1, 2, 4, 12].includes(input.paymentsPerYear)) {
    throw new RangeError("paymentsPerYear is unsupported");
  }

  const periods = input.yearsToMaturity * input.paymentsPerYear;
  if (Math.abs(periods - Math.round(periods)) > 1e-9) {
    throw new RangeError(
      "yearsToMaturity must resolve to a whole payment period",
    );
  }

  const periodCount = Math.round(periods);
  const annualCouponAmount =
    input.faceValue * (input.annualCouponRatePercent / 100);
  const couponPerPeriod = annualCouponAmount / input.paymentsPerYear;
  const periodicYield =
    input.annualMarketYieldPercent / 100 / input.paymentsPerYear;

  let presentValueCoupons: number;
  let presentValueRedemption: number;
  if (periodicYield === 0) {
    presentValueCoupons = couponPerPeriod * periodCount;
    presentValueRedemption = input.faceValue;
  } else {
    const discountFactor = (1 + periodicYield) ** -periodCount;
    presentValueCoupons =
      couponPerPeriod * ((1 - discountFactor) / periodicYield);
    presentValueRedemption = input.faceValue * discountFactor;
  }

  const bondPrice = presentValueCoupons + presentValueRedemption;
  const premiumDiscountAmount = bondPrice - input.faceValue;

  return {
    bondPrice,
    annualCouponAmount,
    couponPerPeriod,
    presentValueCoupons,
    presentValueRedemption,
    premiumDiscountAmount,
    premiumDiscountPercent: (premiumDiscountAmount / input.faceValue) * 100,
  };
}
