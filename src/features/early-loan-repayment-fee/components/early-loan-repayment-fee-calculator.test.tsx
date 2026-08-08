import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { EarlyLoanRepaymentFeeCalculator } from "./early-loan-repayment-fee-calculator";

const scrollIntoView = vi.fn();

describe("EarlyLoanRepaymentFeeCalculator", () => {
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

  it("defaults English to USD and preserves fee results across currency changes", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <EarlyLoanRepaymentFeeCalculator locale="en" />,
    );

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Early repayment amount"), "100000");
    await user.click(
      screen.getByRole("button", { name: "Calculate prepayment fee" }),
    );
    expect(screen.getByText("Prorated fee rate")).toBeVisible();
    expect(container.textContent).toMatch(/\$/);

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container.textContent).toMatch(/£/);
    expect(container.textContent).not.toMatch(/₩/);
    expect(screen.getByText("Prorated fee rate")).toBeVisible();
  });

  it("clears stale early repayment fee results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<EarlyLoanRepaymentFeeCalculator locale="ko" />);

    const repaymentAmount = screen.getByLabelText("중도상환금액");
    await user.type(repaymentAmount, "100000000");
    await user.click(
      screen.getByRole("button", { name: "중도상환수수료 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("잔여기간 반영 수수료율")).toBeVisible();
      expect(screen.getByText("남은 기간 비율")).toBeVisible();
    });

    await user.clear(repaymentAmount);
    await user.click(
      screen.getByRole("button", { name: "중도상환수수료 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "early-loan-repayment-fee-error-summary",
      );
      expect(repaymentAmount).toHaveAttribute("aria-invalid", "true");
      expect(repaymentAmount).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("repaymentAmount-error"),
      );
      expect(repaymentAmount).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("early-loan-repayment-fee-error-summary"),
      );
      expect(
        screen.queryByText("잔여기간 반영 수수료율"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("남은 기간 비율")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "조건을 입력하면 예상 수수료와 잔여기간을 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
