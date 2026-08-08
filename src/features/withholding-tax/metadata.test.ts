import { describe, expect, it } from "vitest";
import { createWithholdingTaxMetadata } from "./metadata";

describe("createWithholdingTaxMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createWithholdingTaxMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Withholding Tax Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("uses canonical localized production URLs", () => {
    const metadata = createWithholdingTaxMetadata("ko");
    expect(metadata.alternates).toEqual({
      canonical: "/ko/finance/withholding-tax",
      languages: {
        ko: "/ko/finance/withholding-tax",
        en: "/en/finance/withholding-tax",
        "x-default": "/ko/finance/withholding-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/finance/withholding-tax",
    });
  });
});
