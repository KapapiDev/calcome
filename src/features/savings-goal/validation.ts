export type SavingsGoalLocale = "ko" | "en";

export type SavingsGoalValues = {
  targetAmount: string;
  initialSavings: string;
  annualReturnPercent: string;
  years: string;
};

export type SavingsGoalErrors = Partial<Record<keyof SavingsGoalValues, string>>;

function parseNumber(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateSavingsGoal(values: SavingsGoalValues, locale: SavingsGoalLocale) {
  const positive = locale === "ko" ? "0보다 큰 숫자를 입력해 주세요." : "Enter a number greater than zero.";
  const nonNegative = locale === "ko" ? "0 이상의 숫자를 입력해 주세요." : "Enter zero or a positive number.";
  const returnError = locale === "ko" ? "-100%보다 큰 수익률을 입력해 주세요." : "Enter a return greater than -100%.";
  const periodError = locale === "ko" ? "1개월 이상의 기간을 입력해 주세요." : "Enter a period of at least one month.";

  const targetAmount = parseNumber(values.targetAmount);
  const initialSavings = parseNumber(values.initialSavings);
  const annualReturnPercent = parseNumber(values.annualReturnPercent);
  const years = parseNumber(values.years);
  const errors: SavingsGoalErrors = {};

  if (targetAmount === null || targetAmount <= 0) errors.targetAmount = positive;
  if (initialSavings === null || initialSavings < 0) errors.initialSavings = nonNegative;
  if (annualReturnPercent === null || annualReturnPercent <= -100) errors.annualReturnPercent = returnError;
  if (years === null || years * 12 < 1) errors.years = periodError;

  return {
    errors,
    data:
      Object.keys(errors).length === 0 &&
      targetAmount !== null &&
      initialSavings !== null &&
      annualReturnPercent !== null &&
      years !== null
        ? { targetAmount, initialSavings, annualReturnPercent, years }
        : undefined,
  };
}
