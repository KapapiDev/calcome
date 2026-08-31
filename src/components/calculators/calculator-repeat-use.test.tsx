/* @vitest-environment jsdom */

import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getRepeatUseSnapshot,
  recordRecentCalculator,
  toggleCalculatorFavorite,
} from "@/components/calculators/calculator-repeat-use";

describe("calculator repeat-use storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("stores only calculator identifiers and keeps recent use unique and bounded", () => {
    for (const id of ["a", "b", "c", "d", "e", "f", "g", "c"]) {
      recordRecentCalculator(id);
    }

    expect(getRepeatUseSnapshot()).toEqual({
      favorites: [],
      recent: ["c", "g", "f", "e", "d", "b"],
    });
  });

  it("toggles favorites by shared calculator id across locale routes", () => {
    expect(toggleCalculatorFavorite("compound-interest")).toBe(true);
    expect(getRepeatUseSnapshot().favorites).toEqual(["compound-interest"]);
    expect(toggleCalculatorFavorite("compound-interest")).toBe(false);
    expect(getRepeatUseSnapshot().favorites).toEqual([]);
  });

  it("keeps storage failures non-fatal", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage unavailable");
    });

    expect(() => recordRecentCalculator("compound-interest")).not.toThrow();
    expect(() => toggleCalculatorFavorite("compound-interest")).not.toThrow();
  });
});
