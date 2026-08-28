import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";

export type SeoLocale = "ko" | "en";

const localePrefixPattern = /^\/(?:ko|en)(?=\/|$)/;

function normalizePathname(pathname: string) {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutTrailingSlash =
    withLeadingSlash.length > 1
      ? withLeadingSlash.replace(/\/+$/, "")
      : withLeadingSlash;

  return withoutTrailingSlash || "/";
}

export function localizedSeoPaths(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);
  const locale: SeoLocale =
    normalizedPathname === "/en" || normalizedPathname.startsWith("/en/")
      ? "en"
      : "ko";
  const suffix = normalizedPathname.replace(localePrefixPattern, "");
  const localizedSuffix = suffix === "/" ? "" : suffix;
  const ko = `/ko${localizedSuffix}`;
  const en = `/en${localizedSuffix}`;

  return {
    locale,
    canonical: locale === "en" ? en : ko,
    languages: {
      "ko-KR": ko,
      "en-US": en,
      "x-default": ko,
    },
  } as const;
}

export function socialLocale(locale: SeoLocale) {
  return locale === "en"
    ? ({ locale: "en_US", alternateLocale: "ko_KR" } as const)
    : ({ locale: "ko_KR", alternateLocale: "en_US" } as const);
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;
  const socialImageAlt = "CalCome - 금융 계산을 쉽게.";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url: absoluteUrl(path),
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [
        {
          url: "/twitter-image",
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
  };
}
