import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  partTimeMonthlyPayContent,
  type PartTimeMonthlyPayLocale,
} from "./content";

export function createPartTimeMonthlyPayMetadata(
  locale: PartTimeMonthlyPayLocale,
): Metadata {
  const copy = partTimeMonthlyPayContent[locale];
  const path = `/${locale}/employment/part-time-monthly-pay`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/employment/part-time-monthly-pay"),
        en: absoluteUrl("/en/employment/part-time-monthly-pay"),
        "x-default": absoluteUrl("/ko/employment/part-time-monthly-pay"),
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
