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
import { calculateLtv, type LtvResult } from "../calculate";
import { ltvContent, type LtvLocale } from "../content";
import { validateLtv, type LtvErrors, type LtvValues } from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "ltv-error-summary";
const initialValues: LtvValues = {
  propertyValue: "",
  loanAmount: "",
  targetLtvRate: "70",
};

export function LtvCalculator({ locale }: { locale: LtvLocale }) {
  const copy = ltvContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<LtvErrors>({});
  const [result, setResult] = useState<LtvResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  const hasErrors = Object.keys(errors).length > 0;

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateLtv(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateLtv(checked.data));
    setAnimationKey((value) => value + 1);
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }

  return (
    <section aria-labelledby="ltv-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="ltv-input-title" className="mt-1 text-xl font-semibold">
            {copy.input}
          </h2>
          {hasErrors ? (
            <p
              id={errorSummaryId}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <Field
            id="propertyValue"
            label={copy.propertyValue}
            value={values.propertyValue}
            placeholder="500,000,000"
            error={errors.propertyValue}
            errorSummaryId={hasErrors ? errorSummaryId : undefined}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                propertyValue: formatMoneyInput(value, current.propertyValue),
              }))
            }
          />
          <Field
            id="loanAmount"
            label={copy.loanAmount}
            value={values.loanAmount}
            placeholder="300,000,000"
            error={errors.loanAmount}
            errorSummaryId={hasErrors ? errorSummaryId : undefined}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                loanAmount: formatMoneyInput(value, current.loanAmount),
              }))
            }
          />
          <Field
            id="targetLtvRate"
            label={copy.targetLtvRate}
            value={values.targetLtvRate}
            placeholder="70"
            suffix="%"
            error={errors.targetLtvRate}
            errorSummaryId={hasErrors ? errorSummaryId : undefined}
            onChange={(value) =>
              setValues((current) => ({ ...current, targetLtvRate: value }))
            }
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
            aria-labelledby="ltv-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="ltv-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.ltvRate,
                  value: result
                    ? `${result.ltvRate.toDecimalPlaces(1).toString()}%`
                    : "—",
                  featured: true,
                },
                {
                  label: copy.maximumLoan,
                  value: (
                    <AnimatedWon
                      value={result?.maximumLoanAtTarget ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.remainingCapacity,
                  value: (
                    <AnimatedWon
                      value={result?.remainingLoanCapacity ?? null}
                      animationKey={animationKey}
                    />
                  ),
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
                  label={copy.equity}
                  value={won(result.ownerEquity, locale)}
                />
                <Detail
                  label={copy.enteredProperty}
                  value={won(result.propertyValue, locale)}
                />
                <Detail
                  label={copy.enteredLoan}
                  value={won(result.loanAmount, locale)}
                />
                <Detail
                  label={copy.ltvRate}
                  value={`${result.ltvRate.toDecimalPlaces(2).toString()}%`}
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
  errorSummaryId?: string;
  onChange: (value: string) => void;
}) {
  const describedBy = [error ? `${id}-error` : undefined, errorSummaryId]
    .filter(Boolean)
    .join(" ");

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
          aria-describedby={describedBy || undefined}
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
  locale: LtvLocale,
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
