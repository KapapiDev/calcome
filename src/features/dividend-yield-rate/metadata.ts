import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { dividendYieldRateContent } from "./content";
import type { DividendYieldRateLocale } from "./validation";

export function createDividendYieldRateMetadata(
  locale: DividendYieldRateLocale,
): Metadata {
  const copy = dividendYieldRateContent[locale];
  const path = `/${locale}/finance/dividend-yield`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/dividend-yield",
        en: "/en/finance/dividend-yield",
        "x-default": "/ko/finance/dividend-yield",
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
