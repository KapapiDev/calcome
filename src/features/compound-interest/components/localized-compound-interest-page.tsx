import Link from "next/link";
import { BookOpen, CircleHelp, ShieldCheck } from "lucide-react";

import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";

import { getCompoundDictionary, type CompoundLocale } from "../i18n";
import { CompoundInterestCalculator } from "./compound-interest-calculator";

export function LocalizedCompoundInterestPage({
  locale,
}: {
  locale: CompoundLocale;
}) {
  const copy = getCompoundDictionary(locale).page;
  const path = `/${locale}/finance/compound-interest`;
  const structuredData = createPageStructuredData({
    name: copy.metaTitle,
    description: copy.metaDescription,
    path,
    locale,
    breadcrumbs: [
      { name: copy.home, path: "/" },
      { name: copy.title, path },
    ],
  });

  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={structuredData} />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-5 sm:px-6">
        <nav
          aria-label={copy.breadcrumbLabel}
          className="text-xs text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                {copy.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {copy.title}
            </li>
          </ol>
        </nav>
        <header className="mt-4 max-w-3xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {copy.description}
          </p>
        </header>
        <div className="mt-4">
          <CompoundInterestCalculator locale={locale} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section className="rounded-xl border bg-card p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <BookOpen className="size-5 text-primary" aria-hidden="true" />
              {copy.method}
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <p>{copy.methodParagraphs[0]}</p>
              <p className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs text-foreground">
                {copy.methodParagraphs[1]}
              </p>
              <p>{copy.methodParagraphs[2]}</p>
            </div>
          </section>
          <section className="rounded-xl border bg-card p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
              {copy.cautions}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {copy.cautionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-4 rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <CircleHelp className="size-5 text-primary" aria-hidden="true" />
            {copy.faqTitle}
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {copy.faq.map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-lg border px-4 py-3"
              >
                <summary className="cursor-pointer list-none pr-8 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="mt-14 border-t pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            {copy.related}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {copy.relatedDescription}
          </p>
        </section>
      </div>
    </main>
  );
}
