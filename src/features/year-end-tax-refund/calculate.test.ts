import { describe, expect, it } from "vitest";
import { calculateYearEndTaxRefund } from "./calculate";

describe("calculateYearEndTaxRefund", () => {
  it("returns a refund when prepaid tax exceeds determined tax", () => {
    const result = calculateYearEndTaxRefund({
      determinedIncomeTax: 1_200_000,
      prepaidIncomeTax: 1_500_000,
      specialPaymentTax: 0,
    });

    expect(result.settlementTax).toBe(-300_000);
    expect(result.refundAmount).toBe(300_000);
    expect(result.additionalPayment).toBe(0);
  });

  it("returns additional payment when determined tax exceeds prepaid tax", () => {
    const result = calculateYearEndTaxRefund({
      determinedIncomeTax: 1_800_000,
      prepaidIncomeTax: 1_500_000,
      specialPaymentTax: 100_000,
    });

    expect(result.prepaidAfterSpecialPayment).toBe(1_600_000);
    expect(result.settlementTax).toBe(200_000);
    expect(result.refundAmount).toBe(0);
    expect(result.additionalPayment).toBe(200_000);
  });

  it("returns zero settlement when determined and prepaid tax match", () => {
    const result = calculateYearEndTaxRefund({
      determinedIncomeTax: 1_500_000,
      prepaidIncomeTax: 1_400_000,
      specialPaymentTax: 100_000,
    });

    expect(result.settlementTax).toBe(0);
    expect(result.refundAmount).toBe(0);
    expect(result.additionalPayment).toBe(0);
  });
});
