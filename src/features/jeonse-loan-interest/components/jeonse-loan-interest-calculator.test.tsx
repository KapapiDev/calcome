import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { JeonseLoanInterestCalculator } from "./jeonse-loan-interest-calculator";

const scrollIntoView = vi.fn();

describe("JeonseLoanInterestCalculator", () => {
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
    render(<JeonseLoanInterestCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea jeonse loan inputs (KRW)",
      }),
    ).toBeVisible();
    expect(screen.getByLabelText("Jeonse deposit (KRW)")).toBeVisible();
    expect(screen.getByLabelText("Own funds (KRW)")).toBeVisible();
    expect(
      screen.getByLabelText("Monthly guarantee and other fees (KRW)"),
    ).toBeVisible();
    expect(screen.queryByLabelText("Display currency")).not.toBeInTheDocument();
  });

  it("clears stale jeonse loan results and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<JeonseLoanInterestCalculator locale="ko" />);

    const deposit = screen.getByLabelText("전세보증금");
    const ownFunds = screen.getByLabelText("자기자금");
    await user.type(deposit, "500000000");
    await user.type(ownFunds, "200000000");
    await user.click(
      screen.getByRole("button", { name: "전세대출 이자 계산하기" }),
    );

    await waitFor(() => {
      expect(screen.getByText("필요 대출금")).toBeVisible();
      expect(screen.getByText("연 이자")).toBeVisible();
      expect(screen.getByText("보증금 대비 대출 비율")).toBeVisible();
    });

    await user.clear(deposit);
    await user.click(
      screen.getByRole("button", { name: "전세대출 이자 계산하기" }),
    );

    await waitFor(() => {
      const errorSummary = screen.getByRole("alert");
      expect(errorSummary).toHaveAttribute(
        "id",
        "jeonse-loan-interest-error-summary",
      );
      expect(deposit).toHaveAttribute("aria-invalid", "true");
      expect(deposit).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("deposit-error"),
      );
      expect(deposit).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("jeonse-loan-interest-error-summary"),
      );
      expect(screen.queryByText("필요 대출금")).not.toBeInTheDocument();
      expect(screen.queryByText("연 이자")).not.toBeInTheDocument();
      expect(
        screen.queryByText("보증금 대비 대출 비율"),
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "조건을 입력하면 월 이자와 기간 전체 이자를 표시합니다.",
        ),
      ).toBeVisible();
    });
  });
});
