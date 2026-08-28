import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  foreignCurrencyAverageCostContent,
  type ForeignCurrencyAverageCostLocale,
} from "./content";

export function createForeignCurrencyAverageCostMetadata(
  locale: ForeignCurrencyAverageCostLocale,
): Metadata {
  const copy = foreignCurrencyAverageCostContent[locale];
  const path = `/${locale}/finance/foreign-currency-average-cost`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/foreign-currency-average-cost"),
        en: absoluteUrl("/en/finance/foreign-currency-average-cost"),
        "x-default": absoluteUrl("/ko/finance/foreign-currency-average-cost"),
      },
    },
    openGraph: {
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: alternateLocale === "ko" ? "ko_KR" : "en_US",
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
    },
  };
}
