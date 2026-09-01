import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CalculatorResultContext } from "./calculator-result-context";

describe("CalculatorResultContext scenario labels and baseline", () => {
  it("renames an in-session scenario and uses it as the current-result baseline", () => {
    const { rerender } = render(
      <CalculatorResultContext
        metrics={[
          { label: "Payment", value: "$100", featured: true },
          { label: "Total", value: "$1,000" },
        ]}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Save current result as scenario" }),
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Scenario name 1" }), {
      target: { value: "Conservative" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Use as baseline" }));

    rerender(
      <CalculatorResultContext
        metrics={[
          { label: "Payment", value: "$125", featured: true },
          { label: "Total", value: "$1,250" },
        ]}
      />,
    );

    const baseline = screen.getByTestId("scenario-baseline-comparison");
    expect(baseline).toHaveTextContent(
      "Compare with the selected baseline scenario: Conservative",
    );
    expect(baseline).toHaveTextContent("Comparison baseline: $100");
    expect(baseline).toHaveTextContent("Current: $125");
    expect(baseline).toHaveTextContent("Increased · Delta: $25");
    expect(baseline).toHaveTextContent("inputs are not stored");
  });

  it("keeps labels bounded and clears a selected baseline when its scenario is removed", () => {
    render(
      <CalculatorResultContext
        metrics={[{ label: "Result", value: "$100", featured: true }]}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Save current result as scenario" }),
    );
    const nameInput = screen.getByRole("textbox", { name: "Scenario name 1" });
    fireEvent.change(nameInput, {
      target: { value: "123456789012345678901234567890" },
    });
    expect(nameInput).toHaveValue("123456789012345678901234");

    fireEvent.click(screen.getByRole("button", { name: "Use as baseline" }));
    expect(
      screen.getByTestId("scenario-baseline-comparison"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Remove scenario/ }));
    expect(
      screen.queryByTestId("scenario-baseline-comparison"),
    ).not.toBeInTheDocument();
  });
});
