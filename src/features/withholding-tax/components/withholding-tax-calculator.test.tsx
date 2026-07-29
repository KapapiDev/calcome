import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { WithholdingTaxCalculator } from "./withholding-tax-calculator";

const scrollIntoView = vi.fn();

describe("WithholdingTaxCalculator", () => {
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
    render(<WithholdingTaxCalculator locale="ko" />);

    const grossPayment = screen.getByLabelText("총 지급액");
    await user.type(grossPayment, "5000000");
    await user.type(screen.getByLabelText("확인한 비과세 금액"), "500000");
    await user.type(
      screen.getByLabelText("확인한 소득세 원천징수세율"),
      "8",
    );
    await user.type(screen.getByLabelText("지방소득세율(소득세 대비)"), "10");
    await user.click(
      screen.getByRole("button", { name: "예상 원천징수세 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("소득세")).toBeVisible();
    });

    await user.clear(grossPayment);
    await user.click(
      screen.getByRole("button", { name: "예상 원천징수세 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "withholding-tax-error-summary",
      );
      expect(grossPayment).toHaveAttribute("aria-invalid", "true");
      expect(grossPayment).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("grossPayment-error"),
      );
      expect(grossPayment).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("withholding-tax-error-summary"),
      );
      expect(
        screen.getByText(
          "계산하면 과세 대상 지급액과 예상 원천징수세를 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
