import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import type { IsaTaxSavingsLocale } from "../metadata";
import { IsaTaxSavingsCalculator } from "./isa-tax-savings-calculator";

export function LocalizedIsaTaxSavingsPage({
  locale,
}: {
  locale: IsaTaxSavingsLocale;
}) {
  const ko = locale === "ko";
  const title = ko
    ? "ISA 절세 계산기"
    : "South Korea ISA Tax Savings Calculator";
  const description = ko
    ? "ISA 손익통산 후 순이익과 가입 유형을 입력해 비과세 한도, 분리과세액과 일반 금융소득 과세 대비 예상 절세액을 계산합니다."
    : "Estimate South Korean ISA tax-free profit, separate tax, and tax savings versus ordinary financial-income withholding.";
  const path = `/${locale}/finance/isa-tax-savings`;
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
            {ko ? "투자" : "Investment"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
        </header>
        <div className="mt-6">
          <IsaTaxSavingsCalculator locale={locale} />
        </div>

        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {ko ? "2026년 기준 계산 규칙" : "2026 calculation rules"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "현행 조세특례제한법 제91조의18에 따라 ISA의 이자·배당소득은 계좌 내 손익을 통산한 뒤 일반형은 200만원, 일정 소득요건을 충족하는 서민형·농어민형은 400만원까지 비과세됩니다. 비과세 한도를 넘는 금액에는 소득세 9%가 분리과세되며, 이 계산기는 지방소득세를 포함한 9.9%를 적용합니다."
              : "Under Article 91-18 of South Korea's Restriction of Special Taxation Act, ISA interest and dividend income is calculated after account-level profit/loss offsetting. The general tax-free allowance is KRW 2 million, while qualifying lower-income and farmer accounts receive KRW 4 million. Profit above the allowance is subject to 9% separate income tax; this calculator uses 9.9% including local income tax."}
          </p>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            {ko ? "기준 확인일: 2026-08-26" : "Verified: Aug 26, 2026"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              className="underline underline-offset-4"
              href="https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1033258307"
              target="_blank"
              rel="noreferrer"
            >
              {ko
                ? "조세특례제한법 제91조의18"
                : "Restriction of Special Taxation Act Article 91-18"}
            </a>
            <a
              className="underline underline-offset-4"
              href="https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1032244665"
              target="_blank"
              rel="noreferrer"
            >
              {ko
                ? "조세특례제한법 시행령 제93조의4"
                : "Enforcement Decree Article 93-4"}
            </a>
          </div>

          <h2 className="mt-7 text-xl font-semibold">
            {ko ? "결과 해석" : "How to read the result"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "예상 절세액은 동일한 순이익이 일반 금융계좌에서 통상적인 15.4% 원천징수 대상이라고 가정해 비교한 값입니다. 국내 상장주식 매매차익처럼 일반계좌에서도 과세되지 않는 수익을 포함하면 실제 절세액과 달라질 수 있으므로, ISA에서 과세대상이 되는 이자·배당 등 순이익 중심으로 입력하세요."
              : "Estimated savings compare ISA tax with a simple assumption that the same profit would face ordinary 15.4% financial-income withholding. Returns that may be tax-free even outside an ISA, such as certain domestic listed-share gains, can make the real saving different. Enter net taxable interest/dividend-type profit for the most meaningful comparison."}
          </p>
        </section>
      </div>
    </main>
  );
}
