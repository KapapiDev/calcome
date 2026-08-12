import Decimal from "decimal.js";
import { calculateDsr, type DsrInput, type DsrResult } from "@/features/dsr/calculate";

export type StressDsrInput = DsrInput & {
  stressRateAddOn: Decimal;
};

export type StressDsrResult = {
  base: DsrResult;
  stressed: DsrResult;
  stressedAnnualInterestRate: Decimal;
  dsrIncrease: Decimal;
  monthlyPaymentIncrease: Decimal;
};

export function calculateStressDsr(input: StressDsrInput): StressDsrResult {
  if (input.stressRateAddOn.lt(0)) {
    throw new RangeError("stressRateAddOn must be zero or greater");
  }

  const base = calculateDsr(input);
  const stressedAnnualInterestRate = input.annualInterestRate.plus(
    input.stressRateAddOn,
  );
  const stressed = calculateDsr({
    ...input,
    annualInterestRate: stressedAnnualInterestRate,
  });

  return {
    base,
    stressed,
    stressedAnnualInterestRate,
    dsrIncrease: stressed.dsrRate.minus(base.dsrRate),
    monthlyPaymentIncrease: stressed.monthlyPayment.minus(base.monthlyPayment),
  };
}
