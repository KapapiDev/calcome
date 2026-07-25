import Link from "next/link";

import { CalculatorCard } from "@/components/calculators/calculator-card";
import { CalculatorSearch } from "@/components/calculators/calculator-search";
import {
  allPublishedCalculators,
  directorySearchCalculators,
  popularCalculators,
  visibleCalculatorDirectory,
} from "@/config/calculator-directory";
import { absoluteUrl } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLdScript } from "@/lib/seo/structured-data";

const path = "/calculators";
const description =
  "CalCome에서 현재 제공하는 금융 계산기를 카테고리별로 찾고 검색하세요.";

export const metadata = createPageMetadata({
  title: "금융 계산기 모음",
  description,
  path,
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl(path)}#webpage`,
  name: "CalCome 금융 계산기 모음",
  description,
  inLanguage: "ko-KR",
  url: absoluteUrl(path),
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: allPublishedCalculators.length,
    itemListElement: allPublishedCalculators.map((calculator, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: calculator.name,
      url: absoluteUrl(calculator.href),
    })),
  },
};

function compactName(name: string) {
  return name.replace(/ 계산기$/, "");
}

export default function CalculatorsPage() {
  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={structuredData} />
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <nav aria-label="현재 위치" className="text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                홈
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              계산기
            </li>
          </ol>
        </nav>

        <header className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">
            CalCome
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            모든 계산기
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            필요한 계산기를 검색하거나 목적에 맞는 카테고리에서 빠르게
            찾아보세요.
          </p>
          <CalculatorSearch calculators={directorySearchCalculators} />
        </header>

        <nav aria-label="계산기 카테고리" className="mt-10">
          <ul className="flex snap-x gap-2 overflow-x-auto pb-2">
            {visibleCalculatorDirectory.map((category) => (
              <li key={category.id} className="shrink-0 snap-start">
                <a
                  href={`#${category.id}`}
                  className="inline-flex min-h-11 items-center rounded-lg border bg-background px-4 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                >
                  {category.name}
                  <span className="ml-2 text-muted-foreground">
                    {category.calculators.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="mt-12" aria-labelledby="popular-calculators">
          <h2
            id="popular-calculators"
            className="text-2xl font-semibold tracking-tight"
          >
            인기 계산기
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            자주 찾는 계산기를 먼저 모았습니다.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {popularCalculators.map((calculator) => (
              <li key={calculator.id}>
                <Link
                  href={calculator.href}
                  className="inline-flex min-h-11 items-center rounded-lg border bg-background px-4 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                >
                  {compactName(calculator.name)}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div
          role="list"
          aria-label="공개 계산기"
          className="mt-16 space-y-16"
        >
          {visibleCalculatorDirectory.map((category) => (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`${category.id}-heading`}
              className="scroll-mt-24"
            >
              <div className="flex flex-wrap items-end justify-between gap-3 border-b pb-4">
                <div>
                  <h2
                    id={`${category.id}-heading`}
                    className="text-2xl font-semibold tracking-tight"
                  >
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {category.calculators.length}개
                </p>
              </div>
              <ul
                aria-label={`${category.name} 계산기`}
                className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {category.calculators.map((calculator) => (
                  <li key={calculator.id} role="listitem">
                    <CalculatorCard calculator={calculator} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
