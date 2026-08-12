import { describe, expect, it } from "vitest";
import { rentConversionRateContent } from "./content";
import { createRentConversionRateMetadata } from "./metadata";

describe("Rent Conversion Rate Calculator English KRW scope", () => {
  it("makes the South Korea and KRW scope explicit before calculation", () => {
    const copy = rentConversionRateContent.en;

    expect(copy.title).toMatch(/South Korea/);
    expect(copy.description).toMatch(/South Korea.*KRW/);
    expect(copy.input).toMatch(/KRW/);
    expect(copy.jeonseDeposit).toMatch(/KRW/);
    expect(copy.monthlyDeposit).toMatch(/KRW/);
    expect(copy.monthlyRent).toMatch(/KRW/);
    expect(copy.result).toMatch(/KRW/);
    expect(copy.cautions.join(" ")).toMatch(
      /does not perform foreign-exchange conversion/,
    );
  });

  it("carries the South Korea scope into English metadata", () => {
    const metadata = createRentConversionRateMetadata("en");

    expect(String(metadata.title)).toMatch(/South Korea/);
    expect(String(metadata.description)).toMatch(/South Korea.*KRW/);
  });
});
