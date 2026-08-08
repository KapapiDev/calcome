import { describe, expect, it } from "vitest";
import { createRealEstateBrokerageFeeMetadata } from "./metadata";

describe("createRealEstateBrokerageFeeMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createRealEstateBrokerageFeeMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Real Estate Brokerage Fee Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("provides localized canonical and alternate URLs", () => {
    expect(createRealEstateBrokerageFeeMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/real-estate-brokerage-fee",
        languages: {
          ko: "/ko/finance/real-estate-brokerage-fee",
          en: "/en/finance/real-estate-brokerage-fee",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/real-estate-brokerage-fee",
      },
    });
  });
});
