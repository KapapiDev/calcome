import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  employerTotalLaborCostContent,
  type EmployerTotalLaborCostLocale,
} from "./content";

export function createEmployerTotalLaborCostMetadata(
  locale: EmployerTotalLaborCostLocale,
): Metadata {
  const copy = employerTotalLaborCostContent[locale];
  const path = `/${locale}/employment/employer-total-labor-cost`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/employment/employer-total-labor-cost"),
        en: absoluteUrl("/en/employment/employer-total-labor-cost"),
        "x-default": absoluteUrl(
          "/ko/employment/employer-total-labor-cost",
        ),
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
