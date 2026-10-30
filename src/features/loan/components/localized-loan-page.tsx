import { CalculatorWorkedExample } from "@/components/calculators/calculator-worked-example";
import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import { getLoanDictionary, type LoanLocale } from "../i18n";
import { LoanCalculator } from "./loan-calculator";

export function LocalizedLoanPage({ locale }: { locale: LoanLocale }) {
  const copy = getLoanDictionary(locale).page;
  const path = `/${locale}/finance/loan`;
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
              <Link href={locale === "ko" ? "/" : "/en"}>{copy.home}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={locale === "ko" ? "/calculators" : "/en/calculators"}>
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
          <LoanCalculator locale={locale} />
        </div>
        <CalculatorWorkedExample slug="loan" locale={locale} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <section
            className="rounded-xl border bg-card p-5"
            aria-labelledby="loan-explanation"
          >
            <h2 id="loan-explanation" className="text-xl font-semibold">
              {copy.explanationTitle}
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
              {copy.explanation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section
            className="rounded-xl border bg-card p-5"
            aria-labelledby="loan-cautions"
          >
            <h2 id="loan-cautions" className="text-xl font-semibold">
              {copy.cautionsTitle}
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
              {copy.cautions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <section className="mt-8" aria-labelledby="loan-faq">
          <h2 id="loan-faq" className="text-2xl font-semibold">
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
        <section className="mt-8 border-t pt-8" aria-labelledby="loan-related">
          <h2 id="loan-related" className="text-2xl font-semibold">
            {copy.relatedTitle}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {copy.related.map(([href, name]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border bg-card p-5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-semibold">{name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
