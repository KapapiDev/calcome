import { CalculatorWorkedExample } from "@/components/calculators/calculator-worked-example";
import Link from "next/link";
import {
  createPageStructuredData,
  JsonLdScript,
} from "@/lib/seo/structured-data";
import { content, type Locale } from "../content";
import { NightWorkPayCalculator } from "./calculator";

export function LocalizedNightWorkPayPage({ locale }: { locale: Locale }) {
  const c = content[locale];
  const path = `/${locale}/employment/night-work-pay`;
  const home = locale === "ko" ? "홈" : "Home";
  const calculators = locale === "ko" ? "계산기" : "Calculators";
  const data = createPageStructuredData({
    name: c.title,
    description: c.description,
    path,
    locale,
    breadcrumbs: [
      { name: home, path: locale === "ko" ? "/" : "/en" },
      {
        name: calculators,
        path: locale === "ko" ? "/calculators" : "/en/calculators",
      },
      { name: c.title, path },
    ],
  });

  return (
    <main id="main-content" className="flex-1">
      <JsonLdScript data={data} />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-6">
        <nav className="text-sm text-muted-foreground">
          <Link href={locale === "ko" ? "/" : "/en"}>{home}</Link> /{" "}
          <Link href={locale === "ko" ? "/calculators" : "/en/calculators"}>
            {calculators}
          </Link>{" "}
          / {c.title}
        </nav>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold text-primary">{c.category}</p>
          <h1 className="mt-2 text-4xl font-semibold">{c.title}</h1>
          <p className="mt-3 text-muted-foreground">{c.description}</p>
          <p className="mt-2 text-sm text-muted-foreground">{c.intro}</p>
        </header>
        <div className="mt-6">
          <NightWorkPayCalculator locale={locale} />
        </div>
        <CalculatorWorkedExample slug="night-work-pay" locale={locale} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Info t={c.exTitle} a={c.ex} />
          <Info t={c.warnTitle} a={c.warn} />
        </div>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {c.faq.map(([q, a]) => (
              <details key={q} className="rounded-xl border bg-card p-4">
                <summary>{q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </section>
        <a
          className="mt-8 inline-block text-primary underline"
          href="https://www.law.go.kr/법령/근로기준법/제56조"
        >
          {c.reference}
        </a>
      </div>
    </main>
  );
}

function Info({ t, a }: { t: string; a: readonly string[] }) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <h2 className="text-xl font-semibold">{t}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        {a.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </section>
  );
}
