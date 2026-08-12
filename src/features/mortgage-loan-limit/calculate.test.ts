import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateMortgageLoanLimit } from "./calculate";

const baseInput = {
  homePrice: new Decimal(600_000_000),
  annualIncome: new Decimal(80_000_000),
  existingAnnualDebtService: new Decimal(0),
  annualInterestRate: new Decimal(4),
  termYears: new Decimal(30),
  ltvLimitRate: new Decimal(70),
  dsrLimitRate: new Decimal(40),
};

describe("calculateMortgageLoanLimit", () => {
  it("uses the LTV cap when it is more restrictive", () => {
    const result = calculateMortgageLoanLimit({
      ...baseInput,
      homePrice: new Decimal(300_000_000),
      annualIncome: new Decimal(200_000_000),
      ltvLimitRate: new Decimal(50),
    });

    expect(result.ltvLimit.eq(150_000_000)).toBe(true);
    expect(result.loanLimit.eq(result.ltvLimit)).toBe(true);
    expect(result.limitingFactor).toBe("ltv");
  });

  it("uses the DSR cap when debt-service capacity is more restrictive", () => {
    const result = calculateMortgageLoanLimit({
      ...baseInput,
      annualIncome: new Decimal(40_000_000),
      existingAnnualDebtService: new Decimal(8_000_000),
    });

    expect(result.dsrLimit.lt(result.ltvLimit)).toBe(true);
    expect(result.loanLimit.eq(result.dsrLimit)).toBe(true);
    expect(result.limitingFactor).toBe("dsr");
  });

  it("supports a zero interest rate", () => {
    const result = calculateMortgageLoanLimit({
      ...baseInput,
      homePrice: new Decimal(1_000_000_000),
      annualIncome: new Decimal(60_000_000),
      annualInterestRate: new Decimal(0),
      ltvLimitRate: new Decimal(100),
      dsrLimitRate: new Decimal(40),
    });

    expect(result.monthlyPaymentCapacity.eq(2_000_000)).toBe(true);
    expect(result.dsrLimit.eq(720_000_000)).toBe(true);
    expect(result.estimatedMonthlyPayment.eq(2_000_000)).toBe(true);
  });

  it("returns zero DSR borrowing capacity when existing debt consumes it", () => {
    const result = calculateMortgageLoanLimit({
      ...baseInput,
      annualIncome: new Decimal(50_000_000),
      existingAnnualDebtService: new Decimal(20_000_000),
      dsrLimitRate: new Decimal(40),
    });

    expect(result.monthlyPaymentCapacity.eq(0)).toBe(true);
    expect(result.dsrLimit.eq(0)).toBe(true);
    expect(result.loanLimit.eq(0)).toBe(true);
    expect(result.limitingFactor).toBe("dsr");
  });

  it("rejects invalid rates and non-positive terms", () => {
    expect(() =>
      calculateMortgageLoanLimit({
        ...baseInput,
        ltvLimitRate: new Decimal(101),
      }),
    ).toThrow(RangeError);

    expect(() =>
      calculateMortgageLoanLimit({
        ...baseInput,
        termYears: new Decimal(0),
      }),
    ).toThrow(RangeError);
  });
});
