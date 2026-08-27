import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  retirementWithdrawalContent,
  type RetirementWithdrawalLocale,
} from "./content";

export function createRetirementWithdrawalMetadata(
  locale: RetirementWithdrawalLocale,
): Metadata {
  const copy = retirementWithdrawalContent[locale];
  const path = `/${locale}/finance/retirement-withdrawal`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/retirement-withdrawal",
        en: "/en/finance/retirement-withdrawal",
        "x-default": "/ko/finance/retirement-withdrawal",
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
