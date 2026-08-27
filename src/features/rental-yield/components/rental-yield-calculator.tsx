"use client";

import { type FormEvent, useMemo, useState } from "react";
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
import { calculateRentalYield, type RentalYieldResult } from "../calculate";
import { rentalYieldContent, type RentalYieldLocale } from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: RentalYieldLocale) {
  return locale === "ko"
    ? {
        purchasePrice: "500,000,000",
        monthlyRent: "2,000,000",
        annualOtherIncome: "0",
        annualOperatingCosts: "4,000,000",
        vacancyRatePercent: "5",
      }
    : {
        purchasePrice: "400,000",
        monthlyRent: "2,500",
        annualOtherIncome: "0",
        annualOperatingCosts: "6,000",
        vacancyRatePercent: "5",
      };
}

export function RentalYieldCalculator({
  locale,
}: {
  locale: RentalYieldLocale;
}) {
  const copy = rentalYieldContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<RentalYieldResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);
  const parseMoney = (value: string) => Number(value.replaceAll(",", ""));
  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);
  const percent = (value?: number) =>
    value === undefined
      ? "—"
      : new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 2,
        }).format(value) + "%";

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateRentalYield({
        purchasePrice: parseMoney(values.purchasePrice),
        monthlyRent: parseMoney(values.monthlyRent),
        annualOtherIncome: parseMoney(values.annualOtherIncome),
        annualOperatingCosts: parseMoney(values.annualOperatingCosts),
        vacancyRatePercent: Number(values.vacancyRatePercent),
      });
      setHasError(false);
      requestResultScroll();
      setResult(next);
    } catch {
      setHasError(true);
      setResult(undefined);
    }
  }

  function reset() {
    cancelResultScroll();
    setValues(defaults);
    setHasError(false);
    setResult(undefined);
  }

  const setMoney = (
    key:
      | "purchasePrice"
      | "monthlyRent"
      | "annualOtherIncome"
      | "annualOperatingCosts",
    value: string,
  ) =>
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));
  const moneyFields = [
    ["purchasePrice", copy.purchasePrice],
    ["monthlyRent", copy.monthlyRent],
    ["annualOtherIncome", copy.annualOtherIncome],
    ["annualOperatingCosts", copy.annualOperatingCosts],
  ] as const;

  return (
    <section aria-labelledby="rental-yield-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="rental-yield-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {hasError ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <CurrencySelector locale={locale} />
          {moneyFields.map(([key, label]) => (
            <div key={key} className="mt-4">
              <label htmlFor={key} className="block text-sm font-medium">
                {label}
              </label>
              <div className="relative">
                <input
                  id={key}
                  inputMode="decimal"
                  value={values[key]}
                  onChange={(event) => setMoney(key, event.target.value)}
                  aria-invalid={hasError}
                  className={fieldClass}
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                  {currency}
                </span>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <label
              htmlFor="vacancyRatePercent"
              className="block text-sm font-medium"
            >
              {copy.vacancyRatePercent}
            </label>
            <input
              id="vacancyRatePercent"
              inputMode="decimal"
              value={values.vacancyRatePercent}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  vacancyRatePercent: event.target.value,
                }))
              }
              aria-invalid={hasError}
              className={fieldClass}
            />
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          ref={resultRef}
          aria-labelledby="rental-yield-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="rental-yield-result-title" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.netYieldPercent,
                value: percent(result?.netYieldPercent),
                featured: true,
              },
              {
                label: copy.netOperatingIncome,
                value: money(result?.netOperatingIncome),
                featured: true,
              },
              {
                label: copy.grossYieldPercent,
                value: percent(result?.grossYieldPercent),
              },
              {
                label: copy.grossAnnualIncome,
                value: money(result?.grossAnnualIncome),
              },
              {
                label: copy.effectiveAnnualIncome,
                value: money(result?.effectiveAnnualIncome),
              },
            ]}
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {copy.note}
          </p>
        </section>
      </div>
    </section>
  );
}
