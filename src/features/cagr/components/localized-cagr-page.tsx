import { CalculatorContentGuide } from "@/components/calculators/calculator-content-guide";
import Link from "next/link";

import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";

import { getCagrDictionary, type CagrLocale } from "../i18n";
import { CagrCalculator } from "./cagr-calculator";

export function LocalizedCagrPage({ locale }: { locale: CagrLocale }) {
  const copy = getCagrDictionary(locale).page;
  const path = `/${locale}/finance/cagr`;
  const structuredData = createPageStructuredData({
    name: copy.title,
    description: copy.metaDescription,
    path,
    locale,
    breadcrumbs: [
      { name: copy.home, path: locale === "ko" ? "/" : "/en" },
      {
        name: copy.calculators,
        path: locale === "ko" ? "/calculators" : "/en/calculators",
      },
      { name: copy.title, path },
    ],
  });

  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={structuredData} />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-6 sm:py-10">
        <nav
          aria-label={copy.breadcrumb}
          className="text-sm text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href={locale === "ko" ? "/" : "/en"}
                className="hover:text-foreground hover:underline"
              >
                {copy.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={locale === "ko" ? "/calculators" : "/en/calculators"}
                className="hover:text-foreground hover:underline"
              >
                {copy.calculators}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {copy.title}
            </li>
          </ol>
        </nav>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            {copy.description}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {copy.intro}
          </p>
        </header>
        <div className="mt-6">
          <CagrCalculator locale={locale} />
        </div>
        <CalculatorContentGuide
          locale={locale}
          method={copy.explanation.join(" ")}
          example={copy.example}
          assumptions={[copy.assumptions[0]]}
          limitations={copy.assumptions.slice(1)}
          reviewedAt="2026-10-30"
          sources={[
            {
              label: "FINRA: Return and Rate of Return",
              href: "https://syndication.finra.org/content/key-concepts-return-and-rate-return",
            },
          ]}
        />
        <section className="mt-8" aria-labelledby="cagr-faq">
          <h2 id="cagr-faq" className="text-2xl font-semibold">
            {copy.faqTitle}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {copy.faq.map(([question, answer]) => (
              <details key={question} className="rounded-xl border bg-card p-4">
                <summary className="min-h-11 cursor-pointer font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="mt-8 border-t pt-8" aria-labelledby="cagr-related">
          <h2 id="cagr-related" className="text-2xl font-semibold">
            {copy.relatedTitle}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.related.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border bg-card p-4 font-medium hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
