import Decimal from "decimal.js";
import type { DebtRepaymentPeriodInput } from "./calculate";

export type DebtRepaymentPeriodValues = Record<
  "balance" | "annualInterestRate" | "monthlyPayment",
  string
>;
export type DebtRepaymentPeriodErrors = Partial<
  Record<keyof DebtRepaymentPeriodValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateDebtRepaymentPeriod(
  values: DebtRepaymentPeriodValues,
  locale: "ko" | "en",
) {
  const errors: DebtRepaymentPeriodErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const balance = money(values.balance);
  const annualInterestRate = number(values.annualInterestRate);
  const monthlyPayment = money(values.monthlyPayment);
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);

  if (!balance || balance.lte(0) || balance.gt(100_000_000_000))
    errors.balance = message(
      "0원 초과 1,000억원 이하의 대출 잔액을 입력하세요.",
      "Enter a balance greater than zero and no more than 100 billion in the selected display currency.",
    );
  if (
    !annualInterestRate ||
    annualInterestRate.lt(0) ||
    annualInterestRate.gt(100)
  )
    errors.annualInterestRate = message(
      "0% 이상 100% 이하의 금리를 입력하세요.",
      "Enter an interest rate from 0% to 100%.",
    );
  if (
    !monthlyPayment ||
    monthlyPayment.lte(0) ||
    monthlyPayment.gt(10_000_000_000)
  )
    errors.monthlyPayment = message(
      "0원 초과 100억원 이하의 월 상환액을 입력하세요.",
      "Enter a monthly payment greater than zero and no more than 10 billion in the selected display currency.",
    );

  return Object.keys(errors).length ||
    !balance ||
    !annualInterestRate ||
    !monthlyPayment
    ? { errors }
    : {
        errors,
        data: {
          balance,
          annualInterestRate,
          monthlyPayment,
        } satisfies DebtRepaymentPeriodInput,
      };
}
