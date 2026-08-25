import type { Metadata } from "next";

export type RetirementPensionTaxCreditLocale = "ko" | "en";

export function createRetirementPensionTaxCreditMetadata(
  locale: RetirementPensionTaxCreditLocale,
): Metadata {
  const ko = locale === "ko";
  const title = ko
    ? "퇴직연금·IRP 세액공제 계산기 | CalCome"
    : "South Korea Retirement Pension & IRP Tax Credit Calculator | CalCome";
  const description = ko
    ? "연금저축 납입액을 반영해 퇴직연금·IRP의 남은 세액공제 한도와 추가 납입 시 공제 효과를 계산합니다."
    : "Estimate remaining South Korean retirement-pension or IRP tax-credit room after pension-savings contributions and the extra credit available by filling the limit.";
  const path = `/${locale}/finance/retirement-pension-tax-credit`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/retirement-pension-tax-credit",
        en: "/en/finance/retirement-pension-tax-credit",
        "x-default": "/ko/finance/retirement-pension-tax-credit",
      },
    },
  };
}
