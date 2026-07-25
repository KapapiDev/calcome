import type { CompoundLocale } from "@/features/compound-interest/i18n";

export function localizedDestination(
  pathname: string,
  locale: CompoundLocale,
): string {
  const normalizedPathname = pathname.startsWith("/")
    ? pathname
    : `/${pathname}`;
  const localizedPathname = normalizedPathname.replace(
    /^\/(?:ko|en)(?=\/|$)/,
    `/${locale}`,
  );

  if (localizedPathname !== normalizedPathname) {
    return localizedPathname;
  }

  return `/${locale}${normalizedPathname === "/" ? "" : normalizedPathname}`;
}
