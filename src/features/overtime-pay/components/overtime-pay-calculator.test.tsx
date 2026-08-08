import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OvertimePayCalculator } from "./overtime-pay-calculator";
Element.prototype.scrollIntoView = vi.fn();
describe("OvertimePayCalculator", () => {
  it("labels South Korea policy amounts as KRW before input", () => {
    render(<OvertimePayCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea overtime inputs (KRW)",
      }),
    ).toBeVisible();
    expect(screen.getByLabelText("Ordinary hourly wage (KRW)")).toBeVisible();
    expect(screen.queryByLabelText("Display currency")).not.toBeInTheDocument();
  });

  it("calculates and resets", () => {
    render(<OvertimePayCalculator locale="ko" />);
    const wage = screen.getByLabelText("통상시급");
    expect(wage).toHaveClass("text-base");
    fireEvent.change(wage, { target: { value: "12000" } });
    fireEvent.change(screen.getByLabelText(/총 연장근로시간/), {
      target: { value: "10" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "연장근로수당 계산하기" }),
    );
    expect(screen.getByText("가산 적용 시급")).toBeVisible();
    expect(screen.getByRole("radio", { name: /상시 5인 이상/ })).toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "초기화" }));
    expect(wage).toHaveValue("");
    expect(screen.getByRole("radio", { name: /상시 5인 이상/ })).toBeChecked();
  });
  it("clears stale results and associates invalid inputs with the alert", () => {
    render(<OvertimePayCalculator locale="ko" />);
    const wage = screen.getByLabelText("통상시급");
    fireEvent.change(wage, { target: { value: "12000" } });
    fireEvent.change(screen.getByLabelText(/총 연장근로시간/), {
      target: { value: "10" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "연장근로수당 계산하기" }),
    );
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩180,000",
    );

    fireEvent.change(wage, { target: { value: "" } });
    fireEvent.click(
      screen.getByRole("button", { name: "연장근로수당 계산하기" }),
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("id", "overtime-form-error");
    expect(wage).toHaveAttribute("aria-invalid", "true");
    expect(wage).toHaveAttribute(
      "aria-describedby",
      expect.stringContaining("overtime-form-error"),
    );
    expect(screen.getAllByTestId("animated-won")[0]).not.toHaveAccessibleName(
      "₩180,000",
    );
  });
  it("switches the default premium for smaller workplaces and shows English legal guidance", () => {
    render(<OvertimePayCalculator locale="en" />);
    fireEvent.click(screen.getByRole("radio", { name: /Fewer than five/ }));
    expect(screen.getByLabelText("Premium rate")).toHaveValue("0");
    fireEvent.change(screen.getByLabelText("Ordinary hourly wage (KRW)"), {
      target: { value: "12000" },
    });
    fireEvent.change(screen.getByLabelText(/Total overtime hours/), {
      target: { value: "1.5" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate overtime pay" }),
    );
    expect(screen.getByText(/may generally not apply/)).toBeVisible();
  });
});
