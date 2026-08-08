import Decimal from "decimal.js";

import type { DisplayCurrency } from "@/components/calculators/currency-selector";
import type { LoanLocale } from "./i18n";

export function formatLoanCurrency(
  value: Decimal.Value,
  locale: LoanLocale,
  currency: DisplayCurrency,
): string {
  const rounded = new Decimal(value).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(BigInt(rounded.toFixed(0)));
}

export function formatLoanWon(value: Decimal.Value): string {
  return formatLoanCurrency(value, "ko", "KRW");
}
