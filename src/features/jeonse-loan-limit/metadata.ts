import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  jeonseLoanLimitContent,
  type JeonseLoanLimitLocale,
} from "./content";

export function createJeonseLoanLimitMetadata(
  locale: JeonseLoanLimitLocale,
): Metadata {
  const copy = jeonseLoanLimitContent[locale];
  const path = `/${locale}/finance/jeonse-loan-limit`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/jeonse-loan-limit",
        en: "/en/finance/jeonse-loan-limit",
        "x-default": "/ko/finance/jeonse-loan-limit",
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
  };
}
