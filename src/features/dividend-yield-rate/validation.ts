import Decimal from "decimal.js";

export type DividendYieldRateLocale = "ko" | "en";
export type DividendYieldRateValues = {
  sharePrice: string;
  annualDividendPerShare: string;
  investmentAmount: string;
};
export type DividendYieldRateErrors = Partial<Record<keyof DividendYieldRateValues, string>>;

function parsePositive(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) return null;
  try {
    const parsed = new Decimal(normalized);
    return parsed.isFinite() && parsed.gt(0) ? parsed : null;
  } catch {
    return null;
  }
}

export function validateDividendYieldRate(
  values: DividendYieldRateValues,
  locale: DividendYieldRateLocale,
) {
  const required = locale === "ko" ? "0보다 큰 숫자를 입력해 주세요." : "Enter a number greater than zero.";
  const sharePrice = parsePositive(values.sharePrice);
  const annualDividendPerShare = parsePositive(values.annualDividendPerShare);
  const investmentAmount = parsePositive(values.investmentAmount);
  const errors: DividendYieldRateErrors = {};
  if (!sharePrice) errors.sharePrice = required;
  if (!annualDividendPerShare) errors.annualDividendPerShare = required;
  if (!investmentAmount) errors.investmentAmount = required;
  return {
    errors,
    data:
      sharePrice && annualDividendPerShare && investmentAmount
        ? { sharePrice, annualDividendPerShare, investmentAmount }
        : undefined,
  };
}
