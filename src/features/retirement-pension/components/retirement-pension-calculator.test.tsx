import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { RetirementPensionCalculator } from "./retirement-pension-calculator";

describe("RetirementPensionCalculator", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("defaults English amounts to USD and updates all money semantics with the shared currency choice", async () => {
    const user = userEvent.setup();
    render(<RetirementPensionCalculator locale="en" />);

    const currency = screen.getByLabelText("Display currency");
    expect(currency).toHaveValue("USD");
    expect(screen.getByLabelText("Monthly contribution (USD)")).toHaveValue(
      "500",
    );

    await user.selectOptions(currency, "GBP");
    expect(screen.getByLabelText("Monthly contribution (GBP)")).toBeVisible();
    expect(window.localStorage.getItem("calcome.currency")).toBe("GBP");

    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getAllByText(/£/).length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        "Currency selection changes symbols and formatting only; it does not convert exchange rates.",
      ),
    ).toBeVisible();
  });

  it("associates invalid fields with the alert and clears a stale result", async () => {
    const user = userEvent.setup();
    render(<RetirementPensionCalculator locale="en" />);

    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(
      screen.getByText(
        "Actual results vary with returns, fees, and contribution timing.",
      ),
    ).toBeVisible();

    const years = screen.getByLabelText("Contribution period (years)");
    await user.clear(years);
    await user.type(years, "0");
    await user.click(screen.getByRole("button", { name: "Calculate" }));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(
      "Enter a valid amount, period, and return rate.",
    );

    for (const label of [
      "Monthly contribution (USD)",
      "Contribution period (years)",
      "Expected annual return (%)",
    ]) {
      const input = screen.getByLabelText(label);
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", alert.id);
    }

    expect(
      screen.queryByText(
        "Actual results vary with returns, fees, and contribution timing.",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Enter your details to see an estimated balance."),
    ).toBeVisible();
  });
});
