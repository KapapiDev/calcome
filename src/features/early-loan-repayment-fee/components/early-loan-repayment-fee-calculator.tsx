"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import {
  CurrencySelector,
  useDisplayCurrency,
} from "@/components/calculators/currency-selector";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateEarlyRepaymentFee,
  type EarlyRepaymentFeeResult,
} from "../calculate";
import {
  earlyRepaymentFeeContent,
  type EarlyRepaymentFeeLocale,
} from "../content";
import {
  validateEarlyRepaymentFee,
  type EarlyRepaymentFeeErrors,
  type EarlyRepaymentFeeValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "early-loan-repayment-fee-error-summary";
const initialValues: EarlyRepaymentFeeValues = {
  repaymentAmount: "",
  feeRate: "1.2",
  originalTermMonths: "36",
  elapsedMonths: "12",
};

export function EarlyLoanRepaymentFeeCalculator({
  locale,
}: {
  locale: EarlyRepaymentFeeLocale;
}) {
  const { currency } = useDisplayCurrency(locale);
  const copy = earlyRepaymentFeeContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<EarlyRepaymentFeeErrors>({});
  const [result, setResult] = useState<EarlyRepaymentFeeResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateEarlyRepaymentFee(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateEarlyRepaymentFee(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }
  const update = (key: keyof EarlyRepaymentFeeValues, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));
  return (
    <section aria-labelledby="early-repayment-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="early-repayment-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          <CurrencySelector locale={locale} />
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
            id="repaymentAmount"
            label={copy.repaymentAmount}
            value={values.repaymentAmount}
            placeholder="100,000,000"
            suffix={currency}
            error={errors.repaymentAmount}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              update(
                "repaymentAmount",
                formatMoneyInput(value, values.repaymentAmount),
              )
            }
          />
          <Field
            id="feeRate"
            label={copy.feeRate}
            value={values.feeRate}
            placeholder="1.2"
            suffix="%"
            error={errors.feeRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) => update("feeRate", value)}
          />
          <Field
            id="originalTermMonths"
            label={copy.originalTermMonths}
            value={values.originalTermMonths}
            placeholder="36"
            suffix={copy.months}
            error={errors.originalTermMonths}
            errorSummaryId={errorSummaryId}
            onChange={(value) => update("originalTermMonths", value)}
          />
          <Field
            id="elapsedMonths"
            label={copy.elapsedMonths}
            value={values.elapsedMonths}
            placeholder="12"
            suffix={copy.months}
            error={errors.elapsedMonths}
            errorSummaryId={errorSummaryId}
            onChange={(value) => update("elapsedMonths", value)}
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
            aria-labelledby="early-repayment-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="early-repayment-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.estimatedFee,
                  value: (
                    <AnimatedWon
                      value={result?.estimatedFee ?? null}
                      locale={locale}
                      currency={currency}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.netRepaymentAmount,
                  value: (
                    <AnimatedWon
                      value={result?.netRepaymentAmount ?? null}
                      locale={locale}
                      currency={currency}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.remainingMonths,
                  value: result
                    ? `${result.remainingMonths.toLocaleString()} ${copy.months}`
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
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <Detail
                  label={copy.effectiveFeeRate}
                  value={`${result.effectiveFeeRate.toDecimalPlaces(4).toString()}%`}
                />
                <Detail
                  label={copy.remainingTermRatio}
                  value={`${result.remainingTermRatio.mul(100).toDecimalPlaces(2).toString()}%`}
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
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
