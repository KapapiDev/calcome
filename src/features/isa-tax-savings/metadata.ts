import type { Metadata } from "next";

export type IsaTaxSavingsLocale = "ko" | "en";

export function createIsaTaxSavingsMetadata(
  locale: IsaTaxSavingsLocale,
): Metadata {
  const ko = locale === "ko";
  const title = ko
    ? "ISA 절세 계산기 | CalCome"
    : "South Korea ISA Tax Savings Calculator | CalCome";
  const description = ko
    ? "ISA 순이익과 가입 유형으로 비과세 한도, 분리과세액과 일반 금융소득 과세 대비 예상 절세액을 계산합니다."
    : "Estimate South Korean ISA tax, tax-free profit, and tax savings versus ordinary 15.4% financial-income withholding.";
  const path = `/${locale}/finance/isa-tax-savings`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/isa-tax-savings",
        en: "/en/finance/isa-tax-savings",
        "x-default": "/ko/finance/isa-tax-savings",
      },
    },
  };
}
