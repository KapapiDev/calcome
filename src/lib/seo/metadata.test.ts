import { describe, expect, it } from "vitest";

import { localizedSeoPaths, socialLocale } from "./metadata";

describe("localized SEO metadata paths", () => {
  it("keeps the current locale canonical and exposes reciprocal language alternates", () => {
    expect(localizedSeoPaths("/ko/finance/compound-interest")).toEqual({
      locale: "ko",
      canonical: "/ko/finance/compound-interest",
      languages: {
        "ko-KR": "/ko/finance/compound-interest",
        "en-US": "/en/finance/compound-interest",
        "x-default": "/ko/finance/compound-interest",
      },
    });

    expect(localizedSeoPaths("/en/finance/compound-interest")).toEqual({
      locale: "en",
      canonical: "/en/finance/compound-interest",
      languages: {
        "ko-KR": "/ko/finance/compound-interest",
        "en-US": "/en/finance/compound-interest",
        "x-default": "/ko/finance/compound-interest",
      },
    });
  });

  it("normalizes locale roots and non-localized fallbacks without duplicate slashes", () => {
    expect(localizedSeoPaths("/en/").canonical).toBe("/en");
    expect(localizedSeoPaths("/ko/").canonical).toBe("/ko");
    expect(localizedSeoPaths("finance/loan/").canonical).toBe(
      "/ko/finance/loan",
    );
  });

  it("maps Open Graph locale metadata to the active language", () => {
    expect(socialLocale("ko")).toEqual({
      locale: "ko_KR",
      alternateLocale: "en_US",
    });
    expect(socialLocale("en")).toEqual({
      locale: "en_US",
      alternateLocale: "ko_KR",
    });
  });
});
