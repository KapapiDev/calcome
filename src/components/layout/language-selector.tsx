"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { CompoundLocale } from "@/features/compound-interest/i18n";
import { sharedLayoutCopy } from "./layout-i18n";
import { localizedDestination } from "./language-routing";

export function LanguageSelector({
  locale,
  pathname,
}: {
  locale: CompoundLocale;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const copy = sharedLayoutCopy[locale];
  const currentLabel = locale === "ko" ? "한국어" : "English";

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="relative"
    >
      <summary
        aria-label={copy.selectLanguage}
        className="flex min-h-10 cursor-pointer list-none items-center gap-1 rounded-lg px-2 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3"
      >
        {currentLabel}
        <ChevronDown className="size-4" aria-hidden="true" />
      </summary>
      <div className="absolute right-0 z-50 mt-2 min-w-32 rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg">
        {(["ko", "en"] as const).map((option) => (
          <Link
            key={option}
            href={localizedDestination(pathname, option)}
            hrefLang={option}
            aria-current={option === locale ? "page" : undefined}
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {option === "ko" ? "한국어" : "English"}
          </Link>
        ))}
      </div>
    </details>
  );
}
