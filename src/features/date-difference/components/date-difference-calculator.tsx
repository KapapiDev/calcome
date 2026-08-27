"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import {
  calculateDateDifference,
  type DateDifferenceResult,
} from "../calculate";
import {
  dateDifferenceContent,
  type DateDifferenceLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const defaults = { startDate: "2024-01-15", endDate: "2026-08-27" };

export function DateDifferenceCalculator({
  locale,
}: {
  locale: DateDifferenceLocale;
}) {
  const copy = dateDifferenceContent[locale];
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<DateDifferenceResult>();
  const { resultRef, requestResultScroll, cancelResultScroll } =
    useStableResultScroll(result ?? null);
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US"),
    [locale],
  );

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateDateDifference(values);
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

  function directionLabel(current: DateDifferenceResult) {
    return copy[current.direction];
  }

  return (
    <section aria-labelledby="date-difference-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="date-difference-input-title"
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
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium">
                {copy.startDate}
              </label>
              <input
                id="startDate"
                type="date"
                value={values.startDate}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    startDate: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium">
                {copy.endDate}
              </label>
              <input
                id="endDate"
                type="date"
                value={values.endDate}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    endDate: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          ref={resultRef}
          aria-labelledby="date-difference-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="date-difference-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.totalDays,
                value: result
                  ? `${numberFormatter.format(result.absoluteDays)} ${copy.daysUnit}`
                  : "—",
                featured: true,
              },
              {
                label: copy.calendarBreakdown,
                value: result
                  ? `${numberFormatter.format(result.calendarYears)} ${copy.yearsUnit} ${numberFormatter.format(result.calendarMonths)} ${copy.monthsUnit} ${numberFormatter.format(result.calendarDays)} ${copy.daysUnit}`
                  : "—",
                featured: true,
              },
              {
                label: copy.weeks,
                value: result
                  ? `${numberFormatter.format(result.fullWeeks)} ${copy.weeksUnit} + ${numberFormatter.format(result.extraDays)} ${copy.daysUnit}`
                  : "—",
              },
              {
                label: copy.direction,
                value: result ? directionLabel(result) : "—",
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
