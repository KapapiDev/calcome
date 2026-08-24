import type { CompoundLocale } from "@/features/compound-interest/i18n";

const localeAwareGlobalPaths = new Set([
  "/",
  "/calculators",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
]);

function shouldPreserveLocale(pathname: string) {
  return (
    localeAwareGlobalPaths.has(pathname) ||
    /^\/(?:finance|employment)(?:\/|$)/.test(pathname)
  );
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
    const pathWithoutLocale = localizedMatch[1] ?? "/";

    return shouldPreserveLocale(pathWithoutLocale)
      ? `/${locale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
      : pathWithoutLocale;
  }

  return shouldPreserveLocale(normalizedPathname)
    ? `/${locale}${normalizedPathname === "/" ? "" : normalizedPathname}`
    : normalizedPathname;
}
