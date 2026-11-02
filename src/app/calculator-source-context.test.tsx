import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CalculatorWorkedExample } from "@/components/calculators/calculator-worked-example";
import { CalculatorSourceContext } from "@/components/calculators/calculator-source-context";
import {
  calculatorExamples,
  calculatorExampleSources,
} from "@/content/calculator-examples";
import {
  calculatorArithmeticBasis,
  calculatorSourceScopes,
  retainedSourceScopes,
  getCalculatorSourceScope,
} from "@/content/calculator-source-context";
import { allPublishedCalculators } from "@/config/calculator-directory";
import { LocalizedCurrencyConversionPage } from "@/features/currency-conversion/components/localized-currency-conversion-page";
import { LocalizedCagrPage } from "@/features/cagr/components/localized-cagr-page";
import { LocalizedWorkHoursConverterPage } from "@/features/work-hours-converter/components/localized-work-hours-converter-page";
import { LocalizedMinimumWagePage } from "@/features/minimum-wage/components/localized-minimum-wage-page";
import { LocalizedWeeklyHolidayPayPage } from "@/features/weekly-holiday-pay/components/localized-weekly-holiday-pay-page";
import { LocalizedBusinessCashRunwayPage } from "@/features/business-cash-runway/components/localized-business-cash-runway-page";
import { LocalizedOperatingProfitPage } from "@/features/operating-profit/components/localized-operating-profit-page";
import { LocalizedPartTimeMonthlyPayPage } from "@/features/part-time-monthly-pay/components/localized-part-time-monthly-pay-page";
import { LocalizedBondYieldPage } from "@/features/bond-yield-to-maturity/components/localized-bond-yield-page";

const retained = {
  "currency-conversion": LocalizedCurrencyConversionPage,
  cagr: LocalizedCagrPage,
  "work-hours-converter": LocalizedWorkHoursConverterPage,
  "minimum-wage": LocalizedMinimumWagePage,
  "weekly-holiday-pay": LocalizedWeeklyHolidayPayPage,
  "business-cash-runway": LocalizedBusinessCashRunwayPage,
  "operating-profit": LocalizedOperatingProfitPage,
  "part-time-monthly-pay": LocalizedPartTimeMonthlyPayPage,
  "bond-yield-to-maturity": LocalizedBondYieldPage,
};

function parse(markup: string) {
  const holder = document.createElement("div");
  holder.innerHTML = markup;
  return holder;
}

describe("calculator source applicability coverage", () => {
  it("accounts for all 100 identities and every cited source without a generic fallback", () => {
    const shared = Object.keys(calculatorExamples);
    const published = allPublishedCalculators.map((calculator) =>
      calculator.href.split("/").at(-1),
    );
    expect([...shared, ...Object.keys(retained)].sort()).toEqual(
      published.sort(),
    );
    expect(published).toHaveLength(100);
    expect(Object.keys(calculatorSourceScopes).sort()).toEqual(
      Object.keys(calculatorExampleSources).sort(),
    );
    expect(Object.keys(calculatorSourceScopes)).toHaveLength(39);
    expect(Object.keys(retainedSourceScopes)).toHaveLength(4);
    const arithmetic = shared.filter(
      (slug) => calculatorExamples[slug].sources.length === 0,
    );
    expect([...arithmetic, "business-cash-runway"].sort()).toEqual(
      Object.keys(calculatorArithmeticBasis).sort(),
    );
    expect(Object.keys(calculatorArithmeticBasis)).toHaveLength(15);
    expect(
      getCalculatorSourceScope("https://example.com/unknown"),
    ).toBeUndefined();
    expect(
      renderToStaticMarkup(
        <CalculatorSourceContext
          locale="en"
          sources={[{ label: "Unknown", href: "https://example.com/unknown" }]}
        />,
      ),
    ).toBe("");
  });

  for (const locale of ["ko", "en"] as const) {
    it(`server-renders specific source scopes or arithmetic bases for all 91 shared examples in ${locale}`, () => {
      for (const [slug, example] of Object.entries(calculatorExamples)) {
        const holder = parse(
          renderToStaticMarkup(
            <CalculatorWorkedExample slug={slug} locale={locale} />,
          ),
        );
        const details = holder.querySelector(
          "details[data-calculator-source-context]",
        );
        expect(details, slug).not.toBeNull();
        expect(details?.hasAttribute("open"), slug).toBe(false);
        expect(
          holder.querySelector("time")?.getAttribute("datetime"),
          slug,
        ).toBe("2026-10-30");
        for (const key of example.sources) {
          const source = calculatorExampleSources[key];
          expect(details?.textContent, `${slug}:${key}`).toContain(
            calculatorSourceScopes[key][locale],
          );
          expect(
            [...holder.querySelectorAll("a")].find(
              (link) => link.getAttribute("href") === source.href,
            ),
            `${slug}:${key}`,
          ).toBeDefined();
        }
        if (example.sources.length === 0) {
          expect(details?.textContent, slug).toContain(
            calculatorArithmeticBasis[slug][locale],
          );
        }
      }
    });

    it(`server-renders source context through all 9 retained pages in ${locale}`, () => {
      for (const [slug, Page] of Object.entries(retained)) {
        const holder = parse(renderToStaticMarkup(<Page locale={locale} />));
        const guide = holder.querySelector(
          '[aria-labelledby="calculator-content-guide-title"]',
        );
        const details = guide?.querySelector(
          "details[data-calculator-source-context]",
        );
        expect(details, slug).not.toBeNull();
        const sourceLinks = [
          ...(guide?.querySelectorAll('a[href^="https://"]') ?? []),
        ];
        for (const link of sourceLinks) {
          const href = link.getAttribute("href")!;
          const scope = getCalculatorSourceScope(href);
          expect(scope, `${slug}:${href}`).toBeDefined();
          expect(details?.textContent, `${slug}:${href}`).toContain(
            scope![locale],
          );
        }
        if (slug === "business-cash-runway") {
          expect(sourceLinks).toHaveLength(0);
          expect(details?.textContent).toContain(
            calculatorArithmeticBasis[slug][locale],
          );
          expect(guide?.querySelector("time")?.getAttribute("datetime")).toBe(
            "2026-08-28",
          );
        } else {
          expect(sourceLinks.length, slug).toBeGreaterThan(0);
        }
      }
    });
  }
});
