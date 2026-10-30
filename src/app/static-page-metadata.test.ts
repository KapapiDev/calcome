import type { Metadata } from "next";
import { describe, expect, it } from "vitest";

import { metadata as home } from "./page";
import { metadata as calculators } from "./calculators/page";
import { metadata as about } from "./about/page";
import { metadata as guides } from "./guides/page";
import { metadata as privacy } from "./privacy/page";
import { metadata as terms } from "./terms/page";
import { metadata as contact } from "./contact/page";
import { generateMetadata as localizedDirectory } from "./[locale]/calculators/page";
import { staticSitemapEntries } from "./sitemap";

describe("canonical static page language discovery", () => {
  it("matches all seven Korean page alternates to the bilingual sitemap", () => {
    const pages: Metadata[] = [
      home,
      calculators,
      about,
      guides,
      privacy,
      terms,
      contact,
    ];
    const sitemap = staticSitemapEntries();

    for (const page of pages) {
      const alternates = page.alternates!;
      const url = new URL(
        String(alternates.canonical),
        "https://www.calcome.com",
      ).href;
      const entry = sitemap.find((item) => item.url === url)!;
      expect(entry).toBeDefined();
      for (const language of ["ko", "en", "x-default"] as const) {
        expect(alternates.languages?.[language]).toBeDefined();
        expect(
          new URL(String(alternates.languages?.[language]), url).href,
        ).toBe(entry.alternates?.languages?.[language]);
      }
    }
  });

  it("keeps the Korean directory alias on the same canonical language pair", async () => {
    const alias = await localizedDirectory({
      params: Promise.resolve({ locale: "ko" }),
    });
    const english = await localizedDirectory({
      params: Promise.resolve({ locale: "en" }),
    });
    expect(alias.alternates).toEqual(calculators.alternates);
    expect(english.alternates?.languages).toEqual(
      calculators.alternates?.languages,
    );
  });
});
