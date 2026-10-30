import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";
import { localizedDestination } from "@/components/layout/language-routing";
import { SiteFooter } from "@/components/layout/site-footer";
import { guideContent, guideSlugs, guideSources } from "@/content/guides";
import { calculateBondYield } from "@/features/bond-yield-to-maturity/calculate";
import { calculateCagr } from "@/features/cagr/calculate";
import { calculateCurrencyConversion } from "@/features/currency-conversion/calculate";
import GuidePage, {
  generateMetadata,
  generateStaticParams,
} from "../[locale]/guides/[slug]/page";
import LocalizedInfoPage from "../[locale]/[info]/page";
import { guideSitemapEntries } from "../sitemap";
import GuidesPage from "./page";

describe("published guide journeys", () => {
  it.each(["ko", "en"] as const)(
    "makes the %s guide index discoverable from the shared footer",
    (locale) => {
      render(<SiteFooter locale={locale} />);
      expect(
        screen.getByRole("link", {
          name: locale === "ko" ? "가이드" : "Guides",
        }),
      ).toHaveAttribute("href", locale === "ko" ? "/guides" : "/en/guides");
    },
  );
  const routes = (["ko", "en"] as const).flatMap((locale) =>
    generateStaticParams().map(({ slug }) => ({ locale, slug })),
  );

  it("publishes ten unique localized routes with reciprocal metadata and language switching", async () => {
    expect(routes).toHaveLength(10);
    const entries = guideSitemapEntries();
    expect(new Set(entries.map(({ url }) => url)).size).toBe(10);
    for (const { locale, slug } of routes) {
      const path = `/${locale}/guides/${slug}`;
      const metadata = await generateMetadata({
        params: Promise.resolve({ locale, slug }),
      });
      expect(metadata.alternates?.canonical).toBe(path);
      const entry = entries.find(
        ({ url }) => url === `https://www.calcome.com${path}`,
      )!;
      expect(entry).toBeDefined();
      for (const language of ["ko", "en", "x-default"] as const) {
        expect(
          new URL(
            String(metadata.alternates?.languages?.[language]),
            "https://www.calcome.com",
          ).href,
        ).toBe(entry.alternates?.languages?.[language]);
      }
      const other = locale === "ko" ? "en" : "ko";
      expect(localizedDestination(path, other)).toBe(
        `/${other}/guides/${slug}`,
      );
      expect(
        localizedDestination(localizedDestination(path, other), locale),
      ).toBe(path);
      expect(metadata.openGraph).toMatchObject({
        url: `https://www.calcome.com${path}`,
        title: expect.stringContaining(guideContent[slug][locale].title),
      });
    }
  });

  it.each(routes)(
    "renders $locale/$slug with a published calculator, sources and a return path",
    async ({ locale, slug }) => {
      const copy = guideContent[slug][locale];
      const { container, unmount } = render(
        await GuidePage({ params: Promise.resolve({ locale, slug }) }),
      );
      expect(
        screen.getByRole("heading", { level: 1, name: copy.title }),
      ).toBeVisible();
      const calculator = screen.getByRole("link", {
        name: copy.calculatorLabel,
      });
      expect(calculator).toHaveAttribute("href", copy.calculatorHref);
      expect(
        allPublishedCalculators.some(
          ({ href }) => href === copy.calculatorHref.replace(/^\/en\//, "/ko/"),
        ),
      ).toBe(true);
      for (const source of guideSources[slug]) {
        expect(
          screen.getByRole("link", { name: source.label }),
        ).toHaveAttribute("href", source.href);
      }
      expect(container.querySelector("time")).toHaveAttribute(
        "dateTime",
        "2026-10-30",
      );
      expect(
        screen.getByRole("link", {
          name: locale === "ko" ? "전체 가이드 보기" : "All guides",
        }),
      ).toHaveAttribute("href", locale === "ko" ? "/guides" : "/en/guides");
      unmount();
    },
  );

  it("discovers every topic from both guide indexes and preserves the index language round trip", async () => {
    for (const locale of ["ko", "en"] as const) {
      const { unmount } = render(
        locale === "ko" ? (
          <GuidesPage />
        ) : (
          await LocalizedInfoPage({
            params: Promise.resolve({ locale, info: "guides" }),
          })
        ),
      );
      for (const slug of guideSlugs) {
        expect(
          screen.getByRole("link", { name: guideContent[slug][locale].title }),
        ).toHaveAttribute("href", `/${locale}/guides/${slug}`);
      }
      unmount();
    }
    expect(localizedDestination("/guides", "en")).toBe("/en/guides");
    expect(localizedDestination("/en/guides", "ko")).toBe("/guides");
  });

  it.each([
    { locale: "ko", slug: "missing-guide" },
    { locale: "fr", slug: "cagr-vs-average-return" },
  ])("rejects unsupported routes: $locale/$slug", async (params) => {
    expect(await generateMetadata({ params: Promise.resolve(params) })).toEqual(
      {},
    );
    await expect(
      GuidePage({ params: Promise.resolve(params) }),
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  it("reproduces the guide's worked examples with the actual calculator engines", () => {
    expect(
      Number(
        calculateCagr({ initialValue: "100", finalValue: "121", years: "2" })
          .cagrPercent,
      ),
    ).toBeCloseTo(10, 8);
    expect(
      Number(
        calculateCagr({
          initialValue: "100",
          finalValue: "102",
          years: String(1 / 12),
        }).cagrPercent,
      ),
    ).toBeCloseTo(26.824179456, 6);
    for (const [marketPrice, expectedYtm] of [
      [950, 10.526315789],
      [1000, 5],
      [1050, 0],
    ]) {
      const result = calculateBondYield({
        faceValue: 1000,
        marketPrice,
        annualCouponRatePercent: 5,
        yearsToMaturity: 1,
        paymentsPerYear: 1,
      });
      expect(result.ytmPercent).toBeCloseTo(expectedYtm, 6);
      if (marketPrice === 950)
        expect(result.currentYieldPercent).toBeCloseTo(5.263157895, 6);
    }
    expect(
      calculateCurrencyConversion({ amount: 100, rate: 1350 }).convertedAmount,
    ).toBe(135000);
    expect(
      calculateCurrencyConversion({ amount: 135000, rate: 1 / 1350 })
        .convertedAmount,
    ).toBeCloseTo(100, 8);
  });
});
