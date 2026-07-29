import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComprehensiveRealEstateHoldingTaxCalculator } from "./comprehensive-real-estate-holding-tax-calculator";

const scrollIntoView = vi.fn();

describe("ComprehensiveRealEstateHoldingTaxCalculator", () => {
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

  it("clears stale holding tax results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<ComprehensiveRealEstateHoldingTaxCalculator locale="ko" />);

    const assessedValue = screen.getByLabelText("전국 합산 공시가격");
    await user.type(assessedValue, "1500000000");
    await user.type(screen.getByLabelText("확인한 기본공제액"), "900000000");
    await user.type(screen.getByLabelText("확인한 공정시장가액비율"), "60");
    await user.type(screen.getByLabelText("확인한 종합부동산세율"), "0.7");
    await user.type(screen.getByLabelText("확인한 누진공제액"), "600000");
    await user.type(screen.getByLabelText("공제할 재산세액"), "300000");
    await user.click(
      screen.getByRole("button", { name: "예상 종합부동산세 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("공제 적용 후 금액")).toBeVisible();
      expect(screen.getByText("재산세액 공제 전 세액")).toBeVisible();
      expect(screen.getByText("농어촌특별세")).toBeVisible();
    });

    await user.clear(assessedValue);
    await user.click(
      screen.getByRole("button", { name: "예상 종합부동산세 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "comprehensive-real-estate-holding-tax-error-summary",
      );
      expect(assessedValue).toHaveAttribute("aria-invalid", "true");
      expect(assessedValue).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("aggregateAssessedValue-error"),
      );
      expect(assessedValue).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining(
          "comprehensive-real-estate-holding-tax-error-summary",
        ),
      );
      expect(screen.queryByText("공제 적용 후 금액")).not.toBeInTheDocument();
      expect(
        screen.queryByText("재산세액 공제 전 세액"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("농어촌특별세")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
