import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GiftTaxCalculator } from "./gift-tax-calculator";

const scrollIntoView = vi.fn();

describe("GiftTaxCalculator", () => {
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

  it("clears stale gift tax results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<GiftTaxCalculator locale="ko" />);

    const giftValue = screen.getByLabelText("증여 재산가액");
    await user.type(giftValue, "500000000");
    await user.type(screen.getByLabelText("수증자가 인수하는 채무"), "0");
    await user.type(
      screen.getByLabelText("확인한 증여재산 공제액"),
      "50000000",
    );
    await user.type(screen.getByLabelText("확인한 증여세율"), "20");
    await user.type(screen.getByLabelText("확인한 누진공제액"), "10000000");
    await user.type(screen.getByLabelText("적용할 신고세액공제율"), "3");
    await user.click(
      screen.getByRole("button", { name: "예상 증여세 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("채무 차감 후 증여가액")).toBeVisible();
      expect(screen.getByText("신고세액공제 전 세액")).toBeVisible();
      expect(screen.getByText("신고세액공제액")).toBeVisible();
      expect(screen.getByText("순증여가액 대비 실효세율")).toBeVisible();
    });

    await user.clear(giftValue);
    await user.click(
      screen.getByRole("button", { name: "예상 증여세 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute("id", "gift-tax-error-summary");
      expect(giftValue).toHaveAttribute("aria-invalid", "true");
      expect(giftValue).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("giftValue-error"),
      );
      expect(giftValue).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("gift-tax-error-summary"),
      );
      expect(
        screen.queryByText("채무 차감 후 증여가액"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("신고세액공제 전 세액"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("신고세액공제액")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
