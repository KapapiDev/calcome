import { notFound } from "next/navigation";

import { SiteChrome } from "@/components/layout/site-chrome";
import { isSiteLocale } from "@/lib/i18n/locale";

/**
 * Declaring the locale params once here lets every page in this subtree be
 * statically generated, including the ones that do not declare
 * generateStaticParams() themselves.
 */
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

// Only "ko" and "en" exist; anything else 404s without a runtime function.
export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSiteLocale(locale)) notFound();

  return <SiteChrome locale={locale}>{children}</SiteChrome>;
}
