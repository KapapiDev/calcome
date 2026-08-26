import { describe, expect, it } from "vitest";
import {
  calculateEmployerTotalLaborCost,
  EMPLOYER_RATES_2026,
} from "./calculate";

describe("calculateEmployerTotalLaborCost", () => {
  it("calculates the 2026 employer contribution estimate", () => {
    const result = calculateEmployerTotalLaborCost({
      monthlyWage: 3000000,
      employmentTrainingRate: 0.25,
      industrialAccidentRate: 0,
      includeRetirementProvision: true,
    });

    expect(EMPLOYER_RATES_2026.nationalPension).toBe(4.75);
    expect(EMPLOYER_RATES_2026.healthAndLongTermCare).toBe(4.0674);
    expect(result.nationalPension).toBeCloseTo(142500);
    expect(result.healthAndLongTermCare).toBeCloseTo(122022);
    expect(result.employmentInsurance).toBeCloseTo(34500);
    expect(result.retirementProvision).toBeCloseTo(250000);
    expect(result.monthlyTotalLaborCost).toBeCloseTo(3549022);
    expect(result.annualTotalLaborCost).toBeCloseTo(42588264);
  });

  it("adds a user-supplied industrial accident insurance rate", () => {
    const withoutRate = calculateEmployerTotalLaborCost({
      monthlyWage: 3000000,
      employmentTrainingRate: 0.25,
      industrialAccidentRate: 0,
      includeRetirementProvision: false,
    });
    const withRate = calculateEmployerTotalLaborCost({
      monthlyWage: 3000000,
      employmentTrainingRate: 0.25,
      industrialAccidentRate: 1.2,
      includeRetirementProvision: false,
    });

    expect(
      withRate.monthlyTotalLaborCost - withoutRate.monthlyTotalLaborCost,
    ).toBeCloseTo(36000);
  });

  it("rejects invalid values", () => {
    expect(() =>
      calculateEmployerTotalLaborCost({
        monthlyWage: 0,
        employmentTrainingRate: 0.25,
        industrialAccidentRate: 0,
        includeRetirementProvision: true,
      }),
    ).toThrow(RangeError);
  });
});
