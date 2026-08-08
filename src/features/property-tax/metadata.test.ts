import { describe, expect, it } from "vitest";
import { createPropertyTaxMetadata } from "./metadata";
describe("createPropertyTaxMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createPropertyTaxMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Property Tax Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("uses canonical localized production URLs", () => {
    const metadata = createPropertyTaxMetadata("ko");
    expect(metadata.alternates).toEqual({
      canonical: "/ko/finance/property-tax",
      languages: {
        ko: "/ko/finance/property-tax",
        en: "/en/finance/property-tax",
        "x-default": "/ko/finance/property-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/finance/property-tax",
    });
  });
});
