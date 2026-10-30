import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { currencyConversionContent } from "./content";

export type CurrencyConversionLocale = "ko" | "en";

export function createCurrencyConversionMetadata(
  locale: CurrencyConversionLocale,
): Metadata {
  const { metaTitle: title, description } = currencyConversionContent[locale];
  const path = `/${locale}/finance/currency-conversion`;

  return {
    title,
    description,
    openGraph: {
      title: title + " | " + siteConfig.name,
      description,
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title + " | " + siteConfig.name,
      description,
    },
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/currency-conversion",
        en: "/en/finance/currency-conversion",
        "x-default": "/ko/finance/currency-conversion",
      },
    },
  };
}
