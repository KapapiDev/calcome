import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { DividendCalculator } from "./dividend-calculator";

describe("DividendCalculator", () => {
  beforeEach(() => window.localStorage.clear());

  it("clears a stale result and links invalid input to the error summary", async () => {
    const user = userEvent.setup();
    render(<DividendCalculator locale="ko" />);
    await user.type(screen.getByLabelText("보유 수량"), "10");
    await user.type(screen.getByLabelText("주당 연간 배당금"), "2000");
    await user.click(screen.getByRole("button", { name: "배당금 계산하기" }));
    expect(screen.getAllByText("₩20,000").length).toBeGreaterThan(0);

    const shares = screen.getByLabelText("보유 수량");
    await user.clear(shares);
    await user.click(screen.getByRole("button", { name: "배당금 계산하기" }));

    expect(screen.queryByText("₩20,000")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "dividend-form-error-summary",
    );
    expect(shares).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("dividend-form-error-summary"),
    );
  });

  it("defaults English to USD, requires an explicit tax assumption, and persists currency", async () => {
    const user = userEvent.setup();
    const { container } = render(<DividendCalculator locale="en" />);

    expect(screen.getByLabelText("Display currency")).toHaveValue("USD");
    expect(screen.getByLabelText("Estimated withholding rate")).toHaveValue("");
    await user.type(screen.getByLabelText("Shares held"), "10");
    await user.type(screen.getByLabelText("Annual dividend per share"), "2");
    await user.type(screen.getByLabelText("Estimated withholding rate"), "10");
    await user.click(
      screen.getByRole("button", { name: "Calculate dividends" }),
    );
    expect(container).toHaveTextContent("$18.00");

    await user.selectOptions(screen.getByLabelText("Display currency"), "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");
    expect(container).toHaveTextContent("£18.00");
    expect(container).not.toHaveTextContent("₩18");
  });
});
