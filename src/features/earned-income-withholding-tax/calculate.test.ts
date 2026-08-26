import { describe, expect, it } from "vitest";
import {
  calculateEarnedIncomeWithholdingTax,
  childTaxAdjustment,
} from "./calculate";

describe("calculateEarnedIncomeWithholdingTax", () => {
  it("matches the March 2026 child-adjusted example", () => {
    const result = calculateEarnedIncomeWithholdingTax({
      monthlyTaxableSalary: 3_500_000,
      dependents: 4,
      eligibleChildren: 2,
      withholdingRate: 100,
    });

    expect(result.baseTableTax).toBe(49_340);
    expect(result.childTaxAdjustment).toBe(45_830);
    expect(result.adjustedTableTax).toBe(3_510);
    expect(result.incomeTax).toBe(3_510);
    expect(result.localIncomeTax).toBe(350);
    expect(result.totalWithholding).toBe(3_860);
  });

  it("applies the employee-selected 80 percent withholding rate and truncates to 10 KRW", () => {
    const result = calculateEarnedIncomeWithholdingTax({
      monthlyTaxableSalary: 3_500_000,
      dependents: 4,
      eligibleChildren: 2,
      withholdingRate: 80,
    });

    expect(result.incomeTax).toBe(2_800);
    expect(result.localIncomeTax).toBe(280);
  });

  it("uses the statutory high-salary formula only above 10 million KRW", () => {
    expect(
      calculateEarnedIncomeWithholdingTax({
        monthlyTaxableSalary: 10_000_000,
        dependents: 1,
        eligibleChildren: 0,
        withholdingRate: 100,
      }).baseTableTax,
    ).toBe(1_507_400);

    expect(
      calculateEarnedIncomeWithholdingTax({
        monthlyTaxableSalary: 10_000_001,
        dependents: 1,
        eligibleChildren: 0,
        withholdingRate: 100,
      }).baseTableTax,
    ).toBe(1_532_400);

    expect(
      calculateEarnedIncomeWithholdingTax({
        monthlyTaxableSalary: 14_000_000,
        dependents: 1,
        eligibleChildren: 0,
        withholdingRate: 100,
      }).baseTableTax,
    ).toBe(2_904_400);
  });

  it("extends the table consistently beyond 11 dependents", () => {
    expect(
      calculateEarnedIncomeWithholdingTax({
        monthlyTaxableSalary: 10_000_000,
        dependents: 12,
        eligibleChildren: 0,
        withholdingRate: 100,
      }).baseTableTax,
    ).toBe(930_840);
  });

  it("never lets the child adjustment create negative withholding", () => {
    const result = calculateEarnedIncomeWithholdingTax({
      monthlyTaxableSalary: 1_500_000,
      dependents: 1,
      eligibleChildren: 3,
      withholdingRate: 120,
    });

    expect(result.adjustedTableTax).toBe(0);
    expect(result.totalWithholding).toBe(0);
  });

  it("uses the March 2026 child adjustment amounts", () => {
    expect(childTaxAdjustment(0)).toBe(0);
    expect(childTaxAdjustment(1)).toBe(20_830);
    expect(childTaxAdjustment(2)).toBe(45_830);
    expect(childTaxAdjustment(3)).toBe(79_160);
  });
});
