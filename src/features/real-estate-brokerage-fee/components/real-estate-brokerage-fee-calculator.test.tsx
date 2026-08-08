import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// prettier-ignore
import { RealEstateBrokerageFeeCalculator } from "./real-estate-brokerage-fee-calculator";

const scrollIntoView = vi.fn();

// prettier-ignore
describe("RealEstateBrokerageFeeCalculator", () => {
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

  it("labels South Korea policy amounts as KRW before input", () => {
    render(<RealEstateBrokerageFeeCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea brokerage assumptions (KRW)",
      }),
    ).toBeVisible();
    expect(
      screen.getByLabelText("Transaction amount or converted deposit (KRW)"),
    ).toBeVisible();
    expect(screen.queryByLabelText("Display currency")).not.toBeInTheDocument();
  });

  it("clears stale results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<RealEstateBrokerageFeeCalculator locale="ko" />);

    const transactionAmount = screen.getByLabelText("거래금액 또는 환산 보증금");
    await user.type(transactionAmount, "500000000");
    await user.type(screen.getByLabelText("확인한 중개보수율"), "0.4");
    await user.click(
      screen.getByRole("button", { name: "예상 중개비 계산하기" }),
    );

    await waitFor(() => {
      expect(
        screen.queryByText("계산하면 중개보수와 부가세가 표시됩니다."),
      ).not.toBeInTheDocument();
    });

    await user.clear(transactionAmount);
    await user.click(
      screen.getByRole("button", { name: "예상 중개비 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "brokerage-fee-error-summary",
      );
      expect(transactionAmount).toHaveAttribute("aria-invalid", "true");
      expect(transactionAmount).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("transactionAmount-error"),
      );
      expect(transactionAmount).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("brokerage-fee-error-summary"),
      );
      expect(
        screen.getByText("계산하면 중개보수와 부가세가 표시됩니다."),
      ).toBeVisible();
    });
  });
});
