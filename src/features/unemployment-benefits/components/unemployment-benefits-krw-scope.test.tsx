import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UnemploymentBenefitsCalculator } from "./unemployment-benefits-calculator";

describe("UnemploymentBenefitsCalculator English KRW scope", () => {
  it("makes the South Korea and KRW scope explicit", () => {
    render(<UnemploymentBenefitsCalculator locale="en" />);

    expect(screen.getByLabelText("Average daily wage (KRW) *")).toBeInTheDocument();
    expect(
      screen.getByText(/South Korean regular-employee details/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Job-seeking benefits (KRW)" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/all monetary amounts are KRW/)).toBeInTheDocument();
  });
});
