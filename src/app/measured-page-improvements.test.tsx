import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { LocalizedOperatingProfitPage } from "@/features/operating-profit/components/localized-operating-profit-page";
import { operatingProfitContent } from "@/features/operating-profit/content";
import { createOperatingProfitMetadata } from "@/features/operating-profit/metadata";
import { calculateOperatingProfit } from "@/features/operating-profit/calculate";
import { LocalizedPartTimeMonthlyPayPage } from "@/features/part-time-monthly-pay/components/localized-part-time-monthly-pay-page";
import { partTimeMonthlyPayContent } from "@/features/part-time-monthly-pay/content";
import { createPartTimeMonthlyPayMetadata } from "@/features/part-time-monthly-pay/metadata";
import { calculatePartTimeMonthlyPay } from "@/features/part-time-monthly-pay/calculate";
import { LocalizedBondYieldPage } from "@/features/bond-yield-to-maturity/components/localized-bond-yield-page";
import { bondYieldContent } from "@/features/bond-yield-to-maturity/content";
import { createBondYieldMetadata } from "@/features/bond-yield-to-maturity/metadata";
import { calculateBondYield } from "@/features/bond-yield-to-maturity/calculate";
import sitemap from "./sitemap";

const pages = [
  {
    Page: LocalizedOperatingProfitPage,
    copy: operatingProfitContent,
    metadata: createOperatingProfitMetadata,
  },
  {
    Page: LocalizedPartTimeMonthlyPayPage,
    copy: partTimeMonthlyPayContent,
    metadata: createPartTimeMonthlyPayMetadata,
  },
  {
    Page: LocalizedBondYieldPage,
    copy: bondYieldContent,
    metadata: createBondYieldMetadata,
  },
];

describe("measured calculator page improvements", () => {
  beforeEach(() => window.localStorage.clear());

  it.each(["ko", "en"] as const)(
    "keeps %s explanatory content, metadata and every internal link usable",
    (locale) => {
      const publishedPaths = new Set(
        sitemap().map(({ url }) => new URL(url).pathname),
      );
      for (const { Page, copy, metadata } of pages) {
        const { container, unmount } = render(<Page locale={locale} />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          copy[locale].title,
        );
        expect(screen.getByText(copy[locale].example)).toBeVisible();
        expect(screen.getByText(copy[locale].assumptions)).toBeVisible();
        expect(container.querySelector("time")).toHaveAttribute(
          "datetime",
          "2026-10-30",
        );
        expect(container.querySelectorAll('a[href^="https://"]')).toHaveLength(
          1,
        );
        expect(metadata(locale).description).toBe(copy[locale].description);
        expect(metadata(locale).title).toBe(copy[locale].metaTitle);
        for (const link of container.querySelectorAll('a[href^="/"]')) {
          expect(publishedPaths.has(link.getAttribute("href")!)).toBe(true);
        }
        unmount();
      }
    },
  );

  it("reproduces the published margin, monthly-pay and bond examples with the unchanged engines", () => {
    const profit = calculateOperatingProfit({
      revenue: 100000000,
      costOfGoodsSold: 55000000,
      operatingExpenses: 25000000,
    });
    expect(profit).toEqual({
      grossProfit: 45000000,
      operatingProfit: 20000000,
      operatingMargin: 0.2,
    });
    const koreanPay = calculatePartTimeMonthlyPay({
      hourlyWage: 12000,
      hoursPerDay: 5,
      daysPerWeek: 4,
    });
    expect(koreanPay.monthlyPay).toBeCloseTo(1043550, 6);
    expect(koreanPay.annualPay).toBeCloseTo(12522600, 6);
    const englishPay = calculatePartTimeMonthlyPay({
      hourlyWage: 20,
      hoursPerDay: 5,
      daysPerWeek: 4,
    });
    expect(englishPay.monthlyPay).toBeCloseTo(1739.25, 6);
    expect(englishPay.annualPay).toBeCloseTo(20871, 6);
    const bond = calculateBondYield({
      faceValue: 1000,
      marketPrice: 950,
      annualCouponRatePercent: 5,
      yearsToMaturity: 1,
      paymentsPerYear: 1,
    });
    expect(bond.currentYieldPercent).toBeCloseTo(5.263157895, 6);
    expect(bond.ytmPercent).toBeCloseTo(10.526315789, 6);
  });

  it("calculates monthly gross pay from the English worked example without treating the month as four weeks", async () => {
    const user = userEvent.setup();
    render(<LocalizedPartTimeMonthlyPayPage locale="en" />);
    await user.clear(screen.getByLabelText("Hourly wage"));
    await user.type(screen.getByLabelText("Hourly wage"), "20");
    await user.click(screen.getByRole("button", { name: "Calculate" }));
    expect(screen.getByText("$1,739.25", { exact: true })).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "South Korea Weekly Holiday Pay Calculator (KRW)",
      }),
    ).toHaveAttribute("href", "/en/employment/weekly-holiday-pay");
  });

  it.each(["ko", "en"] as const)(
    "links the %s YTM calculator to the matching published guides",
    (locale) => {
      const { container } = render(<LocalizedBondYieldPage locale={locale} />);
      expect(
        container.querySelector(
          `a[href="/${locale}/guides/ytm-vs-current-yield"]`,
        ),
      ).toBeInTheDocument();
      expect(
        container.querySelector(
          `a[href="/${locale}/guides/bond-price-and-yield"]`,
        ),
      ).toBeInTheDocument();
    },
  );
});
