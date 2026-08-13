import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { savingsGoalContent } from "./content";
import type { SavingsGoalLocale } from "./validation";

export function createSavingsGoalMetadata(locale: SavingsGoalLocale): Metadata {
  const copy = savingsGoalContent[locale];
  const path = `/${locale}/finance/savings-goal`;

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/savings-goal",
        en: "/en/finance/savings-goal",
        "x-default": "/ko/finance/savings-goal",
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
