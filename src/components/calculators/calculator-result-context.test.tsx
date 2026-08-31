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
    expect(screen.getByText("가장 중요한 결과")).toBeInTheDocument();
    expect(screen.getByText("월 납입액")).toBeInTheDocument();
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
    expect(screen.getByText("Primary result")).toBeInTheDocument();
    expect(screen.getByText("Monthly payment")).toBeInTheDocument();
    expect(
      screen.getByText(/stated assumptions or included scope/),
    ).toBeInTheDocument();
  });
});
