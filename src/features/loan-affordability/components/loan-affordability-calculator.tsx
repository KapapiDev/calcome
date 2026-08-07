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
  calculateLoanAffordability,
  type LoanAffordabilityResult,
} from "../calculate";
import {
  loanAffordabilityContent,
  type LoanAffordabilityLocale,
} from "../content";
import {
  validateLoanAffordability,
  type LoanAffordabilityErrors,
  type LoanAffordabilityValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: LoanAffordabilityValues = {
  annualIncome: "",
  otherMonthlyDebt: "",
  debtServiceLimit: "",
  annualInterestRate: "",
  termYears: "",
};
const errorSummaryId = "loan-affordability-error-summary";

export function LoanAffordabilityCalculator({
  locale,
}: {
  locale: LoanAffordabilityLocale;
}) {
  const copy = loanAffordabilityContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<LoanAffordabilityErrors>({});
  const [result, setResult] = useState<LoanAffordabilityResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  const setMoney = (key: "annualIncome" | "otherMonthlyDebt", value: string) =>
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));
  const setNumber = (
    key: "debtServiceLimit" | "annualInterestRate" | "termYears",
    value: string,
  ) => setValues((current) => ({ ...current, [key]: value }));

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateLoanAffordability(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateLoanAffordability(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }

  return (
    <section aria-labelledby="loan-affordability-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="loan-affordability-input-title"
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
            id="annualIncome"
            label={copy.annualIncome}
            value={values.annualIncome}
            placeholder="60,000,000"
            error={errors.annualIncome}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setMoney("annualIncome", value)}
          />
          <Field
            id="otherMonthlyDebt"
            label={copy.otherMonthlyDebt}
            value={values.otherMonthlyDebt}
            placeholder="500,000"
            error={errors.otherMonthlyDebt}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setMoney("otherMonthlyDebt", value)}
          />
          <Field
            id="debtServiceLimit"
            label={copy.debtServiceLimit}
            value={values.debtServiceLimit}
            placeholder="40"
            suffix="%"
            error={errors.debtServiceLimit}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setNumber("debtServiceLimit", value)}
          />
          <Field
            id="annualInterestRate"
            label={copy.interestRate}
            value={values.annualInterestRate}
            placeholder="4.5"
            suffix="%"
            error={errors.annualInterestRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setNumber("annualInterestRate", value)}
          />
          <Field
            id="termYears"
            label={copy.termYears}
            value={values.termYears}
            placeholder="30"
            suffix={locale === "ko" ? "년" : "years"}
            error={errors.termYears}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setNumber("termYears", value)}
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
            aria-labelledby="loan-affordability-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2
              id="loan-affordability-result"
              className="text-xl font-semibold"
            >
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.maximumLoan,
                  value: (
                    <AnimatedWon
                      value={result?.maximumLoan ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.availablePayment,
                  value: (
                    <AnimatedWon
                      value={result?.availableMonthlyPayment ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.maximumMonthlyDebt,
                  value: (
                    <AnimatedWon
                      value={result?.maximumMonthlyDebt ?? null}
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
                  label={copy.totalRepayment}
                  value={won(result.totalRepayment, locale)}
                />
                <Detail
                  label={copy.totalInterest}
                  value={won(result.totalInterest, locale)}
                />
                <Detail
                  label={copy.maximumMonthlyDebt}
                  value={won(result.maximumMonthlyDebt, locale)}
                />
                <Detail
                  label={copy.limitUsed}
                  value={`${result.debtServiceLimit.toString()}%`}
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
  const describedBy = error ? `${id}-error ${errorSummaryId}` : undefined;

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
          aria-describedby={describedBy}
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
  locale: LoanAffordabilityLocale,
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
