import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import {
  mortgageLoanLimitContent,
  type MortgageLoanLimitLocale,
} from "../content";
import { MortgageLoanLimitCalculator } from "./mortgage-loan-limit-calculator";

export function LocalizedMortgageLoanLimitPage({
  locale,
}: {
  locale: MortgageLoanLimitLocale;
}) {
  const copy = mortgageLoanLimitContent[locale];
  const path = `/${locale}/finance/mortgage-loan-limit`;
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
          <Link href="/">{home}</Link> /{" "}
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
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {copy.intro}
          </p>
        </header>
        <div className="mt-6">
          <MortgageLoanLimitCalculator locale={locale} />
        </div>
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {locale === "ko" ? "계산 기준" : "Calculation basis"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {locale === "ko"
              ? "입력한 주택가격과 LTV 비율로 담보가치 기준 한도를 구하고, 연소득·기존 원리금·DSR 비율·예상 금리·상환기간으로 상환여력 기준 한도를 계산합니다. 두 값 중 더 낮은 금액을 예상 한도로 제시합니다."
              : "The calculator derives an LTV cap from the home price and entered LTV ratio, then derives a DSR affordability cap from income, existing debt service, DSR ratio, expected rate, and repayment term. The lower value is shown as the estimated limit."}
          </p>
        </section>
      </div>
    </main>
  );
}
