import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { stakingRewardContent, type StakingRewardLocale } from "./content";

export function createStakingRewardMetadata(
  locale: StakingRewardLocale,
): Metadata {
  const copy = stakingRewardContent[locale];
  const path = `/${locale}/finance/staking-reward`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/finance/staking-reward"),
        en: absoluteUrl("/en/finance/staking-reward"),
        "x-default": absoluteUrl("/ko/finance/staking-reward"),
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
