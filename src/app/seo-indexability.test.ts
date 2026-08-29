import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";
import { siteConfig } from "@/config/site";

import robots from "./robots";
import sitemap, {
  calculatorSitemapEntries,
  staticSitemapEntries,
} from "./sitemap";

function expectCanonicalProductionUrl(value: string) {
  const url = new URL(value);
  expect(url.origin).toBe("https://www.calcome.com");
  expect(url.search).toBe("");
  expect(url.hash).toBe("");
}

function asList(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

describe("technical SEO and indexability invariants", () => {
  it("keeps every published calculator in the bilingual sitemap exactly once", () => {
    const entries = calculatorSitemapEntries();
    const urls = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(allPublishedCalculators.length * 2);
    expect(new Set(urls).size).toBe(urls.length);

    for (const calculator of allPublishedCalculators) {
      const koUrl = new URL(calculator.href, siteConfig.url).toString();
      const enUrl = new URL(
        calculator.href.replace(/^\/ko\//, "/en/"),
        siteConfig.url,
      ).toString();

      expect(urls.filter((url) => url === koUrl)).toHaveLength(1);
      expect(urls.filter((url) => url === enUrl)).toHaveLength(1);
    }
  });

  it("keeps static and calculator sitemap entries canonical and reciprocal", () => {
    const entries = sitemap();
    const staticEntries = staticSitemapEntries();

    expect(staticEntries).toHaveLength(14);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(
      entries.length,
    );

    for (const entry of entries) {
      expectCanonicalProductionUrl(entry.url);

      const languages = entry.alternates?.languages;
      expect(languages).toBeDefined();
      expect(languages?.ko).toBeDefined();
      expect(languages?.en).toBeDefined();
      expect(languages?.["x-default"]).toBe(languages?.ko);
      expectCanonicalProductionUrl(String(languages?.ko));
      expectCanonicalProductionUrl(String(languages?.en));
    }
  });

  it("publishes crawlable robots metadata against the canonical production host", () => {
    const metadata = robots();

    expect(metadata.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(metadata.host).toBe("https://www.calcome.com");
    expect(metadata.sitemap).toBe("https://www.calcome.com/sitemap.xml");
  });

  it("never blocks a canonical sitemap URL with robots directives", () => {
    const metadata = robots();
    const rules = Array.isArray(metadata.rules)
      ? metadata.rules
      : [metadata.rules];

    for (const entry of sitemap()) {
      const pathname = new URL(entry.url).pathname;

      for (const rule of rules) {
        for (const disallow of asList(rule.disallow)) {
          expect(pathname.startsWith(disallow)).toBe(false);
        }
      }
    }
  });

  it("keeps public metadata indexable while technical error surfaces stay out of the sitemap", () => {
    const appRoot = join(process.cwd(), "src", "app");
    const layoutSource = readFileSync(join(appRoot, "layout.tsx"), "utf8");
    const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);

    expect(layoutSource).toContain("robots: {");
    expect(layoutSource).toContain("index: true");
    expect(layoutSource).toContain("follow: true");
    expect(existsSync(join(appRoot, "not-found.tsx"))).toBe(true);
    expect(existsSync(join(appRoot, "error.tsx"))).toBe(true);
    expect(sitemapPaths).not.toContain("/404");
    expect(sitemapPaths).not.toContain("/not-found");
    expect(sitemapPaths).not.toContain("/error");
  });
});
