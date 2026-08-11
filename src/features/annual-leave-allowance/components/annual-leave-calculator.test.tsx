import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnnualLeaveCalculator } from "./annual-leave-calculator";

describe("AnnualLeaveCalculator", () => {
  it("clears a previous result when a later submission is invalid", () => {
    render(<AnnualLeaveCalculator locale="ko" />);

    fireEvent.change(screen.getByLabelText("완료한 근속연수"), {
      target: { value: "1" },
    });
    const hourlyWage = screen.getByLabelText("통상시급");
    fireEvent.change(hourlyWage, { target: { value: "12000" } });
    fireEvent.click(screen.getByRole("button", { name: "연차 계산하기" }));

    expect(
      screen.getByText(/통상시급 × 1일 소정근로시간 × 남은 연차/),
    ).toBeInTheDocument();
    expect(screen.getByText("15 일")).toBeInTheDocument();

    fireEvent.change(hourlyWage, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "연차 계산하기" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "입력값을 확인해 주세요.",
    );
    expect(hourlyWage).toHaveAttribute("aria-invalid", "true");
    expect(hourlyWage).toHaveAttribute(
      "aria-describedby",
      "hourlyWage-error annual-leave-error-summary",
    );
    expect(
      screen.getByText("조건을 입력하면 예상 연차가 표시됩니다."),
    ).toBeInTheDocument();
    expect(screen.queryByText("15 일")).not.toBeInTheDocument();
  });

  it("resets validation state and inputs", () => {
    render(<AnnualLeaveCalculator locale="en" />);
    const hourlyWage = screen.getByLabelText("Ordinary hourly wage (KRW)");

    fireEvent.click(screen.getByRole("button", { name: "Calculate leave" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();

    fireEvent.change(hourlyWage, { target: { value: "12000" } });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(hourlyWage).toHaveValue("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("makes the South Korea and KRW scope explicit in English", () => {
    render(<AnnualLeaveCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea service and attendance inputs (KRW)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Estimated South Korea allowance (KRW)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ordinary hourly wage (KRW)"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});
