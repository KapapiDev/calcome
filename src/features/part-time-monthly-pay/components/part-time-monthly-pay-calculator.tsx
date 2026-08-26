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
  useDisplayCurrency,
} from "@/components/calculators/currency-selector";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculatePartTimeMonthlyPay,
  type PartTimeMonthlyPayResult,
} from "../calculate";
import {
  partTimeMonthlyPayContent,
  type PartTimeMonthlyPayLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-12 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  hourlyWage: "12,000",
  hoursPerDay: "5",
  daysPerWeek: "4",
};

function parseNumber(value: string) {
  return Number(value.replaceAll(",", "").trim());
}

export function PartTimeMonthlyPayCalculator({
  locale,
}: {
  locale: PartTimeMonthlyPayLocale;
}) {
  const copy = partTimeMonthlyPayContent[locale];
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<PartTimeMonthlyPayResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const input = {
      hourlyWage: parseNumber(values.hourlyWage),
      hoursPerDay: parseNumber(values.hoursPerDay),
      daysPerWeek: parseNumber(values.daysPerWeek),
    };

    try {
      const next = calculatePartTimeMonthlyPay(input);
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
    setValues(initialValues);
    setError(false);
    setResult(undefined);
  }

  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);
  const hours = (value?: number) =>
    value === undefined
      ? "—"
      : `${value.toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 2,
        })}${locale === "ko" ? "시간" : " hr"}`;

  return (
    <section aria-labelledby="part-time-monthly-pay-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="part-time-monthly-pay-input-title"
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
          <CurrencySelector locale={locale} />
          <InputField
            id="hourlyWage"
            label={copy.hourlyWage}
            value={values.hourlyWage}
            suffix={currency}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                hourlyWage: formatMoneyInput(value, current.hourlyWage),
              }))
            }
          />
          <InputField
            id="hoursPerDay"
            label={copy.hoursPerDay}
            value={values.hoursPerDay}
            suffix={locale === "ko" ? "시간" : "hr"}
            onChange={(value) =>
              setValues((current) => ({ ...current, hoursPerDay: value }))
            }
          />
          <InputField
            id="daysPerWeek"
            label={copy.daysPerWeek}
            value={values.daysPerWeek}
            suffix={locale === "ko" ? "일" : "days"}
            onChange={(value) =>
              setValues((current) => ({ ...current, daysPerWeek: value }))
            }
          />
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="part-time-monthly-pay-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="part-time-monthly-pay-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.monthlyPay,
                value: money(result?.monthlyPay),
                featured: true,
              },
              { label: copy.weeklyPay, value: money(result?.weeklyPay) },
              { label: copy.weeklyHours, value: hours(result?.weeklyHours) },
              { label: copy.annualPay, value: money(result?.annualPay) },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  suffix: string;
  onChange: (value: string) => void;
};

function InputField({ id, label, value, suffix, onChange }: FieldProps) {
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
          className={fieldClass}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {suffix}
        </span>
      </div>
    </div>
  );
}
