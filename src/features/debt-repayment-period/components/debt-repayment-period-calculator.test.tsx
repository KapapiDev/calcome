import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DebtRepaymentPeriodCalculator } from "./debt-repayment-period-calculator";

const scrollIntoView = vi.fn();

describe("DebtRepaymentPeriodCalculator", () => {
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

  it("defaults English to USD and keeps payoff results when currency changes", async () => {
    const user = userEvent.setup();
    const { container } = render(<DebtRepaymentPeriodCalculator locale="en" />);

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Current debt balance"), "10000");
    await user.type(screen.getByLabelText("Annual interest rate"), "6");
    await user.type(screen.getByLabelText("Monthly payment"), "500");
    await user.click(
      screen.getByRole("button", { name: "Calculate payoff period" }),
    );
    expect(screen.getByText("Final monthly payment")).toBeVisible();
    expect(container.textContent).toMatch(/\$/);

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container.textContent).toMatch(/£/);
    expect(container.textContent).not.toMatch(/₩/);
    expect(screen.getByText("Final monthly payment")).toBeVisible();
  });

  it("clears stale results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<DebtRepaymentPeriodCalculator locale="ko" />);

    const balance = screen.getByLabelText("현재 대출 잔액");
    await user.type(balance, "10000000");
    await user.type(screen.getByLabelText("연이율"), "6");
    await user.type(screen.getByLabelText("매월 상환액"), "500000");
    await user.click(
      screen.getByRole("button", { name: "상환 기간 계산하기" }),
    );

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
    expect(
      screen.queryByText("계산하면 예상 완납 기간과 총 이자가 표시됩니다."),
    ).not.toBeInTheDocument();

    await user.clear(balance);
    await user.click(
      screen.getByRole("button", { name: "상환 기간 계산하기" }),
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("id", "debt-repayment-period-error-summary");
    expect(balance).toHaveAttribute("aria-invalid", "true");
    expect(balance).toHaveAttribute(
      "aria-describedby",
      "balance-error debt-repayment-period-error-summary",
    );
    expect(
      await screen.findByText(
        "계산하면 예상 완납 기간과 총 이자가 표시됩니다.",
      ),
    ).toBeVisible();
    expect(scrollIntoView).toHaveBeenCalledOnce();
  });
});
