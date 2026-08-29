import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CalculatorCard } from "./calculator-card";

const calculator = {
  id: "long-card-test",
  name: "매우 긴 다국어 계산기 이름 Very Long Localized Calculator Name",
  description:
    "작은 화면과 200% 확대에서도 카드가 넘치지 않도록 긴 설명이 안정적으로 정리되는지 확인합니다.",
  keywords: ["test"],
  category: "금융" as const,
  href: "/ko/finance/long-card-test" as const,
};

describe("CalculatorCard", () => {
  it("preserves canonical entry while containing long localized copy", () => {
    render(
      <CalculatorCard
        calculator={calculator}
        categoryLabel="아주 긴 카테고리 이름 Long Category Label"
      />,
    );

    const link = screen.getByRole("link", { name: /매우 긴 다국어 계산기 이름/ });
    expect(link).toHaveAttribute("href", calculator.href);
    expect(link).toHaveClass("min-h-11", "min-w-0", "overflow-hidden");
    expect(screen.getByRole("heading")).toHaveClass("break-words");
    expect(screen.getByText(calculator.description)).toHaveClass(
      "line-clamp-3",
      "break-words",
    );
    expect(
      screen.getByText("아주 긴 카테고리 이름 Long Category Label"),
    ).toHaveClass("break-words");
  });
});
