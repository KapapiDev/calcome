import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SocialInsuranceCalculator } from "./social-insurance-calculator";

Element.prototype.scrollIntoView = vi.fn();
describe("SocialInsuranceCalculator", () => {
  it("renders empty mobile-safe inputs and calculates a localized breakdown", () => {
    render(<SocialInsuranceCalculator locale="ko" />);
    const pay = screen.getByLabelText("월 보수");
    expect(pay).toHaveValue("");
    expect(pay).toHaveAttribute("placeholder", "예: 3,500,000");
    expect(pay).toHaveClass("text-base");
    fireEvent.change(pay, { target: { value: "3500000" } });
    fireEvent.change(screen.getByLabelText("월 비과세 급여"), {
      target: { value: "200000" },
    });
    fireEvent.change(screen.getByLabelText("산재보험 요율"), {
      target: { value: "0.7" },
    });
    fireEvent.change(screen.getByLabelText("사업장 규모"), {
      target: { value: "priority150" },
    });
    fireEvent.click(screen.getByRole("button", { name: "4대보험 계산하기" }));
    expect(screen.getByText("국민연금")).toBeInTheDocument();
    expect(screen.getByText("산재보험")).toBeInTheDocument();
    expect(
      screen.getByText(/실업급여 0.9%와 선택한 고용안정/),
    ).toBeInTheDocument();
  });
  it("shows English validation instead of creating a result", () => {
    render(<SocialInsuranceCalculator locale="en" />);
    fireEvent.change(screen.getByLabelText("Monthly pay"), {
      target: { value: "." },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate contributions" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Check the highlighted values.",
    );
  });
  it("clears a previous result when a later submission is invalid", async () => {
    render(<SocialInsuranceCalculator locale="ko" />);
    const pay = screen.getByLabelText("월 보수");
    fireEvent.change(pay, { target: { value: "3500000" } });
    fireEvent.change(screen.getByLabelText("월 비과세 급여"), {
      target: { value: "200000" },
    });
    fireEvent.change(screen.getByLabelText("산재보험 요율"), {
      target: { value: "0.7" },
    });
    fireEvent.click(screen.getByRole("button", { name: "4대보험 계산하기" }));
    expect(await screen.findByRole("table")).toBeInTheDocument();

    fireEvent.change(pay, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "4대보험 계산하기" }));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(pay).toHaveAttribute("aria-invalid", "true");
    expect(pay).toHaveAttribute(
      "aria-describedby",
      "monthlyPay-error social-insurance-error-summary",
    );
    await waitFor(() =>
      expect(screen.queryByRole("table")).not.toBeInTheDocument(),
    );
  });
  it("resets the workplace size selection", () => {
    render(<SocialInsuranceCalculator locale="en" />);
    const workplaceSize = screen.getByLabelText("Workplace size");
    fireEvent.change(workplaceSize, { target: { value: "over1000OrPublic" } });
    expect(workplaceSize).toHaveValue("over1000OrPublic");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(workplaceSize).toHaveValue("under150");
  });
});