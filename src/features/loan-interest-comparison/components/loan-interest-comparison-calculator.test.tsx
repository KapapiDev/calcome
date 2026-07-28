import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LoanInterestComparisonCalculator } from "./loan-interest-comparison-calculator";

const scrollIntoView = vi.fn();

describe("LoanInterestComparisonCalculator", () => {
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

  it("clears stale comparison results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<LoanInterestComparisonCalculator locale="ko" />);

    const principal = screen.getByLabelText("대출원금");
    await user.type(principal, "300000000");
    await user.click(
      screen.getByRole("button", { name: "대출 이자 비교하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText(/대출 A · 4.5%/)).toBeVisible();
      expect(screen.getByText(/대출 B · 3.8%/)).toBeVisible();
    });

    await user.clear(principal);
    await user.click(
      screen.getByRole("button", { name: "대출 이자 비교하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "loan-interest-comparison-error-summary",
      );
      expect(principal).toHaveAttribute("aria-invalid", "true");
      expect(principal).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("principal-error"),
      );
      expect(principal).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("loan-interest-comparison-error-summary"),
      );
      expect(screen.queryByText(/대출 A · 4.5%/)).not.toBeInTheDocument();
      expect(screen.queryByText(/대출 B · 3.8%/)).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "계산하면 두 대출의 월 상환액과 총이자를 비교해 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
