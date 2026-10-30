import { CalculatorWorkedExample } from "@/components/calculators/calculator-worked-example";
import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import { getNetSalaryDictionary, type NetSalaryLocale } from "../i18n";
import { NetSalaryCalculator } from "./net-salary-calculator";
const sources = [
  [
    "https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0016M0.do?menuId=MN24001108",
    "국민연금공단",
    "National Pension Service",
  ],
  [
    "https://edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html",
    "국민건강보험공단",
    "National Health Insurance Service",
  ],
  [
    "https://www.moel.go.kr/info/astmgmt/employ/employList.do",
    "고용노동부",
    "Ministry of Employment and Labor",
  ],
  [
    "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862",
    "국세청",
    "National Tax Service",
  ],
] as const;
export function LocalizedNetSalaryPage({
  locale,
}: {
  locale: NetSalaryLocale;
}) {
  const copy = getNetSalaryDictionary(locale).page;
  const path = `/${locale}/employment/net-salary`;
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
            <li aria-hidden>/</li>
            <li>
              <Link href={locale === "ko" ? "/calculators" : "/en/calculators"}>
                {copy.calculators}
              </Link>
            </li>
            <li aria-hidden>/</li>
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
          <NetSalaryCalculator locale={locale} />
        </div>
        <CalculatorWorkedExample slug="net-salary" locale={locale} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Info title={copy.explanationTitle} items={copy.explanation} />
          <Info title={copy.assumptionsTitle} items={copy.assumptions} />
        </div>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">{copy.faqTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {copy.faq.map(([q, a]) => (
              <details key={q} className="rounded-xl border bg-card p-4">
                <summary className="min-h-11 cursor-pointer font-medium">
                  {q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold">{copy.sourcesTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {sources.map(([href, koLabel, enLabel]) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  {locale === "ko" ? koLabel : enLabel}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
function Info({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
