import { describe, expect, it } from "vitest";

import { createAnnualLeaveMetadata } from "./metadata";

describe("annual leave allowance metadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createAnnualLeaveMetadata("en");

    expect(metadata.title).toBe(
      "South Korea Annual Leave Allowance Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });
});
