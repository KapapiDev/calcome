import type { CompoundLocale } from "@/features/compound-interest/i18n";

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

    return /^\/(?:finance|employment)(?:\/|$)/.test(pathWithoutLocale)
      ? `/${locale}${pathWithoutLocale}`
      : pathWithoutLocale;
  }

  return /^\/(?:finance|employment)(?:\/|$)/.test(normalizedPathname)
    ? `/${locale}${normalizedPathname}`
    : normalizedPathname;
}
