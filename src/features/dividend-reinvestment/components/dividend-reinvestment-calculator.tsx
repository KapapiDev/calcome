"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import {
  CurrencySelector,
  formatDisplayCurrency,
  useDisplayCurrency,
} from "@/components/calculators/currency-selector";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateDividendReinvestment,
  type DividendReinvestmentResult,
} from "../calculate";
import {
  dividendReinvestmentContent,
  type DividendReinvestmentLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: DividendReinvestmentLocale) {
  return locale === "ko"
    ? {
        initialInvestment: "10,000,000",
        initialDividendYieldPercent: "4",
        annualPriceGrowthPercent: "5",
        annualDividendGrowthPercent: "3",
        years: "10",
      }
    : {
        initialInvestment: "10,000",
        initialDividendYieldPercent: "4",
        annualPriceGrowthPercent: "5",
        annualDividendGrowthPercent: "3",
        years: "10",
      };
}

export function DividendReinvestmentCalculator({
  locale,
}: {
  locale: DividendReinvestmentLocale;
}) {
  const copy = dividendReinvestmentContent[locale];
  const defaults = initialValues(locale);
  const [values, setValues] = useState(defaults);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<DividendReinvestmentResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function number(value: string) {
    const parsed = Number(value.replaceAll(",", "").trim());
    return Number.isFinite(parsed) ? parsed : null;
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const initialInvestment = number(values.initialInvestment);
    const initialDividendYieldPercent = number(
      values.initialDividendYieldPercent,
    );
    const annualPriceGrowthPercent = number(values.annualPriceGrowthPercent);
    const annualDividendGrowthPercent = number(
      values.annualDividendGrowthPercent,
    );
    const years = number(values.years);
    const invalid =
      initialInvestment === null ||
      initialInvestment <= 0 ||
      initialDividendYieldPercent === null ||
      initialDividendYieldPercent < 0 ||
      initialDividendYieldPercent > 100 ||
      annualPriceGrowthPercent === null ||
      annualPriceGrowthPercent <= -100 ||
      annualPriceGrowthPercent > 100 ||
      annualDividendGrowthPercent === null ||
      annualDividendGrowthPercent <= -100 ||
      annualDividendGrowthPercent > 100 ||
      years === null ||
      !Number.isInteger(years) ||
      years < 1 ||
      years > 80;

    setError(invalid);
    if (
      invalid ||
      initialInvestment === null ||
      initialDividendYieldPercent === null ||
      annualPriceGrowthPercent === null ||
      annualDividendGrowthPercent === null ||
      years === null
    ) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculateDividendReinvestment({
        initialInvestment,
        initialDividendYieldPercent,
        annualPriceGrowthPercent,
        annualDividendGrowthPercent,
        years,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setValues(defaults);
    setError(false);
    setResult(undefined);
  }

  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);

  return (
    <section aria-labelledby="dividend-reinvestment-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="dividend-reinvestment-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <CurrencySelector locale={locale} />
          <Field
            id="initialInvestment"
            label={copy.initialInvestment}
            value={values.initialInvestment}
            suffix={currency}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                initialInvestment: formatMoneyInput(
                  value,
                  current.initialInvestment,
                ),
              }))
            }
          />
          <Field
            id="initialDividendYieldPercent"
            label={copy.dividendYield}
            value={values.initialDividendYieldPercent}
            suffix="%"
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                initialDividendYieldPercent: value,
              }))
            }
          />
          <Field
            id="annualPriceGrowthPercent"
            label={copy.priceGrowth}
            value={values.annualPriceGrowthPercent}
            suffix="%"
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                annualPriceGrowthPercent: value,
              }))
            }
          />
          <Field
            id="annualDividendGrowthPercent"
            label={copy.dividendGrowth}
            value={values.annualDividendGrowthPercent}
            suffix="%"
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                annualDividendGrowthPercent: value,
              }))
            }
          />
          <Field
            id="years"
            label={copy.years}
            value={values.years}
            suffix={locale === "ko" ? "년" : "years"}
            onChange={(value) =>
              setValues((current) => ({ ...current, years: value }))
            }
          />
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="dividend-reinvestment-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="dividend-reinvestment-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.reinvestedEndingValue,
                value: money(result?.reinvestedEndingValue),
                featured: true,
              },
              {
                label: copy.cashDividendEndingValue,
                value: money(result?.cashDividendEndingValue),
              },
              {
                label: copy.reinvestmentAdvantage,
                value: money(result?.reinvestmentAdvantage),
              },
              {
                label: copy.reinvestedDividends,
                value: money(result?.reinvestedDividends),
              },
              {
                label: copy.cashDividends,
                value: money(result?.cashDividendsReceived),
              },
              {
                label: copy.finalDividendIncome,
                value: money(result?.finalDividendIncome),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  suffix,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  suffix: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {suffix}
        </span>
      </div>
    </div>
  );
}
