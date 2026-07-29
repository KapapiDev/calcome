"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateInheritanceTax,
  type InheritanceTaxResult,
} from "../calculate";
import { inheritanceTaxContent, type InheritanceTaxLocale } from "../content";
import {
  validateInheritanceTax,
  type InheritanceTaxErrors,
  type InheritanceTaxValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: InheritanceTaxValues = {
  grossEstate: "",
  debts: "",
  funeralExpenses: "",
  deductibleAmount: "",
  taxRate: "",
  progressiveDeduction: "",
  filingCreditRate: "",
};
const moneyKeys = [
  "grossEstate",
  "debts",
  "funeralExpenses",
  "deductibleAmount",
  "progressiveDeduction",
] as const;
const rateKeys = ["taxRate", "filingCreditRate"] as const;
const errorSummaryId = "inheritance-tax-error-summary";

export function InheritanceTaxCalculator({
  locale,
}: {
  locale: InheritanceTaxLocale;
}) {
  const copy = inheritanceTaxContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<InheritanceTaxErrors>({});
  const [result, setResult] = useState<InheritanceTaxResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateInheritanceTax(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateInheritanceTax(checked.data));
    setAnimationKey((value) => value + 1);
  }

  return (
    <section aria-labelledby="inheritance-tax-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="inheritance-tax-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              id={errorSummaryId}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          {moneyKeys.map((key) => (
            <Field
              key={key}
              id={key}
              label={copy.fields[key]}
              value={values[key]}
              placeholder={
                key === "grossEstate"
                  ? "2,000,000,000"
                  : key === "debts"
                    ? "200,000,000"
                    : key === "funeralExpenses"
                      ? "20,000,000"
                      : key === "deductibleAmount"
                        ? "500,000,000"
                        : "160,000,000"
              }
              error={errors[key]}
              errorSummaryId={errorSummaryId}
              onChange={(value) =>
                setValues((current) => ({
                  ...current,
                  [key]: formatMoneyInput(value, current[key]),
                }))
              }
            />
          ))}
          {rateKeys.map((key) => (
            <Field
              key={key}
              id={key}
              label={copy.fields[key]}
              value={values[key]}
              placeholder={key === "taxRate" ? "40" : "3"}
              suffix="%"
              error={errors[key]}
              errorSummaryId={errorSummaryId}
              onChange={(value) =>
                setValues((current) => ({ ...current, [key]: value }))
              }
            />
          ))}
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                cancelResultScroll();
                setValues(initialValues);
                setErrors({});
                setResult(null);
              }}
            >
              {copy.reset}
            </Button>
          </div>
        </form>
        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            aria-labelledby="inheritance-tax-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="inheritance-tax-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.estimatedTax,
                  value: (
                    <AnimatedWon
                      value={result?.estimatedTax ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.estateAfterTax,
                  value: (
                    <AnimatedWon
                      value={result?.estateAfterTax ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.taxableEstate,
                  value: (
                    <AnimatedWon
                      value={result?.taxableEstate ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
          </section>
          <details open className="rounded-xl border bg-card p-4 shadow-sm">
            <summary className="min-h-10 cursor-pointer content-center font-semibold">
              {copy.details}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Detail
                  label={copy.netEstate}
                  value={won(result.netEstate, locale)}
                />
                <Detail
                  label={copy.taxBeforeCredit}
                  value={won(result.taxBeforeCredit, locale)}
                />
                <Detail
                  label={copy.filingCredit}
                  value={won(result.filingCredit, locale)}
                />
                <Detail
                  label={copy.effectiveRate}
                  value={`${result.effectiveTaxRate.toDecimalPlaces(2).toString()}%`}
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
  placeholder,
  suffix,
  error,
  errorSummaryId,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  suffix?: string;
  error?: string;
  errorSummaryId: string;
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
          aria-describedby={error ? `${id}-error ${errorSummaryId}` : undefined}
          className={`${fieldClass} ${suffix ? "pr-14" : ""}`}
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

function won(
  value: { toDecimalPlaces: (places: number) => { toNumber: () => number } },
  locale: InheritanceTaxLocale,
) {
  return `${value
    .toDecimalPlaces(0)
    .toNumber()
    .toLocaleString(
      locale === "ko" ? "ko-KR" : "en-US",
    )} ${locale === "ko" ? "원" : "KRW"}`;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
