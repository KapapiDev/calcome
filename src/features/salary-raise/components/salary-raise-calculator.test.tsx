import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SalaryRaiseCalculator } from "./salary-raise-calculator";
Element.prototype.scrollIntoView = vi.fn();
describe("SalaryRaiseCalculator", () => {
  it("starts empty, calculates, and resets", () => {
    render(<SalaryRaiseCalculator locale="ko" />);
    const salary = screen.getByLabelText("현재 급여");
    expect(salary).toHaveValue("");
    expect(salary).toHaveClass("text-base");
    fireEvent.change(salary, { target: { value: "50000000" } });
    fireEvent.change(screen.getByLabelText("인상률"), {
      target: { value: "5" },
    });
    fireEvent.click(screen.getByRole("button", { name: "인상 급여 계산하기" }));
    expect(screen.getByText("현재 연봉")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "초기화" }));
    expect(salary).toHaveValue("");
    expect(screen.getByRole("radio", { name: /연봉/ })).toBeChecked();
  });
  it("clears a stale result when localized validation fails", () => {
    render(<SalaryRaiseCalculator locale="en" />);
    const salary = screen.getByLabelText("Current salary");
    const raiseRate = screen.getByLabelText("Raise rate");

    fireEvent.change(salary, { target: { value: "50000000" } });
    fireEvent.change(raiseRate, { target: { value: "5" } });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate raised salary" }),
    );
    expect(screen.getByText("Current annual salary")).toBeVisible();

    fireEvent.change(raiseRate, { target: { value: "." } });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate raised salary" }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Check the highlighted values.",
    );
    expect(raiseRate).toHaveAttribute("aria-invalid", "true");
    expect(raiseRate).toHaveAttribute("aria-describedby", "rate-error");
    expect(screen.queryByText("Current annual salary")).not.toBeInTheDocument();
  });
});
