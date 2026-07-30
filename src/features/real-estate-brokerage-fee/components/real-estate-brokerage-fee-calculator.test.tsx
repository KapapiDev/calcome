import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { RealEstateBrokerageFeeCalculator } from "./real-estate-brokerage-fee-calculator";

const scrollIntoView = vi.fn();

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
      expect(screen.getByText("중개보수")).toBeVisible();
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
