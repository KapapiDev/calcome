import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PropertyTaxCalculator } from "./property-tax-calculator";

const scrollIntoView = vi.fn();

describe("PropertyTaxCalculator", () => {
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

  it("clears stale property tax results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<PropertyTaxCalculator locale="ko" />);

    const assessedValue = screen.getByLabelText("시가표준액");
    await user.type(assessedValue, "600000000");
    await user.type(screen.getByLabelText("확인한 공정시장가액비율"), "60");
    await user.type(screen.getByLabelText("확인한 재산세율"), "0.4");
    await user.type(screen.getByLabelText("확인한 누진공제액"), "630000");
    await user.type(screen.getByLabelText("도시지역분 적용 세율"), "0.14");
    await user.click(
      screen.getByRole("button", { name: "예상 재산세 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("도시지역분")).toBeVisible();
      expect(screen.getByText("지방교육세")).toBeVisible();
      expect(screen.getByText("시가표준액 대비 실효세율")).toBeVisible();
    });

    await user.clear(assessedValue);
    await user.click(
      screen.getByRole("button", { name: "예상 재산세 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "property-tax-error-summary",
      );
      expect(assessedValue).toHaveAttribute("aria-invalid", "true");
      expect(assessedValue).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("assessedValue-error"),
      );
      expect(assessedValue).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("property-tax-error-summary"),
      );
      expect(screen.queryByText("도시지역분")).not.toBeInTheDocument();
      expect(screen.queryByText("지방교육세")).not.toBeInTheDocument();
      expect(
        screen.queryByText("시가표준액 대비 실효세율"),
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
