import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  apartmentManagementFeeBudgetContent,
  type ApartmentManagementFeeBudgetLocale,
} from "./content";

export function createApartmentManagementFeeBudgetMetadata(
  locale: ApartmentManagementFeeBudgetLocale,
): Metadata {
  const copy = apartmentManagementFeeBudgetContent[locale];
  const path = `/${locale}/finance/apartment-management-fee-budget`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/apartment-management-fee-budget"),
        en: absoluteUrl("/en/finance/apartment-management-fee-budget"),
        "x-default": absoluteUrl("/ko/finance/apartment-management-fee-budget"),
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
