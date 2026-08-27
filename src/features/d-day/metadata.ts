import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { dDayContent, type DDayLocale } from "./content";

export function createDDayMetadata(locale: DDayLocale): Metadata {
  const copy = dDayContent[locale];
  const path = `/${locale}/finance/d-day`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/d-day"),
        en: absoluteUrl("/en/finance/d-day"),
        "x-default": absoluteUrl("/ko/finance/d-day"),
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
