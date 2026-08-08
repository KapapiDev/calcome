import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MortgagePaymentCalculator } from "./mortgage-payment-calculator";

const scrollIntoView = vi.fn();

describe("MortgagePaymentCalculator", () => {
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

  it("defaults English to USD and keeps mortgage results across currency changes", async () => {
    const user = userEvent.setup();
    const { container } = render(<MortgagePaymentCalculator locale="en" />);

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Home price"), "500000");
    await user.type(screen.getByLabelText("Down payment"), "100000");
    await user.click(screen.getByRole("button", { name: "Calculate payment" }));
    expect(screen.getByText("Loan amount")).toBeVisible();
    expect(container.textContent).toMatch(/\$/);

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container.textContent).toMatch(/£/);
    expect(container.textContent).not.toMatch(/₩/);
    expect(screen.getByText("Loan amount")).toBeVisible();
  });

  it("clears stale mortgage results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<MortgagePaymentCalculator locale="ko" />);

    const homePrice = screen.getByLabelText("주택가격");
    const downPayment = screen.getByLabelText("계약금·자기자금");
    await user.type(homePrice, "500000000");
    await user.type(downPayment, "100000000");
    await user.click(
      screen.getByRole("button", { name: "월 상환액 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("대출원금")).toBeVisible();
      expect(screen.getByText("대출 총상환액")).toBeVisible();
      expect(screen.getByText("주택가격 대비 자기자금")).toBeVisible();
    });

    await user.clear(homePrice);
    await user.click(
      screen.getByRole("button", { name: "월 상환액 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "mortgage-payment-error-summary",
      );
      expect(homePrice).toHaveAttribute("aria-invalid", "true");
      expect(homePrice).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("homePrice-error"),
      );
      expect(homePrice).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("mortgage-payment-error-summary"),
      );
      expect(screen.queryByText("대출원금")).not.toBeInTheDocument();
      expect(screen.queryByText("대출 총상환액")).not.toBeInTheDocument();
      expect(
        screen.queryByText("주택가격 대비 자기자금"),
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "조건을 입력하면 월 원리금과 예상 총 주거비를 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
