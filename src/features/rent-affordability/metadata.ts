import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  rentAffordabilityContent,
  type RentAffordabilityLocale,
} from "./content";

export function createRentAffordabilityMetadata(
  locale: RentAffordabilityLocale,
): Metadata {
  const copy = rentAffordabilityContent[locale];
  const path = `/${locale}/finance/rent-affordability`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/rent-affordability"),
        en: absoluteUrl("/en/finance/rent-affordability"),
        "x-default": absoluteUrl("/ko/finance/rent-affordability"),
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
