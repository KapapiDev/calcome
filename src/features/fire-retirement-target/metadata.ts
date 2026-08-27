import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  fireRetirementTargetContent,
  type FireRetirementTargetLocale,
} from "./content";

export function createFireRetirementTargetMetadata(
  locale: FireRetirementTargetLocale,
): Metadata {
  const copy = fireRetirementTargetContent[locale];
  const path = `/${locale}/finance/fire-retirement-target`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/fire-retirement-target",
        en: "/en/finance/fire-retirement-target",
        "x-default": "/ko/finance/fire-retirement-target",
      },
    },
    openGraph: {
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
      type: "website",
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
    },
  };
}
