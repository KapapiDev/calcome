import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";

import { englishDirectoryStructuredData } from "./calculators/page";
import { englishWebsiteStructuredData } from "./page";

describe("localized English hub structured data", () => {
  it("keeps the English home on the shared canonical WebSite entity", () => {
    expect(englishWebsiteStructuredData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.calcome.com/#website",
      name: "CalCome",
      url: "https://www.calcome.com/",
    });
  });

  it("publishes every calculator exactly once on the English directory canonical", () => {
    expect(englishDirectoryStructuredData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.calcome.com/en/calculators#webpage",
      inLanguage: "en-US",
      url: "https://www.calcome.com/en/calculators",
    });

    const itemList = englishDirectoryStructuredData.mainEntity;
    expect(itemList["@type"]).toBe("ItemList");
    expect(itemList.numberOfItems).toBe(allPublishedCalculators.length);
    expect(itemList.numberOfItems).toBe(100);
    expect(itemList.itemListElement).toHaveLength(
      allPublishedCalculators.length,
    );
    expect(itemList.itemListElement.map((item) => item.position)).toEqual(
      Array.from(
        { length: allPublishedCalculators.length },
        (_, index) => index + 1,
      ),
    );

    const urls = itemList.itemListElement.map((item) => item.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(
      urls.every((url) => url.startsWith("https://www.calcome.com/en/")),
    ).toBe(true);
    expect(JSON.stringify(englishDirectoryStructuredData)).not.toMatch(
      /localhost|127\.0\.0\.1|vercel\.app|preview/i,
    );
  });
});
