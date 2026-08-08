import Decimal from "decimal.js";
import type { DtiInput } from "./calculate";

export type DtiValues = Record<
  | "annualIncome"
  | "mortgagePrincipal"
  | "annualInterestRate"
  | "termYears"
  | "otherMonthlyDebt",
  string
>;
export type DtiErrors = Partial<Record<keyof DtiValues, string>>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateDti(
  values: DtiValues,
  locale: "ko" | "en",
): { data?: DtiInput; errors: DtiErrors } {
  const errors: DtiErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const annualIncome = money(values.annualIncome);
  const mortgagePrincipal = money(values.mortgagePrincipal);
  const annualInterestRate = number(values.annualInterestRate);
  const termYears = number(values.termYears);
  const otherMonthlyDebt = money(values.otherMonthlyDebt);
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);

  if (!annualIncome || annualIncome.lte(0) || annualIncome.gt(100_000_000_000))
    errors.annualIncome = message(
      "0보다 크고 1,000억 원 이하인 연소득을 입력해 주세요.",
      "Enter annual income greater than zero and no more than 100 billion in the selected display currency.",
    );
  if (
    !mortgagePrincipal ||
    mortgagePrincipal.lte(0) ||
    mortgagePrincipal.gt(100_000_000_000)
  )
    errors.mortgagePrincipal = message(
      "0보다 크고 1,000억 원 이하인 주택담보대출금을 입력해 주세요.",
      "Enter a mortgage amount greater than zero and no more than 100 billion in the selected display currency.",
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
  if (
    !otherMonthlyDebt ||
    otherMonthlyDebt.lt(0) ||
    otherMonthlyDebt.gt(10_000_000_000)
  )
    errors.otherMonthlyDebt = message(
      "0원 이상 100억 원 이하인 기타 월 부채 상환액을 입력해 주세요.",
      "Enter other monthly debt payments from zero to 10 billion in the selected display currency.",
    );

  return Object.keys(errors).length ||
    !annualIncome ||
    !mortgagePrincipal ||
    !annualInterestRate ||
    !termYears ||
    !otherMonthlyDebt
    ? { errors }
    : {
        errors,
        data: {
          annualIncome,
          mortgagePrincipal,
          annualInterestRate,
          termYears,
          otherMonthlyDebt,
        },
      };
}
