import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CalculatorContentGuide } from "./calculator-content-guide";

describe("CalculatorContentGuide", () => {
  it("renders the reusable English depth and trust sections", () => {
    render(
      <CalculatorContentGuide
        locale="en"
        method="Divide starting cash by monthly net burn."
        example="120 divided by 20 gives 6 months."
        assumptions={["Monthly cash flow stays constant."]}
        limitations={["The result is an estimate, not a forecast."]}
        reviewedAt="2026-08-28"
        sources={[
          {
            label: "Primary source",
            href: "https://example.com/source",
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Calculation basis and checks" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Worked example" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Key assumptions" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Limits and checks" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Content reviewed/)).toHaveTextContent(
      "2026-08-28",
    );
    expect(
      screen.getByRole("link", { name: "Primary source" }),
    ).toHaveAttribute("href", "https://example.com/source");
  });

  it("renders Korean trust labels without requiring a source", () => {
    render(
      <CalculatorContentGuide
        locale="ko"
        method="계산 방법"
        example="계산 예시"
        assumptions={["가정"]}
        limitations={["한계"]}
        reviewedAt="2026-08-28"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "계산 기준과 확인 사항" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/콘텐츠 검토일/)).toHaveTextContent("2026-08-28");
    expect(screen.queryByText("출처:")).not.toBeInTheDocument();
  });
});
