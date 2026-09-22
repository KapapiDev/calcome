import { RelatedCalculators } from "@/components/calculators/related-calculators";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import type { SiteLocale } from "@/lib/i18n/locale";

/**
 * Server-rendered site chrome.
 *
 * Locale arrives as a prop from the route segment ([locale] params, or a
 * literal "ko" for the Korean root routes) instead of a request header, which
 * is what keeps the whole tree statically prerenderable. The `lang` attribute
 * here scopes the real content language in the raw HTML even though the
 * document element defaults to "ko".
 */
export function SiteChrome({
  locale,
  children,
}: {
  locale: SiteLocale;
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipLink locale={locale} />
      <div className="flex min-h-screen flex-col" lang={locale}>
        <SiteHeader locale={locale} />
        {children}
        <RelatedCalculators locale={locale} />
        <SiteFooter locale={locale} />
      </div>
    </>
  );
}
