import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GrossUpSalaryCalculator } from "./gross-up-salary-calculator";

Element.prototype.scrollIntoView = vi.fn();

describe("GrossUpSalaryCalculator", () => {
  it("starts empty, calculates, and resets", () => {
    render(<GrossUpSalaryCalculator locale="ko" />);
    const salary = screen.getByLabelText("목표 실수령액");
    expect(salary).toHaveValue("");
    fireEvent.change(salary, { target: { value: "45000000" } });
    fireEvent.change(screen.getByLabelText("예상 공제율"), {
      target: { value: "10" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "필요 세전 급여 계산하기" }),
    );
    expect(screen.getByText("목표 연 실수령액")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "초기화" }));
    expect(salary).toHaveValue("");
    expect(screen.getByRole("radio", { name: "연간 실수령액" })).toBeChecked();
  });

  it("clears stale results and associates invalid inputs with the alert", () => {
    render(<GrossUpSalaryCalculator locale="ko" />);
    const salary = screen.getByLabelText("목표 실수령액");
    const rate = screen.getByLabelText("예상 공제율");

    fireEvent.change(salary, { target: { value: "45000000" } });
    fireEvent.change(rate, { target: { value: "10" } });
    fireEvent.click(
      screen.getByRole("button", { name: "필요 세전 급여 계산하기" }),
    );
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩50,000,000",
    );

    fireEvent.change(salary, { target: { value: "" } });
    fireEvent.click(
      screen.getByRole("button", { name: "필요 세전 급여 계산하기" }),
    );

    expect(screen.getByRole("alert")).toBeVisible();
    expect(salary).toHaveAttribute("aria-invalid", "true");
    expect(salary).toHaveAttribute(
      "aria-describedby",
      "target-net-error gross-up-salary-error-summary",
    );
    expect(screen.getAllByTestId("animated-won")[0]).not.toHaveAccessibleName(
      "₩50,000,000",
    );
  });

  it("renders localized validation errors", () => {
    render(<GrossUpSalaryCalculator locale="en" />);
    fireEvent.change(screen.getByLabelText("Estimated deduction rate"), {
      target: { value: "100" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate required gross pay" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Check the highlighted values.",
    );
  });
});
