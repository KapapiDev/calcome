import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateNetSalary } from "./calculate";
const base = {
  salaryMode: "annual" as const,
  salary: new Decimal(60_000_000),
  bonus: new Decimal(0),
  monthlyNonTaxable: new Decimal(200_000),
  dependents: 0,
  children: 0,
  pension: true,
  health: true,
  longTermCare: true,
  employment: true,
  incomeTax: true,
  localIncomeTax: true,
};
describe("calculateNetSalary", () => {
  it("uses 2026 employee social insurance rates consistently", () => {
    const result = calculateNetSalary(base);
    expect(result.monthlyGross.toString()).toBe("5000000");
    expect(result.deductions.pension.toString()).toBe("228000");
    expect(result.deductions.health.toString()).toBe("172560");
    expect(result.deductions.employment.toString()).toBe("43200");
    expect(
      result.monthlyTakeHome.plus(result.monthlyDeductions).toString(),
    ).toBe("5000000");
  });
  it("supports monthly mode, bonuses, tax-free pay, and opt-outs", () => {
    const result = calculateNetSalary({
      ...base,
      salaryMode: "monthly",
      salary: new Decimal(4_000_000),
      bonus: new Decimal(12_000_000),
      monthlyNonTaxable: new Decimal(300_000),
      pension: false,
      health: false,
      longTermCare: false,
      employment: false,
      incomeTax: false,
      localIncomeTax: false,
    });
    expect(result.annualGross.toString()).toBe("60000000");
    expect(result.monthlyDeductions.toString()).toBe("0");
    expect(result.monthlyTakeHome.toString()).toBe("5000000");
  });
  it("reduces estimated withholding for eligible children", () => {
    const without = calculateNetSalary({ ...base, dependents: 2, children: 0 });
    const withChildren = calculateNetSalary({
      ...base,
      dependents: 2,
      children: 2,
    });
    expect(
      withChildren.deductions.incomeTax.lt(without.deductions.incomeTax),
    ).toBe(true);
  });

  it.each([
    [1, 20830],
    [2, 45830],
    [3, 79160],
  ])(
    "uses the current monthly child credit for %i eligible children",
    (children, monthlyCredit) => {
      const without = calculateNetSalary({
        ...base,
        dependents: children,
        children: 0,
      });
      const withChildren = calculateNetSalary({
        ...base,
        dependents: children,
        children,
      });
      expect(
        without.deductions.incomeTax
          .minus(withChildren.deductions.incomeTax)
          .toNumber(),
      ).toBe(monthlyCredit);
      expect(withChildren.monthlyTakeHome.gt(without.monthlyTakeHome)).toBe(
        true,
      );
    },
  );
});
