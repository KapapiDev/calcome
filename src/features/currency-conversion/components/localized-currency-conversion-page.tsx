import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import type { CurrencyConversionLocale } from "../metadata";
import { CurrencyConversionCalculator } from "./currency-conversion-calculator";

export function LocalizedCurrencyConversionPage({
  locale,
}: {
  locale: CurrencyConversionLocale;
}) {
  const ko = locale === "ko";
  const title = ko ? "환율 변환 계산기" : "Currency Conversion Calculator";
  const description = ko
    ? "직접 확인한 환율을 입력해 두 통화 사이의 금액과 역환율을 계산합니다. 실시간 환율을 임의로 추정하지 않습니다."
    : "Convert an amount between two currencies using a rate you have verified, with the inverse rate shown as well. No live rate is guessed.";
  const path = `/${locale}/finance/currency-conversion`;
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
            {ko ? "사업·생활" : "Business & everyday"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            {description}
          </p>
        </header>
        <div className="mt-6">
          <CurrencyConversionCalculator locale={locale} />
        </div>
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {ko ? "사용 방법" : "How to use it"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "기준 통화와 변환 통화를 선택한 뒤, 은행·카드사·공식 환율 제공처 등에서 확인한 환율을 입력합니다. 예를 들어 1 USD = 1,350 KRW라면 환율 칸에 1350을 입력합니다."
              : "Choose the base and quote currencies, then enter a rate you verified with your bank, card provider, or another authoritative source. For example, if 1 USD = 0.92 EUR, enter 0.92."}
          </p>
          <h2 className="mt-6 text-xl font-semibold">
            {ko ? "주의할 점" : "What to consider"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {ko
              ? "표시 환율과 실제 적용 환율은 다를 수 있으며 해외 결제·송금에는 스프레드와 수수료가 추가될 수 있습니다. 중요한 거래 전에는 실제 적용 기관의 최종 금액을 확인하세요."
              : "Quoted and applied rates can differ, and international payments or transfers may include spreads and fees. Check the provider's final amount before an important transaction."}
          </p>
        </section>
      </div>
    </main>
  );
}
