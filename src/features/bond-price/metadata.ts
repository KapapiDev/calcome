import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { bondPriceContent, type BondPriceLocale } from "./content";

export function createBondPriceMetadata(locale: BondPriceLocale): Metadata {
  const copy = bondPriceContent[locale];
  const path = `/${locale}/finance/bond-price`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/bond-price",
        en: "/en/finance/bond-price",
        "x-default": "/ko/finance/bond-price",
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
