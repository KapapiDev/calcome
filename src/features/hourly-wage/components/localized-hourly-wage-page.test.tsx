import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LocalizedHourlyWagePage } from "./localized-hourly-wage-page";

vi.mock("./hourly-wage-calculator", () => ({
  HourlyWageCalculator: ({ locale }: { locale: string }) => (
    <div data-testid="calculator">{locale}</div>
  ),
}));

describe("LocalizedHourlyWagePage", () => {
  it("renders Korean visible content and matching structured data", () => {
    const { container } = render(<LocalizedHourlyWagePage locale="ko" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "시급 계산기" }),
    ).toBeVisible();
    expect(screen.getByTestId("calculator")).toHaveTextContent("ko");
    expect(
      screen.getByText("최저임금위원회 연도별 최저임금 결정현황"),
    ).toBeVisible();
    const jsonLd = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(jsonLd[0]).toMatchObject({
      "@type": "WebPage",
      url: "https://www.calcome.com/ko/employment/hourly-wage",
      inLanguage: "ko-KR",
    });
  });

  it("renders English without mixed Korean interface copy", () => {
    render(<LocalizedHourlyWagePage locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "South Korea Hourly Wage Calculator",
      }),
    ).toBeVisible();
    expect(screen.getByText("Official references")).toBeVisible();
    expect(screen.queryByText("시급 계산기")).not.toBeInTheDocument();
  });
});
