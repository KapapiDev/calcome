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
  calculateStockAverageCost,
  type StockAverageCostResult,
} from "../calculate";
import {
  stockAverageCostContent,
  type StockAverageCostLocale,
} from "../content";
import {
  validateStockAverageCost,
  type StockAverageCostErrors,
  type StockAverageCostValues,
} from "../validation";

const ERROR_SUMMARY_ID = "stock-average-cost-error-summary";
const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: StockAverageCostValues = {
  currentShares: "",
  currentAveragePrice: "",
  additionalShares: "",
  additionalPrice: "",
};

export function StockAverageCostCalculator({
  locale,
}: {
  locale: StockAverageCostLocale;
}) {
  const copy = stockAverageCostContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<StockAverageCostErrors>({});
  const [result, setResult] = useState<StockAverageCostResult>();
  const { currency } = useDisplayCurrency(locale);
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
    const checked = validateStockAverageCost(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      clearResult();
      return;
    }
    requestResultScroll();
    setResult(calculateStockAverageCost(checked.data));
  }
  function reset() {
    clearResult();
    setValues(initialValues);
    setErrors({});
  }
  return (
    <section aria-labelledby="stock-average-cost-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="stock-average-cost-input-title"
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
          <CurrencySelector locale={locale} />
          <QuantityField
            id="currentShares"
            label={copy.currentShares}
            value={values.currentShares}
            error={errors.currentShares}
            onChange={(value) =>
              setValues((current) => ({ ...current, currentShares: value }))
            }
          />
          <MoneyField
            id="currentAveragePrice"
            label={copy.currentAveragePrice}
            value={values.currentAveragePrice}
            error={errors.currentAveragePrice}
            currency={currency}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                currentAveragePrice: formatMoneyInput(
                  value,
                  current.currentAveragePrice,
                ),
              }))
            }
          />
          <QuantityField
            id="additionalShares"
            label={copy.additionalShares}
            value={values.additionalShares}
            error={errors.additionalShares}
            onChange={(value) =>
              setValues((current) => ({ ...current, additionalShares: value }))
            }
          />
          <MoneyField
            id="additionalPrice"
            label={copy.additionalPrice}
            value={values.additionalPrice}
            error={errors.additionalPrice}
            currency={currency}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                additionalPrice: formatMoneyInput(
                  value,
                  current.additionalPrice,
                ),
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
            aria-labelledby="stock-average-cost-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2
              id="stock-average-cost-result"
              className="text-xl font-semibold"
            >
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.averagePrice,
                  value: money(result?.averagePrice, locale, currency),
                  featured: true,
                },
                {
                  label: copy.totalShares,
                  value: quantity(result?.totalShares, locale),
                },
                {
                  label: copy.totalCost,
                  value: money(result?.totalCost, locale, currency),
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
                  label={copy.currentCost}
                  value={money(result.currentCost, locale, currency)}
                />
                <Detail
                  label={copy.additionalCost}
                  value={money(result.additionalCost, locale, currency)}
                />
                <Detail
                  label={copy.totalCost}
                  value={money(result.totalCost, locale, currency)}
                />
                <Detail
                  label={copy.averagePrice}
                  value={money(result.averagePrice, locale, currency)}
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
        aria-describedby={fieldDescriptionId(id, error)}
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
  currency,
}: FieldProps & { currency: DisplayCurrency }) {
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
          aria-describedby={fieldDescriptionId(id, error)}
          className={`${fieldClass} pr-12`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {currency}
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
type FieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};
function fieldDescriptionId(id: string, error?: string) {
  return error ? `${id}-error ${ERROR_SUMMARY_ID}` : undefined;
}
function money(
  value:
    | { toDecimalPlaces: (places: number) => { toNumber: () => number } }
    | undefined,
  locale: StockAverageCostLocale,
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
function quantity(
  value:
    | { toDecimalPlaces: (places: number) => { toNumber: () => number } }
    | undefined,
  locale: StockAverageCostLocale,
) {
  return value
    ? `${value
        .toDecimalPlaces(8)
        .toNumber()
        .toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 8,
        })}${locale === "ko" ? "주" : " shares"}`
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
