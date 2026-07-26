import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { RetirementPensionCalculator } from "./retirement-pension-calculator";

describe("RetirementPensionCalculator", () => {
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
      "Monthly contribution",
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
