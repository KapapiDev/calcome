import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { calculateLoan } from "@/features/loan/calculate";
import { calculateLoanRefinancingSavings } from "@/features/loan-refinancing-savings/calculate";
import { calculateInvestmentFeeImpact } from "@/features/investment-fee-impact/calculate";
import {
  costGuideSlugs,
  costGuideContent,
} from "@/content/cost-comparison-guides";
import { guideComparisons } from "@/content/guide-comparisons";
import { guidePublishedOn } from "@/content/guides";
import GuidePage from "../[locale]/guides/[slug]/page";

describe("reproducible cost comparisons", () => {
  it("rounds the interest difference after subtracting unrounded loan results", () => {
    const input = {
      loanAmount: "100000000",
      annualInterestRate: "4",
      repaymentType: "equal-payment" as const,
    };
    const shorter = calculateLoan({ ...input, months: 120 });
    const longer = calculateLoan({ ...input, months: 360 });
    const delta = new Decimal(longer.totalInterest)
      .minus(shorter.totalInterest)
      .toDecimalPlaces(0)
      .toNumber();
    expect(delta).toBe(50_375_341);
    for (const locale of ["ko", "en"] as const)
      expect(
        costGuideContent["loan-term-total-interest"][locale].sections[1][1],
      ).toContain("50,375,341");
  });
  it.each([
    [120, 1012451, 21494166],
    [240, 605980, 45435279],
    [360, 477415, 71869506],
  ])("reproduces the %i-month loan scenario", (months, payment, interest) => {
    const result = calculateLoan({
      loanAmount: "100000000",
      annualInterestRate: "4",
      months,
      repaymentType: "equal-payment",
    });
    expect(Math.round(Number(result.monthlyPayment))).toBe(payment);
    expect(Math.round(Number(result.totalInterest))).toBe(interest);
    // Independent monthly cash-flow balance check with rounded output tolerance.
    let balance = 100000000;
    for (let month = 0; month < months; month++)
      balance = balance * (1 + 0.04 / 12) - Number(result.monthlyPayment);
    expect(Math.abs(balance)).toBeLessThan(0.01);
  });
  it.each([
    [0, 0, 5784452],
    [1000000, 21, 4784452],
    [3000000, 63, 2784452],
  ])("reproduces refinancing with cost %i", (cost, payments, net) => {
    const result = calculateLoanRefinancingSavings({
      remainingBalance: new Decimal(100000000),
      currentAnnualRate: new Decimal(5),
      newAnnualRate: new Decimal(4),
      remainingMonths: 120,
      refinancingCosts: new Decimal(cost),
    });
    expect(result.monthlySavings.toDecimalPlaces(0).toNumber()).toBe(48204);
    expect(result.netSavings.toDecimalPlaces(0).toNumber()).toBe(net);
    expect(Math.ceil(result.breakEvenMonths!.toNumber())).toBe(payments);
    if (payments > 0) {
      expect(result.monthlySavings.mul(payments).gte(cost)).toBe(true);
      expect(result.monthlySavings.mul(payments - 1).lt(cost)).toBe(true);
    }
  });
  it.each([
    [0, 27126403, 0],
    [0.5, 24554664, 2571739],
    [1, 22225821, 4900582],
  ])("reproduces annual fee %s", (fee, ending, loss) => {
    const result = calculateInvestmentFeeImpact({
      initialInvestment: 10000000,
      monthlyContribution: 0,
      annualReturnPercent: 5,
      annualFeePercent: fee,
      years: 20,
    });
    expect(Math.round(result.endingBalanceAfterFees)).toBe(ending);
    expect(Math.round(result.feeImpactAmount)).toBe(loss);
    let independentBalance = 10000000;
    for (let month = 0; month < 240; month++)
      independentBalance += (independentBalance * (5 - fee)) / 1200;
    expect(result.endingBalanceAfterFees).toBeCloseTo(independentBalance, 4);
  });
  for (const slug of costGuideSlugs) {
    for (const locale of ["ko", "en"] as const) {
      it(`renders ${locale}/${slug} with assumptions, dated sources and exact comparison cells`, async () => {
        const { container } = render(
          await GuidePage({ params: Promise.resolve({ slug, locale }) }),
        );
        for (const row of guideComparisons[slug][locale].rows) {
          for (const cell of row)
            expect(screen.getAllByText(cell).length).toBeGreaterThan(0);
        }
        expect(guidePublishedOn[slug]).toBe("2026-11-02");
        expect(container.querySelector("[data-source-scope]")).toBeTruthy();
        expect(container.querySelectorAll("h1")).toHaveLength(1);
      });
    }
  }
});
