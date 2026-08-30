import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "./calculator-directory";
import {
  englishCalculatorNames,
  getEnglishCalculatorName,
} from "./calculator-directory-calculator-copy";

describe("English calculator directory names", () => {
  it("covers every published calculator exactly once", () => {
    expect(Object.keys(englishCalculatorNames).sort()).toEqual(
      allPublishedCalculators.map((calculator) => calculator.id).sort(),
    );
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
});
