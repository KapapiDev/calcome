import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  mortgageLoanLimitContent,
  type MortgageLoanLimitLocale,
} from "./content";

export function createMortgageLoanLimitMetadata(
  locale: MortgageLoanLimitLocale,
): Metadata {
  const copy = mortgageLoanLimitContent[locale];
  const path = `/${locale}/finance/mortgage-loan-limit`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/mortgage-loan-limit",
        en: "/en/finance/mortgage-loan-limit",
        "x-default": "/ko/finance/mortgage-loan-limit",
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
