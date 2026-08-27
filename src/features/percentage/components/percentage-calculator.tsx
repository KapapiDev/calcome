"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { calculatePercentage, type PercentageResult } from "../calculate";
import { percentageContent, type PercentageLocale } from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: PercentageLocale) {
  return locale === "ko"
    ? {
        percent: "15",
        baseValue: "240",
        partValue: "45",
        wholeValue: "180",
        oldValue: "80",
        newValue: "100",
      }
    : {
        percent: "12.5",
        baseValue: "320",
        partValue: "30",
        wholeValue: "120",
        oldValue: "200",
        newValue: "230",
      };
}

export function PercentageCalculator({ locale }: { locale: PercentageLocale }) {
  const copy = percentageContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<PercentageResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
        maximumFractionDigits: 4,
      }),
    [locale],
  );

  const number = (value?: number) =>
    value === undefined ? "—" : numberFormatter.format(value);
  const percent = (value?: number) =>
    value === undefined ? "—" : `${numberFormatter.format(value)}%`;

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculatePercentage({
        percent: Number(values.percent),
        baseValue: Number(values.baseValue),
        partValue: Number(values.partValue),
        wholeValue: Number(values.wholeValue),
        oldValue: Number(values.oldValue),
        newValue: Number(values.newValue),
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

  const setValue = (key: keyof typeof values, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const groups = [
    {
      title: copy.percentOfTitle,
      fields: [
        ["percent", copy.percent],
        ["baseValue", copy.baseValue],
      ],
    },
    {
      title: copy.partOfWholeTitle,
      fields: [
        ["partValue", copy.partValue],
        ["wholeValue", copy.wholeValue],
      ],
    },
    {
      title: copy.changeTitle,
      fields: [
        ["oldValue", copy.oldValue],
        ["newValue", copy.newValue],
      ],
    },
  ] as const;

  return (
    <section aria-labelledby="percentage-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="percentage-input-title"
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
          {groups.map((group) => (
            <fieldset key={group.title} className="mt-5 border-t pt-4">
              <legend className="text-sm font-semibold">{group.title}</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.fields.map(([key, label]) => (
                  <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium">
                      {label}
                    </label>
                    <input
                      id={key}
                      inputMode="decimal"
                      value={values[key]}
                      onChange={(event) => setValue(key, event.target.value)}
                      aria-invalid={hasError}
                      className={fieldClass}
                    />
                  </div>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="percentage-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="percentage-result-title" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.percentOfValue,
                value: number(result?.percentOfValue),
                featured: true,
              },
              {
                label: copy.partAsPercent,
                value: percent(result?.partAsPercent),
                featured: true,
              },
              {
                label: copy.percentChange,
                value: percent(result?.percentChange),
                featured: true,
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
