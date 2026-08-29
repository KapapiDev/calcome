import { describe, expect, it } from "vitest";

import { createRetirementPensionTaxCreditMetadata } from "./metadata";

describe("createRetirementPensionTaxCreditMetadata", () => {
  it.each([
    ["ko", "퇴직연금·IRP 세액공제 계산기"],
    ["en", "South Korea Retirement Pension & IRP Tax Credit Calculator"],
  ] as const)(
    "leaves %s page title unbranded so the root title template adds CalCome once",
    (locale, expectedTitle) => {
      const metadata = createRetirementPensionTaxCreditMetadata(locale);

      expect(metadata.title).toBe(expectedTitle);
      expect(String(metadata.title)).not.toContain("| CalCome");
    },
  );

  it("keeps canonical and hreflang targets on the public bilingual routes", () => {
    const metadata = createRetirementPensionTaxCreditMetadata("en");

    expect(metadata.alternates?.canonical).toBe(
      "/en/finance/retirement-pension-tax-credit",
    );
    expect(metadata.alternates?.languages).toEqual({
      ko: "/ko/finance/retirement-pension-tax-credit",
      en: "/en/finance/retirement-pension-tax-credit",
      "x-default": "/ko/finance/retirement-pension-tax-credit",
    });
  });
});
