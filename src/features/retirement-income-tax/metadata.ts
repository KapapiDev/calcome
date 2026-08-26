import type { Metadata } from "next";

export type RetirementIncomeTaxLocale = "ko" | "en";

export function createRetirementIncomeTaxMetadata(
  locale: RetirementIncomeTaxLocale,
): Metadata {
  const ko = locale === "ko";
  const title = ko
    ? "퇴직소득세 계산기 | CalCome"
    : "South Korea Retirement Income Tax Calculator | CalCome";
  const description = ko
    ? "퇴직급여, 비과세 퇴직급여와 근속연수로 퇴직소득세와 지방소득세를 계산합니다."
    : "Estimate South Korean retirement income tax and local income tax from retirement pay, non-taxable retirement pay, and years of service.";
  const path = `/${locale}/finance/retirement-income-tax`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/retirement-income-tax",
        en: "/en/finance/retirement-income-tax",
        "x-default": "/ko/finance/retirement-income-tax",
      },
    },
  };
}
