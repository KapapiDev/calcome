import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { directorySearchCalculators } from "@/config/calculator-directory";

import { CalculatorSearch } from "./calculator-search";

const DIRECTORY_SEARCH_STORAGE_KEY = "calcome:calculator-directory-search";

describe("CalculatorSearch", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("matches Korean partial words, aliases, and case-insensitive Latin text", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch calculators={directorySearchCalculators} />);
    const search = screen.getByRole("searchbox", { name: "계산기 검색" });

    await user.type(search, "  출  ");
    expect(screen.getByRole("link", { name: /대출 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/loan",
    );

    await user.clear(search);
    await user.type(search, "DEPOSIT");
    expect(screen.getByRole("link", { name: /예금 계산기/ })).toBeVisible();
  });

  it("ranks exact names ahead of exact keywords and broader matches deterministically", async () => {
    const user = userEvent.setup();
    const first = {
      ...directorySearchCalculators[0],
      name: "Broad Loan Helper",
      description: "loan planning",
      keywords: ["loan"],
    };
    const second = {
      ...directorySearchCalculators[1],
      name: "Loan",
      description: "general finance",
      keywords: ["loan helper"],
    };

    render(<CalculatorSearch calculators={[first, second]} locale="en" />);
    await user.type(
      screen.getByRole("searchbox", { name: "Search calculators" }),
      "loan",
    );

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Loan");
    expect(links[1]).toHaveTextContent("Broad Loan Helper");
  });

  it("shows primary category context for employment results", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch calculators={directorySearchCalculators} />);

    await user.type(screen.getByRole("searchbox"), "주휴수당");

    expect(
      screen.getByRole("link", { name: /주휴수당 계산기/ }),
    ).toHaveTextContent("급여·근로");
    expect(screen.queryByText("금융")).not.toBeInTheDocument();
  });

  it("provides keyboard-accessible Korean zero-result recovery", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch calculators={directorySearchCalculators} />);
    const search = screen.getByRole("searchbox");

    await user.type(search, "없는 계산기");
    expect(
      screen.getByText("검색어와 일치하는 계산기가 없습니다."),
    ).toBeVisible();

    const clear = screen.getByRole("button", { name: "검색어 지우기" });
    clear.focus();
    await user.keyboard("{Enter}");
    expect(search).toHaveValue("");
    await waitFor(() =>
      expect(window.sessionStorage.getItem(DIRECTORY_SEARCH_STORAGE_KEY)).toBeNull(),
    );
    expect(
      screen.queryByRole("button", { name: "검색어 지우기" }),
    ).not.toBeInTheDocument();
  });

  it("localizes English search and zero-result recovery without Korean fallback UI", async () => {
    const user = userEvent.setup();
    render(
      <CalculatorSearch calculators={directorySearchCalculators} locale="en" />,
    );

    const search = screen.getByRole("searchbox", {
      name: "Search calculators",
    });
    expect(search).toHaveAttribute(
      "placeholder",
      "e.g. loan, compound interest, CAGR",
    );

    await user.type(search, "definitely-no-result");
    const recovery = screen.getByText(
      "No calculators match your search.",
    ).parentElement;
    expect(recovery).not.toBeNull();
    expect(
      within(recovery!).getByRole("button", { name: "Clear search" }),
    ).toBeVisible();
    expect(screen.queryByText("계산기 검색")).not.toBeInTheDocument();
  });

  it("restores directory search after navigation-style remount and refresh-style remount", async () => {
    const user = userEvent.setup();
    const firstRender = render(
      <CalculatorSearch calculators={directorySearchCalculators} />,
    );
    const search = screen.getByRole("searchbox", { name: "계산기 검색" });

    await user.type(search, "대출");
    await waitFor(() =>
      expect(window.sessionStorage.getItem(DIRECTORY_SEARCH_STORAGE_KEY)).toBe(
        "대출",
      ),
    );

    firstRender.unmount();
    render(<CalculatorSearch calculators={directorySearchCalculators} />);
    await waitFor(() =>
      expect(screen.getByRole("searchbox", { name: "계산기 검색" })).toHaveValue(
        "대출",
      ),
    );
    expect(screen.getByRole("link", { name: /대출 계산기/ })).toBeVisible();
  });

  it("keeps the same search across locale switching without creating query URLs", async () => {
    window.sessionStorage.setItem(DIRECTORY_SEARCH_STORAGE_KEY, "loan");
    const originalSearch = window.location.search;
    const korean = render(
      <CalculatorSearch calculators={directorySearchCalculators} />,
    );

    await waitFor(() =>
      expect(screen.getByRole("searchbox", { name: "계산기 검색" })).toHaveValue(
        "loan",
      ),
    );
    korean.unmount();

    render(
      <CalculatorSearch calculators={directorySearchCalculators} locale="en" />,
    );
    await waitFor(() =>
      expect(
        screen.getByRole("searchbox", { name: "Search calculators" }),
      ).toHaveValue("loan"),
    );
    expect(window.location.search).toBe(originalSearch);
  });
});
