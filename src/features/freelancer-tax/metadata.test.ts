import { describe, expect, it } from "vitest";
import { createFreelancerTaxMetadata } from "./metadata";

describe("createFreelancerTaxMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createFreelancerTaxMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Freelancer 3.3% Tax Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("uses canonical localized production URLs", () => {
    const metadata = createFreelancerTaxMetadata("ko");
    expect(metadata.alternates).toEqual({
      canonical: "/ko/finance/freelancer-3-3-tax",
      languages: {
        ko: "/ko/finance/freelancer-3-3-tax",
        en: "/en/finance/freelancer-3-3-tax",
        "x-default": "/ko/finance/freelancer-3-3-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/finance/freelancer-3-3-tax",
    });
  });
});
