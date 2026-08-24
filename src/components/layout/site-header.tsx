import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { siteConfig } from "@/config/site";
import type { CompoundLocale } from "@/features/compound-interest/i18n";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSelector } from "./language-selector";
import { localizedDestination } from "./language-routing";
import { sharedLayoutCopy } from "./layout-i18n";

export function SiteHeader({
  locale = "ko",
  pathname = "/",
}: {
  locale?: CompoundLocale;
  pathname?: string;
}) {
  const copy = sharedLayoutCopy[locale];
  return (
    <header className="border-b bg-background/95">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-4 px-5 sm:gap-8 sm:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={localizedDestination("/", locale)}
            className="inline-flex min-h-11 items-center rounded-sm text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {siteConfig.name}
            <span className="text-primary">•</span>
          </Link>
          <span className="hidden text-xs font-semibold text-primary sm:inline">
            {copy.slogan}
          </span>
        </div>
        <nav
          aria-label={copy.primaryNavigation}
          className="flex flex-1 items-center justify-between"
        >
          <div className="flex items-center text-sm font-medium">
            <Link
              href={localizedDestination("/calculators", locale)}
              className="flex min-h-11 items-center gap-1 rounded-md px-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copy.calculators}{" "}
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <LanguageSelector locale={locale} pathname={pathname} />
            <ThemeToggle locale={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}
