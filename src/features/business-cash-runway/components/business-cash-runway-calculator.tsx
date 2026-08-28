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
  calculateBusinessCashRunway,
  estimateRunwayEndDate,
  type BusinessCashRunwayResult,
} from "../calculate";
import {
  businessCashRunwayContent,
  type BusinessCashRunwayLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: BusinessCashRunwayLocale) {
  return locale === "ko"
    ? {
        startingCash: "120,000,000",
        monthlyInflow: "20,000,000",
        monthlyOutflow: "50,000,000",
      }
    : {
        startingCash: "120,000",
        monthlyInflow: "20,000",
        monthlyOutflow: "50,000",
      };
}

export function BusinessCashRunwayCalculator({
  locale,
}: {
  locale: BusinessCashRunwayLocale;
}) {
  const copy = businessCashRunwayContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<BusinessCashRunwayResult>();
  const [runwayEndDate, setRunwayEndDate] = useState<Date | null>(null);
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
  const months = (value?: number | null) => {
    if (value === undefined) return "—";
    if (value === null) return copy.notConsuming;
    return `${number(value, 2)} ${copy.months}`;
  };
  const date = (value: Date | null) =>
    value === null
      ? result
        ? copy.notConsuming
        : "—"
      : new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
          dateStyle: "medium",
        }).format(value);

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateBusinessCashRunway({
        startingCash: parseNumber(values.startingCash),
        monthlyInflow: parseNumber(values.monthlyInflow),
        monthlyOutflow: parseNumber(values.monthlyOutflow),
      });
      setHasError(false);
      setRunwayEndDate(estimateRunwayEndDate(next.runwayMonths, new Date()));
      requestResultScroll();
      setResult(next);
    } catch {
      setHasError(true);
      setResult(undefined);
      setRunwayEndDate(null);
    }
  }

  function reset() {
    cancelResultScroll();
    setValues(defaults);
    setHasError(false);
    setResult(undefined);
    setRunwayEndDate(null);
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
    <section aria-labelledby="business-cash-runway-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="business-cash-runway-input-title"
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
            {field("startingCash", copy.startingCash)}
            {field("monthlyInflow", copy.monthlyInflow)}
            {field("monthlyOutflow", copy.monthlyOutflow)}
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
          aria-labelledby="business-cash-runway-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="business-cash-runway-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.runwayMonths,
                value: months(result?.runwayMonths),
                featured: true,
              },
              {
                label: copy.monthlyNetBurn,
                value: money(result?.monthlyNetBurn),
                featured: true,
              },
              {
                label: copy.runwayEndDate,
                value: date(runwayEndDate),
              },
              {
                label: copy.increasedInflow,
                value: months(result?.increasedInflowRunwayMonths),
              },
              {
                label: copy.reducedOutflow,
                value: months(result?.reducedOutflowRunwayMonths),
              },
            ]}
          />
          {result?.lowRunway ? (
            <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm font-medium">
              {copy.lowRunway}
            </p>
          ) : null}
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {copy.note}
          </p>
        </section>
      </div>
    </section>
  );
}
