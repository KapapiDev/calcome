import Decimal from "decimal.js";
import type { CreditCardInstallmentInterestInput } from "./calculate";
import type { CreditCardInstallmentInterestLocale } from "./content";

export type CreditCardInstallmentInterestValues = {
  purchaseAmount: string;
  installmentMonths: string;
  annualFeeRate: string;
};
export type CreditCardInstallmentInterestErrors = Partial<
  Record<keyof CreditCardInstallmentInterestValues, string>
>;

function decimal(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) return null;
  try {
    const parsed = new Decimal(normalized);
    return parsed.isFinite() ? parsed : null;
  } catch {
    return null;
  }
}

export function validateCreditCardInstallmentInterest(
  values: CreditCardInstallmentInterestValues,
  locale: CreditCardInstallmentInterestLocale,
) {
  const ko = locale === "ko";
  const errors: CreditCardInstallmentInterestErrors = {};
  const purchaseAmount = decimal(values.purchaseAmount);
  const monthsValue = decimal(values.installmentMonths);
  const annualFeeRate = decimal(values.annualFeeRate);

  if (
    !purchaseAmount ||
    purchaseAmount.lte(0) ||
    purchaseAmount.gt(10_000_000_000)
  )
    errors.purchaseAmount = ko
      ? "결제 금액은 0원 초과 100억원 이하로 입력해 주세요."
      : "Enter an amount above 0 and no more than 10 billion in the selected display currency.";
  if (
    !monthsValue ||
    !monthsValue.isInteger() ||
    monthsValue.lt(2) ||
    monthsValue.gt(60)
  )
    errors.installmentMonths = ko
      ? "할부 개월은 2~60 사이의 정수로 입력해 주세요."
      : "Enter a whole number from 2 to 60 months.";
  if (!annualFeeRate || annualFeeRate.lt(0) || annualFeeRate.gt(30))
    errors.annualFeeRate = ko
      ? "연 할부 수수료율은 0~30%로 입력해 주세요."
      : "Enter an annual fee rate from 0% to 30%.";

  return Object.keys(errors).length ||
    !purchaseAmount ||
    !monthsValue ||
    !annualFeeRate
    ? { errors }
    : {
        errors,
        data: {
          purchaseAmount,
          installmentMonths: monthsValue.toNumber(),
          annualFeeRate,
        } satisfies CreditCardInstallmentInterestInput,
      };
}
