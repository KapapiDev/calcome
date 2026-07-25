import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";

import CalculatorsPage, { metadata } from "./page";

describe("calculator directory", () => {
  it("defines unique metadata and a canonical URL", () => {
    expect(metadata.title).toBe("금융 계산기 모음");
    expect(metadata.alternates).toEqual({ canonical: "/calculators" });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/calculators",
      siteName: "CalCome",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("lists every published calculator exactly once", () => {
    const { container } = render(<CalculatorsPage />);
    const directory = screen.getByRole("list", { name: "공개 계산기" });

    expect(screen.getByRole("heading", { name: "모든 계산기" })).toBeVisible();
    expect(within(directory).getAllByRole("listitem")).toHaveLength(
      allPublishedCalculators.length,
    );

    const directoryHrefs = Array.from(directory.querySelectorAll("a")).map(
      (link) => link.getAttribute("href"),
    );
    expect(directoryHrefs).toEqual(
      allPublishedCalculators.map((calculator) => calculator.href),
    );

    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const structuredData = JSON.parse(jsonLd!.textContent!);

    expect(structuredData).toMatchObject({
      "@type": "CollectionPage",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: allPublishedCalculators.length,
      },
    });
    expect(structuredData.mainEntity.itemListElement).toEqual(
      allPublishedCalculators.map((calculator, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: calculator.name,
        url: `https://www.calcome.com${calculator.href}`,
      })),
    );
  });
});
