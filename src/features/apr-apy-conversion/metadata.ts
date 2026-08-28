import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { aprApyContent, type AprApyLocale } from "./content";

export function createAprApyMetadata(locale: AprApyLocale): Metadata {
  const copy = aprApyContent[locale];
  const path = `/${locale}/finance/apr-apy-conversion`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/apr-apy-conversion",
        en: "/en/finance/apr-apy-conversion",
        "x-default": "/ko/finance/apr-apy-conversion",
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
