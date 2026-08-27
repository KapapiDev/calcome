import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  dividendReinvestmentContent,
  type DividendReinvestmentLocale,
} from "./content";

export function createDividendReinvestmentMetadata(
  locale: DividendReinvestmentLocale,
): Metadata {
  const copy = dividendReinvestmentContent[locale];
  const path = `/${locale}/finance/dividend-reinvestment`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/dividend-reinvestment",
        en: "/en/finance/dividend-reinvestment",
        "x-default": "/ko/finance/dividend-reinvestment",
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
