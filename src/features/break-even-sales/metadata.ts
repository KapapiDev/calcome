import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  breakEvenSalesContent,
  type BreakEvenSalesLocale,
} from "./content";

export function createBreakEvenSalesMetadata(
  locale: BreakEvenSalesLocale,
): Metadata {
  const copy = breakEvenSalesContent[locale];
  const path = `/${locale}/finance/break-even-sales`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/break-even-sales"),
        en: absoluteUrl("/en/finance/break-even-sales"),
        "x-default": absoluteUrl("/ko/finance/break-even-sales"),
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
