import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Home from "@/app/page";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { HomeCategoryEntry } from "@/components/calculators/home-category-entry";
import { CalculatorSearch } from "@/components/calculators/calculator-search";
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

export const englishWebsiteStructuredData = {
  "@context": "https://schema.org",
  ...createWebsiteStructuredData(),
};

function englishCalculator(
  calculator: (typeof directorySearchCalculators)[number],
) {
  const name = `${calculator.id
    .split("-")
    .map((part) =>
      part.toUpperCase() === part
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join(" ")} Calculator`;
  return {
    ...calculator,
    name,
    description: `Open the ${name} with clear inputs, assumptions, and results.`,
    keywords: calculator.keywords.filter((keyword) =>
      /^[\x00-\x7F]+$/.test(keyword),
    ),
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
          <CalculatorSearch calculators={searchCalculators} />
          <HomeCategoryEntry locale="en" />
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
                <CalculatorCard calculator={calculator} />
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
    </main>
  );
}
