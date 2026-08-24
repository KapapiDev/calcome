import type { CompoundLocale } from "@/features/compound-interest/i18n";

const localeAwareGlobalPaths = new Set([
  "/",
  "/calculators",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
]);

function localizedPath(pathname: string, locale: CompoundLocale) {
  if (localeAwareGlobalPaths.has(pathname)) {
    if (locale === "ko") return pathname;
    return `/en${pathname === "/" ? "" : pathname}`;
  }

  return /^\/(?:finance|employment)(?:\/|$)/.test(pathname)
    ? `/${locale}${pathname}`
    : pathname;
}

export function localizedDestination(
  pathname: string,
  locale: CompoundLocale,
): string {
  const normalizedPathname = pathname.startsWith("/")
    ? pathname
    : `/${pathname}`;
  const localizedMatch = normalizedPathname.match(/^\/(?:ko|en)(\/.*)?$/);

  if (localizedMatch) {
    return localizedPath(localizedMatch[1] ?? "/", locale);
  }

  return localizedPath(normalizedPathname, locale);
}
