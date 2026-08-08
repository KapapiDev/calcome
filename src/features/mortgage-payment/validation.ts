import Decimal from "decimal.js";
import type { MortgagePaymentInput } from "./calculate";

export type MortgagePaymentValues = Record<
  "homePrice" | "downPayment" | "annualRate" | "termYears" | "monthlyCosts",
  string
>;
export type MortgagePaymentErrors = Partial<
  Record<keyof MortgagePaymentValues, string>
>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateMortgagePayment(
  values: MortgagePaymentValues,
  locale: "ko" | "en",
): { data?: MortgagePaymentInput; errors: MortgagePaymentErrors } {
  const errors: MortgagePaymentErrors = {};
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const homePrice = money(values.homePrice);
  const downPayment = money(values.downPayment);
  const monthlyCosts = money(values.monthlyCosts);
  const annualRate = NUMBER.test(values.annualRate.trim())
    ? new Decimal(values.annualRate)
    : null;
  const termYears = /^\d+$/.test(values.termYears.trim())
    ? Number(values.termYears)
    : null;

  if (!homePrice || homePrice.lte(0) || homePrice.gt(10_000_000_000_000))
    errors.homePrice = message(
      "0보다 크고 10조 원 이하인 주택가격을 입력해 주세요.",
      "Enter a home price greater than zero and no more than 10 trillion in the selected display currency.",
    );
  if (
    !downPayment ||
    downPayment.lt(0) ||
    (homePrice && downPayment.gte(homePrice))
  )
    errors.downPayment = message(
      "0원 이상이며 주택가격보다 작은 계약금을 입력해 주세요.",
      "Enter a down payment from zero up to, but not including, the home price.",
    );
  if (!annualRate || annualRate.lt(0) || annualRate.gt(100))
    errors.annualRate = message(
      "0% 이상 100% 이하인 연이율을 입력해 주세요.",
      "Enter an annual rate from 0% to 100%.",
    );
  if (!termYears || termYears < 1 || termYears > 50)
    errors.termYears = message(
      "1년 이상 50년 이하인 기간을 입력해 주세요.",
      "Enter a term from 1 to 50 years.",
    );
  if (!monthlyCosts || monthlyCosts.lt(0) || monthlyCosts.gt(100_000_000))
    errors.monthlyCosts = message(
      "0원 이상 1억 원 이하인 월 부대비용을 입력해 주세요.",
      "Enter monthly costs from zero to 100 million in the selected display currency.",
    );

  return Object.keys(errors).length ||
    !homePrice ||
    !downPayment ||
    !annualRate ||
    !termYears ||
    !monthlyCosts
    ? { errors }
    : {
        errors,
        data: { homePrice, downPayment, annualRate, termYears, monthlyCosts },
      };
}
