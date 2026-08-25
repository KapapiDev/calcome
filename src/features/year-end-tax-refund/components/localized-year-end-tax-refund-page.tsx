import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import type { YearEndTaxRefundLocale } from "../metadata";
import { YearEndTaxRefundCalculator } from "./year-end-tax-refund-calculator";

export function LocalizedYearEndTaxRefundPage({
  locale,
}: {
  locale: YearEndTaxRefundLocale;
}) {
  const ko = locale === "ko";
  const title = ko
    ? "연말정산 환급액 계산기"
    : "South Korea Year-End Tax Settlement Refund Calculator";
  const description = ko
    ? "결정세액과 기납부세액, 납부특례세액을 입력해 연말정산 환급액 또는 추가 납부액을 확인합니다."
    : "Use determined income tax, prepaid tax, and special-payment tax to estimate a South Korean year-end tax settlement refund or additional payment.";
  const path = `/${locale}/finance/year-end-tax-refund`;
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
            {ko ? "세금" : "Tax"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            {description}
          </p>
        </header>
        <div className="mt-6">
          <YearEndTaxRefundCalculator locale={locale} />
        </div>
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {ko ? "계산 기준" : "Calculation basis"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "국세청은 연말정산의 차감납부·환급세액을 결정세액에서 기납부세액과 납부특례세액을 차감하는 구조로 안내합니다. 결과가 양수이면 추가 납부, 음수이면 그 절대값만큼 환급되는 구조입니다."
              : "South Korea's National Tax Service describes settlement tax as determined tax minus prepaid tax and special-payment tax. A positive result means additional tax due; a negative result means a refund of the absolute amount."}
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            {ko ? "기준 확인일: 2026-08-26" : "Verified: Aug 26, 2026"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              className="underline underline-offset-4"
              href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7870&mi=6490"
              target="_blank"
              rel="noreferrer"
            >
              {ko
                ? "국세청 연말정산 계산 구조"
                : "National Tax Service settlement structure"}
            </a>
          </div>
          <h2 className="mt-7 text-xl font-semibold">
            {ko ? "입력값 찾는 법" : "Where to find the inputs"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "근로소득 원천징수영수증의 결정세액, 기납부세액, 납부특례세액 항목을 기준으로 입력하세요. 이 계산기는 소득세 정산 구조만 보여주므로 지방소득세와 기타 세액은 별도로 확인해야 합니다."
              : "Use the determined-tax, prepaid-tax, and special-payment-tax amounts shown on your earned-income withholding certificate. This calculator covers the income-tax settlement structure only, so local income tax and other amounts must be checked separately."}
          </p>
        </section>
      </div>
    </main>
  );
}
