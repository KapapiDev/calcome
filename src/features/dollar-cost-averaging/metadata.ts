import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { dollarCostAveragingContent } from "./content";
import type { DollarCostAveragingLocale } from "./validation";

export function createDollarCostAveragingMetadata(
  locale: DollarCostAveragingLocale,
): Metadata {
  const copy = dollarCostAveragingContent[locale];
  const path = `/${locale}/finance/dollar-cost-averaging`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/dollar-cost-averaging",
        en: "/en/finance/dollar-cost-averaging",
        "x-default": "/ko/finance/dollar-cost-averaging",
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
