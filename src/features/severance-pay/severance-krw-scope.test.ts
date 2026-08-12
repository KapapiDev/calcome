import { describe, expect, it } from "vitest";
import { getSeveranceDictionary } from "./i18n";

describe("Severance Pay Calculator English KRW scope", () => {
  it("keeps the South Korea policy scope and KRW unit explicit before calculation", () => {
    const copy = getSeveranceDictionary("en");

    expect(copy.page.metaTitle).toMatch(/Korean Severance Pay Calculator/);
    expect(copy.page.description).toMatch(
      /Korean statutory retirement allowance/,
    );
    expect(copy.calculator.won).toBe("KRW");
    expect(copy.validation.wageInvalid).toMatch(/KRW 1 billion/);
    expect(copy.page.explanation.join(" ")).toMatch(
      /Korean statutory retirement allowance/,
    );
  });
});
