import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  homePurchaseTotalCostContent,
  type HomePurchaseTotalCostLocale,
} from "./content";

export function createHomePurchaseTotalCostMetadata(
  locale: HomePurchaseTotalCostLocale,
): Metadata {
  const copy = homePurchaseTotalCostContent[locale];
  const path = `/${locale}/finance/home-purchase-total-cost`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/home-purchase-total-cost"),
        en: absoluteUrl("/en/finance/home-purchase-total-cost"),
        "x-default": absoluteUrl("/ko/finance/home-purchase-total-cost"),
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
