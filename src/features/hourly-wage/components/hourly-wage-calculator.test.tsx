import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HourlyWageCalculator } from "./hourly-wage-calculator";

const scrollIntoView = vi.fn();

describe("HourlyWageCalculator", () => {
  beforeEach(() => {
    scrollIntoView.mockReset();
    Element.prototype.scrollIntoView = scrollIntoView;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  it("starts empty with mobile-safe inputs and stable result sections", () => {
    render(<HourlyWageCalculator locale="ko" />);

    expect(screen.getByLabelText("급여 금액")).toHaveValue("");
    expect(screen.getByLabelText("1일 소정근로시간")).toHaveValue("");
    expect(screen.getByLabelText("주 소정근로시간")).toHaveValue("");
    expect(screen.getByLabelText("급여 금액")).toHaveClass(
      "text-base",
      "sm:text-sm",
    );
    expect(screen.getByText("2026 최저임금 비교")).toBeVisible();
    expect(screen.getByText("급여 단위별 환산")).toBeVisible();
  });

  it("calculates decimal hours, renders exact results, and scrolls", async () => {
    const user = userEvent.setup();
    render(<HourlyWageCalculator locale="en" />);

    await user.type(screen.getByLabelText("Pay amount (KRW)"), "12000");
    await user.selectOptions(screen.getByLabelText("Pay period"), "hourly");
    await user.type(screen.getByLabelText("Scheduled daily hours"), "7.5");
    await user.type(screen.getByLabelText("Scheduled weekly hours"), "15.5");
    await user.click(
      screen.getByRole("button", { name: "Calculate hourly wage" }),
    );

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
    expect(screen.getAllByTestId("animated-won")[0]).toHaveAccessibleName(
      "₩12,000",
    );
    expect(
      screen.getByRole("table", { name: "South Korea pay equivalents (KRW)" }),
    ).toBeVisible();
    expect(screen.getByRole("img")).toHaveAccessibleName(/₩12,000/);
  });

  it("clears stale results and associates invalid fields with the alert", async () => {
    const user = userEvent.setup();
    render(<HourlyWageCalculator locale="ko" />);

    const payAmount = screen.getByLabelText("급여 금액");
    const dailyHours = screen.getByLabelText("1일 소정근로시간");
    const weeklyHours = screen.getByLabelText("주 소정근로시간");

    await user.type(payAmount, "12000");
    await user.selectOptions(screen.getByLabelText("급여 단위"), "hourly");
    await user.type(dailyHours, "8");
    await user.type(weeklyHours, "40");
    await user.click(screen.getByRole("button", { name: "시급 계산하기" }));

    expect(screen.getByRole("img")).toBeVisible();
    expect(
      screen.getByRole("table", { name: "급여 단위별 환산" }),
    ).toBeVisible();

    await user.clear(payAmount);
    await user.type(payAmount, "invalid");
    await user.click(screen.getByRole("button", { name: "시급 계산하기" }));

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/급여와/);
    for (const field of [payAmount, dailyHours, weeklyHours]) {
      expect(field).toHaveAttribute("aria-invalid", "true");
      expect(field).toHaveAttribute("aria-describedby", alert.id);
    }
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("table", { name: "급여 단위별 환산" }),
    ).not.toBeInTheDocument();
  });

  it("shows validation without results or scrolling and reset restores empty state", async () => {
    const user = userEvent.setup();
    render(<HourlyWageCalculator locale="ko" />);

    await user.type(screen.getByLabelText("급여 금액"), "invalid");
    await user.type(screen.getByLabelText("1일 소정근로시간"), "8");
    await user.type(screen.getByLabelText("주 소정근로시간"), "40");
    await user.click(screen.getByRole("button", { name: "시급 계산하기" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/급여와/);
    expect(scrollIntoView).not.toHaveBeenCalled();

    await user.clear(screen.getByLabelText("급여 금액"));
    await user.type(screen.getByLabelText("급여 금액"), "12000");
    await user.click(screen.getByRole("button", { name: "시급 계산하기" }));
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("급여 금액")).toHaveValue("");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
