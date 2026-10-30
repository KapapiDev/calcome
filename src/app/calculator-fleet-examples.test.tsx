import { calculateLtv as engine0 } from "@/features/ltv/calculate";
import { calculateDsr as engine1 } from "@/features/dsr/calculate";
import { calculateDti as engine2 } from "@/features/dti/calculate";
import { calculateLoan as engine3 } from "@/features/loan/calculate";
import { calculateLoanInterestComparison as engine4 } from "@/features/loan-interest-comparison/calculate";
import { calculateLoanRefinancingSavings as engine5 } from "@/features/loan-refinancing-savings/calculate";
import { calculateBalloonPayment as engine6 } from "@/features/balloon-payment/calculate";
import { calculateMortgagePayment as engine7 } from "@/features/mortgage-payment/calculate";
import { calculateJeonseLoanInterest as engine8 } from "@/features/jeonse-loan-interest/calculate";
import { calculateCreditLoanInterest as engine9 } from "@/features/credit-loan-interest/calculate";
import { calculateEarlyRepaymentFee as engine10 } from "@/features/early-loan-repayment-fee/calculate";
import { calculateLoanAffordability as engine11 } from "@/features/loan-affordability/calculate";
import { calculateDebtRepaymentPeriod as engine12 } from "@/features/debt-repayment-period/calculate";
import { calculateCreditCardInstallmentInterest as engine13 } from "@/features/credit-card-installment-interest/calculate";
import { calculateStressDsr as engine14 } from "@/features/stress-dsr/calculate";
import { calculateMortgageLoanLimit as engine15 } from "@/features/mortgage-loan-limit/calculate";
import { calculateSeverancePay as engine16 } from "@/features/severance-pay/calculate";
import { calculateUnemploymentBenefit as engine17 } from "@/features/unemployment-benefits/calculate";
import { calculateNetSalary as engine18 } from "@/features/net-salary/calculate";
import { calculateHourlyWage as engine19 } from "@/features/hourly-wage/calculate";
import { calculateSocialInsurance as engine20 } from "@/features/social-insurance/calculate";
import { calculateAverageWage as engine21 } from "@/features/average-wage/calculate";
import { calculateSalaryRaise as engine22 } from "@/features/salary-raise/calculate";
import { calculateSalaryConversion as engine23 } from "@/features/salary-conversion/calculate";
import { calculateOvertimePay as engine24 } from "@/features/overtime-pay/calculate";
import { calculateNightWorkPay as engine25 } from "@/features/night-work-pay/calculate";
import { calculateHolidayWorkPay as engine26 } from "@/features/holiday-work-pay/calculate";
import { calculateAnnualLeaveAllowance as engine27 } from "@/features/annual-leave-allowance/calculate";
import { calculateRetirementPension as engine28 } from "@/features/retirement-pension/calculate";
import { calculateGrossUpSalary as engine29 } from "@/features/gross-up-salary/calculate";
import { calculateDailyWorkerPay as engine30 } from "@/features/daily-worker-pay/calculate";
import { calculateTotalCompensationComparison as engine31 } from "@/features/total-compensation-comparison/calculate";
import { calculateSalaryNegotiationTarget as engine32 } from "@/features/salary-negotiation-target/calculate";
import { calculateEmployerTotalLaborCost as engine33 } from "@/features/employer-total-labor-cost/calculate";
import { calculateParentalLeaveBenefit as engine34 } from "@/features/parental-leave-benefit/calculate";
import { calculateMaternityLeaveBenefit as engine35 } from "@/features/maternity-leave-benefit/calculate";
import { calculatePercentage as engine36 } from "@/features/percentage/calculate";
import { calculateDiscountSalePrice as engine37 } from "@/features/discount-sale-price/calculate";
import { calculateAge as engine38 } from "@/features/age/calculate";
import { calculateDDay as engine39 } from "@/features/d-day/calculate";
import { calculateDateDifference as engine40 } from "@/features/date-difference/calculate";
import { calculateRentConversionRate as engine41 } from "@/features/rent-conversion-rate/calculate";
import { calculateJeonseMonthlyRentConversion as engine42 } from "@/features/jeonse-monthly-rent-conversion/calculate";
import { calculateRealEstateBrokerageFee as engine43 } from "@/features/real-estate-brokerage-fee/calculate";
import { calculateJeonseLoanLimit as engine44 } from "@/features/jeonse-loan-limit/calculate";
import { calculateRentAffordability as engine45 } from "@/features/rent-affordability/calculate";
import { calculateJeonseVsRent as engine46 } from "@/features/jeonse-vs-rent/calculate";
import { calculateHomePurchaseTotalCost as engine47 } from "@/features/home-purchase-total-cost/calculate";
import { calculateHomeSaleNetProceeds as engine48 } from "@/features/home-sale-net-proceeds/calculate";
import { calculateRentalYield as engine49 } from "@/features/rental-yield/calculate";
import { calculateApartmentManagementFeeBudget as engine50 } from "@/features/apartment-management-fee-budget/calculate";
import { calculateCompoundInterest as engine51 } from "@/features/compound-interest/calculate";
import { calculateDeposit as engine52 } from "@/features/deposit/calculate";
import { calculateSavings as engine53 } from "@/features/savings/calculate";
import { calculateStockAverageCost as engine54 } from "@/features/stock-average-cost/calculate";
import { calculateStockProfitLoss as engine55 } from "@/features/stock-profit-loss/calculate";
import { calculateDividend as engine56 } from "@/features/dividend/calculate";
import { calculateDividendYieldRate as engine57 } from "@/features/dividend-yield-rate/calculate";
import { calculateDollarCostAveraging as engine58 } from "@/features/dollar-cost-averaging/calculate";
import { calculateSavingsGoal as engine59 } from "@/features/savings-goal/calculate";
import { calculateInvestmentFeeImpact as engine60 } from "@/features/investment-fee-impact/calculate";
import { calculateInflationPurchasingPower as engine61 } from "@/features/inflation-purchasing-power/calculate";
import { calculateEmergencyFund as engine62 } from "@/features/emergency-fund/calculate";
import { calculateFireRetirementTarget as engine63 } from "@/features/fire-retirement-target/calculate";
import { calculateRetirementWithdrawal as engine64 } from "@/features/retirement-withdrawal/calculate";
import { calculatePensionFutureMonthlyIncome as engine65 } from "@/features/pension-future-monthly-income/calculate";
import { calculateDividendReinvestment as engine66 } from "@/features/dividend-reinvestment/calculate";
import { calculatePortfolioRebalancing as engine67 } from "@/features/portfolio-rebalancing/calculate";
import { calculateBondPrice as engine68 } from "@/features/bond-price/calculate";
import { calculateAprApy as engine69 } from "@/features/apr-apy-conversion/calculate";
import { calculateCryptoAverageCost as engine70 } from "@/features/crypto-average-cost/calculate";
import { calculateCryptoProfitLoss as engine71 } from "@/features/crypto-profit-loss/calculate";
import { calculateStakingReward as engine72 } from "@/features/staking-reward/calculate";
import { calculateForeignCurrencyAverageCost as engine73 } from "@/features/foreign-currency-average-cost/calculate";
import { calculateBreakEvenSales as engine74 } from "@/features/break-even-sales/calculate";
import { calculateAcquisitionTax as engine75 } from "@/features/real-estate-acquisition-tax/calculate";
import { calculateCapitalGainsTax as engine76 } from "@/features/capital-gains-tax/calculate";
import { calculateGiftTax as engine77 } from "@/features/gift-tax/calculate";
import { calculateInheritanceTax as engine78 } from "@/features/inheritance-tax/calculate";
import { calculatePropertyTax as engine79 } from "@/features/property-tax/calculate";
import { calculateComprehensiveRealEstateHoldingTax as engine80 } from "@/features/comprehensive-real-estate-holding-tax/calculate";
import { calculateValueAddedTax as engine81 } from "@/features/value-added-tax/calculate";
import { calculateComprehensiveIncomeTax as engine82 } from "@/features/comprehensive-income-tax/calculate";
import { calculateWithholdingTax as engine83 } from "@/features/withholding-tax/calculate";
import { calculateFreelancerTax as engine84 } from "@/features/freelancer-tax/calculate";
import { calculatePensionSavingsTaxCredit as engine85 } from "@/features/pension-savings-tax-credit/calculate";
import { calculateIsaTaxSavings as engine86 } from "@/features/isa-tax-savings/calculate";
import { calculateRetirementPensionTaxCredit as engine87 } from "@/features/retirement-pension-tax-credit/calculate";
import { calculateYearEndTaxRefund as engine88 } from "@/features/year-end-tax-refund/calculate";
import { calculateRetirementIncomeTax as engine89 } from "@/features/retirement-income-tax/calculate";
import { calculateEarnedIncomeWithholdingTax as engine90 } from "@/features/earned-income-withholding-tax/calculate";
import Decimal from "decimal.js";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CalculatorWorkedExample } from "@/components/calculators/calculator-worked-example";
import {
  calculatorExamples,
  calculatorExampleSources,
} from "@/content/calculator-examples";
import { allPublishedCalculators } from "@/config/calculator-directory";
import fixtures from "./calculator-fleet-examples.cases.json";
import sitemap from "./sitemap";

