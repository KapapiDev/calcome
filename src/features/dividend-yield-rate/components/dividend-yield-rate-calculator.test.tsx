import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { DividendYieldRateCalculator } from "./dividend-yield-rate-calculator";

describe("DividendYieldRateCalculator currency", () => {
  beforeEach(() => window.localStorage.clear());

  it("defaults English to USD and persists an explicit currency choice", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<DividendYieldRateCalculator locale="en" />);
    const currency = screen.getByLabelText("Display currency");

    expect(currency).toHaveValue("USD");
    expect(screen.getAllByText("USD")).toHaveLength(4);
    await user.selectOptions(currency, "GBP");
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");

    unmount();
    render(<DividendYieldRateCalculator locale="en" />);
    expect(screen.getByLabelText("Display currency")).toHaveValue("GBP");
  });

  it("keeps the Korean first-visit default in KRW", () => {
    render(<DividendYieldRateCalculator locale="ko" />);
    expect(screen.getByLabelText("표시 통화")).toHaveValue("KRW");
  });
});
