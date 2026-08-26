import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  parentalLeaveBenefitContent,
  type ParentalLeaveBenefitLocale,
} from "./content";

export function createParentalLeaveBenefitMetadata(
  locale: ParentalLeaveBenefitLocale,
): Metadata {
  const copy = parentalLeaveBenefitContent[locale];
  const path = `/${locale}/employment/parental-leave-benefit`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/employment/parental-leave-benefit"),
        en: absoluteUrl("/en/employment/parental-leave-benefit"),
        "x-default": absoluteUrl("/ko/employment/parental-leave-benefit"),
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