type ExampleCase = {
  slug: string;
  input?: unknown;
  args?: unknown[];
  d?: string[];
  expected: Record<string, string | number | boolean | null> | null;
  tolerance?: number;
  published: { ko: string; en: string };
};
const engines = {
  ltv: engine0,
  dsr: engine1,
  dti: engine2,
  loan: engine3,
  "loan-interest-comparison": engine4,
  "loan-refinancing-savings": engine5,
  "balloon-payment": engine6,
  "mortgage-payment": engine7,
  "jeonse-loan-interest": engine8,
  "credit-loan-interest": engine9,
  "early-loan-repayment-fee": engine10,
  "loan-affordability": engine11,
  "debt-repayment-period": engine12,
  "credit-card-installment-interest": engine13,
  "stress-dsr": engine14,
  "mortgage-loan-limit": engine15,
  "severance-pay": engine16,
  "unemployment-benefits": engine17,
  "net-salary": engine18,
  "hourly-wage": engine19,
  "social-insurance": engine20,
  "average-wage": engine21,
  "salary-raise": engine22,
  "salary-conversion": engine23,
  "overtime-pay": engine24,
  "night-work-pay": engine25,
  "holiday-work-pay": engine26,
  "annual-leave-allowance": engine27,
  "retirement-pension": engine28,
  "gross-up-salary": engine29,
  "daily-worker-pay": engine30,
  "total-compensation-comparison": engine31,
  "salary-negotiation-target": engine32,
  "employer-total-labor-cost": engine33,
  "parental-leave-benefit": engine34,
  "maternity-leave-benefit": engine35,
  percentage: engine36,
  "discount-sale-price": engine37,
  age: engine38,
  "d-day": engine39,
  "date-difference": engine40,
  "rent-conversion-rate": engine41,
  "jeonse-monthly-rent-conversion": engine42,
  "real-estate-brokerage-fee": engine43,
  "jeonse-loan-limit": engine44,
  "rent-affordability": engine45,
  "jeonse-vs-rent": engine46,
  "home-purchase-total-cost": engine47,
  "home-sale-net-proceeds": engine48,
  "rental-yield": engine49,
  "apartment-management-fee-budget": engine50,
  "compound-interest": engine51,
  "fixed-deposit": engine52,
  savings: engine53,
  "stock-average-cost": engine54,
  "stock-profit-loss": engine55,
  dividend: engine56,
  "dividend-yield": engine57,
  "dollar-cost-averaging": engine58,
  "savings-goal": engine59,
  "investment-fee-impact": engine60,
  "inflation-purchasing-power": engine61,
  "emergency-fund": engine62,
  "fire-retirement-target": engine63,
  "retirement-withdrawal": engine64,
  "pension-future-monthly-income": engine65,
  "dividend-reinvestment": engine66,
  "portfolio-rebalancing": engine67,
  "bond-price": engine68,
  "apr-apy-conversion": engine69,
  "crypto-average-cost": engine70,
  "crypto-profit-loss": engine71,
  "staking-reward": engine72,
  "foreign-currency-average-cost": engine73,
  "break-even-sales": engine74,
  "real-estate-acquisition-tax": engine75,
  "capital-gains-tax": engine76,
  "gift-tax": engine77,
  "inheritance-tax": engine78,
  "property-tax": engine79,
  "comprehensive-real-estate-holding-tax": engine80,
  "value-added-tax": engine81,
  "comprehensive-income-tax": engine82,
  "withholding-tax": engine83,
  "freelancer-3-3-tax": engine84,
  "pension-savings-tax-credit": engine85,
  "isa-tax-savings": engine86,
  "retirement-pension-tax-credit": engine87,
  "year-end-tax-refund": engine88,
  "retirement-income-tax": engine89,
  "earned-income-withholding-tax": engine90,
} as unknown as Record<string, (...args: unknown[]) => unknown>;
const at = (value: unknown, path: string): unknown =>
  path
    .split(".")
    .reduce<unknown>(
      (current, key) => (current as Record<string, unknown> | null)?.[key],
      value,
    );

