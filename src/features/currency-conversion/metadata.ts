import type { Metadata } from "next";

export type CurrencyConversionLocale = "ko" | "en";

export function createCurrencyConversionMetadata(
  locale: CurrencyConversionLocale,
): Metadata {
  const isKo = locale === "ko";
  const title = isKo
    ? "환율 변환 계산기 | CalCome"
    : "Currency Converter Calculator | Exchange Rate Conversion | CalCome";
  const description = isKo
    ? "직접 입력한 환율로 두 통화 사이의 금액을 변환하고 역환율을 확인합니다."
    : "Use this currency converter calculator to convert an amount with an exchange rate you enter, compare base and quote currencies, and see the inverse rate.";
  const path = `/${locale}/finance/currency-conversion`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/currency-conversion",
        en: "/en/finance/currency-conversion",
        "x-default": "/ko/finance/currency-conversion",
      },
    },
  };
}
