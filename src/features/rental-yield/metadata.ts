import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { rentalYieldContent, type RentalYieldLocale } from "./content";

export function createRentalYieldMetadata(locale: RentalYieldLocale): Metadata {
  const copy = rentalYieldContent[locale];
  const path = `/${locale}/finance/rental-yield`;
  const alternateLocale = locale === "ko" ? "en" : "ko";
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/rental-yield"),
        en: absoluteUrl("/en/finance/rental-yield"),
        "x-default": absoluteUrl("/ko/finance/rental-yield"),
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
