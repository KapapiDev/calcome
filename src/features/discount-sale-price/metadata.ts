import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  discountSalePriceContent,
  type DiscountSalePriceLocale,
} from "./content";

export function createDiscountSalePriceMetadata(
  locale: DiscountSalePriceLocale,
): Metadata {
  const copy = discountSalePriceContent[locale];
  const path = `/${locale}/finance/discount-sale-price`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/discount-sale-price"),
        en: absoluteUrl("/en/finance/discount-sale-price"),
        "x-default": absoluteUrl("/ko/finance/discount-sale-price"),
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
