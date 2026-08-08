import Decimal from "decimal.js";
import type { LoanRefinancingInput } from "./calculate";

export type LoanRefinancingValues = Record<
  | "remainingBalance"
  | "currentAnnualRate"
  | "newAnnualRate"
  | "remainingMonths"
  | "refinancingCosts",
  string
>;
export type LoanRefinancingErrors = Partial<
  Record<keyof LoanRefinancingValues, string>
>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateLoanRefinancing(
  values: LoanRefinancingValues,
  locale: "ko" | "en",
): { data?: LoanRefinancingInput; errors: LoanRefinancingErrors } {
  const errors: LoanRefinancingErrors = {};
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const rate = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const remainingBalance = money(values.remainingBalance);
  const currentAnnualRate = rate(values.currentAnnualRate);
  const newAnnualRate = rate(values.newAnnualRate);
  const refinancingCosts = money(values.refinancingCosts);
  const remainingMonths = /^\d+$/.test(values.remainingMonths.trim())
    ? Number(values.remainingMonths)
    : null;

  if (!remainingBalance || remainingBalance.lte(0) || remainingBalance.gt(1e12))
    errors.remainingBalance = message(
      "0보다 크고 1조 원 이하인 대출잔액을 입력해 주세요.",
      "Enter a balance greater than zero and no more than 1 trillion in the selected display currency.",
    );
  if (
    !currentAnnualRate ||
    currentAnnualRate.lt(0) ||
    currentAnnualRate.gt(100)
  )
    errors.currentAnnualRate = message(
      "0% 이상 100% 이하인 현재 금리를 입력해 주세요.",
      "Enter the current rate from 0% to 100%.",
    );
  if (!newAnnualRate || newAnnualRate.lt(0) || newAnnualRate.gt(100))
    errors.newAnnualRate = message(
      "0% 이상 100% 이하인 신규 금리를 입력해 주세요.",
      "Enter the new rate from 0% to 100%.",
    );
  if (!remainingMonths || remainingMonths < 1 || remainingMonths > 600)
    errors.remainingMonths = message(
      "1개월 이상 600개월 이하인 잔여기간을 입력해 주세요.",
      "Enter a remaining term from 1 to 600 months.",
    );
  if (!refinancingCosts || refinancingCosts.lt(0) || refinancingCosts.gt(1e11))
    errors.refinancingCosts = message(
      "0원 이상 1,000억 원 이하인 대환비용을 입력해 주세요.",
      "Enter costs from zero to 100 billion in the selected display currency.",
    );

  return Object.keys(errors).length ||
    !remainingBalance ||
    !currentAnnualRate ||
    !newAnnualRate ||
    !remainingMonths ||
    !refinancingCosts
    ? { errors }
    : {
        errors,
        data: {
          remainingBalance,
          currentAnnualRate,
          newAnnualRate,
          remainingMonths,
          refinancingCosts,
        },
      };
}
