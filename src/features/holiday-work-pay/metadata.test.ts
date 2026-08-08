import { describe, expect, it } from "vitest";

import { createMetadata } from "./metadata";

describe("holiday work pay metadata", () => {
  it("identifies the English calculator as South Korea and KRW specific", () => {
    const metadata = createMetadata("en");

    expect(metadata.title).toBe(
      "South Korea Holiday Work Pay Calculator | KRW Estimate",
    );
    expect(metadata.description).toContain("South Korean");
    expect(metadata.description).toContain("KRW");
  });
});
