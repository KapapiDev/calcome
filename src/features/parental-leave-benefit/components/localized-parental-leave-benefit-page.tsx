import Link from "next/link";
import { JsonLdScript, createPageStructuredData } from "@/lib/seo/structured-data";
import {
  parentalLeaveBenefitContent,
  type ParentalLeaveBenefitLocale,
} from "../content";
import { ParentalLeaveBenefitCalculator } from "./parental-leave-benefit-calculator";

const sources = [
  {
    href: "https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1030418971",
    ko: "고용보험법 시행령 제95조 (시행 2026-07-01)",
    en: "Employment Insurance Act Enforcement Decree, Article 95 (effective 2026-07-01)",
  },
  {
    href: "https://1350.moel.go.kr/rtmview.do?id=1000325830&page=5&type=ALL",
    ko: "고용노동부 1350 육아휴직급여 안내 (2026-08-03 답변)",
    en: "Ministry of Employment and Labor 1350 guidance (answered 2026-08-03)",
  },
] as const;

export function LocalizedParentalLeaveBenefitPage({
  locale,
}: {
  locale: ParentalLeaveBenefitLocale;
}) {
  const copy = parentalLeaveBenefitContent[locale];
  const path = `/${locale}/employment/parental-leave-benefit`;
  const home = locale === "ko" ? "홈" : "Home";
  const calculators = locale === "ko" ? "계산기" : "Calculators";
  const data = createPageStructuredData({
    name: copy.title,
    description: copy.description,
    path,
    locale,
    breadcrumbs: [
      { name: home, path: "/" },
      { name: calculators, path: "/calculators" },
      { name: copy.title, path },
    ],
  });

  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={data} />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-6 sm:py-10">
        <nav aria-label={locale === "ko" ? "경로" : "Breadcrumb"} className="text-sm text-muted-foreground">
          <Link href={`/${locale}`}>{home}</Link> / <span aria-current="page">{copy.title}</span>
        </nav>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{copy.title}</h1>
          <p className="mt-3 leading-7 text-muted-foreground">{copy.description}</p>
        </header>
        <div className="mt-6">
          <ParentalLeaveBenefitCalculator locale={locale} />
        </div>
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">{locale === "ko" ? "계산 기준" : "How it works"}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.method}</p>
          <h2 className="mt-6 text-xl font-semibold">{copy.sources}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{copy.verified}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {sources.map((source) => (
              <li key={source.href}>
                <a className="underline underline-offset-4" href={source.href} target="_blank" rel="noreferrer">
                  {source[locale]}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-xl font-semibold">{locale === "ko" ? "관련 계산기" : "Related calculators"}</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link className="underline underline-offset-4" href={`/${locale}/employment/weekly-holiday-pay`}>
              {locale === "ko" ? "주휴수당 계산기" : "Weekly Holiday Pay Calculator"}
            </Link>
            <Link className="underline underline-offset-4" href={`/${locale}/employment/employer-total-labor-cost`}>
              {locale === "ko" ? "사업주 총 인건비 계산기" : "Employer Total Labor Cost Calculator"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
