import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  portfolioRebalancingContent,
  type PortfolioRebalancingLocale,
} from "./content";

export function createPortfolioRebalancingMetadata(
  locale: PortfolioRebalancingLocale,
): Metadata {
  const copy = portfolioRebalancingContent[locale];
  const path = `/${locale}/finance/portfolio-rebalancing`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/portfolio-rebalancing",
        en: "/en/finance/portfolio-rebalancing",
        "x-default": "/ko/finance/portfolio-rebalancing",
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
