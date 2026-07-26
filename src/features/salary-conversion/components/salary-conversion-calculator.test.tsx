import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SalaryConversionCalculator } from "./salary-conversion-calculator";

describe("SalaryConversionCalculator", () => {
  it("associates invalid salary with the alert and clears a stale result", async () => {
    const user = userEvent.setup();
    render(<SalaryConversionCalculator locale="en" />);
    const salary = screen.getByLabelText("Salary");

    await user.type(salary, "50000000");
    await user.click(screen.getByRole("button", { name: "Convert salary" }));
    expect(
      screen.getByText(
        "A simple gross-pay conversion; bonuses, allowances, tax, and deductions are excluded.",
      ),
    ).toBeVisible();

    await user.clear(salary);
    await user.type(salary, ".");
    await user.click(screen.getByRole("button", { name: "Convert salary" }));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Check the highlighted values.");
    expect(salary).toHaveAttribute("aria-invalid", "true");
    expect(salary).toHaveAttribute("aria-describedby", alert.id);
    expect(
      screen.queryByText(
        "A simple gross-pay conversion; bonuses, allowances, tax, and deductions are excluded.",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Enter a salary to see the converted amounts."),
    ).toBeVisible();
  });
});
