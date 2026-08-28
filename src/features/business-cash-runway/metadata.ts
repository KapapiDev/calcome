import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  businessCashRunwayContent,
  type BusinessCashRunwayLocale,
} from "./content";

export function createBusinessCashRunwayMetadata(
  locale: BusinessCashRunwayLocale,
): Metadata {
  const copy = businessCashRunwayContent[locale];
  const path = `/${locale}/finance/business-cash-runway`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/business-cash-runway"),
        en: absoluteUrl("/en/finance/business-cash-runway"),
        "x-default": absoluteUrl("/ko/finance/business-cash-runway"),
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
