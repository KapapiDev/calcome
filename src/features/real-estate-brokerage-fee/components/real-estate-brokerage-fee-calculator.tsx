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
  calculateRealEstateBrokerageFee,
  type RealEstateBrokerageFeeResult,
} from "../calculate";
import {
  realEstateBrokerageFeeContent,
  type RealEstateBrokerageFeeLocale,
} from "../content";
import {
  validateRealEstateBrokerageFee,
  type RealEstateBrokerageFeeErrors,
  type RealEstateBrokerageFeeValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: RealEstateBrokerageFeeValues = {
  transactionAmount: "",
  feeRate: "",
  vatRate: "10",
};
const errorSummaryId = "brokerage-fee-error-summary";

export function RealEstateBrokerageFeeCalculator({
  locale,
}: {
  locale: RealEstateBrokerageFeeLocale;
}) {
  const copy = realEstateBrokerageFeeContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<RealEstateBrokerageFeeErrors>({});
  const [result, setResult] = useState<RealEstateBrokerageFeeResult>();
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateRealEstateBrokerageFee(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(undefined);
      return;
    }
    requestResultScroll();
    setResult(calculateRealEstateBrokerageFee(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(undefined);
  }
  return (
    <section aria-labelledby="brokerage-fee-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="brokerage-fee-input-title"
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
          <div className="mt-4">
            <label
              htmlFor="transactionAmount"
              className="block text-sm font-medium"
            >
              {copy.transactionAmount}
            </label>
            <div className="relative">
              <input
                id="transactionAmount"
                inputMode="decimal"
                value={values.transactionAmount}
                placeholder="500,000,000"
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    transactionAmount: formatMoneyInput(
                      event.target.value,
                      current.transactionAmount,
                    ),
                  }))
                }
                aria-invalid={Boolean(errors.transactionAmount)}
                aria-describedby={
                  errors.transactionAmount
                    ? `transactionAmount-error ${errorSummaryId}`
                    : undefined
                }
                className={`${fieldClass} pr-12`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                {locale === "ko" ? "원" : "KRW"}
              </span>
            </div>
            {errors.transactionAmount ? (
              <p
                id="transactionAmount-error"
                className="mt-1 text-sm text-destructive"
              >
                {errors.transactionAmount}
              </p>
            ) : null}
          </div>
          <RateField
            id="feeRate"
            label={copy.feeRate}
            value={values.feeRate}
            placeholder="0.4"
            error={errors.feeRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, feeRate: value }))
            }
          />
          <RateField
            id="vatRate"
            label={copy.vatRate}
            value={values.vatRate}
            placeholder="10"
            error={errors.vatRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, vatRate: value }))
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
            aria-labelledby="brokerage-fee-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="brokerage-fee-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.totalFee,
                  value: (
                    <AnimatedWon
                      value={result?.totalFee ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.brokerageFee,
                  value: (
                    <AnimatedWon
                      value={result?.brokerageFee ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.vat,
                  value: (
                    <AnimatedWon
                      value={result?.vat ?? null}
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
                  label={copy.brokerageFee}
                  value={won(result.brokerageFee, locale)}
                />
                <Detail label={copy.vat} value={won(result.vat, locale)} />
                <Detail
                  label={copy.totalFee}
                  value={won(result.totalFee, locale)}
                />
                <Detail
                  label={copy.effectiveRate}
                  value={`${result.effectiveRate.toDecimalPlaces(4).toString()}%`}
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

function RateField({
  id,
  label,
  value,
  placeholder,
  error,
  errorSummaryId,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
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
          className={`${fieldClass} pr-10`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          %
        </span>
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
  locale: RealEstateBrokerageFeeLocale,
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
