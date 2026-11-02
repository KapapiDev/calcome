import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Home from "@/app/page";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { HomeCategoryEntry } from "@/components/calculators/home-category-entry";
import { CalculatorSearch } from "@/components/calculators/calculator-search";
import { CalculatorRepeatUseShortcuts } from "@/components/calculators/calculator-repeat-use";
import { buttonVariants } from "@/components/ui/button";
import {
  directorySearchCalculators,
  popularCalculators,
} from "@/config/calculator-directory";
import {
  JsonLdScript,
  createWebsiteStructuredData,
} from "@/lib/seo/structured-data";
import { cn } from "@/lib/utils";
import { getEnglishCalculatorName } from "@/config/calculator-directory-calculator-copy";
import { getEnglishCalculatorDescription } from "@/config/calculator-description-copy";
import { getEnglishCalculatorSearchAliases } from "@/config/calculator-search-keyword-copy";
import { getEnglishPrimaryCategoryName } from "@/config/calculator-directory-copy";
import { EditorialLinks } from "@/components/content/editorial-links";
import { createPageMetadata } from "@/lib/seo/metadata";

export const englishWebsiteStructuredData = {
  "@context": "https://schema.org",
  ...createWebsiteStructuredData(),
};

function englishCalculator(
  calculator: (typeof directorySearchCalculators)[number],
) {
  return {
    ...calculator,
    name: getEnglishCalculatorName(calculator.id),
    description: getEnglishCalculatorDescription(calculator.id),
    keywords: getEnglishCalculatorSearchAliases(calculator.id),
    primaryCategory: getEnglishPrimaryCategoryName(calculator.id),
    href: calculator.href.replace(/^\/ko\//, "/en/") as typeof calculator.href,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "ko") return { alternates: { canonical: "/" } };
  if (locale !== "en") return {};
  return {
    ...createPageMetadata({
      title: "Financial Calculators",
      description:
        "Fast, clear financial calculators for investing, savings, loans, payroll, and everyday money decisions.",
      path: "/en",
    }),
    title: "Financial Calculators",
    description:
      "Fast, clear financial calculators for investing, savings, loans, payroll, and everyday money decisions.",
    alternates: {
      canonical: "/en",
      languages: { ko: "/", en: "/en", "x-default": "/" },
    },
  };
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale === "ko") return <Home />;
  if (locale !== "en") notFound();

  const searchCalculators = directorySearchCalculators.map(englishCalculator);
  const popular = popularCalculators.map((calculator) =>
    englishCalculator(
      directorySearchCalculators.find((entry) => entry.id === calculator.id)!,
    ),
  );

  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={englishWebsiteStructuredData} />
      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-wide text-primary">
            CalCome
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            Financial calculations, made simple.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            Explore practical calculators for investing, savings, loans,
            payroll, and more.
          </p>
          <CalculatorSearch calculators={searchCalculators} locale="en" />
          <HomeCategoryEntry locale="en" />
          <CalculatorRepeatUseShortcuts
            calculators={searchCalculators}
            locale="en"
            hideWhenEmpty
          />
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
            Popular calculators
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((calculator) => (
              <li key={calculator.id}>
                <CalculatorCard
                  calculator={calculator}
                  categoryLabel={calculator.primaryCategory}
                />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/en/calculators"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 px-5",
              )}
            >
              Browse all calculators
            </Link>
          </div>
        </div>
      </section>
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
        <EditorialLinks locale="en" />
      </div>
    </main>
  );
}
