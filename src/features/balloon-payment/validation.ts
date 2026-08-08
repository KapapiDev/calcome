import Decimal from "decimal.js";
import type { BalloonPaymentInput } from "./calculate";

export type BalloonPaymentValues = Record<
  "principal" | "annualRate" | "termMonths" | "balloonAmount",
  string
>;
export type BalloonPaymentErrors = Partial<
  Record<keyof BalloonPaymentValues, string>
>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateBalloonPayment(
  values: BalloonPaymentValues,
  locale: "ko" | "en",
): { data?: BalloonPaymentInput; errors: BalloonPaymentErrors } {
  const errors: BalloonPaymentErrors = {};
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const principal = money(values.principal);
  const balloonAmount = money(values.balloonAmount);
  const annualRate = NUMBER.test(values.annualRate.trim())
    ? new Decimal(values.annualRate)
    : null;
  const termMonths = /^\d+$/.test(values.termMonths.trim())
    ? Number(values.termMonths)
    : null;

  if (!principal || principal.lte(0) || principal.gt(1_000_000_000_000))
    errors.principal = message(
      "0보다 크고 1조 원 이하인 대출원금을 입력해 주세요.",
      "Enter a principal greater than zero and no more than 1 trillion in the selected display currency.",
    );
  if (!annualRate || annualRate.lt(0) || annualRate.gt(100))
    errors.annualRate = message(
      "0% 이상 100% 이하인 연이율을 입력해 주세요.",
      "Enter an annual rate from 0% to 100%.",
    );
  if (!termMonths || termMonths < 1 || termMonths > 600)
    errors.termMonths = message(
      "1개월 이상 600개월 이하인 기간을 입력해 주세요.",
      "Enter a term from 1 to 600 months.",
    );
  if (
    !balloonAmount ||
    balloonAmount.lt(0) ||
    balloonAmount.gt(1_000_000_000_000) ||
    (principal && balloonAmount.gt(principal))
  )
    errors.balloonAmount = message(
      "0원 이상이며 대출원금 이하인 만기 일시상환액을 입력해 주세요.",
      "Enter a balloon amount from zero up to the loan principal.",
    );

  return Object.keys(errors).length ||
    !principal ||
    !annualRate ||
    !termMonths ||
    !balloonAmount
    ? { errors }
    : { errors, data: { principal, annualRate, termMonths, balloonAmount } };
}
