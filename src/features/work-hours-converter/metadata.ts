import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  workHoursConverterContent,
  type WorkHoursConverterLocale,
} from "./content";

export function createWorkHoursConverterMetadata(
  locale: WorkHoursConverterLocale,
): Metadata {
  const copy = workHoursConverterContent[locale];
  const path = `/${locale}/employment/work-hours-converter`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/employment/work-hours-converter"),
        en: absoluteUrl("/en/employment/work-hours-converter"),
        "x-default": absoluteUrl("/ko/employment/work-hours-converter"),
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
