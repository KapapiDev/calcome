import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import type { EarnedIncomeWithholdingTaxLocale } from "../metadata";
import { EarnedIncomeWithholdingTaxCalculator } from "./earned-income-withholding-tax-calculator";

export function LocalizedEarnedIncomeWithholdingTaxPage({
  locale,
}: {
  locale: EarnedIncomeWithholdingTaxLocale;
}) {
  const ko = locale === "ko";
  const title = ko
    ? "근로소득 원천징수세액 계산기"
    : "South Korea Earned Income Withholding Tax Calculator";
  const description = ko
    ? "월 과세급여와 가족 정보, 맞춤형 원천징수 비율로 매월 급여에서 원천징수될 소득세와 지방소득세를 계산합니다."
    : "Estimate monthly South Korean payroll withholding from taxable salary, family details, and the employee-selected withholding percentage.";
  const path = `/${locale}/finance/earned-income-withholding-tax`;
  const data = createPageStructuredData({
    name: title,
    description,
    path,
    locale,
    breadcrumbs: [
      { name: ko ? "홈" : "Home", path: "/" },
      { name: ko ? "계산기" : "Calculators", path: "/calculators" },
      { name: title, path },
    ],
  });

  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={data} />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-6 sm:py-10">
        <nav
          aria-label={ko ? "경로" : "Breadcrumb"}
          className="text-sm text-muted-foreground"
        >
          <Link href={`/${locale}`}>{ko ? "홈" : "Home"}</Link> /{" "}
          <span aria-current="page">{title}</span>
        </nav>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold text-primary">
            {ko ? "급여·세금" : "Payroll tax"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
        </header>
        <div className="mt-6">
          <EarnedIncomeWithholdingTaxCalculator locale={locale} />
        </div>
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {ko ? "2026년 계산 기준" : "2026 calculation basis"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "2026년 2월 27일 개정된 소득세법 시행령 별표 2의 근로소득 간이세액표를 적용합니다. 2026년 3월 1일 이후 원천징수분부터 8~20세 자녀 조정액은 1명 20,830원, 2명 45,830원, 3명 이상은 45,830원에 2명 초과 1명당 33,330원을 더해 공제합니다."
              : "The calculator applies the simplified earned-income tax table in Annex 2 of the Income Tax Act Enforcement Decree, revised Feb 27, 2026. For withholding from Mar 1, 2026, the child adjustment is KRW 20,830 for one eligible child, KRW 45,830 for two, plus KRW 33,330 for each child beyond two."}
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            {ko ? "기준 확인일: 2026-08-26" : "Verified: Aug 26, 2026"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              className="underline underline-offset-4"
              href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862&mi=6583"
              target="_blank"
              rel="noreferrer"
            >
              {ko
                ? "국세청 근로소득 원천징수 안내"
                : "National Tax Service withholding guide"}
            </a>
            <a
              className="underline underline-offset-4"
              href="https://www.law.go.kr/법령/소득세법시행령"
              target="_blank"
              rel="noreferrer"
            >
              {ko
                ? "국가법령정보센터 소득세법 시행령"
                : "Income Tax Act Enforcement Decree"}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
