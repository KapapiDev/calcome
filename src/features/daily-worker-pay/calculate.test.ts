import { describe, expect, it } from "vitest";
import { calculateDailyWorkerPay } from "./calculate";

describe("calculateDailyWorkerPay", () => {
  it("matches the National Tax Service 200,000 KRW daily-wage example", () => {
    const result = calculateDailyWorkerPay({
      dailyGrossPay: 200_000,
      workDays: 5,
      nonTaxableDailyPay: 0,
    });

    expect(result.taxableDailyPay).toBe(200_000);
    expect(result.dailyEarnedIncome).toBe(50_000);
    expect(result.dailyIncomeTaxBeforeSmallCollection).toBe(1_350);
    expect(result.incomeTax).toBe(6_750);
    expect(result.localIncomeTax).toBe(670);
    expect(result.totalWithholding).toBe(7_420);
    expect(result.estimatedNetPay).toBe(992_580);
  });

  it("applies the under-1,000 KRW small-collection rule to one payment", () => {
    const oneDay = calculateDailyWorkerPay({
      dailyGrossPay: 187_000,
      workDays: 1,
      nonTaxableDailyPay: 0,
    });
    const fiveDaysPaidTogether = calculateDailyWorkerPay({
      dailyGrossPay: 187_000,
      workDays: 5,
      nonTaxableDailyPay: 0,
    });

    expect(oneDay.calculatedIncomeTaxBeforeSmallCollection).toBe(999);
    expect(oneDay.smallCollectionExemptionApplied).toBe(true);
    expect(oneDay.incomeTax).toBe(0);
    expect(oneDay.localIncomeTax).toBe(0);
    expect(fiveDaysPaidTogether.calculatedIncomeTaxBeforeSmallCollection).toBe(
      4_995,
    );
    expect(fiveDaysPaidTogether.smallCollectionExemptionApplied).toBe(false);
    expect(fiveDaysPaidTogether.incomeTax).toBe(4_995);
    expect(fiveDaysPaidTogether.localIncomeTax).toBe(490);
  });

  it("subtracts non-taxable daily pay before the 150,000 KRW daily deduction", () => {
    const result = calculateDailyWorkerPay({
      dailyGrossPay: 200_000,
      workDays: 3,
      nonTaxableDailyPay: 50_000,
    });

    expect(result.taxableDailyPay).toBe(150_000);
    expect(result.incomeTax).toBe(0);
    expect(result.totalNonTaxablePay).toBe(150_000);
    expect(result.estimatedNetPay).toBe(600_000);
  });

  it("rejects invalid workday and pay inputs", () => {
    expect(() =>
      calculateDailyWorkerPay({
        dailyGrossPay: 200_000,
        workDays: 0,
        nonTaxableDailyPay: 0,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateDailyWorkerPay({
        dailyGrossPay: 100_000,
        workDays: 1,
        nonTaxableDailyPay: 120_000,
      }),
    ).toThrow(RangeError);
  });
});
