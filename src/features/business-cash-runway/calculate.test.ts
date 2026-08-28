import { describe, expect, it } from "vitest";
import {
  calculateBusinessCashRunway,
  estimateRunwayEndDate,
} from "./calculate";

describe("calculateBusinessCashRunway", () => {
  it("calculates monthly burn, runway, and adjustment scenarios", () => {
    const result = calculateBusinessCashRunway({
      startingCash: 120_000,
      monthlyInflow: 20_000,
      monthlyOutflow: 50_000,
    });

    expect(result.monthlyNetBurn).toBe(30_000);
    expect(result.runwayMonths).toBe(4);
    expect(result.increasedInflowRunwayMonths).toBeCloseTo(4.285714, 6);
    expect(result.reducedOutflowRunwayMonths).toBeCloseTo(4.8, 10);
    expect(result.lowRunway).toBe(false);
  });

  it("returns a non-consuming state when inflow covers outflow", () => {
    const result = calculateBusinessCashRunway({
      startingCash: 50_000,
      monthlyInflow: 60_000,
      monthlyOutflow: 50_000,
    });

    expect(result.monthlyNetBurn).toBe(-10_000);
    expect(result.runwayMonths).toBeNull();
    expect(result.increasedInflowRunwayMonths).toBeNull();
    expect(result.reducedOutflowRunwayMonths).toBeNull();
    expect(result.lowRunway).toBe(false);
  });

  it("warns below three months and rejects invalid boundaries", () => {
    const result = calculateBusinessCashRunway({
      startingCash: 20_000,
      monthlyInflow: 0,
      monthlyOutflow: 10_000,
    });
    expect(result.runwayMonths).toBe(2);
    expect(result.lowRunway).toBe(true);

    expect(() =>
      calculateBusinessCashRunway({
        startingCash: -1,
        monthlyInflow: 0,
        monthlyOutflow: 10_000,
      }),
    ).toThrow(RangeError);
    expect(() =>
      calculateBusinessCashRunway({
        startingCash: 10_000,
        monthlyInflow: 0,
        monthlyOutflow: 0,
      }),
    ).toThrow(RangeError);
  });

  it("estimates the runway end date from the calculated month span", () => {
    const end = estimateRunwayEndDate(3, new Date("2026-01-01T00:00:00.000Z"));
    expect(end?.getUTCFullYear()).toBe(2026);
    expect(end?.getUTCMonth()).toBe(3);
    expect(estimateRunwayEndDate(null, new Date())).toBeNull();
  });
});
