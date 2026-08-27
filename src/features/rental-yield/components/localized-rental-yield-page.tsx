import Link from "next/link";
import { JsonLdScript, createPageStructuredData } from "@/lib/seo/structured-data";
import { rentalYieldContent, type RentalYieldLocale } from "../content";
import { RentalYieldCalculator } from "./rental-yield-calculator";

export function LocalizedRentalYieldPage({ locale }: { locale: RentalYieldLocale }) {
  const copy = rentalYieldContent[locale];
  const path = `/${locale}/finance/rental-yield`;
  const home = locale === "ko" ? "홈" : "Home";
  const calculators = locale === "ko" ? "계산기" : "Calculators";
  const data = createPageStructuredData({ name: copy.title, description: copy.description, path, locale, breadcrumbs: [{ name: home, path: "/" }, { name: calculators, path: "/calculators" }, { name: copy.title, path }] });

  return <main id="main-content" className="flex-1">
    <JsonLdScript data={data} />
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-6 sm:py-10">
      <nav aria-label={locale === "ko" ? "경로" : "Breadcrumb"} className="text-sm text-muted-foreground"><Link href={`/${locale}`}>{home}</Link> / <span aria-current="page">{copy.title}</span></nav>
      <header className="mt-5 max-w-3xl"><p className="text-sm font-semibold text-primary">{copy.category}</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">{copy.title}</h1><p className="mt-3 leading-7 text-muted-foreground">{copy.description}</p></header>
      <div className="mt-6"><RentalYieldCalculator locale={locale} /></div>
      <section className="mt-10 rounded-xl border bg-card p-5">
        <h2 className="text-xl font-semibold">{locale === "ko" ? "계산 방법" : "How it works"}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.method}</p>
        <h2 className="mt-6 text-xl font-semibold">{locale === "ko" ? "입력할 때 주의할 점" : "What to verify"}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.tips}</p>
        <h2 className="mt-6 text-xl font-semibold">{locale === "ko" ? "관련 계산기" : "Related calculators"}</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm"><Link className="underline underline-offset-4" href={`/${locale}/finance/home-purchase-total-cost`}>{locale === "ko" ? "주택 매수 총비용 계산기" : "Home Purchase Total Cost Calculator"}</Link><Link className="underline underline-offset-4" href={`/${locale}/finance/jeonse-vs-rent`}>{locale === "ko" ? "전세 vs 월세 비용 비교" : "Jeonse vs Rent Cost Calculator"}</Link></div>
      </section>
    </div>
  </main>;
}
