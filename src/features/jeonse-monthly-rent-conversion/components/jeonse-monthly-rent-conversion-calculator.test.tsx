import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { JeonseMonthlyRentConversionCalculator } from "./jeonse-monthly-rent-conversion-calculator";

const scrollIntoView = vi.fn();

describe("JeonseMonthlyRentConversionCalculator", () => {
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
    render(<JeonseMonthlyRentConversionCalculator locale="ko" />);

    const jeonseDeposit = screen.getByLabelText("전세 보증금");
    await user.type(jeonseDeposit, "300000000");
    await user.type(screen.getByLabelText("월세 보증금"), "100000000");
    await user.type(screen.getByLabelText("연 전환율"), "6");
    await user.click(screen.getByRole("button", { name: "월세 계산하기" }));

    await waitFor(() => {
      expect(
        screen.queryByText("계산하면 예상 월세와 환산 내역이 표시됩니다."),
      ).not.toBeInTheDocument();
    });

    await user.clear(jeonseDeposit);
    await user.click(screen.getByRole("button", { name: "월세 계산하기" }));

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "jeonse-monthly-rent-conversion-error-summary",
      );
      expect(jeonseDeposit).toHaveAttribute("aria-invalid", "true");
      expect(jeonseDeposit).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("jeonseDeposit-error"),
      );
      expect(jeonseDeposit).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("jeonse-monthly-rent-conversion-error-summary"),
      );
      expect(
        screen.getByText("계산하면 예상 월세와 환산 내역이 표시됩니다."),
      ).toBeVisible();
    });
  });
});
