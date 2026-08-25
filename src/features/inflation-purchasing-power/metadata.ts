import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  inflationPurchasingPowerContent,
  type InflationPurchasingPowerLocale,
} from "./content";

export function createInflationPurchasingPowerMetadata(
  locale: InflationPurchasingPowerLocale,
): Metadata {
  const copy = inflationPurchasingPowerContent[locale];
  const path = `/${locale}/finance/inflation-purchasing-power`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/inflation-purchasing-power"),
        en: absoluteUrl("/en/finance/inflation-purchasing-power"),
        "x-default": absoluteUrl("/ko/finance/inflation-purchasing-power"),
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
