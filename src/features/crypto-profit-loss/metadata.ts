import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  cryptoProfitLossContent,
  type CryptoProfitLossLocale,
} from "./content";

export function createCryptoProfitLossMetadata(
  locale: CryptoProfitLossLocale,
): Metadata {
  const copy = cryptoProfitLossContent[locale];
  const path = `/${locale}/finance/crypto-profit-loss`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/crypto-profit-loss"),
        en: absoluteUrl("/en/finance/crypto-profit-loss"),
        "x-default": absoluteUrl("/ko/finance/crypto-profit-loss"),
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
