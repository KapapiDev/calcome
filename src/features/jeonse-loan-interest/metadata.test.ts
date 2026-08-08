import { describe, expect, it } from "vitest";

import { createJeonseLoanInterestMetadata } from "./metadata";

describe("createJeonseLoanInterestMetadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createJeonseLoanInterestMetadata("en");

    expect(metadata.title).toBe(
      "South Korea Jeonse Loan Interest Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });
});
