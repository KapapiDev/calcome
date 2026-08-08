import Decimal from "decimal.js";
import type { LtvInput } from "./calculate";

export type LtvValues = Record<
  "propertyValue" | "loanAmount" | "targetLtvRate",
  string
>;
export type LtvErrors = Partial<Record<keyof LtvValues, string>>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateLtv(
  values: LtvValues,
  locale: "ko" | "en",
): { data?: LtvInput; errors: LtvErrors } {
  const errors: LtvErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const propertyValue = money(values.propertyValue);
  const loanAmount = money(values.loanAmount);
  const targetLtvRate = NUMBER.test(values.targetLtvRate.trim())
    ? new Decimal(values.targetLtvRate)
    : null;
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);

  if (
    !propertyValue ||
    propertyValue.lte(0) ||
    propertyValue.gt(1_000_000_000_000)
  )
    errors.propertyValue = message(
      "0보다 크고 1조 원 이하인 담보가치를 입력해 주세요.",
      "Enter a property value greater than zero and no more than 1 trillion in the selected display currency.",
    );
  if (!loanAmount || loanAmount.lt(0) || loanAmount.gt(1_000_000_000_000))
    errors.loanAmount = message(
      "0원 이상 1조 원 이하인 대출금액을 입력해 주세요.",
      "Enter a loan amount from zero to 1 trillion in the selected display currency.",
    );
  if (!targetLtvRate || targetLtvRate.lte(0) || targetLtvRate.gt(100))
    errors.targetLtvRate = message(
      "0%보다 크고 100% 이하인 목표 LTV를 입력해 주세요.",
      "Enter a target LTV greater than 0% and no more than 100%.",
    );

  return Object.keys(errors).length ||
    !propertyValue ||
    !loanAmount ||
    !targetLtvRate
    ? { errors }
    : { errors, data: { propertyValue, loanAmount, targetLtvRate } };
}
