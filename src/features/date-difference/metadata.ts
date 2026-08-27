import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  dateDifferenceContent,
  type DateDifferenceLocale,
} from "./content";

export function createDateDifferenceMetadata(
  locale: DateDifferenceLocale,
): Metadata {
  const copy = dateDifferenceContent[locale];
  const path = `/${locale}/finance/date-difference`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/date-difference"),
        en: absoluteUrl("/en/finance/date-difference"),
        "x-default": absoluteUrl("/ko/finance/date-difference"),
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
