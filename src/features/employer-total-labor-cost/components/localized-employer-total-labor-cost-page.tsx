import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import {
  employerTotalLaborCostContent,
  type EmployerTotalLaborCostLocale,
} from "../content";
import { EmployerTotalLaborCostCalculator } from "./employer-total-labor-cost-calculator";

const sources = [
  {
    href: "https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0097M0.do",
    ko: "국민연금공단 4대보험 보험료율 안내",
    en: "National Pension Service 2026 social-insurance rates",
  },
  {
    href: "https://www.moel.go.kr/info/astmgmt/employ/employList.do",
    ko: "고용노동부 고용보험 보험료율",
    en: "Ministry of Employment and Labor employment-insurance rates",
  },
  {
    href: "https://www.moel.go.kr/info/lawinfo/instruction/view.do?bbs_seq=20251201757",
    ko: "고용노동부 2026년도 산재보험료율 고시",
    en: "2026 industrial accident insurance rate notice",
  },
  {
    href: "https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1030452303",
    ko: "근로자퇴직급여 보장법 제8조",
    en: "Employee Retirement Benefit Security Act, Article 8",
  },
] as const;

export function LocalizedEmployerTotalLaborCostPage({
  locale,
}: {
  locale: EmployerTotalLaborCostLocale;
}) {
  const copy = employerTotalLaborCostContent[locale];
  const path = `/${locale}/employment/employer-total-labor-cost`;
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
        <nav
          aria-label={locale === "ko" ? "경로" : "Breadcrumb"}
          className="text-sm text-muted-foreground"
        >
          <Link href={`/${locale}`}>{home}</Link> /{" "}
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
          <EmployerTotalLaborCostCalculator locale={locale} />
        </div>
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
              href={`/${locale}/employment/salary-negotiation-target`}
            >
              {locale === "ko"
                ? "연봉 협상 목표 계산기"
                : "Salary Negotiation Target Calculator"}
            </Link>
            <Link
              className="underline underline-offset-4"
              href={`/${locale}/employment/severance-pay`}
            >
              {locale === "ko" ? "퇴직금 계산기" : "Severance Pay Calculator"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
