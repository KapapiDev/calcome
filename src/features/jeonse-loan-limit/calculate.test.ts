import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateJeonseLoanLimit } from "./calculate";

const d = (value: number) => new Decimal(value);

function baseInput() {
  return {
    deposit: d(300_000_000),
    requestedAmount: d(220_000_000),
    existingGuaranteeBalance: d(0),
    recognizedAnnualIncome: d(250_000_000),
    annualDebtService: d(20_000_000),
    repaymentPreferenceAmount: d(0),
    oneHomeHousehold: false,
    capitalOrRegulatedArea: false,
  };
}

describe("calculateJeonseLoanLimit", () => {
  it("uses the smallest of subject, funding, and repayment limits", () => {
    const result = calculateJeonseLoanLimit(baseInput());
    expect(result.subjectLimit.toNumber()).toBe(400_000_000);
    expect(result.fundingLimit.toNumber()).toBe(220_000_000);
    expect(result.repaymentLimit.toNumber()).toBe(230_000_000);
    expect(result.areaAdjustedLimit.toNumber()).toBe(220_000_000);
    expect(result.limitingFactor).toBe("funding");
  });

  it("applies the 8/9 area adjustment after deriving the minimum limit", () => {
    const result = calculateJeonseLoanLimit({
      ...baseInput(),
      requestedAmount: d(300_000_000),
      capitalOrRegulatedArea: true,
    });
    expect(result.rawLimit.toNumber()).toBe(230_000_000);
    expect(result.areaAdjustedLimit.toNumber()).toBeCloseTo(
      204_444_444.44444445,
    );
  });

  it("uses the 180 million KRW subject cap for a one-home household in the capital or regulated area", () => {
    const result = calculateJeonseLoanLimit({
      ...baseInput(),
      requestedAmount: d(300_000_000),
      oneHomeHousehold: true,
      capitalOrRegulatedArea: true,
    });
    expect(result.subjectLimit.toNumber()).toBe(180_000_000);
    expect(result.areaAdjustedLimit.toNumber()).toBe(160_000_000);
    expect(result.limitingFactor).toBe("subject");
  });

  it("subtracts an existing guarantee balance from all published balance-based limits", () => {
    const result = calculateJeonseLoanLimit({
      ...baseInput(),
      requestedAmount: d(300_000_000),
      existingGuaranteeBalance: d(50_000_000),
    });
    expect(result.subjectLimit.toNumber()).toBe(350_000_000);
    expect(result.fundingLimit.toNumber()).toBe(190_000_000);
    expect(result.repaymentLimit.toNumber()).toBe(180_000_000);
    expect(result.areaAdjustedLimit.toNumber()).toBe(180_000_000);
  });

  it("rejects negative monetary inputs", () => {
    expect(() =>
      calculateJeonseLoanLimit({ ...baseInput(), deposit: d(-1) }),
    ).toThrow(RangeError);
  });
});
