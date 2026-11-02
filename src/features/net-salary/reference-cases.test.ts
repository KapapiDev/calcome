import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import {
  calculateNetSalary,
  earnedIncomeDeduction,
  earnedIncomeTaxCreditLimit,
} from "./calculate";

// Reviewed 2026-11-02 against NTS 7871 (deduction ceiling) and 7875
// (salary-dependent credit caps), plus Income Tax Act Article 59(2).
// Fixed expectations are independently specified from the published schedules.
describe("NTS earned-income deduction and credit reference boundaries", () => {
  it.each([
    [33_000_000, "740000"],
    [33_000_001, "739999.992"],
    [42_000_000, "668000"],
    [43_000_000, "660000"],
    [43_000_001, "660000"],
    [70_000_000, "660000"],
    [70_000_001, "659999.5"],
    [70_320_000, "500000"],
    [70_320_001, "500000"],
    [120_000_000, "500000"],
    [120_000_001, "499999.5"],
    [120_600_000, "200000"],
    [120_600_001, "200000"],
  ])("limits the credit at gross %i to %s", (gross, expected) => {
    expect(earnedIncomeTaxCreditLimit(new Decimal(gross)).toString()).toBe(
      expected,
    );
  });

  it.each([
    [5_000_000, "3500000"],
    [15_000_000, "7500000"],
    [45_000_000, "12000000"],
    [100_000_000, "14750000"],
    [362_499_999, "19999999.98"],
    [362_500_000, "20000000"],
    [362_500_001, "20000000"],
    [1_000_000_000, "20000000"],
  ])(
    "applies the deduction schedule and ceiling at gross %i",
    (gross, expected) => {
      expect(earnedIncomeDeduction(new Decimal(gross)).toString()).toBe(
        expected,
      );
    },
  );

  it("uses taxable annual pay rather than gross including non-taxable pay for credit limits", () => {
    const base = {
      salaryMode: "annual" as const,
      salary: new Decimal(44_400_000),
      bonus: new Decimal(0),
      monthlyNonTaxable: new Decimal(200_000),
      dependents: 0,
      children: 0,
      pension: false,
      health: false,
      longTermCare: false,
      employment: false,
      incomeTax: true,
      localIncomeTax: true,
    };
    const withNonTaxable = calculateNetSalary(base);
    const allTaxable = calculateNetSalary({
      ...base,
      salary: new Decimal(42_000_000),
      monthlyNonTaxable: new Decimal(0),
    });
    expect(withNonTaxable.deductions.incomeTax.toString()).toBe("201208");
    expect(withNonTaxable.deductions.incomeTax.toString()).toBe(
      allTaxable.deductions.incomeTax.toString(),
    );
  });

  it("corrects the high-income deduction ceiling without negative deductions", () => {
    const result = calculateNetSalary({
      salaryMode: "annual",
      salary: new Decimal(400_000_000),
      bonus: new Decimal(0),
      monthlyNonTaxable: new Decimal(0),
      dependents: 0,
      children: 0,
      pension: false,
      health: false,
      longTermCare: false,
      employment: false,
      incomeTax: true,
      localIncomeTax: true,
    });
    // Tax base 400m − 20m − 1.5m = 378.5m.
    // National tax 378.5m × 40% − 25.94m = 125.46m; credit cap 0.2m.
    expect(result.deductions.incomeTax.toString()).toBe("10438333");
    expect(result.deductions.localIncomeTax.toString()).toBe("1043833");
  });
});
