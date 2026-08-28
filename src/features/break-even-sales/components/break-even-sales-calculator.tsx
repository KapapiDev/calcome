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
  calculateBreakEvenSales,
  type BreakEvenSalesResult,
} from "../calculate";
import { breakEvenSalesContent, type BreakEvenSalesLocale } from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: BreakEvenSalesLocale) {
  return locale === "ko"
    ? {
        fixedCosts: "10,000,000",
        sellingPricePerUnit: "50,000",
        variableCostPerUnit: "30,000",
      }
    : {
        fixedCosts: "10,000",
        sellingPricePerUnit: "50",
        variableCostPerUnit: "30",
      };
}

export function BreakEvenSalesCalculator({
  locale,
}: {
  locale: BreakEvenSalesLocale;
}) {
  const copy = breakEvenSalesContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<BreakEvenSalesResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  const parseNumber = (value: string) => Number(value.replaceAll(",", ""));
  const number = (value?: number, digits = 2) =>
    value === undefined
      ? "—"
      : new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: digits,
        }).format(value);
  const money = (value?: number) =>
    value === undefined ? "—" : number(value, 2);
  const percent = (value?: number) =>
    value === undefined ? "—" : `${(value * 100).toFixed(2)}%`;

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateBreakEvenSales({
        fixedCosts: parseNumber(values.fixedCosts),
        sellingPricePerUnit: parseNumber(values.sellingPricePerUnit),
        variableCostPerUnit: parseNumber(values.variableCostPerUnit),
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

  const field = (id: keyof typeof values, label: string) => (
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

  return (
    <section aria-labelledby="break-even-sales-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="break-even-sales-input-title"
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
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {field("fixedCosts", copy.fixedCosts)}
            {field("sellingPricePerUnit", copy.sellingPricePerUnit)}
            {field("variableCostPerUnit", copy.variableCostPerUnit)}
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
          aria-labelledby="break-even-sales-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="break-even-sales-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.breakEvenSales,
                value: money(result?.breakEvenSales),
                featured: true,
              },
              {
                label: copy.breakEvenUnits,
                value: number(result?.breakEvenUnits, 2),
                featured: true,
              },
              {
                label: copy.contributionMarginPerUnit,
                value: money(result?.contributionMarginPerUnit),
              },
              {
                label: copy.contributionMarginRatio,
                value: percent(result?.contributionMarginRatio),
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
