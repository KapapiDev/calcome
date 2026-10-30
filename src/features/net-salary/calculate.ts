import Decimal from "decimal.js";
import {
  EMPLOYMENT_EMPLOYEE_RATE,
  HEALTH_EMPLOYEE_RATE,
  LONG_TERM_CARE_RATIO,
  PENSION_EMPLOYEE_RATE,
  PENSION_MONTHLY_CAP,
} from "./constants";
import type { NetSalaryInput, NetSalaryResult } from "./types";

const zero = () => new Decimal(0);
const money = (value: Decimal) =>
  Decimal.max(value, 0).toDecimalPlaces(0, Decimal.ROUND_DOWN);

function earnedIncomeDeduction(gross: Decimal) {
  if (gross.lte(5_000_000)) return gross.mul("0.7");
  if (gross.lte(15_000_000))
    return new Decimal(3_500_000).plus(gross.minus(5_000_000).mul("0.4"));
  if (gross.lte(45_000_000))
    return new Decimal(7_500_000).plus(gross.minus(15_000_000).mul("0.15"));
  if (gross.lte(100_000_000))
    return new Decimal(12_000_000).plus(gross.minus(45_000_000).mul("0.05"));
  return new Decimal(14_750_000).plus(gross.minus(100_000_000).mul("0.02"));
}

function progressiveTax(base: Decimal) {
  if (base.lte(0)) return zero();
  const brackets: [number, string][] = [
    [14_000_000, "0.06"],
    [50_000_000, "0.15"],
    [88_000_000, "0.24"],
    [150_000_000, "0.35"],
    [300_000_000, "0.38"],
    [500_000_000, "0.40"],
    [1_000_000_000, "0.42"],
  ];
  let previous = new Decimal(0);
  let tax = zero();
  for (const [limit, rate] of brackets) {
    const upper = new Decimal(limit);
    if (base.lte(previous)) break;
    tax = tax.plus(Decimal.min(base, upper).minus(previous).mul(rate));
    previous = upper;
  }
  if (base.gt(previous)) tax = tax.plus(base.minus(previous).mul("0.45"));
  return tax;
}

function estimatedMonthlyIncomeTax(
  annualTaxableGross: Decimal,
  dependents: number,
  children: number,
  annualPension: Decimal,
) {
  const personalDeduction = new Decimal(1_500_000).mul(1 + dependents);
  const taxBase = Decimal.max(
    annualTaxableGross
      .minus(earnedIncomeDeduction(annualTaxableGross))
      .minus(personalDeduction)
      .minus(annualPension),
    0,
  );
  const calculated = progressiveTax(taxBase);
  const earnedCredit = calculated.lte(1_300_000)
    ? calculated.mul("0.55")
    : new Decimal(715_000).plus(calculated.minus(1_300_000).mul("0.3"));
  const cappedCredit = Decimal.min(earnedCredit, 740_000);
  const childMonthlyCredit =
    children === 0
      ? zero()
      : new Decimal(
          children === 1
            ? 20_830
            : children === 2
              ? 45_830
              : 45_830 + (children - 2) * 33_330,
        );
  return money(
    Decimal.max(
      calculated.minus(cappedCredit).div(12).minus(childMonthlyCredit),
      0,
    ),
  );
}

export function calculateNetSalary(input: NetSalaryInput): NetSalaryResult {
  const annualGross =
    input.salaryMode === "annual"
      ? input.salary.plus(input.bonus)
      : input.salary.mul(12).plus(input.bonus);
  const monthlyGross = annualGross.div(12);
  const monthlyTaxable = Decimal.max(
    monthlyGross.minus(input.monthlyNonTaxable),
    0,
  );
  const pension = input.pension
    ? money(
        Decimal.min(monthlyTaxable, PENSION_MONTHLY_CAP).mul(
          PENSION_EMPLOYEE_RATE,
        ),
      )
    : zero();
  const health = input.health
    ? money(monthlyTaxable.mul(HEALTH_EMPLOYEE_RATE))
    : zero();
  const longTermCare =
    input.longTermCare && input.health
      ? money(health.mul(LONG_TERM_CARE_RATIO))
      : zero();
  const employment = input.employment
    ? money(monthlyTaxable.mul(EMPLOYMENT_EMPLOYEE_RATE))
    : zero();
  const incomeTax = input.incomeTax
    ? estimatedMonthlyIncomeTax(
        monthlyTaxable.mul(12),
        input.dependents,
        input.children,
        pension.mul(12),
      )
    : zero();
  const localIncomeTax =
    input.localIncomeTax && input.incomeTax
      ? money(incomeTax.mul("0.1"))
      : zero();
  const deductions = {
    pension,
    health,
    longTermCare,
    employment,
    incomeTax,
    localIncomeTax,
  };
  const monthlyDeductions = Object.values(deductions).reduce(
    (sum, item) => sum.plus(item),
    zero(),
  );
  const monthlyTakeHome = money(monthlyGross.minus(monthlyDeductions));
  return {
    annualGross,
    monthlyGross,
    monthlyTakeHome,
    annualTakeHome: monthlyTakeHome.mul(12),
    monthlyDeductions,
    annualDeductions: monthlyDeductions.mul(12),
    deductions,
  };
}
