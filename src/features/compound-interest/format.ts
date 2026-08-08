import Decimal from "decimal.js";

import type { DisplayCurrency } from "@/components/calculators/currency-selector";
import type { CompoundLocale } from "./i18n";

export function formatCompoundCurrency(
  value: Decimal.Value,
  locale: CompoundLocale,
  currency: DisplayCurrency,
): string {
  const rounded = new Decimal(value)
    .toDecimalPlaces(0, Decimal.ROUND_HALF_UP)
    .toFixed(0);
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(BigInt(rounded));
}

export function formatWon(value: Decimal.Value): string {
  return formatCompoundCurrency(value, "ko", "KRW");
}

export function formatPercent(value: string | null): string {
  if (value === null) return "사용 안 함";
  return `${new Decimal(value).toDecimalPlaces(2).toString()}%`;
}

export function formatMultiplier(value: string | null): string {
  if (value === null) return "계산할 수 없음";
  return `${new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)}×`;
}
