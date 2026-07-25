import type { Metadata } from "next";
import Link from "next/link";

import { CalculatorCard } from "@/components/calculators/calculator-card";
import { CalculatorSearch } from "@/components/calculators/calculator-search";
import { buttonVariants } from "@/components/ui/button";
import {
  publishedCalculators,
  type PublishedCalculator,
} from "@/config/calculators";
import {
  JsonLdScript,
  createWebsiteStructuredData,
} from "@/lib/seo/structured-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  ...createWebsiteStructuredData(),
};
const dividendYieldCalculator = {
  id: "dividend-yield",
  name: "배당수익률 계산기",
  description:
    "현재 주가와 주당 연간 배당금으로 배당수익률과 투자금 기준 예상 배당금을 계산합니다.",
  keywords: ["배당수익률", "배당률", "예상 배당금", "dividend yield"],
  category: "금융",
  href: "/ko/finance/dividend-yield",
} as const satisfies PublishedCalculator;
const allCalculators = [...publishedCalculators, dividendYieldCalculator];
const popularCalculatorOrder = [
  "compound-interest",
  "loan",
  "deposit",
  "savings",
  "cagr",
  "severance-pay",
] as const;
const popularCalculators = popularCalculatorOrder.map((id) =>
  publishedCalculators.find((calculator) => calculator.id === id)!,
);

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={websiteStructuredData} />
      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-wide text-primary">
            CalCome
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            금융 계산을 쉽게.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            <span className="block">복리, 대출, 적금, 예금, ETF까지.</span>
            <span className="block">
              누구나 쉽게 사용할 수 있는 금융 계산기를 제공합니다.
            </span>
          </p>
          <CalculatorSearch calculators={allCalculators} />
        </div>
      </section>
      <section
        id="calculators"
        aria-labelledby="calculators-heading"
        className="border-t bg-muted/30"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <h2
            id="calculators-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            인기 계산기
          </h2>
          <ul
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-testid="popular-calculator-grid"
          >
            {popularCalculators.map((calculator) => (
              <li key={calculator.id}>
                <CalculatorCard calculator={calculator} />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/calculators"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 px-5",
              )}
            >
              전체 계산기 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
