import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  cryptoAverageCostContent,
  type CryptoAverageCostLocale,
} from "./content";

export function createCryptoAverageCostMetadata(
  locale: CryptoAverageCostLocale,
): Metadata {
  const copy = cryptoAverageCostContent[locale];
  const path = `/${locale}/finance/crypto-average-cost`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/crypto-average-cost"),
        en: absoluteUrl("/en/finance/crypto-average-cost"),
        "x-default": absoluteUrl("/ko/finance/crypto-average-cost"),
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
