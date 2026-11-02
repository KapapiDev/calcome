import Decimal from "decimal.js";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { guidePublishedOn, guideSlugs } from "@/content/guides";
import { guideComparisons } from "@/content/guide-comparisons";
import { calculateNetSalary } from "@/features/net-salary/calculate";
import { calculateEarnedIncomeWithholdingTax } from "@/features/earned-income-withholding-tax/calculate";
import { LocalizedNetSalaryPage } from "@/features/net-salary/components/localized-net-salary-page";
import { LocalizedEarnedIncomeWithholdingTaxPage } from "@/features/earned-income-withholding-tax/components/localized-earned-income-withholding-tax-page";
import { createGuideStructuredData } from "@/lib/seo/guide-structured-data";
import GuidePage, { generateMetadata } from "../[locale]/guides/[slug]/page";

const slug = "net-salary-vs-withholding";

describe("payroll method comparison", () => {
  it("reproduces the tax-only estimate for the same employee counted by each model", () => {
    const result = calculateNetSalary({
      salaryMode: "monthly",
      salary: new Decimal(3_500_000),
      bonus: new Decimal(0),
      monthlyNonTaxable: new Decimal(0),
      dependents: 0,
      children: 0,
      pension: false,
      health: false,
      longTermCare: false,
      employment: false,
      incomeTax: true,
      localIncomeTax: true,
    });
    // Independent arithmetic for this model, not an official annual tax oracle:
    // (14m × 6% + (28.95m − 14m) × 15% − wage-dependent 668k credit) / 12.
    const annualModelTax = 14_000_000 * 0.06 + 14_950_000 * 0.15 - 668_000;
    expect(annualModelTax).toBe(2_414_500);
    expect(result.deductions.incomeTax.toNumber()).toBe(
      Math.floor(annualModelTax / 12),
    );
    expect(result.deductions.incomeTax.toNumber()).toBe(201_208);
    expect(result.deductions.localIncomeTax.toNumber()).toBe(20_120);
    expect(result.monthlyDeductions.toNumber()).toBe(221_328);
    for (const key of [
      "pension",
      "health",
      "longTermCare",
      "employment",
    ] as const) {
      expect(result.deductions[key].toNumber()).toBe(0);
    }
  });

  it.each([
    [80, 101_770, 10_170, 111_940],
    [100, 127_220, 12_720, 139_940],
    [120, 152_660, 15_260, 167_920],
  ] as const)(
    "reproduces the published %i%% table case with KRW 10 truncation",
    (withholdingRate, incomeTax, localIncomeTax, totalWithholding) => {
      const result = calculateEarnedIncomeWithholdingTax({
        monthlyTaxableSalary: 3_500_000,
        dependents: 1,
        eligibleChildren: 0,
        withholdingRate,
      });
      // NTS cited row: KRW 3.5m inclusive to 3.52m exclusive, employee alone.
      expect(result.baseTableTax).toBe(127_220);
      expect(result.childTaxAdjustment).toBe(0);
      expect(result).toMatchObject({
        incomeTax,
        localIncomeTax,
        totalWithholding,
      });
    },
  );

  it.each(["ko", "en"] as const)(
    "publishes %s comparison text, both calculator destinations and truthful dates",
    async (locale) => {
      const { container, unmount } = render(
        await GuidePage({ params: Promise.resolve({ locale, slug }) }),
      );
      expect(screen.getByRole("table")).toHaveTextContent("221,328");
      expect(screen.getByRole("table")).toHaveTextContent("139,940");
      expect(
        screen.getByRole("heading", {
          name: guideComparisons[slug][locale].question,
        }),
      ).toBeVisible();
      expect(
        screen.getByRole("link", {
          name:
            locale === "ko"
              ? "실수령액 계산기 열기"
              : "Open the Net Salary Calculator",
        }),
      ).toHaveAttribute("href", `/${locale}/employment/net-salary`);
      expect(container.textContent).toContain(
        locale === "ko" ? "본인을 제외" : "excludes you",
      );
      const { "@graph": graph } = createGuideStructuredData(locale, slug) as {
        "@graph": Record<string, unknown>[];
      };
      expect(graph.find((node) => node["@type"] === "Article")).toMatchObject({
        datePublished: "2026-11-02",
      });
      const metadata = await generateMetadata({
        params: Promise.resolve({ locale, slug }),
      });
      expect(metadata.openGraph).toMatchObject({ publishedTime: "2026-11-02" });
      unmount();
    },
  );

  it("preserves the original publication dates of the five existing guides", () => {
    const originalGuides = [
      "cagr-vs-average-return",
      "annualize-growth-correctly",
      "ytm-vs-current-yield",
      "bond-price-and-yield",
      "currency-conversion-rate-check",
    ] as const;
    for (const existing of originalGuides) {
      expect(guideSlugs).toContain(existing);
      expect(guidePublishedOn[existing]).toBe("2026-10-30");
      const { "@graph": graph } = createGuideStructuredData("en", existing) as {
        "@graph": Record<string, unknown>[];
      };
      expect(graph.find((node) => node["@type"] === "Article")).toMatchObject({
        datePublished: "2026-10-30",
      });
    }
  });

  it.each(["ko", "en"] as const)(
    "links both %s calculator pages to the comparison fragment",
    (locale) => {
      for (const Page of [
        LocalizedNetSalaryPage,
        LocalizedEarnedIncomeWithholdingTaxPage,
      ]) {
        const { unmount } = render(<Page locale={locale} />);
        expect(
          screen.getByRole("link", {
            name:
              locale === "ko"
                ? "비교 기준과 출처 자세히 보기"
                : "Read the comparison basis and sources",
          }),
        ).toHaveAttribute(
          "href",
          `/${locale}/guides/${slug}#comparison-${slug}`,
        );
        unmount();
      }
    },
  );
});
