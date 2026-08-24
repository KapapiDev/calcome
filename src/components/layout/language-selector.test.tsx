import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { publishedCalculators } from "@/config/calculators";
import { localizedDestination } from "./language-routing";
import { LanguageSelector } from "./language-selector";

describe("localizedDestination", () => {
  it("preserves every published calculator route in both directions", () => {
    expect(publishedCalculators.length).toBeGreaterThan(0);
    for (const calculator of publishedCalculators) {
      const koreanPath = calculator.href;
      const englishPath = koreanPath.replace(/^\/ko(?=\/|$)/, "/en");
      expect(localizedDestination(koreanPath, "en")).toBe(englishPath);
      expect(localizedDestination(englishPath, "ko")).toBe(koreanPath);
    }
  });

  it("serves English shared pages under /en and keeps Korean canonicals locale-less", () => {
    expect(localizedDestination("/ko/calculators", "en")).toBe(
      "/en/calculators",
    );
    expect(localizedDestination("/en/about", "ko")).toBe("/about");
    expect(localizedDestination("/", "en")).toBe("/en");
    expect(localizedDestination("calculators", "ko")).toBe("/calculators");
  });

  it("localizes legacy calculator routes without creating a second redirect", () => {
    expect(localizedDestination("/finance/cagr", "en")).toBe(
      "/en/finance/cagr",
    );
    expect(localizedDestination("employment/net-salary", "ko")).toBe(
      "/ko/employment/net-salary",
    );
  });
});

describe("LanguageSelector", () => {
  it("shows Korean as the current locale and preserves the target calculator", async () => {
    const user = userEvent.setup();
    render(<LanguageSelector locale="ko" pathname="/ko/employment/weekly-holiday-pay" />);
    const selector = screen.getByLabelText("언어 선택");
    expect(selector).toHaveTextContent("한국어");
    expect(selector).toHaveClass("min-h-11", "min-w-11");
    selector.focus();
    expect(selector).toHaveFocus();
    await user.click(selector);
    expect(screen.queryByRole("link", { name: "한국어" })).not.toBeInTheDocument();
    expect(screen.getByText("한국어", { selector: 'span[aria-current="page"]' })).toBeVisible();
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/employment/weekly-holiday-pay");
  });

  it("shows English as the current locale and preserves the target calculator", async () => {
    const user = userEvent.setup();
    render(<LanguageSelector locale="en" pathname="/en/employment/weekly-holiday-pay" />);
    const selector = screen.getByLabelText("Select language");
    expect(selector).toHaveTextContent("English");
    expect(selector).toHaveClass("min-h-11", "min-w-11");
    await user.click(selector);
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute("href", "/ko/employment/weekly-holiday-pay");
    expect(screen.queryByRole("link", { name: "English" })).not.toBeInTheDocument();
    expect(screen.getByText("English", { selector: 'span[aria-current="page"]' })).toBeVisible();
    expect(screen.queryByText("日本語")).not.toBeInTheDocument();
  });
});
