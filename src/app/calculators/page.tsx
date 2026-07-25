import Link from "next/link";

import { CalculatorCard } from "@/components/calculators/calculator-card";
import {
  publishedCalculators,
  type PublishedCalculator,
} from "@/config/calculators";
import { absoluteUrl } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLdScript } from "@/lib/seo/structured-data";

const path = "/calculators";
const description =
  "CalCome에서 현재 제공하는 금융 계산기를 한곳에서 확인하세요.";
const dividendYieldCalculator = {
  id: "dividend-yield",
  name: "배당수익률 계산기",
  description:
    "현재 주가와 주당 연간 배당금으로 배당수익률과 투자금 기준 예상 배당금을 계산합니다.",
  keywords: ["배당수익률", "배당률", "예상 배당금", "dividend yield"],
  category: "금융",
  href: "/ko/finance/dividend-yield",
} as const satisfies PublishedCalculator;
const allCalculators = [...publishedCalculators, dividendYieldCalculator];

export const metadata = createPageMetadata({
  title: "금융 계산기 모음",
  description,
  path,
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl(path)}#webpage`,
  name: "CalCome 금융 계산기 모음",
  description,
  inLanguage: "ko-KR",
  url: absoluteUrl(path),
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: allCalculators.length,
    itemListElement: allCalculators.map((calculator, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: calculator.name,
      url: absoluteUrl(calculator.href),
    })),
  },
};

export default function CalculatorsPage() {
  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={structuredData} />
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <nav aria-label="현재 위치" className="text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                홈
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              계산기
            </li>
          </ol>
        </nav>

        <header className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">
            CalCome
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            모든 계산기
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            현재 공개되어 검증을 마친 금융 계산기를 확인하세요. 새로운 계산기는
            준비와 검증이 끝난 뒤 이 목록에 추가됩니다.
          </p>
        </header>

        <section className="mt-12" aria-labelledby="finance-calculators">
          <h2
            id="finance-calculators"
            className="text-2xl font-semibold tracking-tight"
          >
            금융 계산기
          </h2>
          <ul
            aria-label="공개 계산기"
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {allCalculators.map((calculator) => (
              <li key={calculator.id}>
                <CalculatorCard calculator={calculator} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
