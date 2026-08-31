import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

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
});
