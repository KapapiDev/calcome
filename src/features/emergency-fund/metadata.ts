import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { emergencyFundContent, type EmergencyFundLocale } from "./content";

export function createEmergencyFundMetadata(
  locale: EmergencyFundLocale,
): Metadata {
  const copy = emergencyFundContent[locale];
  const path = `/${locale}/finance/emergency-fund`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/emergency-fund",
        en: "/en/finance/emergency-fund",
        "x-default": "/ko/finance/emergency-fund",
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