describe("remaining calculator worked-example release", () => {
  it("covers exactly the remaining 91 pages without duplicating the five pilots or four existing guides", () => {
    const retained = new Set([
      "currency-conversion",
      "cagr",
      "work-hours-converter",
      "weekly-holiday-pay",
      "minimum-wage",
      "business-cash-runway",
      "operating-profit",
      "part-time-monthly-pay",
      "bond-yield-to-maturity",
    ]);
    const expected = allPublishedCalculators
      .map((c) => c.href.split("/").at(-1)!)
      .filter((slug) => !retained.has(slug))
      .sort();
    expect(allPublishedCalculators).toHaveLength(100);
    expect(Object.keys(calculatorExamples).sort()).toEqual(expected);
    expect(fixtures.map((c) => c.slug).sort()).toEqual(expected);
  });

  it.each(fixtures as ExampleCase[])(
    "reproduces the published $slug example with the real engine",
    (c) => {
      const input = structuredClone(c.input);
      for (const field of c.d || []) {
        const keys = field.split(".");
        const parent = (
          keys.length === 1 ? input : at(input, keys.slice(0, -1).join("."))
        ) as Record<string, unknown>;
        parent[keys.at(-1)!] = new Decimal(
          parent[keys.at(-1)!] as Decimal.Value,
        );
      }
      const result = engines[c.slug](...(c.args || [input]));
      if (c.expected === null) expect(result).toBeNull();
      else
        for (const [field, expected] of Object.entries(c.expected)) {
          const actual = at(result, field);
          if (typeof expected === "number") {
            expect(Number.isFinite(Number(actual)), c.slug + ": " + field).toBe(
              true,
            );
            expect(
              Math.abs(Number(actual) - expected),
              c.slug + ": " + field,
            ).toBeLessThanOrEqual(c.tolerance ?? 1e-6);
          } else expect(actual, c.slug + ": " + field).toBe(expected);
        }
      for (const locale of ["ko", "en"] as const)
        expect(calculatorExamples[c.slug][locale].example).toBe(
          c.published[locale],
        );
    },
  );

  it.each(["ko", "en"] as const)(
    "renders readable %s explanations with valid localized destinations and references",
    (locale) => {
      const paths = new Set(sitemap().map(({ url }) => new URL(url).pathname));
      for (const [slug, entry] of Object.entries(calculatorExamples)) {
        const holder = document.createElement("div");
        holder.innerHTML = renderToStaticMarkup(
          <CalculatorWorkedExample slug={slug} locale={locale} />,
        );
        const section = holder.querySelector("section")!;
        expect(section.getAttribute("data-calculator-example")).toBe(slug);
        const label = section.getAttribute("aria-labelledby")!;
        expect(holder.querySelector("#" + label)?.textContent).toBeTruthy();
        for (const copy of Object.values(entry[locale]))
          expect(section.textContent).toContain(copy);
        expect(holder.querySelector("time")?.getAttribute("datetime")).toBe(
          "2026-10-30",
        );
        expect(entry.related.length).toBeGreaterThan(0);
        for (const link of holder.querySelectorAll('a[href^="/"]')) {
          const href = link.getAttribute("href")!;
          expect(paths.has(href), slug + ": " + href).toBe(true);
          expect(href.startsWith("/" + locale + "/"), href).toBe(true);
          expect(link.textContent?.trim()).toBeTruthy();
        }
        for (const source of entry.sources) {
          expect(calculatorExampleSources[source], source).toBeDefined();
          expect(
            Array.from(holder.querySelectorAll("a")).map((link) =>
              link.getAttribute("href"),
            ),
            slug + ": " + source,
          ).toContain(calculatorExampleSources[source].href);
        }
        if (locale === "en")
          expect(section.textContent, slug).not.toMatch(/[가-힣]/);
      }
    },
  );
});
