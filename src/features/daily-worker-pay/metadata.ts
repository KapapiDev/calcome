import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

export type DailyWorkerPayLocale = "ko" | "en";

const metadataCopy = {
  ko: {
    title: "일용직 급여 계산기 | 일당 세금·실수령액 계산",
    description:
      "일당과 근무일수, 일별 비과세 금액으로 일용근로자 소득세·지방소득세와 예상 실수령액을 계산합니다.",
  },
  en: {
    title: "South Korea Daily Worker Pay Calculator | KRW Withholding",
    description:
      "Estimate South Korean daily-worker income tax, local income tax, and net KRW pay from daily gross pay, workdays, and daily non-taxable pay.",
  },
} satisfies Record<DailyWorkerPayLocale, { title: string; description: string }>;

export function createDailyWorkerPayMetadata(
  locale: DailyWorkerPayLocale,
): Metadata {
  const copy = metadataCopy[locale];
  const path = `/${locale}/employment/daily-worker-pay`;
  const alternateLocale = locale === "ko" ? "en" : "ko";

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ko: absoluteUrl("/ko/employment/daily-worker-pay"),
        en: absoluteUrl("/en/employment/daily-worker-pay"),
        "x-default": absoluteUrl("/ko/employment/daily-worker-pay"),
      },
    },
    openGraph: {
      title: `${copy.title} | ${siteConfig.name}`,
      description: copy.description,
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: alternateLocale === "ko" ? "ko_KR" : "en_US",
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.title} | ${siteConfig.name}`,
      description: copy.description,
    },
  };
}
