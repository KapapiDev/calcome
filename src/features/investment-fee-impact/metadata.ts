import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  investmentFeeImpactContent,
  type InvestmentFeeImpactLocale,
} from "./content";

export function createInvestmentFeeImpactMetadata(
  locale: InvestmentFeeImpactLocale,
): Metadata {
  const copy = investmentFeeImpactContent[locale];
  const path = `/${locale}/finance/investment-fee-impact`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/investment-fee-impact",
        en: "/en/finance/investment-fee-impact",
        "x-default": "/ko/finance/investment-fee-impact",
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
