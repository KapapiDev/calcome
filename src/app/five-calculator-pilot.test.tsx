import Decimal from "decimal.js";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { LocalizedCurrencyConversionPage } from "@/features/currency-conversion/components/localized-currency-conversion-page";
import { currencyConversionContent } from "@/features/currency-conversion/content";
import { calculateCurrencyConversion } from "@/features/currency-conversion/calculate";
import { createCurrencyConversionMetadata } from "@/features/currency-conversion/metadata";
import { LocalizedCagrPage } from "@/features/cagr/components/localized-cagr-page";
import { getCagrDictionary } from "@/features/cagr/i18n";
import { calculateCagr } from "@/features/cagr/calculate";
import { LocalizedWorkHoursConverterPage } from "@/features/work-hours-converter/components/localized-work-hours-converter-page";
import { workHoursConverterContent } from "@/features/work-hours-converter/content";
import { calculateWorkHoursConverter } from "@/features/work-hours-converter/calculate";
import { LocalizedMinimumWagePage } from "@/features/minimum-wage/components/localized-minimum-wage-page";
import { minimumWageContent } from "@/features/minimum-wage/content";
import { calculateMinimumWage } from "@/features/minimum-wage/calculate";
import { LocalizedWeeklyHolidayPayPage } from "@/features/weekly-holiday-pay/components/localized-weekly-holiday-pay-page";
import { weeklyHolidayPayContent } from "@/features/weekly-holiday-pay/content";
import { calculateWeeklyHolidayPay } from "@/features/weekly-holiday-pay/calculate";
import sitemap from "./sitemap";

