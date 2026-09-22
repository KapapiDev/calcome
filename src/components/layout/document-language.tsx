"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { localeFromPathname } from "@/lib/i18n/locale";

/**
 * Keeps <html lang> in sync on client-side navigation.
 *
 * The initial paint is handled by the synchronous script in the root layout
 * head, so this only covers subsequent soft navigations. Rendering nothing
 * keeps the root layout static-safe (no request-scoped data needed).
 */
export function DocumentLanguage() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = localeFromPathname(pathname ?? "/");
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [pathname]);

  return null;
}
