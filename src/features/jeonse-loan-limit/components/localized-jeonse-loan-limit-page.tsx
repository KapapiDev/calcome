import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import {
  JEONSE_LOAN_LIMIT_SOURCE,
  jeonseLoanLimitContent,
  type JeonseLoanLimitLocale,
} from "../content";
import { JeonseLoanLimitCalculator } from "./jeonse-loan-limit-calculator";

export function LocalizedJeonseLoanLimitPage({
  locale,
}: {
  locale: JeonseLoanLimitLocale;
}) {
  const copy = jeonseLoanLimitContent[locale];
  const path = `/${locale}/finance/jeonse-loan-limit`;
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
          <JeonseLoanLimitCalculator locale={locale} />
        </div>
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {locale === "ko" ? "공식 계산 기준" : "Official calculation basis"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {locale === "ko"
              ? "HF 안내에 따라 보증과목별 한도, 소요자금별 한도, 상환능력별 한도 중 가장 적은 금액을 사용합니다. 보증과목 기본 한도는 4억원이며, 1주택자는 수도권·규제지역 1.8억원, 그 외 2억원입니다. 소요자금 한도는 임차보증금의 80%에서 기존 보증잔액을 뺀 값과 신청금액 중 작은 값입니다."
              : "Under HF guidance, the estimate uses the smallest of the subject-level, funding-needs, and repayment-capacity limits. The standard subject cap is KRW 400 million; for one-home households it is KRW 180 million in capital/regulated areas and KRW 200 million elsewhere. The funding-needs cap is the lower of the requested amount and 80% of the deposit minus the existing guarantee balance."}
          </p>
          <a
            className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4"
            href={JEONSE_LOAN_LIMIT_SOURCE}
            target="_blank"
            rel="noreferrer"
          >
            {copy.source}
          </a>
        </section>
      </div>
    </main>
  );
}
