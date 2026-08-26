import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  maternityLeaveBenefitContent,
  type MaternityLeaveBenefitLocale,
} from "./content";

export function createMaternityLeaveBenefitMetadata(
  locale: MaternityLeaveBenefitLocale,
): Metadata {
  const copy = maternityLeaveBenefitContent[locale];
  const path = `/${locale}/employment/maternity-leave-benefit`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/employment/maternity-leave-benefit"),
        en: absoluteUrl("/en/employment/maternity-leave-benefit"),
        "x-default": absoluteUrl("/ko/employment/maternity-leave-benefit"),
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
