import type { Metadata } from "next";

export type PensionSavingsTaxCreditLocale = "ko" | "en";

export function createPensionSavingsTaxCreditMetadata(
  locale: PensionSavingsTaxCreditLocale,
): Metadata {
  const ko = locale === "ko";
  const title = ko
    ? "연금저축 세액공제 계산기 | CalCome"
    : "South Korea Pension Savings Tax Credit Calculator | CalCome";
  const description = ko
    ? "연금저축과 퇴직연금 납입액, 소득 기준으로 소득세 연금계좌 세액공제 예상액을 계산합니다."
    : "Estimate the South Korean income-tax credit for pension savings and retirement-pension contributions using the statutory income thresholds and contribution limits.";
  const path = `/${locale}/finance/pension-savings-tax-credit`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/pension-savings-tax-credit",
        en: "/en/finance/pension-savings-tax-credit",
        "x-default": "/ko/finance/pension-savings-tax-credit",
      },
    },
  };
}
