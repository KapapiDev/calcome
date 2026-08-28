"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { calculateAprApy, type AprApyResult } from "../calculate";
import { aprApyContent, type AprApyLocale } from "../content";

const fieldClass =
  "h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  mode: "apr-to-apy" as const,
  rate: "12",
  frequency: "12",
};

export function AprApyCalculator({ locale }: { locale: AprApyLocale }) {
  const copy = aprApyContent[locale];
  const [values, setValues] = useState<{
    mode: "apr-to-apy" | "apy-to-apr";
    rate: string;
    frequency: string;
  }>(initialValues);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<AprApyResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const rate = Number(values.rate.trim());
    const frequency = Number(values.frequency) as 1 | 2 | 4 | 12 | 365;
    const invalid =
      !Number.isFinite(rate) ||
      rate < 0 ||
      rate > 1000 ||
      ![1, 2, 4, 12, 365].includes(frequency);

    setError(invalid);
    if (invalid) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculateAprApy({
        mode: values.mode,
        annualRatePercent: rate,
        compoundsPerYear: frequency,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setError(false);
    setResult(undefined);
  }

  const percent = (value?: number) =>
    value === undefined ? "—" : `${value.toFixed(4)}%`;

  return (
    <section aria-labelledby="apr-apy-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="apr-apy-input-title" className="mt-1 text-xl font-semibold">
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
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium">
              {copy.direction}
              <select
                value={values.mode}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    mode: event.target.value as "apr-to-apy" | "apy-to-apr",
                  }))
                }
                className={`${fieldClass} mt-1.5`}
              >
                <option value="apr-to-apy">{copy.aprToApy}</option>
                <option value="apy-to-apr">{copy.apyToApr}</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              {copy.rate}
              <div className="relative mt-1.5">
                <input
                  inputMode="decimal"
                  value={values.rate}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      rate: event.target.value,
                    }))
                  }
                  className={`${fieldClass} pr-10`}
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              {copy.frequency}
              <select
                value={values.frequency}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    frequency: event.target.value,
                  }))
                }
                className={`${fieldClass} mt-1.5`}
              >
                <option value="1">{copy.annual}</option>
                <option value="2">{copy.semiannual}</option>
                <option value="4">{copy.quarterly}</option>
                <option value="12">{copy.monthly}</option>
                <option value="365">{copy.daily}</option>
              </select>
            </label>
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
          aria-labelledby="apr-apy-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="apr-apy-result-title" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.converted,
                value: percent(result?.convertedRatePercent),
                featured: true,
              },
              {
                label: copy.periodic,
                value: percent(result?.periodicRatePercent),
              },
              {
                label: copy.source,
                value: percent(result?.sourceRatePercent),
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
