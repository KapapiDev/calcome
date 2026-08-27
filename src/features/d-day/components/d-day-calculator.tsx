"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { calculateDDay, type DDayResult } from "../calculate";
import { dDayContent, type DDayLocale } from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues() {
  return { asOfDate: "2026-08-27", targetDate: "2026-12-31" };
}

export function DDayCalculator({ locale }: { locale: DDayLocale }) {
  const copy = dDayContent[locale];
  const defaults = useMemo(() => initialValues(), []);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<DDayResult>();
  const { resultRef, requestResultScroll, cancelResultScroll } =
    useStableResultScroll(result ?? null);
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US"),
    [locale],
  );
  const weekdayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", {
        weekday: "long",
        timeZone: "UTC",
      }),
    [locale],
  );

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateDDay(values);
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

  function countdownLabel(current: DDayResult) {
    if (current.status === "today") return "D-Day";
    return current.status === "future"
      ? `D-${numberFormatter.format(current.absoluteDays)}`
      : `D+${numberFormatter.format(current.absoluteDays)}`;
  }

  function targetWeekday(current: DDayResult) {
    return weekdayFormatter.format(
      new Date(`${current.targetDate}T00:00:00.000Z`),
    );
  }

  return (
    <section aria-labelledby="d-day-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="d-day-input-title" className="mt-1 text-xl font-semibold">
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
              <label htmlFor="asOfDate" className="block text-sm font-medium">
                {copy.asOfDate}
              </label>
              <input
                id="asOfDate"
                type="date"
                value={values.asOfDate}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    asOfDate: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="targetDate" className="block text-sm font-medium">
                {copy.targetDate}
              </label>
              <input
                id="targetDate"
                type="date"
                value={values.targetDate}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    targetDate: event.target.value,
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
          aria-labelledby="d-day-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="d-day-result-title" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.countdown,
                value: result ? countdownLabel(result) : "—",
                featured: true,
              },
              {
                label: copy.dayDistance,
                value: result
                  ? `${numberFormatter.format(result.absoluteDays)} ${copy.daysUnit}`
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
                label: copy.targetWeekday,
                value: result ? targetWeekday(result) : "—",
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
