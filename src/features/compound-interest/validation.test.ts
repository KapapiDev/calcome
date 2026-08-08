import { describe, expect, it } from "vitest";

import { DEFAULT_COMPOUND_INTEREST_VALUES } from "./constants";
import { validateCompoundInterestForm } from "./validation";

describe("validateCompoundInterestForm", () => {
  it("accepts approved defaults with advanced settings disabled", () => {
    const result = validateCompoundInterestForm(
      DEFAULT_COMPOUND_INTEREST_VALUES,
    );

    expect(result.errors).toEqual({});
    expect(result.data).toMatchObject({
      durationYears: 10,
      inflationRate: null,
      taxRate: null,
    });
  });

  it("accepts approved maximum values", () => {
    const result = validateCompoundInterestForm({
      ...DEFAULT_COMPOUND_INTEREST_VALUES,
      initialPrincipal: "100,000,000,000",
      recurringContribution: "1,000,000,000",
      durationYears: "100",
      annualInterestRate: "100",
      inflationRate: "100",
      taxRate: "100",
    });

    expect(result.errors).toEqual({});
    expect(result.data?.initialPrincipal).toBe("100000000000");
  });

  it("rejects fractional years and out-of-range values", () => {
    const result = validateCompoundInterestForm({
      ...DEFAULT_COMPOUND_INTEREST_VALUES,
      durationYears: "1.5",
      annualInterestRate: "100.1",
      initialPrincipal: "100000000001",
    });

    expect(result.errors.durationYears).toBeDefined();
    expect(result.errors.annualInterestRate).toBeDefined();
    expect(result.errors.initialPrincipal).toBeDefined();
  });

  it("requires a positive principal or recurring contribution", () => {
    const result = validateCompoundInterestForm({
      ...DEFAULT_COMPOUND_INTEREST_VALUES,
      initialPrincipal: "0",
      recurringContribution: "0",
    });

    expect(result.data).toBeUndefined();
    expect(result.errors.initialPrincipal).toMatch(/하나는 0보다 커야/);
    expect(result.errors.recurringContribution).toMatch(/하나는 0보다 커야/);
  });

  it("rejects malformed numeric input", () => {
    const result = validateCompoundInterestForm({
      ...DEFAULT_COMPOUND_INTEREST_VALUES,
      initialPrincipal: "1,00",
      recurringContribution: "-1",
      taxRate: "abc",
    });

    expect(result.errors.initialPrincipal).toBeDefined();
    expect(result.errors.recurringContribution).toBeDefined();
    expect(result.errors.taxRate).toBeDefined();
  });

  it("rejects empty required fields and unsupported enum values", () => {
    const result = validateCompoundInterestForm({
      ...DEFAULT_COMPOUND_INTEREST_VALUES,
      initialPrincipal: "",
      durationYears: "",
      contributionFrequency: "weekly" as "monthly",
      compoundingFrequency: "weekly" as "monthly",
      contributionTiming: "middle" as "end",
    });

    expect(result.errors.initialPrincipal).toBeDefined();
    expect(result.errors.durationYears).toBeDefined();
    expect(result.errors.contributionFrequency).toBeDefined();
    expect(result.errors.compoundingFrequency).toBeDefined();
    expect(result.errors.contributionTiming).toBeDefined();
  });
});
