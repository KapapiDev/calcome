/* @vitest-environment jsdom */

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import {
  CalculatorRepeatUseShortcuts,
  clearRepeatUseShortcuts,
  getRepeatUseSnapshot,
  toggleCalculatorFavorite,
} from "@/components/calculators/calculator-repeat-use";
import { DirectoryFavorites } from "@/components/calculators/directory-favorites";

const englishCalculators = [
  {
    id: "compound-interest",
    name: "Compound Interest",
    href: "/en/finance/compound-interest",
  },
  { id: "vat", name: "VAT", href: "/en/business/vat" },
  { id: "salary", name: "Salary", href: "/en/employment/salary" },
] as const;

const koreanCalculators = [
  {
    id: "compound-interest",
    name: "복리",
    href: "/ko/finance/compound-interest",
  },
  { id: "vat", name: "부가가치세", href: "/ko/business/vat" },
  { id: "salary", name: "연봉", href: "/ko/employment/salary" },
] as const;

function favoriteLinkLabels(section: HTMLElement) {
  return within(section)
    .getAllByRole("link")
    .map((link) => link.textContent);
}

describe("repeat-use personalization cross-surface consistency", () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearRepeatUseShortcuts();
  });

  it("keeps favorite order, reconciliation, removal, and clear actions synchronized across shortcuts and the bilingual directory", async () => {
    toggleCalculatorFavorite("salary");
    toggleCalculatorFavorite("retired-calculator");
    toggleCalculatorFavorite("vat");
    toggleCalculatorFavorite("compound-interest");

    const { rerender } = render(
      <>
        <CalculatorRepeatUseShortcuts
          calculators={englishCalculators}
          locale="en"
        />
        <DirectoryFavorites calculators={englishCalculators} locale="en" />
      </>,
    );

    await waitFor(() => {
      expect(getRepeatUseSnapshot().favorites).toEqual([
        "compound-interest",
        "vat",
        "salary",
      ]);
    });

    const shortcutSection = screen
      .getByRole("heading", { name: "Your calculator shortcuts" })
      .closest("section");
    const directorySection = screen
      .getByRole("heading", { name: "Your favorites" })
      .closest("section");

    expect(shortcutSection).not.toBeNull();
    expect(directorySection).not.toBeNull();
    expect(favoriteLinkLabels(shortcutSection!)).toEqual([
      "Compound Interest",
      "VAT",
      "Salary",
    ]);
    expect(favoriteLinkLabels(directorySection!)).toEqual([
      "Compound Interest",
      "VAT",
      "Salary",
    ]);

    for (const link of within(directorySection!).getAllByRole("link")) {
      expect(link).toHaveClass("min-h-11");
    }

    const moveVatEarlier = within(shortcutSection!).getByRole("button", {
      name: "Move VAT earlier in favorites",
    });
    expect(moveVatEarlier.tagName).toBe("BUTTON");
    expect(moveVatEarlier).toHaveClass("min-h-11", "min-w-11");
    moveVatEarlier.focus();
    expect(moveVatEarlier).toHaveFocus();
    fireEvent.click(moveVatEarlier);

    await waitFor(() => {
      expect(getRepeatUseSnapshot().favorites).toEqual([
        "vat",
        "compound-interest",
        "salary",
      ]);
      expect(favoriteLinkLabels(directorySection!)).toEqual([
        "VAT",
        "Compound Interest",
        "Salary",
      ]);
    });

    rerender(
      <>
        <CalculatorRepeatUseShortcuts
          calculators={koreanCalculators}
          locale="ko"
        />
        <DirectoryFavorites calculators={koreanCalculators} locale="ko" />
      </>,
    );

    const koreanShortcutSection = screen
      .getByRole("heading", { name: "내 계산기 바로가기" })
      .closest("section");
    const koreanDirectorySection = screen
      .getByRole("heading", { name: "내 즐겨찾기" })
      .closest("section");

    expect(koreanShortcutSection).not.toBeNull();
    expect(koreanDirectorySection).not.toBeNull();
    expect(favoriteLinkLabels(koreanDirectorySection!)).toEqual([
      "부가가치세",
      "복리",
      "연봉",
    ]);
    expect(
      within(koreanDirectorySection!).getByRole("link", { name: "부가가치세" }),
    ).toHaveAttribute("href", "/ko/business/vat");
    expect(
      within(koreanDirectorySection!).getByRole("link", { name: "복리" }),
    ).toHaveAttribute("href", "/ko/finance/compound-interest");

    fireEvent.click(
      within(koreanShortcutSection!).getByRole("button", {
        name: "복리 즐겨찾기에서 제거",
      }),
    );

    await waitFor(() => {
      expect(getRepeatUseSnapshot().favorites).toEqual(["vat", "salary"]);
      expect(favoriteLinkLabels(koreanDirectorySection!)).toEqual([
        "부가가치세",
        "연봉",
      ]);
    });

    fireEvent.click(
      within(koreanShortcutSection!).getByRole("button", {
        name: "즐겨찾기 지우기",
      }),
    );

    await waitFor(() => {
      expect(getRepeatUseSnapshot().favorites).toEqual([]);
      expect(
        screen.queryByRole("heading", { name: "내 즐겨찾기" }),
      ).not.toBeInTheDocument();
    });
  });
});
