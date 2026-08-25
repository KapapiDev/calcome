import type { Metadata } from "next";

export type YearEndTaxRefundLocale = "ko" | "en";

export function createYearEndTaxRefundMetadata(
  locale: YearEndTaxRefundLocale,
): Metadata {
  const ko = locale === "ko";
  const title = ko
    ? "연말정산 환급액 계산기 | CalCome"
    : "South Korea Year-End Tax Settlement Refund Calculator | CalCome";
  const description = ko
    ? "결정세액과 기납부세액, 납부특례세액으로 연말정산 환급액 또는 추가 납부액을 계산합니다."
    : "Estimate a South Korean year-end tax settlement refund or additional payment from determined income tax, prepaid tax, and special-payment tax.";
  const path = `/${locale}/finance/year-end-tax-refund`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/year-end-tax-refund",
        en: "/en/finance/year-end-tax-refund",
        "x-default": "/ko/finance/year-end-tax-refund",
      },
    },
  };
}
