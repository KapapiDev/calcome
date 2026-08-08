import { describe, expect, it } from "vitest";
import { createOvertimePayMetadata } from "./metadata";
describe("metadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createOvertimePayMetadata("en");
    expect(metadata.title).toBe(
      "South Korea Overtime Pay Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });

  it("uses localized URLs", () =>
    expect(createOvertimePayMetadata("en").alternates).toEqual({
      canonical: "/en/employment/overtime-pay",
      languages: {
        ko: "/ko/employment/overtime-pay",
        en: "/en/employment/overtime-pay",
        "x-default": "/ko/employment/overtime-pay",
      },
    }));
});
