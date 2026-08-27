import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { percentageContent, type PercentageLocale } from "./content";

export function createPercentageMetadata(locale: PercentageLocale): Metadata {
  const copy = percentageContent[locale];
  const path = `/${locale}/finance/percentage`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/percentage"),
        en: absoluteUrl("/en/finance/percentage"),
        "x-default": absoluteUrl("/ko/finance/percentage"),
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
