import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ValueAddedTaxCalculator } from "./value-added-tax-calculator";

const scrollIntoView = vi.fn();

describe("ValueAddedTaxCalculator", () => {
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
    render(<ValueAddedTaxCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea amount (KRW) and VAT rate",
      }),
    ).toBeVisible();
    expect(screen.getByLabelText("Amount to calculate (KRW)")).toBeVisible();
    expect(screen.queryByLabelText("Display currency")).not.toBeInTheDocument();
  });

  it("clears stale VAT results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<ValueAddedTaxCalculator locale="ko" />);

    const amount = screen.getByLabelText("계산할 금액");
    await user.type(amount, "1000000");
    await user.click(
      screen.getByRole("button", { name: "부가가치세 계산하기" }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "표시 금액은 원 단위로 반올림한 계획용 추정치입니다. 세금계산서 작성 시 실제 단수 처리 기준을 확인하세요.",
        ),
      ).toBeVisible();
    });

    await user.clear(amount);
    await user.click(
      screen.getByRole("button", { name: "부가가치세 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "value-added-tax-error-summary",
      );
      expect(amount).toHaveAttribute("aria-invalid", "true");
      expect(amount).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("amount-error"),
      );
      expect(amount).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("value-added-tax-error-summary"),
      );
      expect(
        screen.getByText(
          "계산하면 공급가액, 부가가치세와 합계금액을 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
