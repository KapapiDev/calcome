import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import * as calculator from "./hardened-stock-profit-loss-calculator";

const Component = calculator.HardenedStockProfitLossCalculator;
const calculateButton = { name: "손익 계산하기" };

describe("stock profit and loss validation", () => {
  it("calculates representative values", async () => {
    const user = userEvent.setup();
    render(<Component locale="ko" />);

    await user.type(screen.getByLabelText("보유 수량"), "10");
    await user.type(screen.getByLabelText("평균 매수가격"), "50000");
    await user.type(screen.getByLabelText("현재 가격"), "60000");
    await user.click(screen.getByRole("button", calculateButton));

    const result = screen.getByRole("region", {
      name: "계산된 투자 손익",
    });
    expect(within(result).getByText("100,000 원")).toBeVisible();
    expect(within(result).getByText("20.00%")).toBeVisible();
    expect(within(result).getByText("600,000 원")).toBeVisible();
  });

  it("clears stale results and links errors", async () => {
    const user = userEvent.setup();
    render(<Component locale="ko" />);

    const shares = screen.getByLabelText("보유 수량");
    await user.type(shares, "10");
    await user.type(screen.getByLabelText("평균 매수가격"), "50000");
    await user.type(screen.getByLabelText("현재 가격"), "60000");
    await user.click(screen.getByRole("button", calculateButton));

    const result = screen.getByRole("region", {
      name: "계산된 투자 손익",
    });
    expect(within(result).getByText("100,000 원")).toBeVisible();

    await user.clear(shares);
    await user.click(screen.getByRole("button", calculateButton));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("입력값을 확인해 주세요.");
    expect(shares).toHaveAttribute("aria-invalid", "true");
    expect(shares).toHaveAttribute(
      "aria-describedby",
      "shares-error stock-profit-loss-error-summary",
    );
    expect(screen.queryAllByText("100,000 원")).toHaveLength(0);
    const emptyText = "계산하면 평가 손익과 수익률이 표시됩니다.";
    expect(screen.getByText(emptyText)).toBeVisible();
  });
});
