import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import type { DailyWorkerPayLocale } from "../metadata";
import { DailyWorkerPayCalculator } from "./daily-worker-pay-calculator";

export function LocalizedDailyWorkerPayPage({
  locale,
}: {
  locale: DailyWorkerPayLocale;
}) {
  const ko = locale === "ko";
  const title = ko
    ? "일용직 급여 계산기"
    : "South Korea Daily Worker Pay Calculator";
  const description = ko
    ? "일당과 근무일수, 일별 비과세 금액을 입력해 일용근로자 소득세·지방소득세와 예상 실수령액을 계산합니다."
    : "Estimate South Korean daily-worker income tax, local income tax, and net KRW pay from daily gross pay, workdays, and daily non-taxable pay.";
  const path = `/${locale}/employment/daily-worker-pay`;
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
            {ko ? "급여·근로" : "Pay & Work"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
        </header>
        <div className="mt-6">
          <DailyWorkerPayCalculator locale={locale} />
        </div>
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {ko ? "2026년 계산 기준" : "2026 calculation basis"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "일용근로소득은 일별 과세급여에서 15만원을 공제한 뒤 6% 세율과 55% 근로소득세액공제를 적용해 소득세를 계산합니다. 동일 지급 건의 소득세 합계가 1,000원 미만이면 소액부징수로 징수하지 않으며, 지방소득세는 징수되는 소득세의 10%를 기준으로 계산합니다."
              : "For South Korean daily workers, the calculator subtracts the KRW 150,000 daily earned-income deduction from taxable daily pay, applies the 6% withholding rate and 55% earned-income tax credit, then applies the payment-level under-KRW-1,000 small-collection rule. Local income tax is based on 10% of collected income tax."}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "이 계산기는 사용자가 세법상 일용근로자에 해당한다고 가정합니다. 일반적으로 같은 고용주에게 3개월 미만 근로하고 일수·시간 또는 성과에 따라 급여를 받는 경우를 말하며, 건설공사 종사자는 별도 기간 기준이 적용될 수 있습니다. 4대보험과 고용보험 공제는 포함하지 않습니다."
              : "This calculator assumes the worker qualifies as a daily worker under South Korean tax rules. The classification generally depends on employment duration and how pay is determined, with separate duration rules for construction workers. Social-insurance deductions are not included."}
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            {ko ? "기준 확인일: 2026-08-26" : "Verified: Aug 26, 2026"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              className="underline underline-offset-4"
              href="https://i.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7863&mi=6584"
              target="_blank"
              rel="noreferrer"
            >
              {ko
                ? "국세청 일용근로소득 안내"
                : "National Tax Service daily-worker guide"}
            </a>
            <a
              className="underline underline-offset-4"
              href="https://www.law.go.kr/법령/소득세법/제47조"
              target="_blank"
              rel="noreferrer"
            >
              {ko
                ? "국가법령정보센터 소득세법 제47조"
                : "Income Tax Act Article 47"}
            </a>
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            {ko ? "관련 계산기" : "Related calculators"}
          </h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link
              className="underline underline-offset-4"
              href={`/${locale}/employment/part-time-monthly-pay`}
            >
              {ko ? "알바 월급 계산기" : "Part-Time Monthly Pay Calculator"}
            </Link>
            <Link
              className="underline underline-offset-4"
              href={`/${locale}/finance/earned-income-withholding-tax`}
            >
              {ko
                ? "근로소득 원천징수세액 계산기"
                : "Earned Income Withholding Tax Calculator"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
