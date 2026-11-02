import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculatorReferenceChecks } from "./calculator-reference-checks";
import { allPublishedCalculators } from "@/config/calculator-directory";
import { calculateNetSalary } from "@/features/net-salary/calculate";
import { calculateEarnedIncomeWithholdingTax } from "@/features/earned-income-withholding-tax/calculate";
import { calculateSocialInsurance } from "@/features/social-insurance/calculate";
import { calculateMaternityLeaveBenefit } from "@/features/maternity-leave-benefit/calculate";
import { calculateParentalLeaveBenefit } from "@/features/parental-leave-benefit/calculate";
import { calculateRetirementIncomeTax } from "@/features/retirement-income-tax/calculate";
import { calculatePensionSavingsTaxCredit } from "@/features/pension-savings-tax-credit/calculate";
import { calculateRetirementPensionTaxCredit } from "@/features/retirement-pension-tax-credit/calculate";
import { calculateFreelancerTax } from "@/features/freelancer-tax/calculate";
import { calculateValueAddedTax } from "@/features/value-added-tax/calculate";
import { calculateComprehensiveIncomeTax } from "@/features/comprehensive-income-tax/calculate";
import { calculateWithholdingTax } from "@/features/withholding-tax/calculate";

const d = (value: number) => new Decimal(value);
function published(slug: string, ...values: number[]) {
  const record = calculatorReferenceChecks.find((item) => item.slug === slug)!;
  expect(record).toBeDefined();
  for (const value of values) {
    for (const locale of ["ko", "en"] as const) {
      expect(record[locale].expected).toContain(value.toLocaleString("en-US"));
    }
  }
}

