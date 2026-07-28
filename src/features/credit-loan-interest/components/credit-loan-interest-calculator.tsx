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
  calculateCreditLoanInterest,
  type CreditLoanInterestResult,
} from "../calculate";
import {
  creditLoanInterestContent,
  type CreditLoanInterestLocale,
} from "../content";
import {
  validateCreditLoanInterest,
  type CreditLoanInterestErrors,
  type CreditLoanInterestValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "credit-loan-interest-error-summary";
const initialValues: CreditLoanInterestValues = {
  loanAmount: "",
  annualRate: "6.5",
  termMonths: "24",
  monthlyFees: "0",
};

export function CreditLoanInterestCalculator({
  locale,
}: {
  locale: CreditLoanInterestLocale;
}) {
  const copy = creditLoanInterestContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<CreditLoanInterestErrors>({});
  const [result, setResult] = useState<CreditLoanInterestResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateCreditLoanInterest(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateCreditLoanInterest(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }
  const moneyChange = (key: "loanAmount" | "monthlyFees", value: string) =>
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));
  return (
    <section aria-labelledby="credit-loan-interest-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="credit-loan-interest-input-title"
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
            id="loanAmount"
            label={copy.loanAmount}
            value={values.loanAmount}
            placeholder="50,000,000"
            error={errors.loanAmount}
            errorSummaryId={errorSummaryId}
            onChange={(value) => moneyChange("loanAmount", value)}
          />
          <Field
            id="annualRate"
            label={copy.annualRate}
            value={values.annualRate}
            placeholder="6.5"
            suffix="%"
            error={errors.annualRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, annualRate: value }))
            }
          />
          <Field
            id="termMonths"
            label={copy.termMonths}
            value={values.termMonths}
            placeholder="24"
            suffix={copy.months}
            error={errors.termMonths}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, termMonths: value }))
            }
          />
          <Field
            id="monthlyFees"
            label={copy.monthlyFees}
            value={values.monthlyFees}
            placeholder="10,000"
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
            aria-labelledby="credit-loan-interest-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2
              id="credit-loan-interest-result"
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
                  label: copy.totalCost,
                  value: (
                    <AnimatedWon
                      value={result?.totalCost ?? null}
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
                  label={copy.annualInterest}
                  value={won(result.annualInterest, locale)}
                />
                <Detail
                  label={copy.totalInterest}
                  value={won(result.totalInterest, locale)}
                />
                <Detail
                  label={copy.dailyInterest}
                  value={won(result.dailyInterest, locale)}
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
  locale: CreditLoanInterestLocale,
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
