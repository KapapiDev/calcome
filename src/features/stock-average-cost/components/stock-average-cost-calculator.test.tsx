import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { StockAverageCostCalculator } from "./stock-average-cost-calculator";

const scrollIntoView = vi.fn();

describe("StockAverageCostCalculator", () => {
  beforeEach(() => {
    scrollIntoView.mockReset();
    Element.prototype.scrollIntoView = scrollIntoView;
  });

  it("calculates the weighted average cost", async () => {
    const user = userEvent.setup();
    render(<StockAverageCostCalculator locale="ko" />);

    await user.type(screen.getByLabelText("현재 보유 수량"), "10");
    await user.type(screen.getByLabelText("현재 평균단가"), "50000");
    await user.type(screen.getByLabelText("추가 매수 수량"), "10");
    await user.type(screen.getByLabelText("추가 매수 가격"), "40000");
    await user.click(
      screen.getByRole("button", { name: "새 평균단가 계산하기" }),
    );

    expect(screen.getByText("45,000 원")).toBeVisible();
    expect(screen.getByText("20주")).toBeVisible();
    expect(screen.getAllByText("900,000 원").length).toBeGreaterThan(0);
  });

  it("clears stale results and links invalid fields to the error summary", async () => {
    const user = userEvent.setup();
    render(<StockAverageCostCalculator locale="ko" />);

    await user.type(screen.getByLabelText("현재 보유 수량"), "10");
    await user.type(screen.getByLabelText("현재 평균단가"), "50000");
    await user.type(screen.getByLabelText("추가 매수 수량"), "10");
    await user.type(screen.getByLabelText("추가 매수 가격"), "40000");
    await user.click(
      screen.getByRole("button", { name: "새 평균단가 계산하기" }),
    );
    expect(
      screen.queryByText("계산하면 새 평균단가와 총 투자금이 표시됩니다."),
    ).not.toBeInTheDocument();

    const currentShares = screen.getByLabelText("현재 보유 수량");
    await user.clear(currentShares);
    await user.click(
      screen.getByRole("button", { name: "새 평균단가 계산하기" }),
    );

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveAttribute(
        "id",
        "stock-average-cost-error-summary",
      ),
    );
    expect(
      screen.getByText("계산하면 새 평균단가와 총 투자금이 표시됩니다."),
    ).toBeVisible();
    expect(screen.queryByText("45,000 원")).not.toBeInTheDocument();
    expect(currentShares).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("stock-average-cost-error-summary"),
    );
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });
});
