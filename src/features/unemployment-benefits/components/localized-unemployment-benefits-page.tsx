import { CalculatorWorkedExample } from "@/components/calculators/calculator-worked-example";
import Link from "next/link";

import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";

import {
  getUnemploymentBenefitsDictionary,
  type UnemploymentBenefitsLocale,
} from "../i18n";
import { UnemploymentBenefitsCalculator } from "./unemployment-benefits-calculator";

const sources = [
  [
    "https://www.work24.go.kr/cm/c/f/1100/selecSimulate.do?systId=SI00000001",
    "고용24 실업급여 모의계산",
    "Work24 unemployment benefit simulator",
  ],
  [
    "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=2&cciNo=3&cnpClsNo=2&csmSeq=722&menuType=cnpcls&popMenu=ov",
    "찾기쉬운 생활법령 구직급여 수급액",
    "Easy Law: job-seeking benefit amount",
  ],
  [
    "https://www.moel.go.kr/news/cardinfo/view.do?bbs_seq=20250800898",
    "고용노동부 2026년 최저임금",
    "Ministry of Employment and Labor: 2026 minimum wage",
  ],
] as const;

export function LocalizedUnemploymentBenefitsPage({
  locale,
}: {
  locale: UnemploymentBenefitsLocale;
}) {
  const copy = getUnemploymentBenefitsDictionary(locale).page;
  const path = `/${locale}/employment/unemployment-benefits`;
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
          <UnemploymentBenefitsCalculator locale={locale} />
        </div>
        <CalculatorWorkedExample slug="unemployment-benefits" locale={locale} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Info title={copy.explanationTitle} items={copy.explanation} />
          <Info title={copy.assumptionsTitle} items={copy.assumptions} />
        </div>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">{copy.faqTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {copy.faq.map(([question, answer]) => (
              <details key={question} className="rounded-xl border bg-card p-4">
                <summary className="min-h-11 cursor-pointer font-medium">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {answer}
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
