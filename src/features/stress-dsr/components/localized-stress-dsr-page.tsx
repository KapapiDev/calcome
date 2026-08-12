import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import { stressDsrContent, type StressDsrLocale } from "../content";
import { StressDsrCalculator } from "./stress-dsr-calculator";

export function LocalizedStressDsrPage({ locale }: { locale: StressDsrLocale }) {
  const copy = stressDsrContent[locale];
  const path = `/${locale}/finance/stress-dsr`;
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
          <Link href="/">{home}</Link> / <span aria-current="page">{copy.title}</span>
        </nav>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{copy.title}</h1>
          <p className="mt-3 leading-7 text-muted-foreground">{copy.description}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.intro}</p>
        </header>
        <div className="mt-6">
          <StressDsrCalculator locale={locale} />
        </div>
        <section className="mt-10 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">
            {locale === "ko" ? "계산 기준" : "Calculation basis"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {locale === "ko"
              ? "기본 대출금리로 계산한 DSR과 입력한 스트레스 가산금리를 더한 심사용 금리의 DSR을 나란히 비교합니다. 신규 대출은 원리금균등상환을 가정합니다."
              : "The calculator compares DSR at the entered loan rate with DSR at a stressed assessment rate formed by adding the stress-rate input. The new loan assumes level monthly principal-and-interest payments."}
          </p>
        </section>
      </div>
    </main>
  );
}
