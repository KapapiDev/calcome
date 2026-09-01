import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CalculatorResultContext } from "./calculator-result-context";

describe("CalculatorResultContext", () => {
  it("explains Korean results without inventing calculator-specific assumptions", () => {
    render(
      <CalculatorResultContext
        metrics={[
          { label: "월 납입액", value: "100,000원", featured: true },
          { label: "총 납입액", value: "1,200,000원" },
        ]}
      />,
    );

    expect(screen.getByText("결과를 이렇게 읽어보세요")).toBeInTheDocument();
    expect(screen.getByText("가장 중요한 결과: 월 납입액")).toBeInTheDocument();
    expect(screen.getByText("함께 확인할 값: 총 납입액")).toBeInTheDocument();
    expect(screen.getByText(/계산기별 가정·포함 범위/)).toBeInTheDocument();
  });

  it("provides matching English guidance and preserves the featured hierarchy", () => {
    render(
      <CalculatorResultContext
        metrics={[
          { label: "Monthly payment", value: "$100", featured: true },
          { label: "Total paid", value: "$1,200" },
        ]}
      />,
    );

    expect(screen.getByText("How to read these results")).toBeInTheDocument();
    expect(
      screen.getByText("Primary result: Monthly payment"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Supporting value: Total paid"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/stated assumptions or included scope/),
    ).toBeInTheDocument();
  });

  it("offers a bilingual browser-print summary with calculator identity and no persistence", () => {
    const print = vi.fn();
    Object.defineProperty(window, "print", {
      configurable: true,
      value: print,
    });

    render(
      <main>
        <h1>Compound Interest Calculator</h1>
        <CalculatorResultContext
          metrics={[
            { label: "Final balance", value: "$1,250", featured: true },
            { label: "Interest earned", value: "$250" },
          ]}
        />
      </main>,
    );

    expect(
      screen.queryByTestId("print-result-summary"),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Print / Save PDF" }));

    const summary = screen.getByTestId("print-result-summary");
    expect(summary).toHaveTextContent("CalCome result summary");
    expect(summary).toHaveTextContent("Final balance");
    expect(summary).toHaveTextContent("$1,250");
    expect(summary).toHaveTextContent("Interpretation and assumptions");
    expect(summary).toHaveTextContent(
      "without uploading or automatically saving",
    );
    expect(summary).toHaveTextContent(
      "Calculator: Compound Interest Calculator",
    );
    expect(document.body.dataset.calcomeResultPrinting).toBe("true");
    expect(print).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event("afterprint"));
    expect(document.body.dataset.calcomeResultPrinting).toBeUndefined();
    expect(
      screen.queryByTestId("print-result-summary"),
    ).not.toBeInTheDocument();
  });

  it("blocks printing when the displayed result is stale", () => {
    const print = vi.fn();
    Object.defineProperty(window, "print", {
      configurable: true,
      value: print,
    });

    render(
      <div>
        <CalculatorResultContext
          metrics={[{ label: "Result", value: "$100", featured: true }]}
        />
        <div data-testid="stale-result-notice">Inputs changed.</div>
      </div>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Print / Save PDF" }));

    expect(print).not.toHaveBeenCalled();
    expect(
      screen.queryByTestId("print-result-summary"),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Recalculate before printing this summary.",
    );
  });

  it("compares only the immediately previous calculated result in-session", () => {
    const { rerender } = render(
      <CalculatorResultContext
        metrics={[
          { label: "결과", value: "100", featured: true },
          { label: "총액", value: "1,000" },
        ]}
      />,
    );

    expect(screen.queryByTestId("result-comparison")).not.toBeInTheDocument();

    rerender(
      <CalculatorResultContext
        metrics={[
          { label: "결과", value: "120", featured: true },
          { label: "총액", value: "1,200" },
        ]}
      />,
    );

    expect(screen.getByTestId("result-comparison")).toHaveTextContent(
      "직전 계산과 비교",
    );
    expect(screen.getByTestId("result-comparison")).toHaveTextContent(
      "직전: 100",
    );
    expect(screen.getByTestId("result-comparison")).toHaveTextContent(
      "현재: 120",
    );
    expect(screen.getByTestId("result-comparison")).toHaveTextContent(
      "증가 · 변화량: 20",
    );

    rerender(
      <CalculatorResultContext
        metrics={[
          { label: "결과", value: "150", featured: true },
          { label: "총액", value: "1,500" },
        ]}
      />,
    );

    expect(screen.getByTestId("result-comparison")).toHaveTextContent(
      "직전: 120",
    );
    expect(screen.getByTestId("result-comparison")).not.toHaveTextContent(
      "직전: 100",
    );
  });

  it("shows deterministic direction and formatted delta only for safely comparable values", () => {
    const { rerender } = render(
      <CalculatorResultContext
        metrics={[
          { label: "Payment", value: "$1,200.50", featured: true },
          { label: "Duration", value: "10 years 2 months" },
          { label: "Rate", value: "3.5%" },
        ]}
      />,
    );

    rerender(
      <CalculatorResultContext
        metrics={[
          { label: "Payment", value: "$1,050.25", featured: true },
          { label: "Duration", value: "9 years 11 months" },
          { label: "Rate", value: "3.5%" },
        ]}
      />,
    );

    const comparison = screen.getByTestId("result-comparison");
    expect(comparison).toHaveTextContent("Decreased · Delta: $150.25");
    expect(comparison).toHaveTextContent("No change · Delta: 0.0%");
    expect(comparison).toHaveTextContent("Previous: 10 years 2 months");
    expect(comparison).toHaveTextContent("Current: 9 years 11 months");
    expect(comparison).not.toHaveTextContent("Delta: 0 years");
  });

  it("keeps differently formatted units side by side instead of inferring a delta", () => {
    const { rerender } = render(
      <CalculatorResultContext
        metrics={[{ label: "Amount", value: "$100", featured: true }]}
      />,
    );

    rerender(
      <CalculatorResultContext
        metrics={[{ label: "Amount", value: "€120", featured: true }]}
      />,
    );

    const comparison = screen.getByTestId("result-comparison");
    expect(comparison).toHaveTextContent("Previous: $100");
    expect(comparison).toHaveTextContent("Current: €120");
    expect(comparison).not.toHaveTextContent("Delta:");
  });

  it("localizes comparison guidance and clears ephemeral history when results reset", () => {
    const { rerender } = render(
      <CalculatorResultContext
        metrics={[
          { label: "Result", value: "$100", featured: true },
          { label: "Total", value: "$1,000" },
        ]}
      />,
    );

    rerender(
      <CalculatorResultContext
        metrics={[
          { label: "Result", value: "$125", featured: true },
          { label: "Total", value: "$1,250" },
        ]}
      />,
    );

    expect(screen.getByTestId("result-comparison")).toHaveTextContent(
      "Compare with the previous calculation",
    );
    expect(screen.getByTestId("result-comparison")).toHaveTextContent(
      "does not store your inputs",
    );
    expect(screen.getByTestId("result-comparison")).toHaveTextContent(
      "Increased · Delta: $25",
    );

    rerender(
      <CalculatorResultContext
        metrics={[
          { label: "Result", value: "-", featured: true },
          { label: "Total", value: "-" },
        ]}
      />,
    );

    expect(screen.queryByTestId("result-comparison")).not.toBeInTheDocument();
  });

  it("captures privacy-safe in-session scenarios and compares them side by side", () => {
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
    expect(screen.getByTestId("scenario-comparison")).toHaveTextContent(
      "Scenario 1",
    );
    expect(screen.getByTestId("scenario-comparison")).toHaveTextContent(
      "Inputs, URLs, and browser storage are not used",
    );

    rerender(
      <CalculatorResultContext
        metrics={[
          { label: "Payment", value: "$125", featured: true },
          { label: "Total", value: "$1,250" },
        ]}
      />,
    );
    const scenarios = screen.getByTestId("scenario-comparison");
    expect(scenarios).toHaveTextContent("Scenario: $100");
    expect(scenarios).toHaveTextContent("Current: $125");
    expect(scenarios).toHaveTextContent("Increased · Delta: $25");

    fireEvent.click(
      screen.getByRole("button", { name: "Save current result as scenario" }),
    );
    expect(scenarios).toHaveTextContent("Scenario 2");
  });

  it("blocks stale or duplicate scenario capture and clears scenarios with reset", () => {
    const { rerender } = render(
      <div>
        <CalculatorResultContext
          metrics={[{ label: "Result", value: "$100", featured: true }]}
        />
      </div>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Save current result as scenario" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Save current result as scenario" }),
    );
    expect(
      screen.getByText("This result is already saved as a scenario."),
    ).toBeInTheDocument();

    rerender(
      <div>
        <CalculatorResultContext
          metrics={[{ label: "Result", value: "$120", featured: true }]}
        />
        <div data-testid="stale-result-notice">Inputs changed.</div>
      </div>,
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Save current result as scenario" }),
    );
    expect(
      screen.getByText(/Recalculate before saving this scenario/),
    ).toBeInTheDocument();

    rerender(
      <div>
        <CalculatorResultContext
          metrics={[{ label: "Result", value: "-", featured: true }]}
        />
      </div>,
    );
    expect(screen.queryByTestId("scenario-comparison")).not.toBeInTheDocument();
  });
});
