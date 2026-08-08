import { describe, expect, it } from "vitest";
import { createValueAddedTaxMetadata } from "./metadata";

describe("createValueAddedTaxMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createValueAddedTaxMetadata("en");
    expect(metadata.title).toBe(
      "South Korea VAT Calculator | KRW Supply Amount and Tax",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("uses canonical localized production URLs", () => {
    const metadata = createValueAddedTaxMetadata("ko");
    expect(metadata.alternates).toEqual({
      canonical: "/ko/finance/value-added-tax",
      languages: {
        ko: "/ko/finance/value-added-tax",
        en: "/en/finance/value-added-tax",
        "x-default": "/ko/finance/value-added-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/finance/value-added-tax",
    });
  });
});
