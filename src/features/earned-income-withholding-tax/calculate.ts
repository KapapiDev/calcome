import { TAX_TABLE, TAX_TABLE_HIGH } from "./tax-table";

export type WithholdingRate = 80 | 100 | 120;

export type EarnedIncomeWithholdingTaxInput = {
  monthlyTaxableSalary: number;
  dependents: number;
  eligibleChildren: number;
  withholdingRate: WithholdingRate;
};

export type EarnedIncomeWithholdingTaxResult = {
  baseTableTax: number;
  childTaxAdjustment: number;
  adjustedTableTax: number;
  incomeTax: number;
  localIncomeTax: number;
  totalWithholding: number;
};

const floorToTen = (value: number) => Math.floor(value / 10) * 10;

function baseTaxForDependents(values: readonly number[], dependents: number) {
  if (dependents <= 11) return values[dependents - 1] ?? 0;

  const dependent10 = values[9] ?? 0;
  const dependent11 = values[10] ?? 0;
  const extension =
    dependent11 - (dependent10 - dependent11) * (dependents - 11);
  return Math.max(0, extension);
}

function highSalaryBaseTax(monthlySalary: number, dependents: number) {
  const base = baseTaxForDependents(TAX_TABLE_HIGH, dependents);
  let tax: number;

  if (monthlySalary < 14_000_000) {
    tax = base + (monthlySalary - 10_000_000) * 0.98 * 0.35 + 25_000;
  } else if (monthlySalary < 28_000_000) {
    tax = base + 1_397_000 + (monthlySalary - 14_000_000) * 0.98 * 0.38;
  } else if (monthlySalary < 30_000_000) {
    tax = base + 6_610_600 + (monthlySalary - 28_000_000) * 0.98 * 0.4;
  } else if (monthlySalary < 45_000_000) {
    tax = base + 7_394_600 + (monthlySalary - 30_000_000) * 0.4;
  } else if (monthlySalary < 87_000_000) {
    tax = base + 13_394_600 + (monthlySalary - 45_000_000) * 0.42;
  } else {
    tax = base + 31_034_600 + (monthlySalary - 87_000_000) * 0.45;
  }

  return floorToTen(Math.max(0, tax));
}

function simplifiedTableTax(monthlySalary: number, dependents: number) {
  if (monthlySalary < 770_000) return 0;
  if (monthlySalary >= 10_000_000) {
    return highSalaryBaseTax(monthlySalary, dependents);
  }

  const salaryInThousands = Math.floor(monthlySalary / 1_000);
  const row = TAX_TABLE.find(
    ([lower, upper]) => salaryInThousands >= lower && salaryInThousands < upper,
  );
  if (!row) return 0;

  return baseTaxForDependents(row.slice(2), dependents);
}

export function childTaxAdjustment(eligibleChildren: number) {
  if (eligibleChildren <= 0) return 0;
  if (eligibleChildren === 1) return 20_830;
  if (eligibleChildren === 2) return 45_830;
  return 45_830 + (eligibleChildren - 2) * 33_330;
}

export function calculateEarnedIncomeWithholdingTax(
  input: EarnedIncomeWithholdingTaxInput,
): EarnedIncomeWithholdingTaxResult {
  const baseTableTax = simplifiedTableTax(
    input.monthlyTaxableSalary,
    input.dependents,
  );
  const childAdjustment = childTaxAdjustment(input.eligibleChildren);
  const adjustedTableTax = Math.max(0, baseTableTax - childAdjustment);
  const incomeTax = floorToTen(
    adjustedTableTax * (input.withholdingRate / 100),
  );
  const localIncomeTax = floorToTen(incomeTax * 0.1);

  return {
    baseTableTax,
    childTaxAdjustment: childAdjustment,
    adjustedTableTax,
    incomeTax,
    localIncomeTax,
    totalWithholding: incomeTax + localIncomeTax,
  };
}
