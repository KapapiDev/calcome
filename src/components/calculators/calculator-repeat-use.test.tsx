/* @vitest-environment jsdom */

import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  clearCalculatorFavorites,
  clearRecentCalculators,
  clearRepeatUseShortcuts,
  getRepeatUseSnapshot,
  reconcileRepeatUseCalculators,
  recordRecentCalculator,
  removeCalculatorFavorite,
  removeRecentCalculator,
  subscribeRepeatUse,
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

  it("removes favorites directly without changing recent history", () => {
    toggleCalculatorFavorite("compound-interest");
    toggleCalculatorFavorite("vat");
    recordRecentCalculator("compound-interest");

    removeCalculatorFavorite("compound-interest");

    expect(getRepeatUseSnapshot()).toEqual({
      favorites: ["vat"],
      recent: ["compound-interest"],
    });
  });

  it("clears favorites independently from recent history", () => {
    toggleCalculatorFavorite("compound-interest");
    toggleCalculatorFavorite("vat");
    recordRecentCalculator("salary");

    clearCalculatorFavorites();

    expect(getRepeatUseSnapshot()).toEqual({
      favorites: [],
      recent: ["salary"],
    });
  });

  it("removes one recent calculator or clears recent history without touching favorites", () => {
    toggleCalculatorFavorite("compound-interest");
    recordRecentCalculator("compound-interest");
    recordRecentCalculator("vat");
    recordRecentCalculator("salary");

    removeRecentCalculator("vat");
    expect(getRepeatUseSnapshot()).toEqual({
      favorites: ["compound-interest"],
      recent: ["salary", "compound-interest"],
    });

    clearRecentCalculators();
    expect(getRepeatUseSnapshot()).toEqual({
      favorites: ["compound-interest"],
      recent: [],
    });
  });

  it("clears all repeat-use shortcuts in one management action", () => {
    toggleCalculatorFavorite("compound-interest");
    recordRecentCalculator("vat");

    clearRepeatUseShortcuts();

    expect(getRepeatUseSnapshot()).toEqual({ favorites: [], recent: [] });
  });

  it("removes stale calculator ids while preserving valid order", () => {
    window.localStorage.setItem(
      "calcome:favorite-calculators:v1",
      JSON.stringify(["retired", "compound-interest", "vat"]),
    );
    window.localStorage.setItem(
      "calcome:recent-calculators:v1",
      JSON.stringify(["salary", "retired", "vat"]),
    );

    expect(
      reconcileRepeatUseCalculators(["compound-interest", "vat", "salary"]),
    ).toBe(true);
    expect(getRepeatUseSnapshot()).toEqual({
      favorites: ["compound-interest", "vat"],
      recent: ["salary", "vat"],
    });
    expect(
      reconcileRepeatUseCalculators(["compound-interest", "vat", "salary"]),
    ).toBe(false);
  });

  it("keeps malformed stale storage non-fatal and recoverable", () => {
    window.localStorage.setItem("calcome:favorite-calculators:v1", "{broken");
    window.localStorage.setItem(
      "calcome:recent-calculators:v1",
      JSON.stringify([null, "", "salary", "salary", 42]),
    );

    expect(() =>
      reconcileRepeatUseCalculators(["compound-interest", "salary"]),
    ).not.toThrow();
    expect(getRepeatUseSnapshot()).toEqual({
      favorites: [],
      recent: ["salary"],
    });
  });

  it("keeps storage failures non-fatal", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage unavailable");
    });

    expect(() => recordRecentCalculator("compound-interest")).not.toThrow();
    expect(() => toggleCalculatorFavorite("compound-interest")).not.toThrow();
    expect(() => removeRecentCalculator("compound-interest")).not.toThrow();
    expect(() => removeCalculatorFavorite("compound-interest")).not.toThrow();
    expect(() => clearRecentCalculators()).not.toThrow();
    expect(() => clearCalculatorFavorites()).not.toThrow();
    expect(() => clearRepeatUseShortcuts()).not.toThrow();
  });

  it("shares one pair of global listeners across repeat-use subscribers", () => {
    const addEventListener = vi.spyOn(window, "addEventListener");
    const removeEventListener = vi.spyOn(window, "removeEventListener");

    const unsubscribeFirst = subscribeRepeatUse(vi.fn());
    const unsubscribeSecond = subscribeRepeatUse(vi.fn());
    const unsubscribeThird = subscribeRepeatUse(vi.fn());

    expect(
      addEventListener.mock.calls.filter(
        ([type]) => type === "calcome:repeat-use",
      ),
    ).toHaveLength(1);
    expect(
      addEventListener.mock.calls.filter(([type]) => type === "storage"),
    ).toHaveLength(1);

    unsubscribeFirst();
    unsubscribeSecond();
    unsubscribeThird();

    expect(
      removeEventListener.mock.calls.filter(
        ([type]) => type === "calcome:repeat-use",
      ),
    ).toHaveLength(1);
    expect(
      removeEventListener.mock.calls.filter(([type]) => type === "storage"),
    ).toHaveLength(1);
  });
});
