import Decimal from "decimal.js";
import type { CreditLoanInterestInput } from "./calculate";

export type CreditLoanInterestValues = Record<
  "loanAmount" | "annualRate" | "termMonths" | "monthlyFees",
  string
>;
export type CreditLoanInterestErrors = Partial<
  Record<keyof CreditLoanInterestValues, string>
>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateCreditLoanInterest(
  values: CreditLoanInterestValues,
  locale: "ko" | "en",
): { data?: CreditLoanInterestInput; errors: CreditLoanInterestErrors } {
  const errors: CreditLoanInterestErrors = {};
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const loanAmount = money(values.loanAmount);
  const monthlyFees = money(values.monthlyFees);
  const annualRate = NUMBER.test(values.annualRate.trim())
    ? new Decimal(values.annualRate)
    : null;
  const termMonths = /^\d+$/.test(values.termMonths.trim())
    ? Number(values.termMonths)
    : null;

  if (!loanAmount || loanAmount.lte(0) || loanAmount.gt(10_000_000_000_000))
    errors.loanAmount = message(
      "0원보다 크고 10조 원 이하인 대출금을 입력해 주세요.",
      "Enter a loan amount greater than zero and no more than 10 trillion in the selected display currency.",
    );
  if (!annualRate || annualRate.lt(0) || annualRate.gt(100))
    errors.annualRate = message(
      "0% 이상 100% 이하의 연이율을 입력해 주세요.",
      "Enter an annual rate from 0% to 100%.",
    );
  if (!termMonths || termMonths < 1 || termMonths > 600)
    errors.termMonths = message(
      "1개월 이상 600개월 이하의 기간을 입력해 주세요.",
      "Enter a term from 1 to 600 months.",
    );
  if (!monthlyFees || monthlyFees.lt(0) || monthlyFees.gt(100_000_000))
    errors.monthlyFees = message(
      "0원 이상 1억 원 이하의 월 부대비용을 입력해 주세요.",
      "Enter monthly fees from zero to 100 million in the selected display currency.",
    );

  return Object.keys(errors).length ||
    !loanAmount ||
    !annualRate ||
    !termMonths ||
    !monthlyFees
    ? { errors }
    : { errors, data: { loanAmount, annualRate, termMonths, monthlyFees } };
}
