import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreditCardInstallmentInterestCalculator } from "./credit-card-installment-interest-calculator";

const scrollIntoView = vi.fn();

describe("CreditCardInstallmentInterestCalculator", () => {
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

  it("defaults English to USD and updates all installment amounts", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CreditCardInstallmentInterestCalculator locale="en" />,
    );

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    await user.type(screen.getByLabelText("Card purchase amount"), "1200");
    await user.type(screen.getByLabelText("Installment term"), "12");
    await user.type(screen.getByLabelText("Annual installment fee rate"), "12");
    await user.click(
      screen.getByRole("button", { name: "Calculate installment fees" }),
    );
    expect(screen.getByText("Estimated first payment")).toBeVisible();
    expect(container.textContent).toMatch(/\$/);

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container.textContent).toMatch(/£/);
    expect(container.textContent).not.toMatch(/₩/);
    expect(screen.getByText("Estimated first payment")).toBeVisible();
  });

  it("clears stale results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<CreditCardInstallmentInterestCalculator locale="ko" />);

    const purchaseAmount = screen.getByLabelText("카드 결제 금액");
    await user.type(purchaseAmount, "1200000");
    await user.type(screen.getByLabelText("할부 개월"), "12");
    await user.type(screen.getByLabelText("연 할부 수수료율"), "12");
    await user.click(
      screen.getByRole("button", { name: "할부 수수료 계산하기" }),
    );

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
    expect(
      screen.queryByText("계산하면 예상 할부 수수료와 월 납부액이 표시됩니다."),
    ).not.toBeInTheDocument();

    await user.clear(purchaseAmount);
    await user.click(
      screen.getByRole("button", { name: "할부 수수료 계산하기" }),
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute(
      "id",
      "credit-card-installment-interest-error-summary",
    );
    expect(purchaseAmount).toHaveAttribute("aria-invalid", "true");
    expect(purchaseAmount).toHaveAttribute(
      "aria-describedby",
      "purchaseAmount-error credit-card-installment-interest-error-summary",
    );
    expect(
      await screen.findByText(
        "계산하면 예상 할부 수수료와 월 납부액이 표시됩니다.",
      ),
    ).toBeVisible();
    expect(scrollIntoView).toHaveBeenCalledOnce();
  });
});
