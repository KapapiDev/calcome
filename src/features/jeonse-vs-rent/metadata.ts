import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { jeonseVsRentContent, type JeonseVsRentLocale } from "./content";

export function createJeonseVsRentMetadata(locale: JeonseVsRentLocale): Metadata {
  const copy = jeonseVsRentContent[locale];
  const path = `/${locale}/finance/jeonse-vs-rent`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/jeonse-vs-rent"),
        en: absoluteUrl("/en/finance/jeonse-vs-rent"),
        "x-default": absoluteUrl("/ko/finance/jeonse-vs-rent"),
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
