import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BalloonPaymentCalculator } from "./balloon-payment-calculator";

const scrollIntoView = vi.fn();

describe("BalloonPaymentCalculator", () => {
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

  it("defaults English to USD and updates every amount when currency changes", async () => {
    const user = userEvent.setup();
    const { container } = render(<BalloonPaymentCalculator locale="en" />);

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Loan principal"), "100000");
    await user.type(screen.getByLabelText("Final balloon payment"), "40000");
    await user.click(
      screen.getByRole("button", { name: "Calculate payments" }),
    );
    expect(screen.getByText("Regular payments total")).toBeVisible();
    expect(container.textContent).toMatch(/\$/);

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container.textContent).toMatch(/£/);
    expect(container.textContent).not.toMatch(/₩/);
    expect(screen.getByText("Regular payments total")).toBeVisible();
  });

  it("clears stale balloon payment results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<BalloonPaymentCalculator locale="ko" />);

    const principal = screen.getByLabelText("대출원금");
    const balloonAmount = screen.getByLabelText("만기 일시상환액");
    await user.type(principal, "100000000");
    await user.type(balloonAmount, "40000000");
    await user.click(screen.getByRole("button", { name: "상환액 계산하기" }));

    await waitFor(() => {
      expect(screen.getByText("월 납입액 합계")).toBeVisible();
      expect(screen.getByText("원금 대비 만기 상환 비중")).toBeVisible();
    });

    await user.clear(principal);
    await user.click(screen.getByRole("button", { name: "상환액 계산하기" }));

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "balloon-payment-error-summary",
      );
      expect(principal).toHaveAttribute("aria-invalid", "true");
      expect(principal).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("principal-error"),
      );
      expect(principal).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("balloon-payment-error-summary"),
      );
      expect(screen.queryByText("월 납입액 합계")).not.toBeInTheDocument();
      expect(
        screen.queryByText("원금 대비 만기 상환 비중"),
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "조건을 입력하면 월 납입액과 만기 상환 부담을 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
