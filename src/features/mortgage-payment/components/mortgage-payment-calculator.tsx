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
  calculateMortgagePayment,
  type MortgagePaymentResult,
} from "../calculate";
import { mortgagePaymentContent, type MortgagePaymentLocale } from "../content";
import {
  validateMortgagePayment,
  type MortgagePaymentErrors,
  type MortgagePaymentValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: MortgagePaymentValues = {
  homePrice: "",
  downPayment: "",
  annualRate: "5",
  termYears: "30",
  monthlyCosts: "0",
};

export function MortgagePaymentCalculator({
  locale,
}: {
  locale: MortgagePaymentLocale;
}) {
  const copy = mortgagePaymentContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<MortgagePaymentErrors>({});
  const [result, setResult] = useState<MortgagePaymentResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateMortgagePayment(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateMortgagePayment(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }

  return (
    <section aria-labelledby="mortgage-payment-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="mortgage-payment-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              id="mortgage-payment-error-summary"
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <Field
            id="homePrice"
            label={copy.homePrice}
            value={values.homePrice}
            placeholder="500,000,000"
            error={errors.homePrice}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                homePrice: formatMoneyInput(value, current.homePrice),
              }))
            }
          />
          <Field
            id="downPayment"
            label={copy.downPayment}
            value={values.downPayment}
            placeholder="100,000,000"
            error={errors.downPayment}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                downPayment: formatMoneyInput(value, current.downPayment),
              }))
            }
          />
          <Field
            id="annualRate"
            label={copy.annualRate}
            value={values.annualRate}
            placeholder="5"
            suffix="%"
            error={errors.annualRate}
            onChange={(value) =>
              setValues((current) => ({ ...current, annualRate: value }))
            }
          />
          <Field
            id="termYears"
            label={copy.termYears}
            value={values.termYears}
            placeholder="30"
            suffix={copy.years}
            error={errors.termYears}
            onChange={(value) =>
              setValues((current) => ({ ...current, termYears: value }))
            }
          />
          <Field
            id="monthlyCosts"
            label={copy.monthlyCosts}
            value={values.monthlyCosts}
            placeholder="300,000"
            error={errors.monthlyCosts}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                monthlyCosts: formatMoneyInput(value, current.monthlyCosts),
              }))
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
            aria-labelledby="mortgage-payment-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="mortgage-payment-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.monthlyPrincipalAndInterest,
                  value: (
                    <AnimatedWon
                      value={result?.monthlyPrincipalAndInterest ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.estimatedMonthlyPayment,
                  value: (
                    <AnimatedWon
                      value={result?.estimatedMonthlyPayment ?? null}
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
            <summary className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.result}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <Detail
                  label={copy.loanAmount}
                  value={won(result.loanAmount, locale)}
                />
                <Detail
                  label={copy.totalLoanPayments}
                  value={won(result.totalLoanPayments, locale)}
                />
                <Detail
                  label={copy.downPaymentRatio}
                  value={`${result.downPaymentRatio.toDecimalPlaces(2).toString()}%`}
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
          aria-describedby={
            error ? `${id}-error mortgage-payment-error-summary` : undefined
          }
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
  locale: MortgagePaymentLocale,
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
