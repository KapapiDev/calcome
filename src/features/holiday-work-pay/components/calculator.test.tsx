import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HolidayWorkPayCalculator } from "./calculator";

Element.prototype.scrollIntoView = vi.fn();

function calculate(locale: "ko" | "en") {
  if (locale === "ko") {
    fireEvent.change(screen.getByLabelText("통상 시급"), {
      target: { value: "10000" },
    });
    fireEvent.change(screen.getByLabelText("급여 정산기간의 총 휴일근로시간"), {
      target: { value: "8" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "휴일근로수당 계산하기" }),
    );
  } else {
    fireEvent.change(screen.getByLabelText("Ordinary hourly wage"), {
      target: { value: "10000" },
    });
    fireEvent.change(
      screen.getByLabelText("Total holiday-work hours in the payroll period"),
      { target: { value: "8" } },
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate holiday-work pay" }),
    );
  }
}

describe("HolidayWorkPayCalculator", () => {
  it("switches workplace size to the under-five contractual input and resets", () => {
    render(<HolidayWorkPayCalculator locale="en" />);
    expect(screen.getByRole("radio", { name: /five or more/i })).toBeChecked();
    fireEvent.click(screen.getByRole("radio", { name: /fewer than five/i }));
    expect(screen.getByLabelText(/Contractual premium rate/)).toHaveValue("0");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("radio", { name: /five or more/i })).toBeChecked();
    expect(screen.queryByLabelText(/Contractual premium rate/)).toBeNull();
  });

  it("shows English segmented results, monthly-salary guidance, and overlap warning after calculation", () => {
    render(<HolidayWorkPayCalculator locale="en" />);
    expect(
      screen.queryByText(/actual additional payment may be lower/),
    ).toBeNull();
    calculate("en");
    expect(screen.getByText("Within-8-hours 50% premium")).toBeVisible();
    expect(screen.getByText("Over-8-hours 100% premium")).toBeVisible();
    expect(
      screen.getByText(/actual additional payment may be lower/),
    ).toBeVisible();
    expect(
      screen.getByText(/Night-work premiums may be added separately/),
    ).toBeVisible();
  });

  it("shows Korean monthly-salary guidance only after calculation", () => {
    render(<HolidayWorkPayCalculator locale="ko" />);
    expect(
      screen.queryByText(/표시된 총 보상액보다 적을 수 있습니다/),
    ).toBeNull();
    calculate("ko");
    expect(
      screen.getByText(/표시된 총 보상액보다 적을 수 있습니다/),
    ).toBeVisible();
    expect(
      screen.getByText(/야간 가산이 별도로 더해질 수 있으며/),
    ).toBeVisible();
  });

  it("clears a valid result and associates invalid inputs with the error summary", () => {
    render(<HolidayWorkPayCalculator locale="ko" />);
    calculate("ko");
    expect(
      screen.getByText(/표시된 총 보상액보다 적을 수 있습니다/),
    ).toBeVisible();

    const hoursInput = screen.getByLabelText(
      "급여 정산기간의 총 휴일근로시간",
    );
    fireEvent.change(hoursInput, { target: { value: "" } });
    fireEvent.click(
      screen.getByRole("button", { name: "휴일근로수당 계산하기" }),
    );

    const alert = screen.getByRole("alert");
    expect(hoursInput).toHaveAttribute("aria-invalid", "true");
    expect(hoursInput.getAttribute("aria-describedby")).toContain(alert.id);
    expect(
      screen.queryByText(/표시된 총 보상액보다 적을 수 있습니다/),
    ).toBeNull();
  });
});
