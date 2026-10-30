import { CalculatorContentGuide } from "@/components/calculators/calculator-content-guide";
import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import {
  workHoursConverterContent,
  type WorkHoursConverterLocale,
} from "../content";
import { WorkHoursConverterCalculator } from "./work-hours-converter-calculator";

export function LocalizedWorkHoursConverterPage({
  locale,
}: {
  locale: WorkHoursConverterLocale;
}) {
  const copy = workHoursConverterContent[locale];
  const path = `/${locale}/employment/work-hours-converter`;
  const home = locale === "ko" ? "홈" : "Home";
  const calculators = locale === "ko" ? "계산기" : "Calculators";
  const data = createPageStructuredData({
    name: copy.title,
    description: copy.description,
    path,
    locale,
    breadcrumbs: [
      { name: home, path: locale === "ko" ? "/" : "/en" },
      {
        name: calculators,
        path: locale === "ko" ? "/calculators" : "/en/calculators",
      },
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
          <WorkHoursConverterCalculator locale={locale} />
        </div>
        <CalculatorContentGuide
          locale={locale}
          method={copy.method}
          example={copy.example}
          assumptions={[copy.assumption]}
          limitations={[copy.cautions, copy.payrollLimit]}
          reviewedAt="2026-10-30"
          sources={[
            {
              label: "US Naval Observatory: Gregorian calendar",
              href: "https://aa.usno.navy.mil/faq/calendars",
            },
            {
              label:
                locale === "ko"
                  ? "최저임금위원회: 209시간 기준"
                  : "Minimum Wage Commission: 209-hour basis",
              href: "https://www.minimumwage.go.kr/minWage/policy/decisionMain.do",
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
              href={`/${locale}/employment/part-time-monthly-pay`}
            >
              {locale === "ko"
                ? "알바 월급 계산기"
                : "Part-Time Monthly Pay Calculator"}
            </Link>
            <Link
              className="underline underline-offset-4"
              href={`/${locale}/employment/hourly-wage`}
            >
              {locale === "ko" ? "시급 계산기" : "Hourly Wage Calculator"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
