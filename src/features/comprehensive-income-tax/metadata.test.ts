import { describe, expect, it } from "vitest";
import { createComprehensiveIncomeTaxMetadata } from "./metadata";
describe("createComprehensiveIncomeTaxMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createComprehensiveIncomeTaxMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Comprehensive Income Tax Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("uses canonical localized production URLs", () => {
    const metadata = createComprehensiveIncomeTaxMetadata("ko");
    expect(metadata.alternates).toEqual({
      canonical: "/ko/finance/comprehensive-income-tax",
      languages: {
        ko: "/ko/finance/comprehensive-income-tax",
        en: "/en/finance/comprehensive-income-tax",
        "x-default": "/ko/finance/comprehensive-income-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/finance/comprehensive-income-tax",
    });
  });
});
