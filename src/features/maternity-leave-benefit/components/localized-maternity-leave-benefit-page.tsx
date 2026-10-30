import { CalculatorWorkedExample } from "@/components/calculators/calculator-worked-example";
import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import {
  maternityLeaveBenefitContent,
  type MaternityLeaveBenefitLocale,
} from "../content";
import { MaternityLeaveBenefitCalculator } from "./maternity-leave-benefit-calculator";

const sources = [
  {
    href: "https://ei.work24.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do",
    ko: "고용24 출산전후(유산·사산)휴가 안내",
    en: "Work24 maternity leave and benefit guidance",
  },
  {
    href: "https://www.law.go.kr/LSW/lsInfoP.do?ancNo=21133&ancYd=20251111&efYd=20260512&lsiSeq=279807",
    ko: "고용보험법 제76조 (현행 지급기간·통상임금 기준)",
    en: "Employment Insurance Act, Article 76 (current payment-period rule)",
  },
  {
    href: "https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0101&lsiSeq=287489&urlMode=lsScJoRltInfoR",
    ko: "고용보험법 시행령 제101조 (시행 2026-07-01)",
    en: "Employment Insurance Act Enforcement Decree, Article 101 (effective 2026-07-01)",
  },
  {
    href: "https://1350.moel.go.kr/rtmview.do?id=1000325544",
    ko: "고용노동부: 2026년 월 상한 220만원과 지원 기간",
    en: "MOEL: 2026 monthly cap of KRW 2.2 million and support periods",
  },
] as const;

export function LocalizedMaternityLeaveBenefitPage({
  locale,
}: {
  locale: MaternityLeaveBenefitLocale;
}) {
  const copy = maternityLeaveBenefitContent[locale];
  const path = `/${locale}/employment/maternity-leave-benefit`;
  const home = locale === "ko" ? "홈" : "Home";
  const calculators = locale === "ko" ? "계산기" : "Calculators";
  const data = createPageStructuredData({
    name: copy.title,
    description: copy.description,
    path,
    locale,
    breadcrumbs: [
      { name: home, path: locale === "ko" ? "/" : "/en" },
      {
        name: calculators,
        path: locale === "ko" ? "/calculators" : "/en/calculators",
      },
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
          <Link href={locale === "ko" ? "/" : "/en"}>{home}</Link> /{" "}
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
        </header>
        <div className="mt-6">
          <MaternityLeaveBenefitCalculator locale={locale} />
        </div>
        <CalculatorWorkedExample
          slug="maternity-leave-benefit"
          locale={locale}
        />
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {locale === "ko" ? "계산 기준" : "How it works"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {copy.method}
          </p>
          <h2 className="mt-6 text-xl font-semibold">{copy.sources}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{copy.verified}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {sources.map((source) => (
              <li key={source.href}>
                <a
                  className="underline underline-offset-4"
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source[locale]}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-xl font-semibold">
            {locale === "ko" ? "관련 계산기" : "Related calculators"}
          </h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link
              className="underline underline-offset-4"
              href={`/${locale}/employment/parental-leave-benefit`}
            >
              {locale === "ko"
                ? "육아휴직 급여 계산기"
                : "Parental Leave Benefit Calculator"}
            </Link>
            <Link
              className="underline underline-offset-4"
              href={`/${locale}/employment/employer-total-labor-cost`}
            >
              {locale === "ko"
                ? "사업주 총 인건비 계산기"
                : "Employer Total Labor Cost Calculator"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
