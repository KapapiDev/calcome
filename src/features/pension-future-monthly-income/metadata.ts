import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  pensionFutureMonthlyIncomeContent,
  type PensionFutureMonthlyIncomeLocale,
} from "./content";

export function createPensionFutureMonthlyIncomeMetadata(
  locale: PensionFutureMonthlyIncomeLocale,
): Metadata {
  const copy = pensionFutureMonthlyIncomeContent[locale];
  const path = `/${locale}/finance/pension-future-monthly-income`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/pension-future-monthly-income",
        en: "/en/finance/pension-future-monthly-income",
        "x-default": "/ko/finance/pension-future-monthly-income",
      },
    },
    openGraph: {
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
      type: "website",
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
    },
  };
}
