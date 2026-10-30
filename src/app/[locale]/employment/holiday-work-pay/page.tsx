import { CalculatorWorkedExample } from "@/components/calculators/calculator-worked-example";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HolidayWorkPayCalculator } from "@/features/holiday-work-pay/components/calculator";
import { content, type Locale } from "@/features/holiday-work-pay/content";
import { createMetadata } from "@/features/holiday-work-pay/metadata";
import {
  createPageStructuredData,
  JsonLdScript,
} from "@/lib/seo/structured-data";

const locales = ["ko", "en"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return locales.includes(locale as Locale)
    ? createMetadata(locale as Locale)
    : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const selectedLocale = locale as Locale;
  const c = content[selectedLocale];
  const path = `/${locale}/employment/holiday-work-pay`;
  const home = locale === "ko" ? "홈" : "Home";
  const calculators = locale === "ko" ? "계산기" : "Calculators";

  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript
        data={createPageStructuredData({
          name: c.title,
          description: c.description,
          path,
          locale: selectedLocale,
          breadcrumbs: [
            { name: home, path: locale === "ko" ? "/" : "/en" },
            {
              name: calculators,
              path: locale === "ko" ? "/calculators" : "/en/calculators",
            },
            { name: c.title, path },
          ],
        })}
      />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8">
        <h1 className="text-4xl font-semibold">{c.title}</h1>
        <p className="mt-3 text-muted-foreground">{c.description}</p>
        <div className="mt-6">
          <HolidayWorkPayCalculator locale={selectedLocale} />
        </div>
        <CalculatorWorkedExample
          slug="holiday-work-pay"
          locale={selectedLocale}
        />
        <section className="mt-8 rounded-xl border bg-card p-5">
          <h2 className="text-xl font-semibold">{c.cautionTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {c.cautions.map((caution) => (
              <li key={caution}>{caution}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
