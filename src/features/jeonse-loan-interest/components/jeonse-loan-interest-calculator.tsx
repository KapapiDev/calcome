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
  calculateJeonseLoanInterest,
  type JeonseLoanInterestResult,
} from "../calculate";
import {
  jeonseLoanInterestContent,
  type JeonseLoanInterestLocale,
} from "../content";
import {
  validateJeonseLoanInterest,
  type JeonseLoanInterestErrors,
  type JeonseLoanInterestValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "jeonse-loan-interest-error-summary";
const initialValues: JeonseLoanInterestValues = {
  deposit: "",
  ownFunds: "",
  annualRate: "4.2",
  termYears: "2",
  monthlyFees: "0",
};

export function JeonseLoanInterestCalculator({
  locale,
}: {
  locale: JeonseLoanInterestLocale;
}) {
  const copy = jeonseLoanInterestContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<JeonseLoanInterestErrors>({});
  const [result, setResult] = useState<JeonseLoanInterestResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateJeonseLoanInterest(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateJeonseLoanInterest(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }
  const moneyChange = (
    key: "deposit" | "ownFunds" | "monthlyFees",
    value: string,
  ) =>
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));
  return (
    <section aria-labelledby="jeonse-loan-interest-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="jeonse-loan-interest-input-title"
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
          <Field
            id="deposit"
            label={copy.deposit}
            value={values.deposit}
            placeholder="500,000,000"
            error={errors.deposit}
            errorSummaryId={errorSummaryId}
            onChange={(value) => moneyChange("deposit", value)}
          />
          <Field
            id="ownFunds"
            label={copy.ownFunds}
            value={values.ownFunds}
            placeholder="200,000,000"
            error={errors.ownFunds}
            errorSummaryId={errorSummaryId}
            onChange={(value) => moneyChange("ownFunds", value)}
          />
          <Field
            id="annualRate"
            label={copy.annualRate}
            value={values.annualRate}
            placeholder="4.2"
            suffix="%"
            error={errors.annualRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, annualRate: value }))
            }
          />
          <Field
            id="termYears"
            label={copy.termYears}
            value={values.termYears}
            placeholder="2"
            suffix={copy.years}
            error={errors.termYears}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, termYears: value }))
            }
          />
          <Field
            id="monthlyFees"
            label={copy.monthlyFees}
            value={values.monthlyFees}
            placeholder="50,000"
            error={errors.monthlyFees}
            errorSummaryId={errorSummaryId}
            onChange={(value) => moneyChange("monthlyFees", value)}
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
            aria-labelledby="jeonse-loan-interest-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2
              id="jeonse-loan-interest-result"
              className="text-xl font-semibold"
            >
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.monthlyInterest,
                  value: (
                    <AnimatedWon
                      value={result?.monthlyInterest ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.monthlyCost,
                  value: (
                    <AnimatedWon
                      value={result?.monthlyCost ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.totalInterest,
                  value: (
                    <AnimatedWon
                      value={result?.totalInterest ?? null}
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
              {copy.result}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <Detail
                  label={copy.loanAmount}
                  value={won(result.loanAmount, locale)}
                />
                <Detail
                  label={copy.annualInterest}
                  value={won(result.annualInterest, locale)}
                />
                <Detail
                  label={copy.loanRatio}
                  value={`${result.loanRatio.toDecimalPlaces(2).toString()}%`}
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
          className={`${fieldClass} ${suffix ? "pr-16" : ""}`}
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
  locale: JeonseLoanInterestLocale,
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
    <div className="rounded-lg border p-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
