import { describe, expect, it } from "vitest";
import { calculateHomePurchaseTotalCost } from "./calculate";

const baseInput = {
  purchasePrice: 600_000_000,
  loanAmount: 400_000_000,
  acquisitionTax: 12_000_000,
  brokerageFee: 3_000_000,
  registrationLegalCost: 1_500_000,
  loanAppraisalCost: 1_000_000,
  movingSetupCost: 2_000_000,
  renovationFurnitureCost: 10_000_000,
  otherCost: 1_500_000,
};

describe("calculateHomePurchaseTotalCost", () => {
  it("adds purchase-related costs and estimates cash required", () => {
    const result = calculateHomePurchaseTotalCost(baseInput);

    expect(result.transactionCosts).toBe(31_000_000);
    expect(result.totalPurchaseCost).toBe(631_000_000);
    expect(result.estimatedCashRequired).toBe(231_000_000);
    expect(result.additionalCostRatePercent).toBeCloseTo(5.1666667, 6);
    expect(result.financedSharePercent).toBeCloseTo(66.6666667, 6);
  });

  it("supports an all-cash purchase", () => {
    const result = calculateHomePurchaseTotalCost({
      ...baseInput,
      loanAmount: 0,
    });

    expect(result.estimatedCashRequired).toBe(result.totalPurchaseCost);
    expect(result.financedSharePercent).toBe(0);
  });

  it("allows zero optional purchase costs", () => {
    const result = calculateHomePurchaseTotalCost({
      ...baseInput,
      acquisitionTax: 0,
      brokerageFee: 0,
      registrationLegalCost: 0,
      loanAppraisalCost: 0,
      movingSetupCost: 0,
      renovationFurnitureCost: 0,
      otherCost: 0,
    });

    expect(result.transactionCosts).toBe(0);
    expect(result.totalPurchaseCost).toBe(baseInput.purchasePrice);
  });

  it("rejects invalid price, negative costs, and excessive loan amounts", () => {
    expect(() =>
      calculateHomePurchaseTotalCost({ ...baseInput, purchasePrice: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateHomePurchaseTotalCost({ ...baseInput, acquisitionTax: -1 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateHomePurchaseTotalCost({
        ...baseInput,
        loanAmount: baseInput.purchasePrice + 1,
      }),
    ).toThrow(RangeError);
  });
});
