import { describe, expect, it } from "vitest";
import { createAverageWageMetadata } from "./metadata";
describe("average wage metadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createAverageWageMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Average Wage Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("uses localized canonical and hreflang URLs", () => {
    expect(createAverageWageMetadata("en").alternates).toEqual({
      canonical: "/en/employment/average-wage",
      languages: {
        ko: "/ko/employment/average-wage",
        en: "/en/employment/average-wage",
        "x-default": "/ko/employment/average-wage",
      },
    });
  });
});
