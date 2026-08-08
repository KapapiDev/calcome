import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NightWorkPayCalculator } from "./calculator";

Element.prototype.scrollIntoView = vi.fn();

describe("NightWorkPayCalculator", () => {
  it("labels South Korea policy amounts as KRW before input", () => {
    render(<NightWorkPayCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea night-work inputs (KRW)",
      }),
    ).toBeVisible();
    expect(screen.getByLabelText("Ordinary hourly wage (KRW)")).toBeVisible();
    expect(screen.queryByLabelText("Display currency")).not.toBeInTheDocument();
  });

  it("uses a 50% default for five or more employees and resets to it", () => {
    render(<NightWorkPayCalculator locale="en" />);

    const rate = screen.getByLabelText("Night-work premium rate");
    expect(screen.getByRole("radio", { name: /five or more/i })).toBeChecked();
    expect(rate).toHaveValue("50");

    fireEvent.click(screen.getByRole("radio", { name: /fewer than five/i }));
    expect(rate).toHaveValue("0");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByRole("radio", { name: /five or more/i })).toBeChecked();
    expect(rate).toHaveValue("50");
  });

  it("shows the payroll-period and overlap guidance in English", () => {
    render(<NightWorkPayCalculator locale="en" />);
    expect(
      screen.getByLabelText(/Total night-work hours in the payroll period/),
    ).toBeVisible();

    fireEvent.change(screen.getByLabelText("Ordinary hourly wage (KRW)"), {
      target: { value: "12000" },
    });
    fireEvent.change(screen.getByLabelText(/Total night-work hours/), {
      target: { value: "7.5" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate night-work pay" }),
    );

    expect(
      screen.getByText(/not automatically included in this result/i),
    ).toBeVisible();
  });

  it("clears stale results and associates invalid inputs with the alert", () => {
    render(<NightWorkPayCalculator locale="en" />);

    const wage = screen.getByLabelText("Ordinary hourly wage (KRW)");
    const hours = screen.getByLabelText(/Total night-work hours/);

    fireEvent.change(wage, { target: { value: "12000" } });
    fireEvent.change(hours, { target: { value: "10" } });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate night-work pay" }),
    );

    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩180,000",
    );

    fireEvent.change(wage, { target: { value: "" } });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate night-work pay" }),
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("id", "night-work-pay-error");
    expect(wage).toHaveAttribute("aria-invalid", "true");
    expect(wage).toHaveAttribute(
      "aria-describedby",
      "night-work-hourly-wage-error night-work-pay-error",
    );
    expect(screen.getAllByTestId("animated-won")[0]).not.toHaveAccessibleName(
      "₩180,000",
    );
  });

  it("shows the Korean under-five legal notice", () => {
    render(<NightWorkPayCalculator locale="ko" />);
    fireEvent.click(screen.getByRole("radio", { name: "상시 5인 미만" }));
    fireEvent.change(screen.getByLabelText("통상 시급"), {
      target: { value: "12000" },
    });
    fireEvent.change(screen.getByLabelText(/급여 정산기간의 총 야간근로시간/), {
      target: { value: "1.5" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "야간근로수당 계산하기" }),
    );

    expect(screen.getByText(/근로기준법 제56조/)).toBeVisible();
  });
});
