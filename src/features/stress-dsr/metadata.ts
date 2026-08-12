import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { stressDsrContent, type StressDsrLocale } from "./content";

export function createStressDsrMetadata(locale: StressDsrLocale): Metadata {
  const copy = stressDsrContent[locale];
  const path = `/${locale}/finance/stress-dsr`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/stress-dsr",
        en: "/en/finance/stress-dsr",
        "x-default": "/ko/finance/stress-dsr",
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
  };
}