describe("published source reference checks", () => {
  it("covers twelve existing calculator identities with dated and scoped bilingual evidence", () => {
    expect(calculatorReferenceChecks).toHaveLength(12);
    expect(
      new Set(calculatorReferenceChecks.map((item) => item.slug)).size,
    ).toBe(12);
    for (const record of calculatorReferenceChecks) {
      expect(
        allPublishedCalculators.some((item) =>
          item.href.endsWith("/" + record.slug),
        ),
      ).toBe(true);
      expect(record.reviewedOn).toBe("2026-11-02");
      expect(record.sourceUrls.length).toBeGreaterThan(0);
      for (const source of record.sourceUrls)
        expect(new URL(source).protocol).toBe("https:");
      for (const locale of ["ko", "en"] as const) {
        expect(record[locale].inputs.length).toBeGreaterThan(20);
        expect(record[locale].scope.length).toBeGreaterThan(40);
      }
    }
  });

  it("reproduces net salary's source-derived wage cap case", () => {
    const result = calculateNetSalary({
      salaryMode: "monthly",
      salary: d(3_500_000),
      bonus: d(0),
      monthlyNonTaxable: d(0),
      dependents: 0,
      children: 0,
      pension: false,
      health: false,
      longTermCare: false,
      employment: false,
      incomeTax: true,
      localIncomeTax: true,
    });
    expect(result.deductions.incomeTax.toNumber()).toBe(201_208);
    expect(result.deductions.localIncomeTax.toNumber()).toBe(20_120);
    expect(result.monthlyDeductions.toNumber()).toBe(221_328);
    published("net-salary", 668_000, 201_208, 20_120, 221_328);
  });

  it("reproduces the published NTS monthly withholding row", () => {
    const result = calculateEarnedIncomeWithholdingTax({
      monthlyTaxableSalary: 3_500_000,
      dependents: 1,
      eligibleChildren: 0,
      withholdingRate: 100,
    });
    expect(result).toMatchObject({
      baseTableTax: 127_220,
      incomeTax: 127_220,
      localIncomeTax: 12_720,
      totalWithholding: 139_940,
    });
    published("earned-income-withholding-tax", 127_220, 12_720, 139_940);
  });

  it("recomputes 2026 social insurance rates below contribution limits", () => {
    const result = calculateSocialInsurance({
      monthlyPay: d(3_000_000),
      nonTaxablePay: d(0),
      accidentRate: d(1),
      workplaceSize: "under150",
    });
    // 3m × 4.75%; 3m × 7.19% / 2; 107850 × 0.9448 / 7.19;
    // 3m × 0.9%; employer adds 0.25% and hypothetical 1% accident insurance.
    expect(result.employee.pension.toNumber()).toBe(142_500);
    expect(result.employee.health.toNumber()).toBe(107_850);
    expect(result.employee.longTermCare.toNumber()).toBe(14_172);
    expect(result.employee.employment.toNumber()).toBe(27_000);
    expect(result.employee.total.toNumber()).toBe(291_522);
    expect(result.employer.total.toNumber()).toBe(329_022);
    published(
      "social-insurance",
      142_500,
      107_850,
      14_172,
      27_000,
      291_522,
      329_022,
    );
  });

  it("recomputes the ordinary 90-day maternity cap and employer top-up", () => {
    const result = calculateMaternityLeaveBenefit({
      monthlyOrdinaryWage: 3_000_000,
      multipleBirth: false,
      prioritySupportedEmployer: true,
    });
    expect(result).toMatchObject({
      leaveDays: 90,
      governmentBenefit: 6_600_000,
      employerPayment: 1_600_000,
      estimatedTotalIncome: 8_200_000,
    });
    published("maternity-leave-benefit", 6_600_000, 1_600_000, 8_200_000);
  });

  it("recomputes twelve full months of standard parental leave", () => {
    const result = calculateParentalLeaveBenefit({
      monthlyOrdinaryWage: 3_000_000,
      leaveMonths: 12,
    });
    expect(result).toMatchObject({
      firstThreeMonthly: 2_500_000,
      monthsFourToSixMonthly: 2_000_000,
      monthSevenPlusMonthly: 1_600_000,
      totalBenefit: 23_100_000,
    });
    published(
      "parental-leave-benefit",
      2_500_000,
      2_000_000,
      1_600_000,
      23_100_000,
    );
  });

  it("independently follows the NTS retirement conversion schedule", () => {
    const result = calculateRetirementIncomeTax({
      retirementPay: 100_000_000,
      nonTaxableRetirementPay: 0,
      serviceYears: 20,
    });
    // (100m − 40m) × 12 / 20 = 36m; deduction 8m + (36m − 8m) × .6 =24.8m.
    // Tax 11.2m × .06 × 20 / 12 =1.12m.
    expect(result).toMatchObject({
      serviceYearsDeduction: 40_000_000,
      convertedSalary: 36_000_000,
      taxBase: 11_200_000,
      retirementIncomeTax: 1_120_000,
      localIncomeTax: 112_000,
      totalTax: 1_232_000,
    });
    published(
      "retirement-income-tax",
      40_000_000,
      36_000_000,
      11_200_000,
      1_120_000,
      112_000,
      1_232_000,
    );
  });

  it("applies the statutory savings and combined pension limits", () => {
    const result = calculatePensionSavingsTaxCredit({
      incomeType: "salary",
      incomeAmount: 55_000_000,
      pensionSavingsContribution: 8_000_000,
      retirementPensionContribution: 4_000_000,
    });
    expect(result).toMatchObject({
      pensionSavingsEligible: 6_000_000,
      retirementPensionEligible: 3_000_000,
      eligibleContribution: 9_000_000,
      incomeTaxCredit: 1_350_000,
      unusedContribution: 3_000_000,
    });
    published(
      "pension-savings-tax-credit",
      6_000_000,
      3_000_000,
      9_000_000,
      1_350_000,
    );
  });

  it("recomputes remaining personal retirement-account capacity", () => {
    const result = calculateRetirementPensionTaxCredit({
      incomeType: "salary",
      incomeAmount: 55_000_000,
      pensionSavingsContribution: 6_000_000,
      retirementPensionContribution: 1_000_000,
    });
    expect(result).toMatchObject({
      currentIncomeTaxCredit: 1_050_000,
      additionalContributionToMax: 2_000_000,
      additionalIncomeTaxCreditToMax: 300_000,
      maximumIncomeTaxCredit: 1_350_000,
    });
    published(
      "retirement-pension-tax-credit",
      1_050_000,
      2_000_000,
      300_000,
      1_350_000,
    );
  });

  it("reproduces NTS's KRW 5m business-income example without expense exclusions", () => {
    const result = calculateFreelancerTax({
      grossPayment: d(5_000_000),
      expenseAmount: d(0),
    });
    expect(result.nationalIncomeTax.toNumber()).toBe(150_000);
    expect(result.localIncomeTax.toNumber()).toBe(15_000);
    expect(result.totalWithholding.toNumber()).toBe(165_000);
    expect(result.netPayment.toNumber()).toBe(4_835_000);
    published("freelancer-3-3-tax", 150_000, 15_000, 165_000, 4_835_000);
  });

  it("reverses the ordinary VAT-rate arithmetic", () => {
    const forward = calculateValueAddedTax({
      amount: d(1_000_000),
      taxRate: d(10),
      mode: "exclusive",
    });
    const reverse = calculateValueAddedTax({
      amount: d(1_100_000),
      taxRate: d(10),
      mode: "inclusive",
    });
    expect(forward.taxAmount.toNumber()).toBe(100_000);
    expect(forward.totalAmount.toNumber()).toBe(1_100_000);
    expect(reverse.supplyAmount.toNumber()).toBe(1_000_000);
    expect(reverse.taxAmount.toNumber()).toBe(100_000);
    published("value-added-tax", 100_000, 1_100_000, 1_000_000);
  });

  it("matches marginal-band arithmetic with an explicitly selected income-tax bracket", () => {
    const result = calculateComprehensiveIncomeTax({
      grossIncome: d(20_000_000),
      necessaryExpenses: d(0),
      incomeDeduction: d(0),
      taxRate: d(15),
      progressiveDeduction: d(1_260_000),
      taxCredit: d(0),
      localIncomeTaxRate: d(0),
    });
    expect(result.nationalIncomeTax.toNumber()).toBe(1_740_000);
    expect(result.nationalIncomeTax.toNumber()).toBe(
      14_000_000 * 0.06 + 6_000_000 * 0.15,
    );
    published("comprehensive-income-tax", 1_740_000);
  });

  it("applies entered local withholding to national tax rather than gross payment", () => {
    const result = calculateWithholdingTax({
      grossPayment: d(1_000_000),
      nonTaxableAmount: d(0),
      nationalTaxRate: d(3),
      localIncomeTaxRate: d(10),
    });
    expect(result.nationalIncomeTax.toNumber()).toBe(30_000);
    expect(result.localIncomeTax.toNumber()).toBe(3_000);
    expect(result.totalWithholding.toNumber()).toBe(33_000);
    expect(result.netPayment.toNumber()).toBe(967_000);
    published("withholding-tax", 30_000, 3_000, 33_000, 967_000);
  });
});