describe("five-calculator sourced improvement pilot", () => {
  beforeEach(() => window.localStorage.clear());

  it.each(["ko", "en"] as const)(
    "publishes usable %s examples, sources and localized links",
    (locale) => {
      const paths = new Set(sitemap().map(({ url }) => new URL(url).pathname));
      const pages = [
        [LocalizedCurrencyConversionPage, currencyConversionContent[locale]],
        [LocalizedCagrPage, getCagrDictionary(locale).page],
        [LocalizedWorkHoursConverterPage, workHoursConverterContent[locale]],
        [LocalizedMinimumWagePage, minimumWageContent[locale]],
        [LocalizedWeeklyHolidayPayPage, weeklyHolidayPayContent[locale]],
      ] as const;
      for (const [Page, copy] of pages) {
        const { container, unmount } = render(<Page locale={locale} />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          copy.title,
        );
        expect(screen.getByText(copy.example)).toBeVisible();
        expect(container.querySelector("time")).toHaveAttribute(
          "datetime",
          "2026-10-30",
        );
        expect(container.querySelector('a[href^="https://"]')).not.toBeNull();
        for (const link of container.querySelectorAll('a[href^="/"]')) {
          const href = link.getAttribute("href")!;
          expect(paths.has(href), href).toBe(true);
          expect(
            locale === "ko" ? !href.startsWith("/en") : href.startsWith("/en"),
            href,
          ).toBe(true);
        }
        if (locale === "en")
          expect(container.textContent).not.toMatch(/[가-힣]/);
        unmount();
      }
      expect(createCurrencyConversionMetadata(locale).description).toBe(
        currencyConversionContent[locale].description,
      );
      expect(createCurrencyConversionMetadata(locale).openGraph).toMatchObject({
        description: currencyConversionContent[locale].description,
      });
    },
  );

  it("reproduces every published example without conflating the three monthly bases", () => {
    expect(
      calculateCurrencyConversion({ amount: 100, rate: 1350 }).convertedAmount,
    ).toBe(135000);
    expect(
      calculateCurrencyConversion({ amount: 100, rate: 0.92 }).convertedAmount,
    ).toBe(92);
    expect(
      calculateCurrencyConversion({ amount: 100, rate: 0.92 }).inverseRate,
    ).toBeCloseTo(1.08695652, 8);
    const cagr = calculateCagr({
      initialValue: "100",
      finalValue: "121",
      years: "2",
    });
    expect(Number(cagr.cagrPercent)).toBeCloseTo(10, 8);
    expect(Number(cagr.totalReturnPercent)).toBe(21);
    const hours = calculateWorkHoursConverter({
      direction: "weekly-to-monthly",
      hours: 40,
    });
    expect(hours.averageMonthlyHours).toBeCloseTo(173.925, 8);
    expect(hours.annualHours).toBeCloseTo(2087.1, 8);
    const minimum = calculateMinimumWage({
      weeklyHours: new Decimal(40),
      includesPaidWeeklyHoliday: true,
    });
    expect(minimum.weeklyMinimum.toNumber()).toBe(495360);
    expect(minimum.monthlyMinimum.toNumber()).toBeCloseTo(2152457.142857, 5);
    expect(minimum.officialMonthlyMinimum.toNumber()).toBe(2156880);
    const holiday = calculateWeeklyHolidayPay({
      hourlyWage: new Decimal(10320),
      weeklyHours: new Decimal(20),
      completedScheduledDays: true,
    });
    expect(holiday.weeklyHolidayPay.toNumber()).toBe(41280);
    expect(holiday.weeklyTotalPay.toNumber()).toBe(247680);
    expect(holiday.estimatedMonthlyHolidayPay.toNumber()).toBe(179361.6);
  });

  it("identifies the illustrative currency rate and supports manual direction, errors and reset", async () => {
    const user = userEvent.setup();
    render(<LocalizedCurrencyConversionPage locale="en" />);
    const rate = screen.getByRole("textbox", {
      name: "Exchange rate (1 USD = ? EUR)",
    });
    expect(rate).toHaveAccessibleDescription(
      currencyConversionContent.en.rateHelp,
    );
    await user.clear(rate);
    await user.type(rate, "0.92");
    await user.click(screen.getByRole("button", { name: "Convert" }));
    expect(screen.getByText("92 EUR")).toBeVisible();
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Base currency" }),
      "EUR",
    );
    await user.click(screen.getByRole("button", { name: "Convert" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Choose two different currencies.",
    );
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Exchange rate (1 USD = ? EUR)" }),
    ).toHaveValue("1.25");
  });

  it("converts the hours example in both directions and resets invalid input", async () => {
    const user = userEvent.setup();
    render(<LocalizedWorkHoursConverterPage locale="en" />);
    await user.click(screen.getByRole("button", { name: "Convert" }));
    expect(screen.getAllByText("173.93 hr")[0]).toBeVisible();
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Conversion direction" }),
      "monthly-to-weekly",
    );
    const hours = screen.getByRole("textbox", { name: "Work hours" });
    await user.clear(hours);
    await user.type(hours, "173.925");
    await user.click(screen.getByRole("button", { name: "Convert" }));
    expect(screen.getAllByText("40 hr")[0]).toBeVisible();
    await user.clear(hours);
    await user.type(hours, "-1");
    await user.click(screen.getByRole("button", { name: "Convert" }));
    expect(screen.getByRole("alert")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(hours).toHaveValue("40");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("keeps the four-week eligibility guidance associated with both policy inputs", () => {
    const first = render(<LocalizedMinimumWagePage locale="en" />);
    expect(
      screen.getByRole("textbox", { name: "Scheduled weekly hours" }),
    ).toHaveAccessibleDescription(minimumWageContent.en.hoursHelp);
    first.unmount();
    render(<LocalizedWeeklyHolidayPayPage locale="en" />);
    expect(
      screen.getByRole("textbox", { name: "Scheduled weekly hours" }),
    ).toHaveAccessibleDescription(weeklyHolidayPayContent.en.hoursHelp);
    expect(
      screen.getByText(weeklyHolidayPayContent.en.monthlyPay),
    ).toHaveTextContent("holiday pay");
  });
});
