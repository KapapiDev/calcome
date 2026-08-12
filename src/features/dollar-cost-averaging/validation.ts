export type DollarCostAveragingLocale = "ko" | "en";

export type DollarCostAveragingValues = {
  initialInvestment: string;
  monthlyContribution: string;
  annualReturnPercent: string;
  years: string;
};

export type DollarCostAveragingErrors = Partial<
  Record<keyof DollarCostAveragingValues, string>
>;

function parseNumber(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateDollarCostAveraging(
  values: DollarCostAveragingValues,
  locale: DollarCostAveragingLocale,
) {
  const nonNegative = locale === "ko" ? "0 이상의 숫자를 입력해 주세요." : "Enter zero or a positive number.";
  const returnError = locale === "ko" ? "-100%보다 큰 수익률을 입력해 주세요." : "Enter a return greater than -100%.";
  const periodError = locale === "ko" ? "1개월 이상의 투자 기간을 입력해 주세요." : "Enter an investment period of at least one month.";

  const initialInvestment = parseNumber(values.initialInvestment);
  const monthlyContribution = parseNumber(values.monthlyContribution);
  const annualReturnPercent = parseNumber(values.annualReturnPercent);
  const years = parseNumber(values.years);
  const errors: DollarCostAveragingErrors = {};

  if (initialInvestment === null || initialInvestment < 0) errors.initialInvestment = nonNegative;
  if (monthlyContribution === null || monthlyContribution < 0) errors.monthlyContribution = nonNegative;
  if (annualReturnPercent === null || annualReturnPercent <= -100) errors.annualReturnPercent = returnError;
  if (years === null || years * 12 < 1) errors.years = periodError;

  return {
    errors,
    data:
      Object.keys(errors).length === 0 &&
      initialInvestment !== null &&
      monthlyContribution !== null &&
      annualReturnPercent !== null &&
      years !== null
        ? { initialInvestment, monthlyContribution, annualReturnPercent, years }
        : undefined,
  };
}
