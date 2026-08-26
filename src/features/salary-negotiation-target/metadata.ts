import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  salaryNegotiationTargetContent,
  type SalaryNegotiationTargetLocale,
} from "./content";

export function createSalaryNegotiationTargetMetadata(
  locale: SalaryNegotiationTargetLocale,
): Metadata {
  const copy = salaryNegotiationTargetContent[locale];
  const path = `/${locale}/employment/salary-negotiation-target`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/employment/salary-negotiation-target"),
        en: absoluteUrl("/en/employment/salary-negotiation-target"),
        "x-default": absoluteUrl("/ko/employment/salary-negotiation-target"),
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
