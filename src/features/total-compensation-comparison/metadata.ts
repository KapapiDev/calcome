import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  totalCompensationComparisonContent,
  type TotalCompensationComparisonLocale,
} from "./content";

export function createTotalCompensationComparisonMetadata(
  locale: TotalCompensationComparisonLocale,
): Metadata {
  const copy = totalCompensationComparisonContent[locale];
  const path = `/${locale}/employment/total-compensation-comparison`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/employment/total-compensation-comparison"),
        en: absoluteUrl("/en/employment/total-compensation-comparison"),
        "x-default": absoluteUrl("/ko/employment/total-compensation-comparison"),
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
