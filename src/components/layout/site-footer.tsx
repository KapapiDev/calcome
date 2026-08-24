import Link from "next/link";

import { siteConfig } from "@/config/site";
import type { CompoundLocale } from "@/features/compound-interest/i18n";
import { localizedDestination } from "./language-routing";
import { sharedLayoutCopy } from "./layout-i18n";

const footerLinkClass =
  "inline-flex min-h-11 items-center rounded-md hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SiteFooter({ locale = "ko" }: { locale?: CompoundLocale }) {
  const copy = sharedLayoutCopy[locale];
  const href = (pathname: string) => localizedDestination(pathname, locale);

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav aria-label={copy.footerNavigation}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href={href("/calculators")} className={footerLinkClass}>
                {copy.calculators}
              </Link>
            </li>
            <li>
              <Link href={href("/about")} className={footerLinkClass}>
                {copy.about}
              </Link>
            </li>
            <li>
              <Link href={href("/privacy")} className={footerLinkClass}>
                {copy.privacy}
              </Link>
            </li>
            <li>
              <Link href={href("/terms")} className={footerLinkClass}>
                {copy.terms}
              </Link>
            </li>
            <li>
              <Link href={href("/contact")} className={footerLinkClass}>
                {copy.contact}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
