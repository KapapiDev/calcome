import { describe, expect, it } from "vitest";
import { calculateRetirementIncomeTax } from "./calculate";

describe("calculateRetirementIncomeTax", () => {
  it("matches the current NTS structure for 100M KRW and 20 years", () => {
    const result = calculateRetirementIncomeTax({
      retirementPay: 100_000_000,
      nonTaxableRetirementPay: 0,
      serviceYears: 20,
    });

    expect(result.serviceYearsDeduction).toBe(40_000_000);
    expect(result.convertedSalary).toBe(36_000_000);
    expect(result.convertedSalaryDeduction).toBe(24_800_000);
    expect(result.taxBase).toBe(11_200_000);
    expect(result.retirementIncomeTax).toBe(1_120_000);
    expect(result.localIncomeTax).toBe(112_000);
    expect(result.totalTax).toBe(1_232_000);
  });

  it("does not tax an amount fully absorbed by the service deduction", () => {
    const result = calculateRetirementIncomeTax({
      retirementPay: 5_000_000,
      nonTaxableRetirementPay: 0,
      serviceYears: 5,
    });

    expect(result.taxBase).toBe(0);
    expect(result.totalTax).toBe(0);
  });

  it("excludes non-taxable retirement pay before applying deductions", () => {
    const result = calculateRetirementIncomeTax({
      retirementPay: 110_000_000,
      nonTaxableRetirementPay: 10_000_000,
      serviceYears: 20,
    });

    expect(result.retirementIncome).toBe(100_000_000);
    expect(result.retirementIncomeTax).toBe(1_120_000);
  });
});
