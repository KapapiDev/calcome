import { describe, expect, it } from "vitest";
import { createCapitalGainsTaxMetadata } from "./metadata";

describe("createCapitalGainsTaxMetadata", () => {
  it("creates localized canonical and alternate metadata", () => {
    const metadata = createCapitalGainsTaxMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Capital Gains Tax Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
    expect(metadata.alternates?.canonical).toBe(
      "/en/finance/capital-gains-tax",
    );
    expect(metadata.alternates?.languages).toEqual({
      ko: "/ko/finance/capital-gains-tax",
      en: "/en/finance/capital-gains-tax",
      "x-default": "/ko/finance/capital-gains-tax",
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/en/finance/capital-gains-tax",
      locale: "en_US",
    });
  });
});
