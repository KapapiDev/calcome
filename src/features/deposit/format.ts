import Decimal from "decimal.js";

import type { DisplayCurrency } from "@/components/calculators/currency-selector";
import type { DepositLocale } from "./i18n";

export function formatDepositCurrency(
  value: Decimal.Value,
  locale: DepositLocale,
  currency: DisplayCurrency,
): string {
  const rounded = new Decimal(value).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(BigInt(rounded.toFixed(0)));
}

export function formatDepositWon(value: Decimal.Value): string {
  return formatDepositCurrency(value, "ko", "KRW");
}

export function formatDepositPercent(value: Decimal.Value): string {
  return `${new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)}%`;
}
