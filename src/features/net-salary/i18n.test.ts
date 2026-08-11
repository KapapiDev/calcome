import { describe, expect, it } from "vitest";

import { getNetSalaryDictionary } from "./i18n";

describe("net salary English policy scope", () => {
  it("identifies South Korea and KRW before calculation", () => {
    const copy = getNetSalaryDictionary("en");

    expect(copy.page.title).toBe("South Korea Net Salary Calculator");
    expect(copy.page.metaTitle).toContain("South Korea");
    expect(copy.page.metaDescription).toContain("KRW");
    expect(copy.calc.inputTitle).toBe("South Korea salary details (KRW)");
    expect(copy.calc.bonus).toContain("KRW");
    expect(copy.calc.nonTaxable).toContain("KRW");
  });
});
