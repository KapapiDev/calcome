import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PrimaryResults } from "@/components/calculators/calculator-workspace";

const CASES = [
  {
    locale: "ko",
    metrics: [
      {
        label: "예상 최종 금액",
        value: "₩9,876,543,210,123,456",
        featured: true,
      },
      { label: "월 상환액", value: "1,234,567,890원" },
      { label: "누적 수익률", value: "12,345.67%" },
    ],
  },
  {
    locale: "en",
    metrics: [
      {
        label: "Projected ending value",
        value: "$9,876,543,210,123,456.78",
        featured: true,
      },
      { label: "Monthly payment", value: "$1,234,567,890.12" },
      { label: "Total return", value: "12,345.67%" },
    ],
  },
] as const;

describe("calculator mobile result readability runtime regression", () => {
  for (const { locale, metrics } of CASES) {
    it(`keeps ${locale} long localized result values contained and readable`, () => {
      const { getByTestId } = render(
        <section lang={locale}>
          <PrimaryResults metrics={metrics} />
        </section>,
      );
      const results = getByTestId("primary-results");

      expect(results).toHaveClass("grid", "sm:grid-cols-3");
      expect(results).toHaveAttribute("tabindex", "-1");

      const cards = Array.from(results.children);
      expect(cards).toHaveLength(metrics.length);
      expect(cards[0]).toHaveClass("min-h-24", "border-primary/30");

      const values = within(results).getAllByRole("definition");
      expect(values).toHaveLength(metrics.length);

      for (const [index, value] of values.entries()) {
        expect(value).toHaveClass("break-words", "tabular-nums", "text-xl");
        expect(value).toHaveTextContent(String(metrics[index].value));
      }
    });
  }
});
