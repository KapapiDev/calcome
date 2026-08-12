import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateStressDsr } from "./calculate";

const baseInput = {
  annualIncome: new Decimal(60_000_000),
  existingAnnualDebtService: new Decimal(6_000_000),
  newLoanPrincipal: new Decimal(100_000_000),
  annualInterestRate: new Decimal(4.5),
  termYears: new Decimal(20),
};

describe("calculateStressDsr", () => {
  it("matches base DSR when the stress add-on is zero", () => {
    const result = calculateStressDsr({
      ...baseInput,
      stressRateAddOn: new Decimal(0),
    });

    expect(result.stressed.dsrRate.eq(result.base.dsrRate)).toBe(true);
    expect(result.dsrIncrease.eq(0)).toBe(true);
    expect(result.monthlyPaymentIncrease.eq(0)).toBe(true);
  });

  it("raises payment and DSR when a positive stress rate is applied", () => {
    const result = calculateStressDsr({
      ...baseInput,
      stressRateAddOn: new Decimal(1.5),
    });

    expect(result.stressedAnnualInterestRate.eq(6)).toBe(true);
    expect(result.stressed.monthlyPayment.gt(result.base.monthlyPayment)).toBe(true);
    expect(result.stressed.dsrRate.gt(result.base.dsrRate)).toBe(true);
    expect(result.dsrIncrease.gt(0)).toBe(true);
  });

  it("handles a zero base interest rate", () => {
    const result = calculateStressDsr({
      ...baseInput,
      annualInterestRate: new Decimal(0),
      stressRateAddOn: new Decimal(1.5),
    });

    expect(result.base.monthlyPayment.eq(new Decimal(100_000_000).div(240))).toBe(
      true,
    );
    expect(result.stressed.monthlyPayment.gt(result.base.monthlyPayment)).toBe(true);
  });

  it("rejects a negative stress add-on", () => {
    expect(() =>
      calculateStressDsr({
        ...baseInput,
        stressRateAddOn: new Decimal(-0.1),
      }),
    ).toThrow(RangeError);
  });
});
