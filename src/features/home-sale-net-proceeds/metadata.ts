import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  homeSaleNetProceedsContent,
  type HomeSaleNetProceedsLocale,
} from "./content";

export function createHomeSaleNetProceedsMetadata(
  locale: HomeSaleNetProceedsLocale,
): Metadata {
  const copy = homeSaleNetProceedsContent[locale];
  const path = `/${locale}/finance/home-sale-net-proceeds`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/home-sale-net-proceeds"),
        en: absoluteUrl("/en/finance/home-sale-net-proceeds"),
        "x-default": absoluteUrl("/ko/finance/home-sale-net-proceeds"),
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
