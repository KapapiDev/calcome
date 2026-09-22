export type SiteLocale = "ko" | "en";

export function localeFromPathname(pathname: string): SiteLocale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";
}

export function isSiteLocale(value: string): value is SiteLocale {
  return value === "ko" || value === "en";
}
