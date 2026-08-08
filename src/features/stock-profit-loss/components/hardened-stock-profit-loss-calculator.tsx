"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateStockProfitLoss,
  type StockProfitLossResult,
} from "../calculate";
import { stockProfitLossContent, type StockProfitLossLocale } from "../content";
import {
  validateStockProfitLoss,
  type StockProfitLossErrors,
  type StockProfitLossValues,
} from "../validation";

const ERROR_SUMMARY_ID = "stock-profit-loss-error-summary";
const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: StockProfitLossValues = {
  shares: "",
  averagePurchasePrice: "",
  currentPrice: "",
};

export function HardenedStockProfitLossCalculator({
  locale,
}: {
  locale: StockProfitLossLocale;
}) {
  const copy = stockProfitLossContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<StockProfitLossErrors>({});
  const [result, setResult] = useState<StockProfitLossResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function clearResult() {
    cancelResultScroll();
    setResult(undefined);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateStockProfitLoss(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      clearResult();
      return;
    }
    requestResultScroll();
    setResult(calculateStockProfitLoss(checked.data));
  }

  function reset() {
    clearResult();
    setValues(initialValues);
    setErrors({});
  }

  return (
    <section aria-labelledby="stock-profit-loss-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="stock-profit-loss-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              id={ERROR_SUMMARY_ID}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <QuantityField
            id="shares"
            label={copy.shares}
            value={values.shares}
            error={errors.shares}
            onChange={(value) =>
              setValues((current) => ({ ...current, shares: value }))
            }
          />
          <MoneyField
            id="averagePurchasePrice"
            label={copy.averagePurchasePrice}
            value={values.averagePurchasePrice}
            error={errors.averagePurchasePrice}
            locale={locale}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                averagePurchasePrice: formatMoneyInput(
                  value,
                  current.averagePurchasePrice,
                ),
              }))
            }
          />
          <MoneyField
            id="currentPrice"
            label={copy.currentPrice}
            value={values.currentPrice}
            error={errors.currentPrice}
            locale={locale}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                currentPrice: formatMoneyInput(value, current.currentPrice),
              }))
            }
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
            aria-labelledby="stock-profit-loss-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="stock-profit-loss-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.profitLoss,
                  value: money(result?.profitLoss, locale),
                  featured: true,
                },
                {
                  label: copy.returnRate,
                  value: percent(result?.returnRate, locale),
                },
                {
                  label: copy.currentValue,
                  value: money(result?.currentValue, locale),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
          </section>
          <details open className="rounded-xl border bg-card p-4 shadow-sm">
            <summary className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.details}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Detail
                  label={copy.costBasis}
                  value={money(result.costBasis, locale)}
                />
                <Detail
                  label={copy.currentValue}
                  value={money(result.currentValue, locale)}
                />
                <Detail
                  label={copy.profitLoss}
                  value={money(result.profitLoss, locale)}
                />
                <Detail
                  label={copy.returnRate}
                  value={percent(result.returnRate, locale)}
                />
              </dl>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">{copy.empty}</p>
            )}
          </details>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function describedBy(id: string, error?: string) {
  return error ? `${id}-error ${ERROR_SUMMARY_ID}` : undefined;
}

function QuantityField({ id, label, value, error, onChange }: FieldProps) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={value}
        placeholder="10"
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error)}
        className={fieldClass}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function MoneyField({
  id,
  label,
  value,
  error,
  onChange,
  locale,
}: FieldProps & { locale: StockProfitLossLocale }) {
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
          placeholder="50,000"
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error)}
          className={`${fieldClass} pr-12`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {locale === "ko" ? "원" : "KRW"}
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

function money(value: DisplayValue, locale: StockProfitLossLocale) {
  return value
    ? `${value
        .toDecimalPlaces(2)
        .toNumber()
        .toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 2,
        })} ${locale === "ko" ? "원" : "KRW"}`
    : "—";
}

function percent(value: DisplayValue, locale: StockProfitLossLocale) {
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
