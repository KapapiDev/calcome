import { describe, expect, it } from "vitest";
import { createAcquisitionTaxMetadata } from "./metadata";

describe("createAcquisitionTaxMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createAcquisitionTaxMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Real Estate Acquisition Tax Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("creates localized canonical and alternate URLs", () => {
    const metadata = createAcquisitionTaxMetadata("en");
    expect(metadata.alternates).toEqual({
      canonical: "/en/finance/real-estate-acquisition-tax",
      languages: {
        ko: "/ko/finance/real-estate-acquisition-tax",
        en: "/en/finance/real-estate-acquisition-tax",
        "x-default": "/ko/finance/real-estate-acquisition-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/en/finance/real-estate-acquisition-tax",
      locale: "en_US",
    });
  });
});
