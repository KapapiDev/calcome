import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocalizedHome, {
  generateMetadata as homeMetadata,
} from "./[locale]/page";
import LocalizedInfoPage, {
  generateMetadata as infoMetadata,
} from "./[locale]/[info]/page";
import GuidePage from "./[locale]/guides/[slug]/page";
import { EditorialPolicyPage } from "@/components/content/editorial-policy-page";
import { EditorialLinks } from "@/components/content/editorial-links";
import { SiteFooter } from "@/components/layout/site-footer";
import { localizedDestination } from "@/components/layout/language-routing";
import { guideContent, guideSlugs, guideSources } from "@/content/guides";
import { guideComparisons } from "@/content/guide-comparisons";
import { calculateCagr } from "@/features/cagr/calculate";
import { calculateBondPrice } from "@/features/bond-price/calculate";
import { calculateBondYield } from "@/features/bond-yield-to-maturity/calculate";
import { calculateCurrencyConversion } from "@/features/currency-conversion/calculate";
import { createEarnedIncomeWithholdingTaxMetadata } from "@/features/earned-income-withholding-tax/metadata";
import { createIsaTaxSavingsMetadata } from "@/features/isa-tax-savings/metadata";
import { createYearEndTaxRefundMetadata } from "@/features/year-end-tax-refund/metadata";
import { createPensionSavingsTaxCreditMetadata } from "@/features/pension-savings-tax-credit/metadata";
import { createRetirementIncomeTaxMetadata } from "@/features/retirement-income-tax/metadata";
import sitemap from "./sitemap";

