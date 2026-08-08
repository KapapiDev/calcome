import Decimal from "decimal.js";
import type { LoanAffordabilityInput } from "./calculate";

export type LoanAffordabilityValues = Record<
  | "annualIncome"
  | "otherMonthlyDebt"
  | "debtServiceLimit"
  | "annualInterestRate"
  | "termYears",
  string
>;
export type LoanAffordabilityErrors = Partial<
  Record<keyof LoanAffordabilityValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateLoanAffordability(
  values: LoanAffordabilityValues,
  locale: "ko" | "en",
) {
  const errors: LoanAffordabilityErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const annualIncome = money(values.annualIncome);
  const otherMonthlyDebt = money(values.otherMonthlyDebt);
  const debtServiceLimit = number(values.debtServiceLimit);
  const annualInterestRate = number(values.annualInterestRate);
  const termYears = number(values.termYears);
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);

  if (!annualIncome || annualIncome.lte(0) || annualIncome.gt(100_000_000_000))
    errors.annualIncome = message(
      "0원 초과 1,000억원 이하의 연소득을 입력하세요.",
      "Enter annual income greater than zero and no more than 100 billion in the selected display currency.",
    );
  if (
    !otherMonthlyDebt ||
    otherMonthlyDebt.lt(0) ||
    otherMonthlyDebt.gt(10_000_000_000)
  )
    errors.otherMonthlyDebt = message(
      "0원 이상 100억원 이하의 기존 월 부채 상환액을 입력하세요.",
      "Enter existing monthly debt payments from zero to 10 billion in the selected display currency.",
    );
  if (!debtServiceLimit || debtServiceLimit.lte(0) || debtServiceLimit.gt(100))
    errors.debtServiceLimit = message(
      "0% 초과 100% 이하의 부채상환 비율을 입력하세요.",
      "Enter a debt-service limit greater than 0% and no more than 100%.",
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
    !termYears ||
    termYears.lt(1) ||
    termYears.gt(50) ||
    !termYears.isInteger()
  )
    errors.termYears = message(
      "1년 이상 50년 이하의 정수 기간을 입력하세요.",
      "Enter a whole-number term from 1 to 50 years.",
    );

  return Object.keys(errors).length ||
    !annualIncome ||
    !otherMonthlyDebt ||
    !debtServiceLimit ||
    !annualInterestRate ||
    !termYears
    ? { errors }
    : {
        errors,
        data: {
          annualIncome,
          otherMonthlyDebt,
          debtServiceLimit,
          annualInterestRate,
          termYears,
        } satisfies LoanAffordabilityInput,
      };
}
