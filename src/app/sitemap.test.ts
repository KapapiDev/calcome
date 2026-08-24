import { resolveSitemap } from "next/dist/build/webpack/loaders/metadata/resolve-route-data";
import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";

import sitemap, {
  calculatorSitemapEntries,
  staticSitemapEntries,
} from "./sitemap";

describe("XML sitemap", () => {
  it("serializes canonical public routes as a standards-compliant urlset", () => {
    const entries = sitemap();
    const xml = resolveSitemap(entries);
    const document = new DOMParser().parseFromString(xml, "application/xml");
    const urls = entries.map(({ url }) => url);
    const locations = Array.from(
      document.getElementsByTagName("loc"),
      (node) => node.textContent,
    );

    expect(document.querySelector("parsererror")).toBeNull();
    expect(document.documentElement.localName).toBe("urlset");
    expect(locations).toEqual(urls);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain("https://www.calcome.com/");
    expect(urls).toContain("https://www.calcome.com/en");
    expect(urls).toContain("https://www.calcome.com/calculators");
    expect(urls).toContain("https://www.calcome.com/en/calculators");
    expect(urls).toContain("https://www.calcome.com/contact");
    expect(urls).toContain("https://www.calcome.com/en/contact");
    expect(urls).not.toContain("https://www.calcome.com/ko");

    for (const url of urls) {
      expect(new URL(url).origin).toBe("https://www.calcome.com");
      expect(url).not.toMatch(/localhost|\.vercel\.app/i);
    }

    expect(xml).not.toContain("<changefreq>");
    expect(xml).not.toContain("<priority>");
    expect(xml).not.toMatch(/\nmonthly\n|\n0\.9\n/);
  });

  it("emits reciprocal locale alternates for every static canonical page", () => {
    const entries = staticSitemapEntries();
    const expectedPairs = [
      ["https://www.calcome.com/", "https://www.calcome.com/en"],
      [
        "https://www.calcome.com/calculators",
        "https://www.calcome.com/en/calculators",
      ],
      ["https://www.calcome.com/about", "https://www.calcome.com/en/about"],
      [
        "https://www.calcome.com/privacy",
        "https://www.calcome.com/en/privacy",
      ],
      ["https://www.calcome.com/terms", "https://www.calcome.com/en/terms"],
      [
        "https://www.calcome.com/contact",
        "https://www.calcome.com/en/contact",
      ],
    ];

    expect(entries).toHaveLength(expectedPairs.length * 2);

    for (const [ko, en] of expectedPairs) {
      for (const url of [ko, en]) {
        expect(entries).toContainEqual({
          url,
          alternates: {
            languages: { ko, en, "x-default": ko },
          },
        });
      }
    }
  });

  it("includes both localized routes for every published calculator", () => {
    const urls = sitemap().map(({ url }) => url);

    for (const calculator of allPublishedCalculators) {
      expect(urls).toContain(`https://www.calcome.com${calculator.href}`);
      expect(urls).toContain(
        `https://www.calcome.com${calculator.href.replace(/^\/ko\//, "/en/")}`,
      );
    }

    expect(urls).toContain("https://www.calcome.com/ko/finance/dividend-yield");
  });

  it("emits reciprocal locale alternates with Korean as x-default", () => {
    const [korean, english] = calculatorSitemapEntries([
      { href: "/ko/finance/example" },
    ]);
    const expectedLanguages = {
      ko: "https://www.calcome.com/ko/finance/example",
      en: "https://www.calcome.com/en/finance/example",
      "x-default": "https://www.calcome.com/ko/finance/example",
    };

    expect(korean.alternates?.languages).toEqual(expectedLanguages);
    expect(english.alternates?.languages).toEqual(expectedLanguages);
  });

  it("automatically includes a newly registered public calculator route", () => {
    expect(
      calculatorSitemapEntries([{ href: "/ko/finance/example" }]).map(
        ({ url }) => url,
      ),
    ).toEqual([
      "https://www.calcome.com/ko/finance/example",
      "https://www.calcome.com/en/finance/example",
    ]);
  });
});
