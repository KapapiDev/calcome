import { describe, expect, it } from "vitest";
import { calculateJeonseVsRent } from "./calculate";

const baseInput = {
  jeonseDeposit: 300_000_000,
  jeonseLoanAmount: 200_000_000,
  jeonseLoanAnnualRatePercent: 4,
  monthlyRentDeposit: 30_000_000,
  monthlyRent: 1_200_000,
  opportunityAnnualRatePercent: 3,
  comparisonMonths: 24,
};

describe("calculateJeonseVsRent", () => {
  it("compares financing and opportunity costs over the same period", () => {
    const result = calculateJeonseVsRent(baseInput);
    expect(result.jeonseEquity).toBe(100_000_000);
    expect(result.jeonseLoanInterest).toBe(16_000_000);
    expect(result.jeonseOpportunityCost).toBeCloseTo(6_090_000, -2);
    expect(result.jeonseEconomicCost).toBeCloseTo(22_090_000, -2);
    expect(result.rentDepositOpportunityCost).toBeCloseTo(1_827_000, -2);
    expect(result.rentPayments).toBe(28_800_000);
    expect(result.rentEconomicCost).toBeCloseTo(30_627_000, -2);
    expect(result.costDifference).toBeCloseTo(8_537_000, -2);
    expect(result.cheaperOption).toBe("jeonse");
    expect(result.breakEvenMonthlyRent).toBeCloseTo(844_291.67, 0);
  });

  it("can identify monthly rent as cheaper", () => {
    const result = calculateJeonseVsRent({
      ...baseInput,
      monthlyRent: 600_000,
    });
    expect(result.cheaperOption).toBe("rent");
    expect(result.costDifference).toBeLessThan(0);
  });

  it("handles a fully self-funded jeonse deposit", () => {
    const result = calculateJeonseVsRent({
      ...baseInput,
      jeonseLoanAmount: 0,
    });
    expect(result.jeonseLoanInterest).toBe(0);
    expect(result.jeonseEquity).toBe(baseInput.jeonseDeposit);
  });

  it("rejects invalid values", () => {
    expect(() =>
      calculateJeonseVsRent({ ...baseInput, comparisonMonths: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateJeonseVsRent({ ...baseInput, monthlyRent: -1 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateJeonseVsRent({ ...baseInput, jeonseLoanAmount: 400_000_000 }),
    ).toThrow(RangeError);
  });
});
