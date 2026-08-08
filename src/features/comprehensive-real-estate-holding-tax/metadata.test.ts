import { describe, expect, it } from "vitest";
import { createComprehensiveRealEstateHoldingTaxMetadata } from "./metadata";

describe("createComprehensiveRealEstateHoldingTaxMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createComprehensiveRealEstateHoldingTaxMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Comprehensive Real Estate Holding Tax Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korea");
    expect(metadata.description).toContain("KRW");
  });

  it("uses canonical localized production URLs", () => {
    const metadata = createComprehensiveRealEstateHoldingTaxMetadata("ko");
    expect(metadata.alternates).toEqual({
      canonical: "/ko/finance/comprehensive-real-estate-holding-tax",
      languages: {
        ko: "/ko/finance/comprehensive-real-estate-holding-tax",
        en: "/en/finance/comprehensive-real-estate-holding-tax",
        "x-default": "/ko/finance/comprehensive-real-estate-holding-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/finance/comprehensive-real-estate-holding-tax",
    });
  });
});
