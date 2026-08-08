import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { DividendCalculator } from "./dividend-calculator";

describe("DividendCalculator", () => {
  it("clears a stale result and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<DividendCalculator locale="ko" />);
    await user.type(screen.getByLabelText("보유 수량"), "10");
    await user.type(screen.getByLabelText("주당 연간 배당금"), "2000");
    await user.click(screen.getByRole("button", { name: "배당금 계산하기" }));
    expect(screen.getAllByText("20,000 원").length).toBeGreaterThan(0);

    const shares = screen.getByLabelText("보유 수량");
    await user.clear(shares);
    await user.click(screen.getByRole("button", { name: "배당금 계산하기" }));

    expect(screen.queryByText("20,000 원")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "dividend-form-error-summary",
    );
    expect(shares).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("dividend-form-error-summary"),
    );
  });
});
