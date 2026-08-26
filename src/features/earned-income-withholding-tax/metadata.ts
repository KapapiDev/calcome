import type { Metadata } from "next";

export type EarnedIncomeWithholdingTaxLocale = "ko" | "en";

export function createEarnedIncomeWithholdingTaxMetadata(
  locale: EarnedIncomeWithholdingTaxLocale,
): Metadata {
  const ko = locale === "ko";
  const title = ko
    ? "근로소득 원천징수세액 계산기 | CalCome"
    : "South Korea Earned Income Withholding Tax Calculator | CalCome";
  const description = ko
    ? "월 과세급여, 공제대상 가족 수, 8~20세 자녀 수와 80·100·120% 선택으로 월 근로소득 원천징수세액을 계산합니다."
    : "Estimate monthly South Korean earned-income withholding from taxable salary, qualifying dependents, eligible children, and the 80/100/120% election.";
  const path = `/${locale}/finance/earned-income-withholding-tax`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/earned-income-withholding-tax",
        en: "/en/finance/earned-income-withholding-tax",
        "x-default": "/ko/finance/earned-income-withholding-tax",
      },
    },
  };
}
