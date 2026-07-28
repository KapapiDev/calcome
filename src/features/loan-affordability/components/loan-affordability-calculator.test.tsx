import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LoanAffordabilityCalculator } from "./loan-affordability-calculator";

const scrollIntoView = vi.fn();

describe("LoanAffordabilityCalculator", () => {
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

  it("clears stale results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<LoanAffordabilityCalculator locale="ko" />);

    const annualIncome = screen.getByLabelText("연소득");
    await user.type(annualIncome, "60000000");
    await user.type(screen.getByLabelText("기존 월 부채 상환액"), "500000");
    await user.type(screen.getByLabelText("목표 부채상환 비율"), "40");
    await user.type(screen.getByLabelText("예상 연이율"), "4.5");
    await user.type(screen.getByLabelText("상환 기간"), "30");
    await user.click(screen.getByRole("button", { name: "대출 한도 계산하기" }));

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
    expect(
      screen.queryByText("계산하면 예상 대출 한도와 월 상환 가능액이 표시됩니다."),
    ).not.toBeInTheDocument();

    await user.clear(annualIncome);
    await user.click(screen.getByRole("button", { name: "대출 한도 계산하기" }));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("id", "loan-affordability-error-summary");
    expect(annualIncome).toHaveAttribute("aria-invalid", "true");
    expect(annualIncome).toHaveAttribute(
      "aria-describedby",
      "annualIncome-error loan-affordability-error-summary",
    );
    expect(
      await screen.findByText(
        "계산하면 예상 대출 한도와 월 상환 가능액이 표시됩니다.",
      ),
    ).toBeVisible();
    expect(scrollIntoView).toHaveBeenCalledOnce();
  });
});
