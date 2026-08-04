"use client";

import { Moon, Sun } from "lucide-react";

import { setTheme, useTheme } from "./theme-provider";
import type { CompoundLocale } from "@/features/compound-interest/i18n";
import { sharedLayoutCopy } from "@/components/layout/layout-i18n";

export function ThemeToggle({ locale = "ko" }: { locale?: CompoundLocale }) {
  const copy = sharedLayoutCopy[locale];
  const theme = useTheme();
  const targetTheme = theme === "dark" ? "light" : "dark";
  const label = targetTheme === "dark" ? copy.switchDark : copy.switchLight;

  return (
    <button
      type="button"
      aria-label={theme ? label : copy.toggleTheme}
      disabled={!theme}
      onClick={() => setTheme(targetTheme)}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-70"
    >
      {theme === "dark" ? (
        <Sun className="size-5" aria-hidden="true" data-testid="theme-sun" />
      ) : theme === "light" ? (
        <Moon className="size-5" aria-hidden="true" data-testid="theme-moon" />
      ) : (
        <span className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
