import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HardenedStockProfitLossCalculator } from "./hardened-stock-profit-loss-calculator";

describe("HardenedStockProfitLossCalculator", () => {
  it("calculates representative profit and return values", async () => {
    const user = userEvent.setup();
    render(<HardenedStockProfitLossCalculator locale="ko" />);

    await user.type(screen.getByLabelText("보유 수량"), "10");
    await user.type(screen.getByLabelText("평균 매수가격"), "50000");
    await user.type(screen.getByLabelText("현재 가격"), "60000");
    await user.click(screen.getByRole("button", { name: "손익 계산하기" }));

    const result = screen.getByRole("region", { name: "계산된 투자 손익" });
    expect(within(result).getByText("100,000 원")).toBeVisible();
    expect(within(result).getByText("20.00%")).toBeVisible();
    expect(within(result).getByText("600,000 원")).toBeVisible();
  });

  it("clears stale results and links invalid fields to the error summary", async () => {
    const user = userEvent.setup();
    render(<HardenedStockProfitLossCalculator locale="ko" />);

    const shares = screen.getByLabelText("보유 수량");
    await user.type(shares, "10");
    await user.type(screen.getByLabelText("평균 매수가격"), "50000");
    await user.type(screen.getByLabelText("현재 가격"), "60000");
    await user.click(screen.getByRole("button", { name: "손익 계산하기" }));
    expect(screen.getByText("100,000 원")).toBeVisible();

    await user.clear(shares);
    await user.click(screen.getByRole("button", { name: "손익 계산하기" }));

    expect(screen.getByRole("alert")).toHaveTextContent("입력값을 확인해 주세요.");
    expect(shares).toHaveAttribute("aria-invalid", "true");
    expect(shares).toHaveAttribute(
      "aria-describedby",
      "shares-error stock-profit-loss-error-summary",
    );
    expect(screen.queryByText("100,000 원")).not.toBeInTheDocument();
    expect(screen.getByText("계산하면 평가 손익과 수익률이 표시됩니다.")).toBeVisible();
  });
});
