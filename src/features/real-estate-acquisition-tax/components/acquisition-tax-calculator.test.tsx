import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AcquisitionTaxCalculator } from "./acquisition-tax-calculator";

const scrollIntoView = vi.fn();

describe("AcquisitionTaxCalculator", () => {
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
    render(<AcquisitionTaxCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea acquisition price (KRW) and rates",
      }),
    ).toBeVisible();
    expect(
      screen.getByLabelText("Real estate acquisition price (KRW)"),
    ).toBeVisible();
    expect(
      screen.getByLabelText("Other acquisition costs (KRW)"),
    ).toBeVisible();
    expect(screen.queryByLabelText("Display currency")).not.toBeInTheDocument();
  });

  it("clears stale acquisition tax results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<AcquisitionTaxCalculator locale="ko" />);

    const acquisitionPrice = screen.getByLabelText("부동산 취득가액");
    await user.type(acquisitionPrice, "500000000");
    await user.type(screen.getByLabelText("취득세율"), "1");
    await user.type(screen.getByLabelText("지방교육세율"), "0.1");
    await user.type(screen.getByLabelText("농어촌특별세율"), "0");
    await user.type(screen.getByLabelText("기타 취득 부대비용"), "2000000");
    await user.click(
      screen.getByRole("button", { name: "취득 비용 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("취득세")).toBeVisible();
      expect(screen.getByText("지방교육세")).toBeVisible();
      expect(screen.getByText("농어촌특별세")).toBeVisible();
      expect(screen.getByText("기타 부대비용")).toBeVisible();
    });

    await user.clear(acquisitionPrice);
    await user.click(
      screen.getByRole("button", { name: "취득 비용 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "real-estate-acquisition-tax-error-summary",
      );
      expect(acquisitionPrice).toHaveAttribute("aria-invalid", "true");
      expect(acquisitionPrice).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("acquisitionPrice-error"),
      );
      expect(acquisitionPrice).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("real-estate-acquisition-tax-error-summary"),
      );
      expect(screen.queryByText("취득세")).not.toBeInTheDocument();
      expect(screen.queryByText("지방교육세")).not.toBeInTheDocument();
      expect(screen.queryByText("농어촌특별세")).not.toBeInTheDocument();
      expect(screen.queryByText("기타 부대비용")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "계산하면 입력한 세율에 따른 세금과 총 취득 비용이 표시됩니다.",
        ),
      ).toBeVisible();
    });
  });
});
