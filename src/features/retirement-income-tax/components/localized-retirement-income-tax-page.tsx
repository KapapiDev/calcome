import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import type { RetirementIncomeTaxLocale } from "../metadata";
import { RetirementIncomeTaxCalculator } from "./retirement-income-tax-calculator";

export function LocalizedRetirementIncomeTaxPage({
  locale,
}: {
  locale: RetirementIncomeTaxLocale;
}) {
  const ko = locale === "ko";
  const title = ko
    ? "퇴직소득세 계산기"
    : "South Korea Retirement Income Tax Calculator";
  const description = ko
    ? "퇴직급여와 근속연수로 근속연수공제, 환산급여공제, 퇴직소득세와 지방소득세를 계산합니다."
    : "Estimate South Korean retirement income tax through the statutory service-year deduction, converted-salary deduction, and tax brackets.";
  const path = `/${locale}/finance/retirement-income-tax`;
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
          <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
        </header>
        <div className="mt-6">
          <RetirementIncomeTaxCalculator locale={locale} />
        </div>
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {ko ? "2026년 계산 기준" : "2026 calculation basis"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "국세청 현행 계산 구조에 따라 퇴직소득에서 근속연수공제를 빼고 12배 환산급여를 구한 뒤 환산급여공제와 소득세 기본세율을 적용하고, 산출세액을 다시 근속연수/12로 환산합니다. 지방소득세는 계산된 퇴직소득세의 10%로 함께 표시합니다."
              : "The calculator follows the current National Tax Service structure: subtract the service-year deduction, annualize the remaining amount by 12/service years, apply the converted-salary deduction and statutory income-tax brackets, then scale the tax back by service years/12. Local income tax is shown as 10% of retirement income tax."}
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            {ko ? "기준 확인일: 2026-08-26" : "Verified: Aug 26, 2026"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              className="underline underline-offset-4"
              href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7880"
              target="_blank"
              rel="noreferrer"
            >
              {ko ? "국세청 퇴직소득 계산 안내" : "National Tax Service guide"}
            </a>
            <a
              className="underline underline-offset-4"
              href="https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1026637493"
              target="_blank"
              rel="noreferrer"
            >
              {ko ? "소득세법 제55조" : "Income Tax Act Article 55"}
            </a>
          </div>
          <h2 className="mt-7 text-xl font-semibold">
            {ko ? "주의할 점" : "What this estimate excludes"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "중간정산, 퇴직소득 세액공제, 과세이연, 실제 근속월수의 연수 환산, 특수한 비과세 항목이 있으면 최종 원천징수세액과 달라질 수 있습니다. 회사가 발급한 퇴직소득 원천징수영수증을 최종 기준으로 확인하세요."
              : "Mid-service settlements, tax credits, tax deferral, statutory conversion of service months into years, and special non-taxable items can change the final withholding amount. Use the retirement-income withholding certificate issued by the payer as the final reference."}
          </p>
        </section>
      </div>
    </main>
  );
}
