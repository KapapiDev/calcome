import { CalculatorContentGuide } from "@/components/calculators/calculator-content-guide";
import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import { minimumWageContent, type MinimumWageLocale } from "../content";
import { MinimumWageCalculator } from "./minimum-wage-calculator";

export function LocalizedMinimumWagePage({
  locale,
}: {
  locale: MinimumWageLocale;
}) {
  const copy = minimumWageContent[locale];
  const path = `/${locale}/employment/minimum-wage`;
  const homeLabel = locale === "ko" ? "홈" : "Home";
  const structuredData = createPageStructuredData({
    name: copy.title,
    description: copy.description,
    path,
    locale,
    breadcrumbs: [
      { name: homeLabel, path: locale === "ko" ? "/" : "/en" },
      { name: copy.title, path },
    ],
  });
  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={structuredData} />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-6 sm:py-10">
        <nav
          aria-label={locale === "ko" ? "경로" : "Breadcrumb"}
          className="text-sm text-muted-foreground"
        >
          <Link href={locale === "ko" ? "/" : "/en"}>{homeLabel}</Link> /{" "}
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
          <p className="mt-2 text-sm text-muted-foreground">{copy.intro}</p>
        </header>
        <div className="mt-6">
          <MinimumWageCalculator locale={locale} />
        </div>
        <CalculatorContentGuide
          locale={locale}
          method={copy.explanation.join(" ")}
          example={copy.example}
          assumptions={[copy.modelAssumption]}
          limitations={copy.cautions}
          reviewedAt="2026-10-30"
          sources={[
            {
              label:
                locale === "ko"
                  ? "최저임금위원회: 연도별 고시 기준"
                  : "Minimum Wage Commission: annual wage decisions",
              href: "https://www.minimumwage.go.kr/minWage/policy/decisionMain.do",
            },
            {
              label:
                locale === "ko"
                  ? "고용노동부: 주휴 요건과 산정 기준"
                  : "MOEL: weekly holiday eligibility and hours",
              href: "https://1350.moel.go.kr/rtmview.do?id=1000278825",
            },
          ]}
        />
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">FAQ</h2>
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
          <h2 className="text-xl font-semibold">
            {locale === "ko" ? "관련 계산기" : "Related calculators"}
          </h2>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <Link
              className="text-primary underline underline-offset-4"
              href={"/" + locale + "/employment/weekly-holiday-pay"}
            >
              {locale === "ko"
                ? "주휴수당 계산기"
                : "South Korea Weekly Holiday Pay Calculator"}
            </Link>
            <Link
              className="text-primary underline underline-offset-4"
              href={"/" + locale + "/employment/work-hours-converter"}
            >
              {locale === "ko"
                ? "주·월 근무시간 변환기"
                : "Weekly and Monthly Work-Hours Converter"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
