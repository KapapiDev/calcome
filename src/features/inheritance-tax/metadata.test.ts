import { describe, expect, it } from "vitest";
import { createInheritanceTaxMetadata } from "./metadata";
describe("createInheritanceTaxMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createInheritanceTaxMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Inheritance Tax Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("creates localized canonical and alternate metadata", () => {
    const metadata = createInheritanceTaxMetadata("en");
    expect(metadata.alternates?.canonical).toBe("/en/finance/inheritance-tax");
    expect(metadata.alternates?.languages).toEqual({
      ko: "/ko/finance/inheritance-tax",
      en: "/en/finance/inheritance-tax",
      "x-default": "/ko/finance/inheritance-tax",
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/en/finance/inheritance-tax",
      locale: "en_US",
    });
  });
});
