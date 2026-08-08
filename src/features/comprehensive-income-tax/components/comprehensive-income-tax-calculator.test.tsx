import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComprehensiveIncomeTaxCalculator } from "./comprehensive-income-tax-calculator";

const scrollIntoView = vi.fn();

describe("ComprehensiveIncomeTaxCalculator", () => {
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
    render(<ComprehensiveIncomeTaxCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea income amounts (KRW) and applicable rates",
      }),
    ).toBeVisible();
    expect(screen.getByLabelText("Gross income (KRW)")).toBeVisible();
    expect(screen.getByLabelText("Necessary expenses (KRW)")).toBeVisible();
    expect(
      screen.getByLabelText("Confirmed income deductions (KRW)"),
    ).toBeVisible();
    expect(
      screen.getByLabelText("Confirmed progressive deduction (KRW)"),
    ).toBeVisible();
    expect(screen.getByLabelText("Confirmed tax credits (KRW)")).toBeVisible();
    expect(screen.queryByLabelText("Display currency")).not.toBeInTheDocument();
  });

  it("clears stale results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<ComprehensiveIncomeTaxCalculator locale="ko" />);

    const grossIncome = screen.getByLabelText("총수입금액");
    await user.type(grossIncome, "100000000");
    await user.type(screen.getByLabelText("필요경비"), "30000000");
    await user.type(screen.getByLabelText("확인한 소득공제액"), "15000000");
    await user.type(screen.getByLabelText("확인한 종합소득세율"), "24");
    await user.type(screen.getByLabelText("확인한 누진공제액"), "5760000");
    await user.type(screen.getByLabelText("확인한 세액공제액"), "1000000");
    await user.type(screen.getByLabelText("지방소득세율(소득세 대비)"), "10");
    await user.click(
      screen.getByRole("button", { name: "예상 종합소득세 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("필요경비 차감 후 소득")).toBeVisible();
    });

    await user.clear(grossIncome);
    await user.click(
      screen.getByRole("button", { name: "예상 종합소득세 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "comprehensive-income-tax-error-summary",
      );
      expect(grossIncome).toHaveAttribute("aria-invalid", "true");
      expect(grossIncome).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("grossIncome-error"),
      );
      expect(grossIncome).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("comprehensive-income-tax-error-summary"),
      );
      expect(
        screen.getByText(
          "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
