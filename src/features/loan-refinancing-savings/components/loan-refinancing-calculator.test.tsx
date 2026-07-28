import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LoanRefinancingCalculator } from "./loan-refinancing-calculator";

const scrollIntoView = vi.fn();

describe("LoanRefinancingCalculator", () => {
  beforeEach(() => {
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

  it("clears stale refinancing results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<LoanRefinancingCalculator locale="ko" />);

    const remainingBalance = screen.getByLabelText("현재 대출잔액");
    await user.type(remainingBalance, "300000000");
    await user.click(
      screen.getByRole("button", { name: "대환 절감액 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("현재 대출")).toBeVisible();
      expect(screen.getByText("대환 대출")).toBeVisible();
    });

    await user.clear(remainingBalance);
    await user.click(
      screen.getByRole("button", { name: "대환 절감액 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "loan-refinancing-error-summary",
      );
      expect(remainingBalance).toHaveAttribute("aria-invalid", "true");
      expect(remainingBalance).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("remainingBalance-error"),
      );
      expect(remainingBalance).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("loan-refinancing-error-summary"),
      );
      expect(screen.queryByText("현재 대출")).not.toBeInTheDocument();
      expect(screen.queryByText("대환 대출")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "계산하면 대환 전후의 상환액과 절감 효과를 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
