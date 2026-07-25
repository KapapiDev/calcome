import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { publishedCalculators } from "@/config/calculators";
import { LanguageSelector, localizedDestination } from "./language-selector";

describe("localizedDestination", () => {
  it("preserves the calculator route for every published calculator in both directions", () => {
    expect(publishedCalculators).toHaveLength(51);

    for (const calculator of publishedCalculators) {
      const koreanPath = calculator.href;
      const englishPath = koreanPath.replace(/^\/ko(?=\/|$)/, "/en");

      expect(localizedDestination(koreanPath, "en")).toBe(englishPath);
      expect(localizedDestination(englishPath, "ko")).toBe(koreanPath);
    }
  });

  it("preserves localized non-calculator routes instead of falling back to a calculator", () => {
    expect(localizedDestination("/ko/calculators", "en")).toBe(
      "/en/calculators",
    );
    expect(localizedDestination("/en/about", "ko")).toBe("/ko/about");
    expect(localizedDestination("/", "en")).toBe("/en");
    expect(localizedDestination("calculators", "ko")).toBe(
      "/ko/calculators",
    );
  });
});

describe("LanguageSelector", () => {
  it("shows the current locale and links to the matching route", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/employment/weekly-holiday-pay"
      />,
    );

    expect(screen.getByLabelText("언어 선택")).toHaveTextContent("한국어");
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/employment/weekly-holiday-pay",
    );

    rerender(
      <LanguageSelector
        locale="en"
        pathname="/en/employment/weekly-holiday-pay"
      />,
    );

    expect(screen.getByLabelText("Select language")).toHaveTextContent(
      "English",
    );
    await user.click(screen.getByLabelText("Select language"));
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute(
      "href",
      "/ko/employment/weekly-holiday-pay",
    );
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("is keyboard accessible, closes after selection, and exposes only supported languages", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/compound-interest" />,
    );

    const selector = screen.getByLabelText("언어 선택");
    selector.focus();
    expect(selector).toHaveFocus();

    await user.click(selector);
    const english = screen.getByRole("link", { name: "English" });
    expect(english).toBeVisible();
    await user.click(english);
    expect(english).not.toBeVisible();
    expect(screen.getAllByRole("link", { hidden: true })).toHaveLength(2);
    expect(screen.queryByText("日本語")).not.toBeInTheDocument();
  });
});
