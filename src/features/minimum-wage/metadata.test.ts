import { describe, expect, it } from "vitest";

import { createMinimumWageMetadata } from "./metadata";

describe("minimum wage metadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createMinimumWageMetadata("en");

    expect(metadata.title).toBe(
      "2026 South Korea Minimum Wage Calculator | KRW",
    );
    expect(metadata.description).toContain("South Korea");
    expect(metadata.description).toContain("KRW");
  });
});
