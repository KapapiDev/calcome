import type { CompoundLocale } from "@/features/compound-interest/i18n";

import { sharedLayoutCopy } from "./layout-i18n";

export function SkipLink({ locale }: { locale: CompoundLocale }) {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 min-h-11 items-center rounded-md bg-background px-4 text-sm font-medium focus:fixed focus:left-4 focus:top-4 focus:inline-flex focus:not-sr-only focus:ring-2 focus:ring-ring"
    >
      {sharedLayoutCopy[locale].skipToContent}
    </a>
  );
}
