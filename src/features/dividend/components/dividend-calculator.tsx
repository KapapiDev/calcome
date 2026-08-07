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
import { calculateDividend, type DividendResult } from "../calculate";
import { dividendContent, type DividendLocale } from "../content";
import {
  validateDividend,
  type DividendErrors,
  type DividendValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: DividendValues = {
  shares: "",
  annualDividendPerShare: "",
  paymentsPerYear: "4",
  withholdingTaxRate: "15.4",
};

export function DividendCalculator({ locale }: { locale: DividendLocale }) {
  const copy = dividendContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<DividendErrors>({});
  const [result, setResult] = useState<DividendResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateDividend(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(undefined);
      return;
    }
    requestResultScroll();
    setResult(calculateDividend(checked.data));
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(undefined);
  }

  function update(key: keyof DividendValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <section aria-labelledby="dividend-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="dividend-input-title" className="mt-1 text-xl font-semibold">
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              id="dividend-form-error-summary"
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <Field
            id="shares"
            label={copy.shares}
            value={values.shares}
            error={errors.shares}
            placeholder="100"
            onChange={(value) => update("shares", value)}
          />
          <Field
            id="annualDividendPerShare"
            label={copy.annualDividendPerShare}
            value={values.annualDividendPerShare}
            error={errors.annualDividendPerShare}
            placeholder="2,000"
            suffix={locale === "ko" ? "원" : "KRW"}
            onChange={(value) =>
              update(
                "annualDividendPerShare",
                formatMoneyInput(value, values.annualDividendPerShare),
              )
            }
          />
          <Field
            id="paymentsPerYear"
            label={copy.paymentsPerYear}
            value={values.paymentsPerYear}
            error={errors.paymentsPerYear}
            placeholder="4"
            onChange={(value) => update("paymentsPerYear", value)}
          />
          <Field
            id="withholdingTaxRate"
            label={copy.withholdingTaxRate}
            value={values.withholdingTaxRate}
            error={errors.withholdingTaxRate}
            placeholder="15.4"
            suffix="%"
            onChange={(value) => update("withholdingTaxRate", value)}
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
            aria-labelledby="dividend-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="dividend-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.netAnnualDividend,
                  value: money(result?.netAnnualDividend, locale),
                  featured: true,
                },
                {
                  label: copy.grossAnnualDividend,
                  value: money(result?.grossAnnualDividend, locale),
                },
                {
                  label: copy.grossDividendPerPayment,
                  value: money(result?.grossDividendPerPayment, locale),
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
                  label={copy.grossAnnualDividend}
                  value={money(result.grossAnnualDividend, locale)}
                />
                <Detail
                  label={copy.estimatedTax}
                  value={money(result.estimatedTax, locale)}
                />
                <Detail
                  label={copy.netAnnualDividend}
                  value={money(result.netAnnualDividend, locale)}
                />
                <Detail
                  label={copy.netMonthlyAverage}
                  value={money(result.netMonthlyAverage, locale)}
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

function Field({
  id,
  label,
  value,
  error,
  placeholder,
  suffix,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  suffix?: string;
  onChange: (value: string) => void;
}) {
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
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error dividend-form-error-summary` : undefined
          }
          className={`${fieldClass} ${suffix ? "pr-12" : ""}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
            {suffix}
          </span>
        ) : null}
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
function money(value: DisplayValue, locale: DividendLocale) {
  return value
    ? `${value
        .toDecimalPlaces(2)
        .toNumber()
        .toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 2,
        })} ${locale === "ko" ? "원" : "KRW"}`
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
