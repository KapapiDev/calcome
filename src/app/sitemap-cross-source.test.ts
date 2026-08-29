import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";
import { allPublishedCalculators } from "@/config/calculator-directory";

import sitemap from "./sitemap";

describe("sitemap and redirect cross-source regression", () => {
  it("never redirects a localized canonical URL emitted by the sitemap", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toBeDefined();
    if (!redirects) return;

    const localeRedirects = redirects.filter(({ has }) => !has?.length);
    const redirectBySource = new Map(
      localeRedirects.map(({ source, destination }) => [source, destination]),
    );

    for (const { url } of sitemap()) {
      expect(redirectBySource.has(new URL(url).pathname)).toBe(false);
    }

    expect(redirectBySource.has("/en")).toBe(false);
  });

  it("keeps locale-less calculator redirects aligned with the public registry", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toBeDefined();
    if (!redirects) return;

    const localeRedirects = redirects.filter(({ has }) => !has?.length);
    const redirectBySource = new Map(
      localeRedirects.map(({ source, destination }) => [source, destination]),
    );

    expect(redirectBySource.get("/ko")).toBe("/");
    expect(localeRedirects).toHaveLength(allPublishedCalculators.length + 1);

    for (const calculator of allPublishedCalculators) {
      const source =
        calculator.id === "deposit"
          ? "/finance/deposit"
          : calculator.href.replace(/^\/ko/, "");

      expect(redirectBySource.get(source)).toBe(calculator.href);
    }
  });
});
