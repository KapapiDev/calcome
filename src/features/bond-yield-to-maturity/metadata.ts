import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { bondYieldContent, type BondYieldLocale } from "./content";

export function createBondYieldMetadata(locale: BondYieldLocale): Metadata {
  const copy = bondYieldContent[locale];
  const path = `/${locale}/finance/bond-yield-to-maturity`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/bond-yield-to-maturity",
        en: "/en/finance/bond-yield-to-maturity",
        "x-default": "/ko/finance/bond-yield-to-maturity",
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
