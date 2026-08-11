import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MinimumWageCalculator } from "./minimum-wage-calculator";

describe("MinimumWageCalculator", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });
  it("shows the under-fifteen notice and disables the holiday option", async () => {
    const user = userEvent.setup();
    render(<MinimumWageCalculator locale="en" />);
    const hours = screen.getByLabelText("Scheduled weekly hours");
    await user.type(hours, "10");
    expect(screen.getByText(/Below 15 weekly hours/)).toBeVisible();
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
  it("shows English official guidance and resets", async () => {
    const user = userEvent.setup();
    render(<MinimumWageCalculator locale="en" />);
    await user.type(screen.getByLabelText("Scheduled weekly hours"), "40");
    await user.click(
      screen.getByRole("button", { name: "Calculate minimum pay" }),
    );
    expect(
      screen.getByText("Official 209-hour monthly minimum (KRW)"),
    ).toBeVisible();
    expect(screen.getByText("₩2156880")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByLabelText("Scheduled weekly hours")).toHaveValue("");
  });
  it("shows Korean official guidance after calculation", async () => {
    const user = userEvent.setup();
    render(<MinimumWageCalculator locale="ko" />);
    await user.type(screen.getByLabelText("주 소정근로시간"), "15");
    await user.click(screen.getByRole("button", { name: "최저임금 계산하기" }));
    expect(screen.getByText("공식 209시간 기준 월 최저임금")).toBeVisible();
    expect(
      screen.getByText(/유급 주휴시간은 주 15시간 이상 외에도/),
    ).toBeVisible();
  });
  it("associates invalid input with the alert and clears a stale result", async () => {
    const user = userEvent.setup();
    render(<MinimumWageCalculator locale="en" />);
    const hours = screen.getByLabelText("Scheduled weekly hours");

    await user.type(hours, "40");
    await user.click(
      screen.getByRole("button", { name: "Calculate minimum pay" }),
    );
    expect(
      screen.getByText("Official 209-hour monthly minimum (KRW)"),
    ).toBeVisible();

    await user.clear(hours);
    await user.type(hours, "invalid");
    await user.click(
      screen.getByRole("button", { name: "Calculate minimum pay" }),
    );

    const alert = screen.getByRole("alert");
    expect(hours).toHaveAttribute("aria-invalid", "true");
    expect(hours).toHaveAttribute("aria-describedby", alert.id);
    expect(
      screen.queryByText("Official 209-hour monthly minimum (KRW)"),
    ).not.toBeInTheDocument();
  });
});
