import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CalculatorsPage from "@/app/calculators/page";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { CalculatorSearch } from "@/components/calculators/calculator-search";
import {
  allPublishedCalculators,
  directorySearchCalculators,
  visibleCalculatorDirectory,
} from "@/config/calculator-directory";
import { absoluteUrl } from "@/config/site";
import { JsonLdScript } from "@/lib/seo/structured-data";

const categoryCopy: Record<string, { name: string; description: string }> = {
  employment: {
    name: "Pay & Employment",
    description:
      "Pay, benefits, insurance, leave, and working-time calculators.",
  },
  loan: {
    name: "Loans & Credit",
    description:
      "Loan payments, affordability, refinancing, and credit calculators.",
  },
  tax: {
    name: "Tax",
    description: "Tax and filing calculators with clearly stated assumptions.",
  },
  housing: {
    name: "Housing & Property",
    description: "Housing, rent, property, and transaction-cost calculators.",
  },
  savings: {
    name: "Savings & Retirement",
    description: "Savings, deposits, goals, and retirement calculators.",
  },
  investment: {
    name: "Investing",
    description: "Returns, stocks, dividends, fees, and investing calculators.",
  },
  "business-life": {
    name: "Business & Everyday",
    description:
      "Practical calculators for business and everyday money decisions.",
  },
};

function englishCalculatorName(id: string) {
  return `${id
    .split("-")
    .map((part) =>
      part.toUpperCase() === part
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join(" ")} Calculator`;
}

function englishCalculator(
  calculator: (typeof directorySearchCalculators)[number],
) {
  const name = englishCalculatorName(calculator.id);
  return {
    ...calculator,
    name,
    description: `Use the ${name} with clear inputs and results.`,
    keywords: calculator.keywords.filter((keyword) =>
      /^[\x00-\x7F]+$/.test(keyword),
    ),
    href: calculator.href.replace(/^\/ko\//, "/en/") as typeof calculator.href,
  };
}

const englishDirectoryCalculators = directorySearchCalculators.map(
  englishCalculator,
);
type EnglishDirectoryCalculator = (typeof englishDirectoryCalculators)[number];
const englishDirectoryById: ReadonlyMap<string, EnglishDirectoryCalculator> =
  new Map(
    englishDirectoryCalculators.map(
      (calculator) => [calculator.id, calculator] as const,
    ),
  );

const directoryPath = "/en/calculators";
const directoryDescription =
  "Browse CalCome financial calculators by category or search by topic.";

export const englishDirectoryStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl(directoryPath)}#webpage`,
  name: "CalCome Financial Calculator Directory",
  description: directoryDescription,
  inLanguage: "en-US",
  url: absoluteUrl(directoryPath),
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: allPublishedCalculators.length,
    itemListElement: allPublishedCalculators.map((calculator, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: englishCalculatorName(calculator.id),
      url: absoluteUrl(calculator.href.replace(/^\/ko\//, "/en/")),
    })),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "ko") {
    return { alternates: { canonical: "/calculators" } };
  }
  if (locale !== "en") return {};
  return {
    title: "Financial Calculator Directory",
    description: directoryDescription,
    alternates: {
      canonical: directoryPath,
      languages: {
        ko: "/calculators",
        en: directoryPath,
        "x-default": "/calculators",
      },
    },
  };
}

export default async function LocalizedCalculatorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale === "ko") return <CalculatorsPage />;
  if (locale !== "en") notFound();

  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={englishDirectoryStructuredData} />
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href="/en"
                className="hover:text-foreground hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              Calculators
            </li>
          </ol>
        </nav>
        <header className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">
            CalCome
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            All calculators
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            Search for a calculator or browse by financial goal.
          </p>
          <CalculatorSearch calculators={englishDirectoryCalculators} />
        </header>
        <nav aria-label="Calculator categories" className="mt-10">
          <ul className="flex snap-x gap-2 overflow-x-auto pb-2">
            {visibleCalculatorDirectory.map((category) => (
              <li key={category.id} className="shrink-0 snap-start">
                <a
                  href={`#${category.id}`}
                  className="inline-flex min-h-11 items-center rounded-lg border bg-background px-4 text-sm font-medium"
                >
                  {categoryCopy[category.id]?.name ?? category.id}
                  <span className="ml-2 text-muted-foreground">
                    {category.calculators.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div
          role="region"
          aria-label="Published calculators"
          className="mt-16 space-y-16"
        >
          {visibleCalculatorDirectory.map((category) => {
            const copy = categoryCopy[category.id];
            return (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`${category.id}-heading`}
                className="scroll-mt-24"
              >
                <div className="border-b pb-4">
                  <h2
                    id={`${category.id}-heading`}
                    className="text-2xl font-semibold tracking-tight"
                  >
                    {copy?.name ?? category.id}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {copy?.description}
                  </p>
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.calculators.map((calculator) => {
                    const localized = englishDirectoryById.get(calculator.id);
                    if (!localized) return null;
                    return (
                      <li key={calculator.id}>
                        <CalculatorCard
                          calculator={localized}
                          categoryLabel={copy?.name ?? category.id}
                        />
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
