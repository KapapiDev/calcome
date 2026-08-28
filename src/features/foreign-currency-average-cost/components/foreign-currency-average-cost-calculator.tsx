"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateForeignCurrencyAverageCost,
  type ForeignCurrencyAverageCostResult,
} from "../calculate";
import {
  foreignCurrencyAverageCostContent,
  type ForeignCurrencyAverageCostLocale,
} from "../content";

const currencies = ["USD", "EUR", "GBP", "JPY", "KRW", "CAD", "AUD"] as const;
type CurrencyCode = (typeof currencies)[number];

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: ForeignCurrencyAverageCostLocale) {
  return locale === "ko"
    ? {
        currentAmount: "1,000",
        currentAverageRate: "1,350",
        additionalAmount: "500",
        additionalRate: "1,290",
      }
    : {
        currentAmount: "1,000",
        currentAverageRate: "0.92",
        additionalAmount: "500",
        additionalRate: "0.90",
      };
}

export function ForeignCurrencyAverageCostCalculator({
  locale,
}: {
  locale: ForeignCurrencyAverageCostLocale;
}) {
  const copy = foreignCurrencyAverageCostContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>("USD");
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencyCode>(
    locale === "ko" ? "KRW" : "EUR",
  );
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<ForeignCurrencyAverageCostResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  const parseNumber = (value: string) => Number(value.replaceAll(",", ""));
  const number = (value?: number, maximumFractionDigits = 8) =>
    value === undefined
      ? "—"
      : new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits,
        }).format(value);
  const rate = (value?: number) =>
    value === undefined
      ? "—"
      : `1 ${baseCurrency} = ${number(value, 8)} ${quoteCurrency}`;
  const quoteMoney = (value?: number) =>
    value === undefined ? "—" : `${number(value, 8)} ${quoteCurrency}`;
  const foreignAmount = (value?: number) =>
    value === undefined ? "—" : `${number(value, 8)} ${baseCurrency}`;
  const percent = (value?: number) =>
    value === undefined ? "—" : `${value.toFixed(2)}%`;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (baseCurrency === quoteCurrency) {
      setHasError(true);
      setResult(undefined);
      return;
    }
    try {
      const next = calculateForeignCurrencyAverageCost({
        currentAmount: parseNumber(values.currentAmount),
        currentAverageRate: parseNumber(values.currentAverageRate),
        additionalAmount: parseNumber(values.additionalAmount),
        additionalRate: parseNumber(values.additionalRate),
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
    setBaseCurrency("USD");
    setQuoteCurrency(locale === "ko" ? "KRW" : "EUR");
    setHasError(false);
    setResult(undefined);
  }

  const amountField = (
    id: "currentAmount" | "additionalAmount",
    label: string,
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={values[id]}
        onChange={(event) =>
          setValues((current) => ({
            ...current,
            [id]: formatMoneyInput(event.target.value, current[id]),
          }))
        }
        aria-invalid={hasError}
        className={fieldClass}
      />
    </div>
  );

  const rateField = (
    id: "currentAverageRate" | "additionalRate",
    label: string,
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={values[id]}
        onChange={(event) =>
          setValues((current) => ({
            ...current,
            [id]: formatMoneyInput(event.target.value, current[id]),
          }))
        }
        aria-invalid={hasError}
        className={fieldClass}
      />
      <p className="mt-1 text-xs text-muted-foreground">
        1 {baseCurrency} = ? {quoteCurrency}
      </p>
    </div>
  );

  return (
    <section aria-labelledby="foreign-currency-average-cost-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="foreign-currency-average-cost-input-title"
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
          <div className="mt-4 grid grid-cols-2 gap-3">
            <CurrencySelect
              id="foreign-average-base-currency"
              label={copy.baseCurrency}
              value={baseCurrency}
              onChange={setBaseCurrency}
            />
            <CurrencySelect
              id="foreign-average-quote-currency"
              label={copy.quoteCurrency}
              value={quoteCurrency}
              onChange={setQuoteCurrency}
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {amountField("currentAmount", copy.currentAmount)}
            {rateField("currentAverageRate", copy.currentAverageRate)}
            {amountField("additionalAmount", copy.additionalAmount)}
            {rateField("additionalRate", copy.additionalRate)}
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            {copy.note}
          </p>
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          ref={resultRef}
          aria-labelledby="foreign-currency-average-cost-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="foreign-currency-average-cost-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.newAverageRate,
                value: rate(result?.newAverageRate),
                featured: true,
              },
              {
                label: copy.totalQuoteCost,
                value: quoteMoney(result?.totalQuoteCost),
                featured: true,
              },
              {
                label: copy.totalForeignAmount,
                value: foreignAmount(result?.totalForeignAmount),
              },
              {
                label: copy.additionalCost,
                value: quoteMoney(result?.additionalCost),
              },
              {
                label: copy.averageRateChangePercent,
                value: percent(result?.averageRateChangePercent),
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

function CurrencySelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as CurrencyCode)}
        className={fieldClass}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
