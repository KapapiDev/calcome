"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import {
  calculateWorkHoursConverter,
  type WorkHoursConverterResult,
  type WorkHoursDirection,
} from "../calculate";
import {
  workHoursConverterContent,
  type WorkHoursConverterLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialDirection: WorkHoursDirection = "weekly-to-monthly";
const initialHours = "40";

function parseNumber(value: string) {
  return Number(value.replaceAll(",", "").trim());
}

export function WorkHoursConverterCalculator({
  locale,
}: {
  locale: WorkHoursConverterLocale;
}) {
  const copy = workHoursConverterContent[locale];
  const [direction, setDirection] =
    useState<WorkHoursDirection>(initialDirection);
  const [hours, setHours] = useState(initialHours);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<WorkHoursConverterResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();

    try {
      const next = calculateWorkHoursConverter({
        direction,
        hours: parseNumber(hours),
      });
      setError(false);
      requestResultScroll();
      setResult(next);
    } catch {
      setError(true);
      setResult(undefined);
    }
  }

  function reset() {
    cancelResultScroll();
    setDirection(initialDirection);
    setHours(initialHours);
    setError(false);
    setResult(undefined);
  }

  const formatHours = (value?: number) =>
    value === undefined
      ? "—"
      : `${value.toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 2,
        })}${locale === "ko" ? "시간" : " hr"}`;

  const formatWeeks = (value?: number) =>
    value === undefined
      ? "—"
      : `${value.toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 6,
        })}${locale === "ko" ? "주" : " weeks"}`;

  return (
    <section aria-labelledby="work-hours-converter-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="work-hours-converter-input-title"
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
          <div className="mt-4">
            <label htmlFor="direction" className="block text-sm font-medium">
              {copy.direction}
            </label>
            <select
              id="direction"
              value={direction}
              onChange={(event) => {
                setDirection(event.target.value as WorkHoursDirection);
                setResult(undefined);
                setError(false);
              }}
              className="mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:text-sm"
            >
              <option value="weekly-to-monthly">{copy.weeklyToMonthly}</option>
              <option value="monthly-to-weekly">{copy.monthlyToWeekly}</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="workHours" className="block text-sm font-medium">
              {copy.hours}
            </label>
            <div className="relative">
              <input
                id="workHours"
                inputMode="decimal"
                value={hours}
                aria-invalid={error || undefined}
                onChange={(event) => {
                  setHours(event.target.value);
                  setResult(undefined);
                  setError(false);
                }}
                className={fieldClass}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                {locale === "ko" ? "시간" : "hours"}
              </span>
            </div>
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
          aria-labelledby="work-hours-converter-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="work-hours-converter-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label:
                  direction === "weekly-to-monthly"
                    ? copy.monthlyHours
                    : copy.weeklyHours,
                value:
                  direction === "weekly-to-monthly"
                    ? formatHours(result?.averageMonthlyHours)
                    : formatHours(result?.weeklyHours),
                featured: true,
              },
              {
                label: copy.weeklyHours,
                value: formatHours(result?.weeklyHours),
              },
              {
                label: copy.monthlyHours,
                value: formatHours(result?.averageMonthlyHours),
              },
              {
                label: copy.annualHours,
                value: formatHours(result?.annualHours),
              },
              {
                label: copy.weeksPerMonth,
                value: formatWeeks(result?.averageWeeksPerMonth),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}
