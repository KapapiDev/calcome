import Decimal from "decimal.js";
import type { DsrInput } from "./calculate";

export type DsrValues = Record<
  | "annualIncome"
  | "existingAnnualDebtService"
  | "newLoanPrincipal"
  | "annualInterestRate"
  | "termYears",
  string
>;
export type DsrErrors = Partial<Record<keyof DsrValues, string>>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateDsr(
  values: DsrValues,
  locale: "ko" | "en",
): { data?: DsrInput; errors: DsrErrors } {
  const errors: DsrErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const annualIncome = money(values.annualIncome);
  const existingAnnualDebtService = money(values.existingAnnualDebtService);
  const newLoanPrincipal = money(values.newLoanPrincipal);
  const annualInterestRate = number(values.annualInterestRate);
  const termYears = number(values.termYears);
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);

  if (!annualIncome || annualIncome.lte(0) || annualIncome.gt(100_000_000_000))
    errors.annualIncome = message(
      "0보다 크고 1,000억 원 이하인 연소득을 입력해 주세요.",
      "Enter annual income greater than zero and no more than 100 billion in the selected display currency.",
    );
  if (
    !existingAnnualDebtService ||
    existingAnnualDebtService.lt(0) ||
    existingAnnualDebtService.gt(100_000_000_000)
  )
    errors.existingAnnualDebtService = message(
      "0원 이상 1,000억 원 이하인 기존 연간 원리금 상환액을 입력해 주세요.",
      "Enter existing annual debt service from zero to 100 billion in the selected display currency.",
    );
  if (
    !newLoanPrincipal ||
    newLoanPrincipal.lte(0) ||
    newLoanPrincipal.gt(100_000_000_000)
  )
    errors.newLoanPrincipal = message(
      "0보다 크고 1,000억 원 이하인 신규 대출금을 입력해 주세요.",
      "Enter a new loan amount greater than zero and no more than 100 billion in the selected display currency.",
    );
  if (
    !annualInterestRate ||
    annualInterestRate.lt(0) ||
    annualInterestRate.gt(100)
  )
    errors.annualInterestRate = message(
      "0% 이상 100% 이하인 금리를 입력해 주세요.",
      "Enter an interest rate from 0% to 100%.",
    );
  if (
    !termYears ||
    termYears.lt(1) ||
    termYears.gt(50) ||
    !termYears.isInteger()
  )
    errors.termYears = message(
      "1년 이상 50년 이하의 정수 기간을 입력해 주세요.",
      "Enter a whole-number term from 1 to 50 years.",
    );

  return Object.keys(errors).length ||
    !annualIncome ||
    !existingAnnualDebtService ||
    !newLoanPrincipal ||
    !annualInterestRate ||
    !termYears
    ? { errors }
    : {
        errors,
        data: {
          annualIncome,
          existingAnnualDebtService,
          newLoanPrincipal,
          annualInterestRate,
          termYears,
        },
      };
}
