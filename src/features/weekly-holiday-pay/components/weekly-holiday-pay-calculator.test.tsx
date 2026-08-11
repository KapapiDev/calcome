import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { WeeklyHolidayPayCalculator } from "./weekly-holiday-pay-calculator";

describe("WeeklyHolidayPayCalculator input safety", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  it.each([".", "-", "invalid", "0", "40.1"])(
    "shows the existing error without producing a result for hours %j",
    async (hours) => {
      const user = userEvent.setup();
      render(<WeeklyHolidayPayCalculator locale="ko" />);

      const wageInput = screen.getByLabelText("시급");
      const hoursInput = screen.getByLabelText("주 소정근로시간");

      await user.type(wageInput, "12000");
      await user.type(hoursInput, hours);
      await user.click(
        screen.getByRole("button", { name: "주휴수당 계산하기" }),
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent(
        "시급과 1~40시간의 주 소정근로시간을 입력하세요.",
      );
      expect(wageInput).toHaveAttribute("aria-invalid", "true");
      expect(hoursInput).toHaveAttribute("aria-invalid", "true");
      expect(wageInput).toHaveAttribute("aria-describedby", alert.id);
      expect(hoursInput).toHaveAttribute("aria-describedby", alert.id);
      expect(
        screen.queryByText("예상 적용 대상입니다."),
      ).not.toBeInTheDocument();
    },
  );

  it("accepts decimal weekly hours and preserves the existing result", async () => {
    const user = userEvent.setup();
    render(<WeeklyHolidayPayCalculator locale="en" />);

    await user.type(screen.getByLabelText("Hourly wage (KRW)"), "12000");
    await user.type(screen.getByLabelText("Scheduled weekly hours"), "15.5");
    await user.click(
      screen.getByRole("button", { name: "Calculate holiday pay" }),
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(
      screen.getByText("The entered conditions are generally eligible."),
    ).toBeVisible();
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩37,200",
    );
  });

  it("makes the South Korea and KRW scope visible before English input", () => {
    render(<WeeklyHolidayPayCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea work conditions (KRW)",
      }),
    ).toBeVisible();
    expect(screen.getByLabelText("Hourly wage (KRW)")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        name: "Estimated South Korea results (KRW)",
      }),
    ).toBeVisible();
    expect(screen.getByText("Weekly holiday pay (KRW)")).toBeVisible();
  });

  it("clears a previously calculated result when a later submission is invalid", async () => {
    const user = userEvent.setup();
    render(<WeeklyHolidayPayCalculator locale="en" />);

    const wageInput = screen.getByLabelText("Hourly wage (KRW)");
    const hoursInput = screen.getByLabelText("Scheduled weekly hours");

    await user.type(wageInput, "12000");
    await user.type(hoursInput, "15.5");
    await user.click(
      screen.getByRole("button", { name: "Calculate holiday pay" }),
    );

    expect(
      screen.getByText("The entered conditions are generally eligible."),
    ).toBeVisible();

    await user.clear(hoursInput);
    await user.type(hoursInput, "0");
    await user.click(
      screen.getByRole("button", { name: "Calculate holiday pay" }),
    );

    expect(screen.getByRole("alert")).toBeVisible();
    expect(
      screen.queryByText("The entered conditions are generally eligible."),
    ).not.toBeInTheDocument();
  });

  it("shows the existing English error for a pasted nonnumeric wage", async () => {
    const user = userEvent.setup();
    render(<WeeklyHolidayPayCalculator locale="en" />);

    await user.type(screen.getByLabelText("Hourly wage (KRW)"), "invalid");
    await user.type(screen.getByLabelText("Scheduled weekly hours"), "15.5");
    await user.click(
      screen.getByRole("button", { name: "Calculate holiday pay" }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a positive wage and 1–40 scheduled weekly hours.",
    );
    expect(
      screen.queryByText("The entered conditions are generally eligible."),
    ).not.toBeInTheDocument();
  });
});
