import Decimal from "decimal.js";

import type { DisplayCurrency } from "@/components/calculators/currency-selector";
import type { SavingsLocale } from "./i18n";

export function formatSavingsCurrency(
  value: Decimal.Value,
  locale: SavingsLocale,
  currency: DisplayCurrency,
): string {
  const rounded = new Decimal(value).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(BigInt(rounded.toFixed(0)));
}

export function formatSavingsWon(value: Decimal.Value): string {
  return formatSavingsCurrency(value, "ko", "KRW");
}

export function formatSavingsPercent(value: Decimal.Value): string {
  return `${new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)}%`;
}
