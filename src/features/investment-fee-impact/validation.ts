import type { InvestmentFeeImpactInput } from "./calculate";
import type { InvestmentFeeImpactLocale } from "./content";

export type InvestmentFeeImpactValues = {
  initialInvestment: string;
  monthlyContribution: string;
  annualReturnPercent: string;
  annualFeePercent: string;
  years: string;
};

export type InvestmentFeeImpactErrors = Partial<
  Record<keyof InvestmentFeeImpactValues, string>
>;

function parseNumber(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateInvestmentFeeImpact(
  values: InvestmentFeeImpactValues,
  locale: InvestmentFeeImpactLocale,
): { errors: InvestmentFeeImpactErrors; data?: InvestmentFeeImpactInput } {
  const nonNegative =
    locale === "ko"
      ? "0 이상의 숫자를 입력해 주세요."
      : "Enter zero or a positive number.";
  const returnError =
    locale === "ko"
      ? "-100%보다 큰 수익률을 입력해 주세요."
      : "Enter a return greater than -100%.";
  const feeError =
    locale === "ko"
      ? "0% 이상 100% 미만의 수수료를 입력해 주세요."
      : "Enter a fee from 0% up to, but not including, 100%.";
  const periodError =
    locale === "ko"
      ? "1개월 이상의 기간을 입력해 주세요."
      : "Enter a period of at least one month.";

  const initialInvestment = parseNumber(values.initialInvestment);
  const monthlyContribution = parseNumber(values.monthlyContribution);
  const annualReturnPercent = parseNumber(values.annualReturnPercent);
  const annualFeePercent = parseNumber(values.annualFeePercent);
  const years = parseNumber(values.years);
  const errors: InvestmentFeeImpactErrors = {};

  if (initialInvestment === null || initialInvestment < 0) {
    errors.initialInvestment = nonNegative;
  }
  if (monthlyContribution === null || monthlyContribution < 0) {
    errors.monthlyContribution = nonNegative;
  }
  if (annualReturnPercent === null || annualReturnPercent <= -100) {
    errors.annualReturnPercent = returnError;
  }
  if (
    annualFeePercent === null ||
    annualFeePercent < 0 ||
    annualFeePercent >= 100
  ) {
    errors.annualFeePercent = feeError;
  }
  if (years === null || years * 12 < 1) {
    errors.years = periodError;
  }
  if (
    annualReturnPercent !== null &&
    annualFeePercent !== null &&
    annualReturnPercent - annualFeePercent <= -100
  ) {
    errors.annualFeePercent =
      locale === "ko"
        ? "수수료 차감 후 연 수익률이 -100%보다 커야 합니다."
        : "The annual return after fees must remain above -100%.";
  }

  return {
    errors,
    data:
      Object.keys(errors).length === 0 &&
      initialInvestment !== null &&
      monthlyContribution !== null &&
      annualReturnPercent !== null &&
      annualFeePercent !== null &&
      years !== null
        ? {
            initialInvestment,
            monthlyContribution,
            annualReturnPercent,
            annualFeePercent,
            years,
          }
        : undefined,
  };
}
