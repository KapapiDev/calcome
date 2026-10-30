import Link from "next/link";
import { CalculatorContentGuide } from "@/components/calculators/calculator-content-guide";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import { operatingProfitContent, type OperatingProfitLocale } from "../content";
import { OperatingProfitCalculator } from "./operating-profit-calculator";

export function LocalizedOperatingProfitPage({
  locale,
}: {
  locale: OperatingProfitLocale;
}) {
  const copy = operatingProfitContent[locale];
  const path = `/${locale}/finance/operating-profit`;
  const home = locale === "ko" ? "홈" : "Home";
  const calculators = locale === "ko" ? "계산기" : "Calculators";
  const data = createPageStructuredData({
    name: copy.title,
    description: copy.description,
    path,
    locale,
    breadcrumbs: [
      { name: home, path: "/" },
      { name: calculators, path: "/calculators" },
      { name: copy.title, path },
    ],
  });

  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={data} />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-6 sm:py-10">
        <nav
          aria-label={locale === "ko" ? "경로" : "Breadcrumb"}
          className="text-sm text-muted-foreground"
        >
          <Link href={locale === "ko" ? "/" : "/en"}>{home}</Link> /{" "}
          <span aria-current="page">{copy.title}</span>
        </nav>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            {copy.description}
          </p>
        </header>
        <div className="mt-6">
          <OperatingProfitCalculator locale={locale} />
        </div>
        <CalculatorContentGuide
          locale={locale}
          method={<p>{copy.method}</p>}
          example={<p>{copy.example}</p>}
          assumptions={[copy.assumptions]}
          limitations={[copy.note, copy.tips]}
          reviewedAt="2026-10-30"
          sources={[
            {
              label: "SEC — Beginners' Guide to Financial Statements",
              href: "https://www.sec.gov/investor/pubs/begfinstmtguide.htm",
            },
          ]}
        />
        <section className="mt-6 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {locale === "ko" ? "관련 계산기" : "Related calculators"}
          </h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link
              className="underline underline-offset-4"
              href={`/${locale}/finance/break-even-sales`}
            >
              {locale === "ko"
                ? "손익분기 매출 계산기"
                : "Break-Even Sales Calculator"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
