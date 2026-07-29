import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FreelancerTaxCalculator } from "./freelancer-tax-calculator";

const scrollIntoView = vi.fn();

describe("FreelancerTaxCalculator", () => {
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
    render(<FreelancerTaxCalculator locale="ko" />);

    const grossPayment = screen.getByLabelText("총 지급액");
    await user.type(grossPayment, "1000000");
    await user.type(
      screen.getByLabelText("확인한 원천징수 제외 금액"),
      "100000",
    );
    await user.click(screen.getByRole("button", { name: "3.3% 세금 계산하기" }));

    await waitFor(() => {
      expect(screen.getByText("소득세 3%")).toBeVisible();
    });

    await user.clear(grossPayment);
    await user.click(screen.getByRole("button", { name: "3.3% 세금 계산하기" }));

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute("id", "freelancer-tax-error-summary");
      expect(grossPayment).toHaveAttribute("aria-invalid", "true");
      expect(grossPayment).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("grossPayment-error"),
      );
      expect(grossPayment).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("freelancer-tax-error-summary"),
      );
      expect(
        screen.getByText("계산하면 예상 원천징수액과 실수령액을 표시합니다."),
      ).toBeVisible();
    });
  });
});
