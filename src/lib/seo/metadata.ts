export type SeoLocale = "ko" | "en";

const localePrefixPattern = /^\/(?:ko|en)(?=\/|$)/;

function normalizePathname(pathname: string) {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutTrailingSlash =
    withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;

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
    ? { locale: "en_US", alternateLocale: "ko_KR" }
    : { locale: "ko_KR", alternateLocale: "en_US" };
}
