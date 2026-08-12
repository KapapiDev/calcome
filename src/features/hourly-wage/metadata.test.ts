import { describe, expect, it } from "vitest";

import { createHourlyWageMetadata } from "./metadata";

describe("hourly wage metadata", () => {
  it("provides localized canonical, hreflang, and social metadata", () => {
    const ko = createHourlyWageMetadata("ko");
    const en = createHourlyWageMetadata("en");

    expect(ko.alternates).toEqual({
      canonical: "/ko/employment/hourly-wage",
      languages: {
        ko: "/ko/employment/hourly-wage",
        en: "/en/employment/hourly-wage",
        "x-default": "/ko/employment/hourly-wage",
      },
    });
    expect(ko.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/employment/hourly-wage",
      locale: "ko_KR",
    });
    expect(en.alternates).toMatchObject({
      canonical: "/en/employment/hourly-wage",
    });
    expect(en.title).toContain("South Korea Hourly Wage Calculator");
    expect(en.description).toContain("KRW");
    expect(en.description).toContain("South Korea minimum wage");
    expect(en.twitter).toMatchObject({ card: "summary_large_image" });
  });
});
