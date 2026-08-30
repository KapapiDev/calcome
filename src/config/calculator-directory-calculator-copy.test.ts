import { describe, expect, it } from "vitest";

import {
  englishCalculatorDescriptions,
  getEnglishCalculatorDescription,
} from "./calculator-description-copy";
import { allPublishedCalculators } from "./calculator-directory";
import {
  englishCalculatorNames,
  getEnglishCalculatorName,
} from "./calculator-directory-calculator-copy";

const asciiOnly = /^[\x00-\x7F]+$/;

describe("English calculator directory copy", () => {
  it("covers every published calculator exactly once for names and descriptions", () => {
    const publishedIds = allPublishedCalculators
      .map((calculator) => calculator.id)
      .sort();

    expect(Object.keys(englishCalculatorNames).sort()).toEqual(publishedIds);
    expect(Object.keys(englishCalculatorDescriptions).sort()).toEqual(
      publishedIds,
    );
  });

  it("requires explicit non-blank ASCII copy without raw or generic fallbacks", () => {
    for (const calculator of allPublishedCalculators) {
      const name = getEnglishCalculatorName(calculator.id);
      const description = getEnglishCalculatorDescription(calculator.id);

      expect(name.trim()).not.toBe("");
      expect(description.trim()).not.toBe("");
      expect(name).toMatch(asciiOnly);
      expect(description).toMatch(asciiOnly);
      expect(name).not.toBe(calculator.id);
      expect(description).not.toBe(
        `Use the ${name} with clear inputs and results.`,
      );
    }
  });

  it("preserves acronym and punctuation localization", () => {
    expect(getEnglishCalculatorName("ltv")).toBe("LTV Calculator");
    expect(getEnglishCalculatorName("dsr")).toBe("DSR Calculator");
    expect(getEnglishCalculatorName("cagr")).toBe("CAGR Calculator");
    expect(getEnglishCalculatorName("apr-apy-conversion")).toBe(
      "APR/APY Conversion Calculator",
    );
    expect(getEnglishCalculatorName("freelancer-3-3-tax")).toBe(
      "Freelancer 3.3% Tax Calculator",
    );
  });

  it("uses explicit calculator-specific English descriptions", () => {
    expect(getEnglishCalculatorDescription("compound-interest")).toBe(
      "Project growth with compound interest.",
    );
    expect(getEnglishCalculatorDescription("ltv")).toContain(
      "loan-to-value ratio",
    );
    expect(getEnglishCalculatorDescription("business-cash-runway")).toContain(
      "cash burn",
    );
  });
});
