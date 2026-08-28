import { describe, expect, it } from "vitest";

import { classifyGoogleConsentRegion } from "./privacy-region";

describe("Google advertising consent region", () => {
  it.each(["DE", "fr", "GB", "CH", "NO", "IS", "LI"])(
    "classifies %s as regulated",
    (countryCode) => {
      expect(classifyGoogleConsentRegion(countryCode)).toBe("regulated");
    },
  );

  it("classifies known non-covered countries as other", () => {
    expect(classifyGoogleConsentRegion("KR")).toBe("other");
    expect(classifyGoogleConsentRegion("US")).toBe("other");
  });

  it("fails closed when country information is absent or malformed", () => {
    expect(classifyGoogleConsentRegion(null)).toBe("unknown");
    expect(classifyGoogleConsentRegion("")) .toBe("unknown");
    expect(classifyGoogleConsentRegion("USA")).toBe("unknown");
  });
});
