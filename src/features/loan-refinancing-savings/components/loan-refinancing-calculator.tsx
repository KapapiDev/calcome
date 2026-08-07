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
import {
  calculateLoanRefinancingSavings,
  type LoanRefinancingResult,
} from "../calculate";
import { loanRefinancingContent, type LoanRefinancingLocale } from "../content";
import {
  validateLoanRefinancing,
  type LoanRefinancingErrors,
  type LoanRefinancingValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "loan-refinancing-error-summary";
const initialValues: LoanRefinancingValues = {
  remainingBalance: "",
  currentAnnualRate: "4.8",
  newAnnualRate: "3.7",
  remainingMonths: "240",
  refinancingCosts: "2,000,000",
};

export function LoanRefinancingCalculator({
  locale,
}: {
  locale: LoanRefinancingLocale;
}) {
  const copy = loanRefinancingContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<LoanRefinancingErrors>({});
  const [result, setResult] = useState<LoanRefinancingResult | null>(null);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateLoanRefinancing(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateLoanRefinancingSavings(checked.data));
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }
  const update = (
    key: keyof LoanRefinancingValues,
    value: string,
    money = false,
  ) =>
    setValues((current) => ({
      ...current,
      [key]: money ? formatMoneyInput(value, current[key]) : value,
    }));
  return (
    <section aria-labelledby="loan-refinancing-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="loan-refinancing-input-title"
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
            id="remainingBalance"
            label={copy.remainingBalance}
            value={values.remainingBalance}
            placeholder="300,000,000"
            error={errors.remainingBalance}
            onChange={(value) => update("remainingBalance", value, true)}
          />
          <Field
            id="currentAnnualRate"
            label={copy.currentAnnualRate}
            value={values.currentAnnualRate}
            placeholder="4.8"
            suffix="%"
            error={errors.currentAnnualRate}
            onChange={(value) => update("currentAnnualRate", value)}
          />
          <Field
            id="newAnnualRate"
            label={copy.newAnnualRate}
            value={values.newAnnualRate}
            placeholder="3.7"
            suffix="%"
            error={errors.newAnnualRate}
            onChange={(value) => update("newAnnualRate", value)}
          />
          <Field
            id="remainingMonths"
            label={copy.remainingMonths}
            value={values.remainingMonths}
            placeholder="240"
            suffix={copy.months}
            error={errors.remainingMonths}
            onChange={(value) => update("remainingMonths", value)}
          />
          <Field
            id="refinancingCosts"
            label={copy.refinancingCosts}
            value={values.refinancingCosts}
            placeholder="2,000,000"
            error={errors.refinancingCosts}
            onChange={(value) => update("refinancingCosts", value, true)}
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
            aria-labelledby="loan-refinancing-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="loan-refinancing-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.netSavings,
                  value: result ? won(result.netSavings, locale) : "—",
                  featured: true,
                },
                {
                  label: copy.monthlySavings,
                  value: result ? won(result.monthlySavings, locale) : "—",
                },
                {
                  label: copy.breakEven,
                  value: result?.breakEvenMonths
                    ? `${result.breakEvenMonths.ceil().toString()} ${copy.months}`
                    : result
                      ? copy.noBreakEven
                      : "—",
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
          </section>
          <details open className="rounded-xl border bg-card p-4 shadow-sm">
            <summary className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.result}
            </summary>
            {result ? (
              <div className="mt-4">
                <dl className="grid gap-3 rounded-lg border p-4 text-sm sm:grid-cols-2">
                  <Detail
                    label={copy.grossSavings}
                    value={won(result.grossInterestSavings, locale)}
                  />
                  <Detail
                    label={copy.refinancingCosts}
                    value={wonValue(values.refinancingCosts, locale)}
                  />
                </dl>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <LoanDetails
                    name={copy.currentLoan}
                    payment={result.currentMonthlyPayment}
                    interest={result.currentTotalInterest}
                    locale={locale}
                    labels={copy}
                  />
                  <LoanDetails
                    name={copy.newLoan}
                    payment={result.newMonthlyPayment}
                    interest={result.newTotalInterest}
                    locale={locale}
                    labels={copy}
                  />
                </div>
              </div>
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
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  suffix?: string;
  error?: string;
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
function LoanDetails({
  name,
  payment,
  interest,
  locale,
  labels,
}: {
  name: string;
  payment: LoanRefinancingResult["currentMonthlyPayment"];
  interest: LoanRefinancingResult["currentTotalInterest"];
  locale: LoanRefinancingLocale;
  labels: (typeof loanRefinancingContent)[LoanRefinancingLocale];
}) {
  return (
    <section className="rounded-lg border p-4">
      <h3 className="font-semibold">{name}</h3>
      <dl className="mt-3 space-y-3 text-sm">
        <Detail label={labels.monthlyPayment} value={won(payment, locale)} />
        <Detail label={labels.totalInterest} value={won(interest, locale)} />
      </dl>
    </section>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
function won(
  value: { toDecimalPlaces: (places: number) => { toNumber: () => number } },
  locale: LoanRefinancingLocale,
) {
  return `${value
    .toDecimalPlaces(0)
    .toNumber()
    .toLocaleString(
      locale === "ko" ? "ko-KR" : "en-US",
    )} ${locale === "ko" ? "원" : "KRW"}`;
}
function wonValue(value: string, locale: LoanRefinancingLocale) {
  return `${Number(value.replaceAll(",", "")).toLocaleString(locale === "ko" ? "ko-KR" : "en-US")} ${locale === "ko" ? "원" : "KRW"}`;
}
