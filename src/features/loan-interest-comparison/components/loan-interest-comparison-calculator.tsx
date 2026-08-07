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
  calculateLoanInterestComparison,
  type LoanInterestComparisonResult,
} from "../calculate";
import {
  loanInterestComparisonContent,
  type LoanInterestComparisonLocale,
} from "../content";
import {
  validateLoanInterestComparison,
  type LoanInterestComparisonErrors,
  type LoanInterestComparisonValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "loan-interest-comparison-error-summary";
const initialValues: LoanInterestComparisonValues = {
  principal: "",
  annualRateA: "4.5",
  annualRateB: "3.8",
  termMonths: "360",
};

export function LoanInterestComparisonCalculator({
  locale,
}: {
  locale: LoanInterestComparisonLocale;
}) {
  const copy = loanInterestComparisonContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<LoanInterestComparisonErrors>({});
  const [result, setResult] = useState<LoanInterestComparisonResult | null>(
    null,
  );
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateLoanInterestComparison(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateLoanInterestComparison(checked.data));
    setAnimationKey((value) => value + 1);
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }

  const lowerCost = result
    ? result.lowerCostOption === "same"
      ? copy.sameCost
      : `${copy.lowerCost}: ${copy.option(result.lowerCostOption)}`
    : "—";

  return (
    <section aria-labelledby="loan-interest-comparison-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="loan-interest-comparison-input-title"
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
            id="principal"
            label={copy.principal}
            value={values.principal}
            placeholder="300,000,000"
            error={errors.principal}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                principal: formatMoneyInput(value, current.principal),
              }))
            }
          />
          <Field
            id="annualRateA"
            label={copy.annualRateA}
            value={values.annualRateA}
            placeholder="4.5"
            suffix="%"
            error={errors.annualRateA}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, annualRateA: value }))
            }
          />
          <Field
            id="annualRateB"
            label={copy.annualRateB}
            value={values.annualRateB}
            placeholder="3.8"
            suffix="%"
            error={errors.annualRateB}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, annualRateB: value }))
            }
          />
          <Field
            id="termMonths"
            label={copy.termMonths}
            value={values.termMonths}
            placeholder="360"
            suffix={copy.months}
            error={errors.termMonths}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, termMonths: value }))
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
            aria-labelledby="loan-interest-comparison-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2
              id="loan-interest-comparison-result"
              className="text-xl font-semibold"
            >
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                { label: copy.lowerCost, value: lowerCost, featured: true },
                {
                  label: copy.savings,
                  value: (
                    <AnimatedWon
                      value={result?.interestSavings ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.paymentDifference,
                  value: (
                    <AnimatedWon
                      value={result?.monthlyPaymentDifference ?? null}
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
              {copy.result}
            </summary>
            {result ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <OptionDetails
                  name={copy.option("A")}
                  result={result.optionA}
                  locale={locale}
                  labels={copy}
                />
                <OptionDetails
                  name={copy.option("B")}
                  result={result.optionB}
                  locale={locale}
                  labels={copy}
                />
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

function OptionDetails({
  name,
  result,
  locale,
  labels,
}: {
  name: string;
  result: LoanInterestComparisonResult["optionA"];
  locale: LoanInterestComparisonLocale;
  labels: (typeof loanInterestComparisonContent)[LoanInterestComparisonLocale];
}) {
  return (
    <section className="rounded-lg border p-4">
      <h3 className="font-semibold">
        {name} · {result.annualRate.toString()}%
      </h3>
      <dl className="mt-3 space-y-3 text-sm">
        <Detail
          label={labels.monthlyPayment}
          value={won(result.monthlyPayment, locale)}
        />
        <Detail
          label={labels.totalInterest}
          value={won(result.totalInterest, locale)}
        />
        <Detail
          label={labels.totalPayment}
          value={won(result.totalPayment, locale)}
        />
      </dl>
    </section>
  );
}

function won(
  value: { toDecimalPlaces: (places: number) => { toNumber: () => number } },
  locale: LoanInterestComparisonLocale,
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
