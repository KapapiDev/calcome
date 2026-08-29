import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";
import { allPublishedCalculators } from "@/config/calculator-directory";

const appRoot = join(process.cwd(), "src", "app");

function localizedRouteFile(pathname: string) {
  const withoutLocale = pathname.replace(/^\/(?:ko|en)/, "/");
  return join(appRoot, "[locale]", withoutLocale.slice(1), "page.tsx");
}

describe("public route status and soft-404 regression", () => {
  it("keeps every published calculator canonical backed by a real route module", () => {
    expect(allPublishedCalculators).toHaveLength(100);

    for (const calculator of allPublishedCalculators) {
      expect(calculator.href.startsWith("/ko/")).toBe(true);
      expect(existsSync(localizedRouteFile(calculator.href))).toBe(true);
      expect(
        existsSync(localizedRouteFile(calculator.href.replace(/^\/ko/, "/en"))),
      ).toBe(true);
    }
  });

  it("keeps representative indexable static and directory routes source-backed", () => {
    const routeFiles = [
      join(appRoot, "page.tsx"),
      join(appRoot, "calculators", "page.tsx"),
      join(appRoot, "[locale]", "page.tsx"),
      join(appRoot, "[locale]", "calculators", "page.tsx"),
      join(appRoot, "[locale]", "[info]", "page.tsx"),
      join(appRoot, "about", "page.tsx"),
      join(appRoot, "guides", "page.tsx"),
      join(appRoot, "privacy", "page.tsx"),
      join(appRoot, "terms", "page.tsx"),
      join(appRoot, "contact", "page.tsx"),
      join(appRoot, "not-found.tsx"),
    ];

    for (const routeFile of routeFiles) {
      expect(existsSync(routeFile)).toBe(true);
    }
  });

  it("redirects only noncanonical calculator aliases to source-backed canonical routes", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toBeDefined();
    if (!redirects) return;

    const localeRedirects = redirects.filter(({ has }) => !has?.length);
    const redirectBySource = new Map(
      localeRedirects.map(({ source, destination }) => [source, destination]),
    );

    expect(redirectBySource.get("/ko")).toBe("/");
    expect(redirectBySource.has("/en")).toBe(false);

    for (const calculator of allPublishedCalculators) {
      const source =
        calculator.id === "deposit"
          ? "/finance/deposit"
          : calculator.href.replace(/^\/ko/, "");
      const destination = redirectBySource.get(source);

      expect(destination).toBe(calculator.href);
      expect(destination && existsSync(localizedRouteFile(destination))).toBe(
        true,
      );
    }
  });
});
