import { describe, expect, it } from "vitest";

import { createWeeklyHolidayPayMetadata } from "./metadata";

describe("weekly holiday pay metadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createWeeklyHolidayPayMetadata("en");

    expect(metadata.title).toBe(
      "South Korea Weekly Holiday Pay Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });
});
