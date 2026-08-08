import Decimal from "decimal.js";
import type { LoanInterestComparisonInput } from "./calculate";

export type LoanInterestComparisonValues = Record<
  "principal" | "annualRateA" | "annualRateB" | "termMonths",
  string
>;
export type LoanInterestComparisonErrors = Partial<
  Record<keyof LoanInterestComparisonValues, string>
>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateLoanInterestComparison(
  values: LoanInterestComparisonValues,
  locale: "ko" | "en",
): {
  data?: LoanInterestComparisonInput;
  errors: LoanInterestComparisonErrors;
} {
  const errors: LoanInterestComparisonErrors = {};
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  const principal = MONEY.test(values.principal.trim())
    ? new Decimal(values.principal.replaceAll(",", ""))
    : null;
  const rate = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const annualRateA = rate(values.annualRateA);
  const annualRateB = rate(values.annualRateB);
  const termMonths = /^\d+$/.test(values.termMonths.trim())
    ? Number(values.termMonths)
    : null;

  if (!principal || principal.lte(0) || principal.gt(1_000_000_000_000))
    errors.principal = message(
      "0보다 크고 1조 원 이하인 대출원금을 입력해 주세요.",
      "Enter a principal greater than zero and no more than 1 trillion in the selected display currency.",
    );
  if (!annualRateA || annualRateA.lt(0) || annualRateA.gt(100))
    errors.annualRateA = message(
      "0% 이상 100% 이하인 A 금리를 입력해 주세요.",
      "Enter option A's rate from 0% to 100%.",
    );
  if (!annualRateB || annualRateB.lt(0) || annualRateB.gt(100))
    errors.annualRateB = message(
      "0% 이상 100% 이하인 B 금리를 입력해 주세요.",
      "Enter option B's rate from 0% to 100%.",
    );
  if (!termMonths || termMonths < 1 || termMonths > 600)
    errors.termMonths = message(
      "1개월 이상 600개월 이하인 상환기간을 입력해 주세요.",
      "Enter a term from 1 to 600 months.",
    );

  return Object.keys(errors).length ||
    !principal ||
    !annualRateA ||
    !annualRateB ||
    !termMonths
    ? { errors }
    : {
        errors,
        data: { principal, annualRateA, annualRateB, termMonths },
      };
}
