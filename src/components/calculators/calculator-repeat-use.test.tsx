/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  CalculatorRepeatUseShortcuts,
  clearCalculatorFavorites,
  clearRecentCalculators,
  clearRepeatUseShortcuts,
  getRepeatUseSnapshot,
  moveCalculatorFavorite,
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

  it("reorders favorites deliberately without changing recent history", () => {
    toggleCalculatorFavorite("salary");
    toggleCalculatorFavorite("vat");
    toggleCalculatorFavorite("compound-interest");
    recordRecentCalculator("salary");
    recordRecentCalculator("vat");

    expect(moveCalculatorFavorite("vat", -1)).toBe(true);
    expect(getRepeatUseSnapshot()).toEqual({
      favorites: ["vat", "compound-interest", "salary"],
      recent: ["vat", "salary"],
    });

    expect(moveCalculatorFavorite("vat", -1)).toBe(false);
    expect(moveCalculatorFavorite("salary", 1)).toBe(false);
    expect(moveCalculatorFavorite("missing", 1)).toBe(false);
    expect(getRepeatUseSnapshot()).toEqual({
      favorites: ["vat", "compound-interest", "salary"],
      recent: ["vat", "salary"],
    });
  });

  it("exposes bilingual keyboard-accessible favorite ordering controls with mobile touch targets", () => {
    toggleCalculatorFavorite("vat");
    toggleCalculatorFavorite("compound-interest");

    const calculators = [
      {
        id: "compound-interest",
        name: "Compound Interest",
        href: "/en/finance/compound-interest",
      },
      { id: "vat", name: "VAT", href: "/en/business/vat" },
    ];
    const { rerender } = render(
      <CalculatorRepeatUseShortcuts calculators={calculators} locale="en" />,
    );

    const moveVatEarlier = screen.getByRole("button", {
      name: "Move VAT earlier in favorites",
    });
    const moveCompoundLater = screen.getByRole("button", {
      name: "Move Compound Interest later in favorites",
    });
    expect(moveVatEarlier).toHaveClass("min-h-11", "min-w-11");
    expect(moveCompoundLater).toHaveClass("min-h-11", "min-w-11");
    expect(
      screen.getByText("Use the arrow controls to personalize shortcut order."),
    ).toBeVisible();

    fireEvent.click(moveVatEarlier);
    expect(getRepeatUseSnapshot().favorites).toEqual([
      "vat",
      "compound-interest",
    ]);

    rerender(
      <CalculatorRepeatUseShortcuts
        calculators={calculators.map((calculator) => ({
          ...calculator,
          name: calculator.id === "vat" ? "부가가치세" : "복리",
          href:
            calculator.id === "vat"
              ? "/ko/business/vat"
              : "/ko/finance/compound-interest",
        }))}
        locale="ko"
      />,
    );

    expect(
      screen.getByRole("button", { name: "복리 즐겨찾기에서 앞으로 이동" }),
    ).toHaveClass("min-h-11", "min-w-11");
    expect(
      screen.getByText(
        "화살표 버튼으로 바로가기 순서를 원하는 대로 바꿀 수 있습니다.",
      ),
    ).toBeVisible();
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
    expect(() => moveCalculatorFavorite("compound-interest", 1)).not.toThrow();
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
