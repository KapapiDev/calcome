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
  calculateBalloonPayment,
  type BalloonPaymentResult,
} from "../calculate";
import { balloonPaymentContent, type BalloonPaymentLocale } from "../content";
import {
  validateBalloonPayment,
  type BalloonPaymentErrors,
  type BalloonPaymentValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: BalloonPaymentValues = {
  principal: "",
  annualRate: "5",
  termMonths: "60",
  balloonAmount: "",
};
const errorSummaryId = "balloon-payment-error-summary";

export function BalloonPaymentCalculator({
  locale,
}: {
  locale: BalloonPaymentLocale;
}) {
  const copy = balloonPaymentContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<BalloonPaymentErrors>({});
  const [result, setResult] = useState<BalloonPaymentResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateBalloonPayment(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateBalloonPayment(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }

  return (
    <section aria-labelledby="balloon-payment-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="balloon-payment-input-title"
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
            placeholder="100,000,000"
            error={errors.principal}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                principal: formatMoneyInput(value, current.principal),
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
            id="termMonths"
            label={copy.termMonths}
            value={values.termMonths}
            placeholder="60"
            suffix={copy.months}
            error={errors.termMonths}
            onChange={(value) =>
              setValues((current) => ({ ...current, termMonths: value }))
            }
          />
          <Field
            id="balloonAmount"
            label={copy.balloonAmount}
            value={values.balloonAmount}
            placeholder="40,000,000"
            error={errors.balloonAmount}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                balloonAmount: formatMoneyInput(value, current.balloonAmount),
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
            aria-labelledby="balloon-payment-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="balloon-payment-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.monthlyPayment,
                  value: (
                    <AnimatedWon
                      value={result?.monthlyPayment ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.finalBalloon,
                  value: (
                    <AnimatedWon
                      value={result?.balloonAmount ?? null}
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
                  label={copy.regularPayments}
                  value={won(result.totalRegularPayments, locale)}
                />
                <Detail
                  label={copy.totalRepayment}
                  value={won(result.totalRepayment, locale)}
                />
                <Detail
                  label={copy.balloonRatio}
                  value={`${result.balloonRatio.toDecimalPlaces(2).toString()}%`}
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
  locale: BalloonPaymentLocale,
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
