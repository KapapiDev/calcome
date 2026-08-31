import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CalculatorsPage from "@/app/calculators/page";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { CalculatorSearch } from "@/components/calculators/calculator-search";
import { DirectoryCategoryNavigation } from "@/components/calculators/directory-category-navigation";
import { getEnglishCalculatorDescription } from "@/config/calculator-description-copy";
import { getEnglishCalculatorName } from "@/config/calculator-directory-calculator-copy";
import {
  allPublishedCalculators,
  calculatorDirectoryCategories,
  directorySearchCalculators,
  popularCalculators,
  visibleCalculatorDirectory,
} from "@/config/calculator-directory";
import { englishDirectoryCategoryCopy } from "@/config/calculator-directory-copy";
import { getEnglishCalculatorSearchAliases } from "@/config/calculator-search-keyword-copy";
import { absoluteUrl } from "@/config/site";
import { JsonLdScript } from "@/lib/seo/structured-data";

function englishCalculatorName(id: string) {
  return getEnglishCalculatorName(id);
}

function compactEnglishName(name: string) {
  return name.replace(/ Calculator$/, "");
}

const englishDirectoryCategoryByCalculatorId = new Map<string, string>();

for (const category of calculatorDirectoryCategories) {
  const categoryName = englishDirectoryCategoryCopy[category.id]?.name;
  if (!categoryName) {
    throw new Error(
      `Missing English directory category copy for: ${category.id}`,
    );
  }

  for (const calculatorId of category.calculatorIds) {
    if (englishDirectoryCategoryByCalculatorId.has(calculatorId)) {
      throw new Error(
        `Duplicate calculator directory category: ${calculatorId}`,
      );
    }
    englishDirectoryCategoryByCalculatorId.set(calculatorId, categoryName);
  }
}

function getEnglishDirectoryPrimaryCategory(calculatorId: string) {
  const categoryName = englishDirectoryCategoryByCalculatorId.get(calculatorId);
  if (!categoryName) {
    throw new Error(
      `Missing English directory category for calculator: ${calculatorId}`,
    );
  }
  return categoryName;
}

function englishCalculator<
  T extends {
    id: string;
    name: string;
    description: string;
    keywords: readonly string[];
    href: string;
  },
>(calculator: T) {
  const name = englishCalculatorName(calculator.id);
  return {
    ...calculator,
    name,
    description: getEnglishCalculatorDescription(calculator.id),
    keywords: getEnglishCalculatorSearchAliases(calculator.id),
    primaryCategory: getEnglishDirectoryPrimaryCategory(calculator.id),
    href: calculator.href.replace(/^\/ko\//, "/en/") as T["href"],
  };
}

export const englishDirectoryCalculators =
  directorySearchCalculators.map(englishCalculator);
const englishPopularCalculators = popularCalculators.map(englishCalculator);
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
          <CalculatorSearch
            calculators={englishDirectoryCalculators}
            locale="en"
          />
        </header>

        <DirectoryCategoryNavigation locale="en" />

        <section className="mt-12" aria-labelledby="popular-calculators-en">
          <h2
            id="popular-calculators-en"
            className="text-2xl font-semibold tracking-tight"
          >
            Popular calculators
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Open frequently used calculators without scanning the full
            directory.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {englishPopularCalculators.map((calculator) => (
              <li key={calculator.id}>
                <Link
                  href={calculator.href}
                  className="inline-flex min-h-11 items-center rounded-lg border bg-background px-4 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                >
                  {compactEnglishName(calculator.name)}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div
          role="region"
          aria-label="Published calculators"
          className="mt-16 space-y-16"
        >
          {visibleCalculatorDirectory.map((category) => {
            const copy = englishDirectoryCategoryCopy[category.id];
            return (
              <section
                key={category.id}
                id={category.id}
                tabIndex={-1}
                aria-labelledby={`${category.id}-heading`}
                className="scroll-mt-24 focus:outline-none"
              >
                <div className="flex flex-wrap items-end justify-between gap-3 border-b pb-4">
                  <div>
                    <h2
                      id={`${category.id}-heading`}
                      className="text-2xl font-semibold tracking-tight"
                    >
                      {copy.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {copy.description}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.calculators.length} calculators
                  </p>
                </div>
                <ul
                  aria-label={`${copy.name} calculators`}
                  className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {category.calculators.map((calculator) => {
                    const localized = englishDirectoryById.get(calculator.id);
                    if (!localized) return null;
                    return (
                      <li key={calculator.id}>
                        <CalculatorCard
                          calculator={localized}
                          categoryLabel={copy.name}
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
