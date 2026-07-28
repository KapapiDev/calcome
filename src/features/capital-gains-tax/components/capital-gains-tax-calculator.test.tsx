import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CapitalGainsTaxCalculator } from "./capital-gains-tax-calculator";

const scrollIntoView = vi.fn();

describe("CapitalGainsTaxCalculator", () => {
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

  it("clears stale capital gains tax results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<CapitalGainsTaxCalculator locale="ko" />);

    const salePrice = screen.getByLabelText("양도가액");
    await user.type(salePrice, "800000000");
    await user.type(screen.getByLabelText("취득가액"), "500000000");
    await user.type(screen.getByLabelText("필요경비"), "20000000");
    await user.type(screen.getByLabelText("적용 공제액"), "2500000");
    await user.type(screen.getByLabelText("확인한 양도소득세율"), "20");
    await user.type(
      screen.getByLabelText("지방소득세 비율 (양도소득세 대비)"),
      "10",
    );
    await user.click(
      screen.getByRole("button", { name: "예상 세금 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("양도차익")).toBeVisible();
      expect(screen.getByText("과세대상 양도차익")).toBeVisible();
      expect(screen.getByText("예상 양도소득세")).toBeVisible();
      expect(screen.getByText("예상 지방소득세")).toBeVisible();
      expect(screen.getByText("양도차익 대비 실효세율")).toBeVisible();
    });

    await user.clear(salePrice);
    await user.click(
      screen.getByRole("button", { name: "예상 세금 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "capital-gains-tax-error-summary",
      );
      expect(salePrice).toHaveAttribute("aria-invalid", "true");
      expect(salePrice).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("salePrice-error"),
      );
      expect(salePrice).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("capital-gains-tax-error-summary"),
      );
      expect(screen.queryByText("양도차익")).not.toBeInTheDocument();
      expect(screen.queryByText("과세대상 양도차익")).not.toBeInTheDocument();
      expect(screen.queryByText("예상 양도소득세")).not.toBeInTheDocument();
      expect(screen.queryByText("예상 지방소득세")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "계산하면 입력값에 따른 양도차익과 예상 세금이 표시됩니다.",
        ),
      ).toBeVisible();
    });
  });
});
