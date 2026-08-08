import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AverageWageCalculator } from "./average-wage-calculator";
Element.prototype.scrollIntoView = vi.fn();
describe("AverageWageCalculator", () => {
  it("labels South Korea policy amounts as KRW before input", () => {
    render(<AverageWageCalculator locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: "South Korea average wage inputs (KRW)",
      }),
    ).toBeVisible();
    expect(screen.getByLabelText("Total wages in period (KRW)")).toBeVisible();
    expect(screen.getByLabelText(/Ordinary daily wage \(KRW\)/)).toBeVisible();
    expect(screen.queryByLabelText("Display currency")).not.toBeInTheDocument();
  });

  it("starts empty, calculates, and resets", () => {
    render(<AverageWageCalculator locale="ko" />);
    const wage = screen.getByLabelText("산정기간 임금총액");
    expect(wage).toHaveValue("");
    expect(wage).toHaveClass("text-base");
    fireEvent.change(wage, { target: { value: "9000000" } });
    fireEvent.change(screen.getByLabelText("산정기간 총일수"), {
      target: { value: "92" },
    });
    fireEvent.click(screen.getByRole("button", { name: "평균임금 계산하기" }));
    expect(screen.getByText("포함한 임금총액")).toBeVisible();
    expect(screen.getByText(/통상임금과 비교하지 않은 산출값/)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "초기화" }));
    expect(wage).toHaveValue("");
    expect(screen.getByLabelText(/일급 통상임금/)).toHaveValue("");
    expect(
      screen.queryByText(/통상임금과 비교하지 않은 산출값/),
    ).not.toBeInTheDocument();
  });
  it("shows localized errors without producing a result", () => {
    render(<AverageWageCalculator locale="en" />);
    fireEvent.change(screen.getByLabelText("Total wages in period (KRW)"), {
      target: { value: "." },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate average wage" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Check the highlighted values.",
    );
  });
  it("clears a previous result when a later submission is invalid", () => {
    render(<AverageWageCalculator locale="ko" />);
    const wage = screen.getByLabelText("산정기간 임금총액");
    const days = screen.getByLabelText("산정기간 총일수");

    fireEvent.change(wage, { target: { value: "9000000" } });
    fireEvent.change(days, { target: { value: "92" } });
    fireEvent.click(screen.getByRole("button", { name: "평균임금 계산하기" }));
    expect(screen.getByText(/통상임금과 비교하지 않은 산출값/)).toBeVisible();

    fireEvent.change(days, { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "평균임금 계산하기" }));

    expect(screen.getByRole("alert")).toBeVisible();
    expect(days).toHaveAttribute("aria-invalid", "true");
    expect(
      screen.getByText("계산하면 산출값과 통상임금 비교 결과가 표시됩니다."),
    ).toBeVisible();
    expect(
      screen.queryByText(/통상임금과 비교하지 않은 산출값/),
    ).not.toBeInTheDocument();
  });
  it("shows the English ordinary-wage comparison guidance", () => {
    render(<AverageWageCalculator locale="en" />);
    fireEvent.change(screen.getByLabelText("Total wages in period (KRW)"), {
      target: { value: "9000000" },
    });
    fireEvent.change(screen.getByLabelText("Calendar days in period"), {
      target: { value: "92" },
    });
    fireEvent.change(screen.getByLabelText(/Ordinary daily wage/), {
      target: { value: "100000" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate average wage" }),
    );
    expect(
      screen.getByText(/compares the calculated average wage/),
    ).toBeVisible();
  });
});
