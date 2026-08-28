import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { operatingProfitContent, type OperatingProfitLocale } from "./content";

export function createOperatingProfitMetadata(
  locale: OperatingProfitLocale,
): Metadata {
  const copy = operatingProfitContent[locale];
  const path = `/${locale}/finance/operating-profit`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/operating-profit"),
        en: absoluteUrl("/en/finance/operating-profit"),
        "x-default": absoluteUrl("/ko/finance/operating-profit"),
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
