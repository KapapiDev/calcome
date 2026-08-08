import Decimal from "decimal.js";

import type { DisplayCurrency } from "@/components/calculators/currency-selector";
import type { CagrLocale } from "./i18n";

export function formatCagrCurrency(
  value: Decimal.Value,
  locale: CagrLocale,
  currency: DisplayCurrency,
): string {
  const rounded = new Decimal(value).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
  return new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(BigInt(rounded.toFixed(0)));
}

export function formatCagrWon(value: Decimal.Value, locale = "ko-KR"): string {
  return formatCagrCurrency(value, locale === "en-US" ? "en" : "ko", "KRW");
}

export function formatCagrPercent(value: Decimal.Value): string {
  return `${new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)}%`;
}

export function describeAnnualizedGrowth(value: Decimal.Value): string {
  const cagr = new Decimal(value);
  if (cagr.isZero()) return "연평균 변화 없음";
  return cagr.isPositive() ? "연평균 성장" : "연평균 감소";
}

export function formatCagrMultiple(value: Decimal.Value): string {
  return `${new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)}×`;
}