describe("SEO/GEO clarity and editorial provenance", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it("renders an entirely English home with specific names, categories and usable search", async () => {
    const user = userEvent.setup();
    const { container } = render(
      await LocalizedHome({ params: Promise.resolve({ locale: "en" }) }),
    );
    expect(container.textContent).not.toMatch(/[가-힣]/);
    expect(
      screen.getByRole("heading", { name: "CAGR Calculator" }),
    ).toBeVisible();
    expect(
      screen.getByText(/Compare lump-sum and recurring contributions/),
    ).toBeVisible();
    expect(container.textContent).not.toContain(
      "with clear inputs, assumptions, and results",
    );
    await user.type(
      screen.getByRole("searchbox", { name: "Search calculators" }),
      "CAGR",
    );
    const results = screen.getByRole("list", {
      name: "Calculator search results",
    });
    expect(results).toHaveTextContent("CAGR Calculator");
    expect(results.querySelector('a[href="/en/finance/cagr"]')).not.toBeNull();
    const metadata = await homeMetadata({
      params: Promise.resolve({ locale: "en" }),
    });
    expect(metadata.openGraph).toMatchObject({
      locale: "en_US",
      description: metadata.description,
    });
  });

  it.each(["ko", "en"] as const)(
    "exposes %s editorial responsibility, material corrections and a working reporting channel",
    async (locale) => {
      const policy = render(<EditorialPolicyPage locale={locale} />);
      expect(policy.container.querySelector("#updates")).not.toBeNull();
      expect(
        policy.container.querySelector(
          'a[href="https://github.com/KapapiDev/calcome"]',
        ),
      ).not.toBeNull();
      expect(policy.container.textContent).toContain(
        locale === "ko" ? "220만원" : "2.2 million",
      );
      expect(policy.container.textContent).toContain("20,830");
      if (locale === "en")
        expect(policy.container.textContent).not.toMatch(/[가-힣]/);
      const linkView = render(<EditorialLinks locale={locale} />);
      for (const anchor of linkView.container.querySelectorAll("a")) {
        const url = new URL(anchor.href);
        const canonical =
          locale === "ko" ? "/editorial-policy" : "/en/editorial-policy";
        expect(url.pathname).toBe(canonical);
        if (url.hash)
          expect(policy.container.querySelector(url.hash)).not.toBeNull();
        expect(
          sitemap().some(
            (entry) => new URL(entry.url).pathname === url.pathname,
          ),
        ).toBe(true);
      }
      linkView.unmount();
      policy.unmount();
      const about = render(
        await LocalizedInfoPage({
          params: Promise.resolve({ locale, info: "about" }),
        }),
      );
      expect(
        about.container.querySelector(
          'a[href="https://github.com/KapapiDev/calcome"]',
        ),
      ).not.toBeNull();
      about.unmount();
      const footer = render(<SiteFooter locale={locale} />);
      expect(
        footer.container.querySelector(
          `a[href="${locale === "ko" ? "" : "/en"}/editorial-policy"]`,
        ),
      ).not.toBeNull();
      footer.unmount();
      if (locale === "en") {
        const contact = render(
          await LocalizedInfoPage({
            params: Promise.resolve({ locale, info: "contact" }),
          }),
        );
        expect(
          screen.getByRole("link", { name: "hello@calcome.com" }),
        ).toHaveAttribute("href", "mailto:hello@calcome.com");
        contact.unmount();
      }
      const metadata = await infoMetadata({
        params: Promise.resolve({ locale, info: "editorial-policy" }),
      });
      const canonical =
        locale === "ko" ? "/editorial-policy" : "/en/editorial-policy";
      expect(metadata.alternates?.canonical).toBe(canonical);
      expect(
        localizedDestination(canonical, locale === "ko" ? "en" : "ko"),
      ).toBe(locale === "ko" ? "/en/editorial-policy" : "/editorial-policy");
    },
  );

  it.each(
    (["ko", "en"] as const).flatMap((locale) =>
      guideSlugs.map((slug) => ({ locale, slug })),
    ),
  )(
    "publishes a reproducible $locale/$slug comparison with matching visible and structured provenance",
    async ({ locale, slug }) => {
      const { container } = render(
        await GuidePage({ params: Promise.resolve({ locale, slug }) }),
      );
      const copy = guideComparisons[slug][locale];
      const table = screen.getByRole("table", { name: copy.question });
      const expectedRows = slug === "net-salary-vs-withholding" ? 4 : 3;
      expect(table.querySelectorAll("tbody tr")).toHaveLength(expectedRows);
      expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(3);
      expect(table.querySelectorAll('tbody th[scope="row"]')).toHaveLength(
        expectedRows,
      );
      for (const row of copy.rows)
        for (const cell of row) expect(table.textContent).toContain(cell);
      const graph = JSON.parse(
        container.querySelector('script[type="application/ld+json"]')!
          .textContent!,
      )["@graph"];
      const article = graph.find(
        (node: Record<string, unknown>) => node["@type"] === "Article",
      );
      expect(article).toMatchObject({
        headline: guideContent[slug][locale].title,
        datePublished: [
          "net-salary-vs-withholding",
          "loan-term-total-interest",
          "refinancing-break-even",
          "investment-fees-compound",
        ].includes(slug)
          ? "2026-11-02"
          : "2026-10-30",
        dateModified: "2026-11-02",
        author: { "@type": "Organization", name: "CalCome" },
      });
      expect(
        container.querySelector(
          `a[href="${new URL(article.author.url).pathname}"]`,
        ),
      ).not.toBeNull();
      expect(article.citation).toEqual(
        guideSources[slug].map((source) => source.href),
      );
      expect(JSON.stringify(graph)).not.toMatch(
        /"@type":"Person"|AggregateRating|reviewRating/,
      );
    },
  );

  it.each([
    createEarnedIncomeWithholdingTaxMetadata,
    createIsaTaxSavingsMetadata,
    createYearEndTaxRefundMetadata,
    createPensionSavingsTaxCreditMetadata,
    createRetirementIncomeTaxMetadata,
  ])("lets the root template add the brand once for %s", (createMetadata) => {
    for (const locale of ["ko", "en"] as const) {
      const title = String(createMetadata(locale).title);
      expect(title).not.toContain("CalCome");
      expect(`${title} | CalCome`.match(/CalCome/g) || []).toHaveLength(1);
    }
  });

  it("reproduces every numeric scenario used in the new comparison tables", () => {
    for (const [initialValue, finalValue, years, expected] of [
      [100, 121, 2, 10],
      [100, 100, 2, 0],
      [100, 102, 1 / 12, 26.824179456],
      [100, 125, 0.5, 56.25],
      [100, 125, 1, 25],
    ]) {
      expect(
        Number(
          calculateCagr({
            initialValue: String(initialValue),
            finalValue: String(finalValue),
            years: String(years),
          }).cagrPercent,
        ),
      ).toBeCloseTo(expected, 6);
    }
    expect((50 - 100 / 3) / 2).toBeCloseTo(8.333333333, 6);
    expect((-50 + 100) / 2).toBe(25);
    for (const [marketPrice, currentYield, ytm] of [
      [950, 5.263157895, 10.526315789],
      [1000, 5, 5],
      [1050, 4.761904762, 0],
    ]) {
      const result = calculateBondYield({
        faceValue: 1000,
        marketPrice,
        annualCouponRatePercent: 5,
        yearsToMaturity: 1,
        paymentsPerYear: 1,
      });
      expect(result.currentYieldPercent).toBeCloseTo(currentYield, 6);
      expect(result.ytmPercent).toBeCloseTo(ytm, 6);
    }
    for (const [annualMarketYieldPercent, price] of [
      [0, 1050],
      [5, 1000],
      [10, 954.545454545],
    ])
      expect(
        calculateBondPrice({
          faceValue: 1000,
          annualCouponRatePercent: 5,
          annualMarketYieldPercent,
          yearsToMaturity: 1,
          paymentsPerYear: 1,
        }).bondPrice,
      ).toBeCloseTo(price, 6);
    const lower = calculateCurrencyConversion({
      amount: 100,
      rate: 1300,
    }).convertedAmount;
    const higher = calculateCurrencyConversion({
      amount: 100,
      rate: 1350,
    }).convertedAmount;
    expect(lower).toBe(130000);
    expect(higher).toBe(135000);
    expect(higher - 6000).toBe(129000);
    expect(higher - 6000).toBeLessThan(lower);
  });
});
