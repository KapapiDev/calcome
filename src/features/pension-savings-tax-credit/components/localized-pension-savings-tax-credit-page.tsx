import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import type { PensionSavingsTaxCreditLocale } from "../metadata";
import { PensionSavingsTaxCreditCalculator } from "./pension-savings-tax-credit-calculator";

export function LocalizedPensionSavingsTaxCreditPage({
  locale,
}: {
  locale: PensionSavingsTaxCreditLocale;
}) {
  const ko = locale === "ko";
  const title = ko
    ? "연금저축 세액공제 계산기"
    : "South Korea Pension Savings Tax Credit Calculator";
  const description = ko
    ? "연금저축과 퇴직연금·IRP 납입액, 소득 기준을 입력해 소득세 연금계좌 세액공제 예상액을 계산합니다."
    : "Estimate the South Korean income-tax credit for pension savings and retirement-pension or IRP contributions.";
  const path = `/${locale}/finance/pension-savings-tax-credit`;
  const home = ko ? "홈" : "Home";
  const calculators = ko ? "계산기" : "Calculators";
  const data = createPageStructuredData({
    name: title,
    description,
    path,
    locale,
    breadcrumbs: [
      { name: home, path: "/" },
      { name: calculators, path: "/calculators" },
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
          <Link href={`/${locale}`}>{home}</Link> /{" "}
          <span aria-current="page">{title}</span>
        </nav>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold text-primary">
            {ko ? "저축·연금" : "Savings & pension"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
        </header>
        <div className="mt-6">
          <PensionSavingsTaxCreditCalculator locale={locale} />
        </div>

        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {ko ? "2026년 기준 계산 규칙" : "2026 calculation rules"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "현행 소득세법 제59조의3에 따라 연금저축계좌 납입액은 연 600만원, 연금저축과 퇴직연금계좌 납입액 합계는 연 900만원까지 세액공제 대상입니다. 공제율은 일반적으로 12%이며, 종합소득금액 4,500만원 이하 또는 근로소득만 있는 경우 총급여 5,500만원 이하이면 15%입니다."
              : "Under Article 59-3 of South Korea's Income Tax Act, pension-savings contributions are eligible up to KRW 6 million and combined pension-savings plus retirement-pension contributions up to KRW 9 million. The credit rate is generally 12%, or 15% when comprehensive income is KRW 45 million or less, or gross salary is KRW 55 million or less for salary-only taxpayers."}
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            {ko ? "기준 확인일: 2026-08-25" : "Verified: Aug 25, 2026"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              className="underline underline-offset-4"
              href="https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596"
              target="_blank"
              rel="noreferrer"
            >
              {ko ? "국세청 근로소득 안내" : "National Tax Service guidance"}
            </a>
            <a
              className="underline underline-offset-4"
              href="https://law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1029623653"
              target="_blank"
              rel="noreferrer"
            >
              {ko ? "소득세법 제59조의3" : "Income Tax Act Article 59-3"}
            </a>
          </div>

          <h2 className="mt-7 text-xl font-semibold">
            {ko ? "결과 해석" : "How to read the result"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "표시되는 금액은 소득세 세액공제 예상액입니다. 실제 연말정산 또는 종합소득세 신고 결과는 산출세액, 다른 세액공제·감면, 납입액의 적격 여부 등에 따라 달라질 수 있습니다."
              : "The displayed amount is an estimate of the income-tax credit itself. Your final year-end settlement or comprehensive-income filing can differ because of calculated tax, other credits or reductions, and contribution eligibility."}
          </p>
        </section>
      </div>
    </main>
  );
}
