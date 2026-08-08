import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreditLoanInterestCalculator } from "./credit-loan-interest-calculator";

const scrollIntoView = vi.fn();

describe("CreditLoanInterestCalculator", () => {
  beforeEach(() => {
    window.localStorage.clear();
    scrollIntoView.mockReset();
    Element.prototype.scrollIntoView = scrollIntoView;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  it("defaults English to USD and updates every credit-loan amount", async () => {
    const user = userEvent.setup();
    const { container } = render(<CreditLoanInterestCalculator locale="en" />);

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Loan amount"), "50000");
    await user.click(
      screen.getByRole("button", { name: "Calculate interest" }),
    );
    expect(screen.getByText("Annual interest")).toBeVisible();
    expect(container.textContent).toMatch(/\$/);

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container.textContent).toMatch(/£/);
    expect(container.textContent).not.toMatch(/₩/);
    expect(screen.getByText("Annual interest")).toBeVisible();
  });

  it("clears stale credit loan results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<CreditLoanInterestCalculator locale="ko" />);

    const loanAmount = screen.getByLabelText("대출금");
    await user.type(loanAmount, "50000000");
    await user.click(
      screen.getByRole("button", { name: "신용대출 이자 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("연 이자")).toBeVisible();
      expect(screen.getByText("기간 총이자")).toBeVisible();
      expect(screen.getByText("일평균 이자")).toBeVisible();
    });

    await user.clear(loanAmount);
    await user.click(
      screen.getByRole("button", { name: "신용대출 이자 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "credit-loan-interest-error-summary",
      );
      expect(loanAmount).toHaveAttribute("aria-invalid", "true");
      expect(loanAmount).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("loanAmount-error"),
      );
      expect(loanAmount).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("credit-loan-interest-error-summary"),
      );
      expect(screen.queryByText("연 이자")).not.toBeInTheDocument();
      expect(screen.queryByText("기간 총이자")).not.toBeInTheDocument();
      expect(screen.queryByText("일평균 이자")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "조건을 입력하면 월 이자와 기간 전체 비용을 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
