import { CalculatorContentGuide } from "@/components/calculators/calculator-content-guide";
import Link from "next/link";
import {
  JsonLdScript,
  createPageStructuredData,
} from "@/lib/seo/structured-data";
import { currencyConversionContent } from "../content";
import type { CurrencyConversionLocale } from "../metadata";
import { CurrencyConversionCalculator } from "./currency-conversion-calculator";

export function LocalizedCurrencyConversionPage({
  locale,
}: {
  locale: CurrencyConversionLocale;
}) {
  const ko = locale === "ko";
  const copy = currencyConversionContent[locale];
  const { title, description } = copy;
  const path = `/${locale}/finance/currency-conversion`;
  const home = ko ? "홈" : "Home";
  const calculators = ko ? "계산기" : "Calculators";
  const data = createPageStructuredData({
    name: title,
    description,
    path,
    locale,
    breadcrumbs: [
      { name: home, path: locale === "ko" ? "/" : "/en" },
      {
        name: calculators,
        path: locale === "ko" ? "/calculators" : "/en/calculators",
      },
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
          <Link href={locale === "ko" ? "/" : "/en"}>{home}</Link> /{" "}
          <span aria-current="page">{title}</span>
        </nav>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold text-primary">
            {ko ? "사업·생활" : "Business & everyday"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
        </header>
        <div className="mt-6">
          <CurrencyConversionCalculator locale={locale} />
        </div>
        <CalculatorContentGuide
          locale={locale}
          method={copy.method}
          example={copy.example}
          assumptions={copy.assumptions}
          limitations={copy.limitations}
          reviewedAt="2026-10-30"
          sources={[
            {
              label: "ECB: Euro foreign exchange reference rates",
              href: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
            },
          ]}
        />
        <p className="mt-5 text-sm">
          <Link
            className="text-primary underline underline-offset-4"
            href={"/" + locale + "/guides/currency-conversion-rate-check"}
          >
            {copy.guideLabel}
          </Link>
        </p>
      </div>
    </main>
  );
}
