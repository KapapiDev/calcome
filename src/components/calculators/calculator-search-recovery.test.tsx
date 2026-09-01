import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { directorySearchCalculators } from "@/config/calculator-directory";

import { CalculatorSearch } from "./calculator-search";

describe("CalculatorSearch recovery", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("offers a deterministic full-directory target when no result matches", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch calculators={directorySearchCalculators} />);

    await user.type(screen.getByRole("searchbox"), "존재하지않는검색어");

    expect(
      screen.getByRole("link", { name: "전체 계산기 보기" }),
    ).toHaveAttribute("href", "#calculator-directory");
  });

  it("clears an active search with Escape and keeps keyboard focus in search", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch calculators={directorySearchCalculators} />);
    const search = screen.getByRole("searchbox", { name: "계산기 검색" });

    await user.type(search, "대출");
    expect(search).toHaveValue("대출");

    await user.keyboard("{Escape}");

    expect(search).toHaveValue("");
    expect(search).toHaveFocus();
    await waitFor(() =>
      expect(
        window.sessionStorage.getItem("calcome:calculator-directory-search"),
      ).toBeNull(),
    );
  });

  it("marks category-only English matches as weak and offers directory recovery", async () => {
    const user = userEvent.setup();
    const categoryOnly = [
      {
        ...directorySearchCalculators[0],
        name: "Compound Growth",
        description: "Long-term growth planning",
        keywords: ["growth"],
        primaryCategory: "Savings",
      },
    ];

    render(<CalculatorSearch calculators={categoryOnly} locale="en" />);
    await user.type(
      screen.getByRole("searchbox", { name: "Search calculators" }),
      "Savings",
    );

    expect(
      screen.getByText(
        "There are few strong name or alias matches. Check these results or browse the full directory.",
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Browse all calculators" }),
    ).toHaveAttribute("href", "#calculator-directory");
  });
});
