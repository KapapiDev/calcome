import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import type { RetirementPensionTaxCreditLocale } from "../metadata";
import { RetirementPensionTaxCreditCalculator } from "./retirement-pension-tax-credit-calculator";

export function LocalizedRetirementPensionTaxCreditPage({
  locale,
}: {
  locale: RetirementPensionTaxCreditLocale;
}) {
  const ko = locale === "ko";
  const title = ko
    ? "퇴직연금·IRP 세액공제 계산기"
    : "South Korea Retirement Pension & IRP Tax Credit Calculator";
  const description = ko
    ? "연금저축 납입액을 반영해 퇴직연금·IRP의 남은 세액공제 한도와 추가 납입 시 공제 효과를 계산합니다."
    : "Estimate the remaining South Korean retirement-pension or IRP tax-credit room after pension-savings contributions and the extra credit available by filling the limit.";
  const path = `/${locale}/finance/retirement-pension-tax-credit`;
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
          <RetirementPensionTaxCreditCalculator locale={locale} />
        </div>

        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {ko ? "이 계산기가 보는 것" : "What this calculator answers"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "연금저축 세액공제 계산기와 달리, 이미 납입한 연금저축을 먼저 반영한 뒤 퇴직연금·IRP 쪽에서 세액공제 한도를 얼마나 더 채울 수 있는지와 그 추가 납입의 세액공제 효과를 중심으로 보여줍니다."
              : "Unlike the broader pension-savings credit calculator, this view starts with pension savings already paid and focuses on the remaining retirement-pension or IRP room and the tax-credit effect of filling it."}
          </p>

          <h2 className="mt-7 text-xl font-semibold">
            {ko ? "2026년 기준 계산 규칙" : "2026 calculation rules"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "현행 소득세법 제59조의3에 따라 연금저축계좌 납입액은 연 600만원, 연금저축과 퇴직연금계좌 납입액 합계는 연 900만원까지 세액공제 대상입니다. 공제율은 일반적으로 12%이며, 종합소득금액 4,500만원 이하 또는 근로소득만 있는 경우 총급여 5,500만원 이하이면 15%입니다."
              : "Under Article 59-3 of South Korea's Income Tax Act, pension-savings contributions are eligible up to KRW 6 million and combined pension-savings plus retirement-pension contributions up to KRW 9 million. The credit rate is generally 12%, or 15% when comprehensive income is KRW 45 million or less, or gross salary is KRW 55 million or less for salary-only taxpayers."}
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            {ko ? "기준 확인일: 2026-08-26" : "Verified: Aug 26, 2026"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              className="underline underline-offset-4"
              href="https://law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1021863203"
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
              ? "한도까지 추가 납입 가능액은 현재 입력한 연금저축과 퇴직연금·IRP 납입액을 기준으로 세액공제 대상 한도까지 남은 금액입니다. 실제 환급액은 산출세액, 다른 세액공제·감면, 납입액 적격 여부와 신고 내용에 따라 달라질 수 있습니다."
              : "Additional contribution to max is the remaining contribution amount that can still count toward the statutory pension-account credit limit based on the values entered. Your actual refund can differ because of calculated tax, other credits or reductions, contribution eligibility, and filing details."}
          </p>
        </section>
      </div>
    </main>
  );
}
