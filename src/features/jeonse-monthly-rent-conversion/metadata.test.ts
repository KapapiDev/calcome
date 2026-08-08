import { describe, expect, it } from "vitest";
import { createJeonseMonthlyRentConversionMetadata } from "./metadata";

describe("createJeonseMonthlyRentConversionMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createJeonseMonthlyRentConversionMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Jeonse to Monthly Rent Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("provides localized canonical and alternate URLs", () => {
    expect(createJeonseMonthlyRentConversionMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/jeonse-monthly-rent-conversion",
        languages: {
          ko: "/ko/finance/jeonse-monthly-rent-conversion",
          en: "/en/finance/jeonse-monthly-rent-conversion",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/jeonse-monthly-rent-conversion",
      },
    });
  });
});
