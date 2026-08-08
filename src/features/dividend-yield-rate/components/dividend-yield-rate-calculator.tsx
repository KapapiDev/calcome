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
  type DisplayCurrency,
  useDisplayCurrency,
} from "@/components/calculators/currency-selector";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateDividendYieldRate,
  type DividendYieldRateResult,
} from "../calculate";
import { dividendYieldRateContent } from "../content";
import {
  validateDividendYieldRate,
  type DividendYieldRateErrors,
  type DividendYieldRateLocale,
  type DividendYieldRateValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-12 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues: DividendYieldRateValues = {
  sharePrice: "",
  annualDividendPerShare: "",
  investmentAmount: "1,000,000",
};

export function DividendYieldRateCalculator({
  locale,
}: {
  locale: DividendYieldRateLocale;
}) {
  const copy = dividendYieldRateContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<DividendYieldRateErrors>({});
  const [result, setResult] = useState<DividendYieldRateResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateDividendYieldRate(values, locale);
    setErrors(checked.errors);
    if (!checked.data) return;
    requestResultScroll();
    setResult(calculateDividendYieldRate(checked.data));
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(undefined);
  }

  function update(key: keyof DividendYieldRateValues, value: string) {
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));
  }

  return (
    <section aria-labelledby="dividend-yield-rate-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="dividend-yield-rate-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <CurrencySelector locale={locale} />
          <MoneyField
            id="sharePrice"
            label={copy.sharePrice}
            value={values.sharePrice}
            error={errors.sharePrice}
            suffix={currency}
            onChange={(value) => update("sharePrice", value)}
          />
          <MoneyField
            id="annualDividendPerShare"
            label={copy.annualDividendPerShare}
            value={values.annualDividendPerShare}
            error={errors.annualDividendPerShare}
            suffix={currency}
            onChange={(value) => update("annualDividendPerShare", value)}
          />
          <MoneyField
            id="investmentAmount"
            label={copy.investmentAmount}
            value={values.investmentAmount}
            error={errors.investmentAmount}
            suffix={currency}
            onChange={(value) => update("investmentAmount", value)}
          />
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            aria-labelledby="dividend-yield-rate-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2
              id="dividend-yield-rate-result"
              className="text-xl font-semibold"
            >
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.dividendYield,
                  value: percent(result?.dividendYield, locale),
                  featured: true,
                },
                {
                  label: copy.estimatedAnnualDividend,
                  value: money(
                    result?.estimatedAnnualDividend,
                    locale,
                    currency,
                  ),
                },
                {
                  label: copy.estimatedMonthlyAverage,
                  value: money(
                    result?.estimatedMonthlyAverage,
                    locale,
                    currency,
                  ),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
          </section>
          <section className="rounded-xl border bg-card p-4 shadow-sm">
            <h3 className="font-semibold">{copy.estimatedShares}</h3>
            <p className="mt-2 text-lg font-semibold tabular-nums">
              {number(result?.estimatedShares, locale)}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

type MoneyFieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  suffix: string;
  onChange: (value: string) => void;
};

function MoneyField({
  id,
  label,
  value,
  error,
  suffix,
  onChange,
}: MoneyFieldProps) {
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
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={fieldClass}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {suffix}
        </span>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type DisplayValue =
  | { toDecimalPlaces: (places: number) => { toNumber: () => number } }
  | undefined;

function money(
  value: DisplayValue,
  locale: DividendYieldRateLocale,
  currency: DisplayCurrency,
) {
  return value
    ? formatDisplayCurrency(
        value.toDecimalPlaces(2).toNumber(),
        locale,
        currency,
      )
    : "—";
}

function percent(value: DisplayValue, locale: DividendYieldRateLocale) {
  return value
    ? `${value
        .toDecimalPlaces(2)
        .toNumber()
        .toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}%`
    : "—";
}

function number(value: DisplayValue, locale: DividendYieldRateLocale) {
  return value
    ? value
        .toDecimalPlaces(4)
        .toNumber()
        .toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 4,
        })
    : "—";
}
