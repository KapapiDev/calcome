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
  calculateCreditCardInstallmentInterest,
  type CreditCardInstallmentInterestResult,
} from "../calculate";
import {
  creditCardInstallmentInterestContent,
  type CreditCardInstallmentInterestLocale,
} from "../content";
import {
  validateCreditCardInstallmentInterest,
  type CreditCardInstallmentInterestErrors,
  type CreditCardInstallmentInterestValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: CreditCardInstallmentInterestValues = {
  purchaseAmount: "",
  installmentMonths: "",
  annualFeeRate: "",
};
const errorSummaryId = "credit-card-installment-interest-error-summary";

export function CreditCardInstallmentInterestCalculator({
  locale,
}: {
  locale: CreditCardInstallmentInterestLocale;
}) {
  const copy = creditCardInstallmentInterestContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<CreditCardInstallmentInterestErrors>({});
  const [result, setResult] = useState<CreditCardInstallmentInterestResult>();
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateCreditCardInstallmentInterest(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(undefined);
      return;
    }
    requestResultScroll();
    setResult(calculateCreditCardInstallmentInterest(checked.data));
    setAnimationKey((value) => value + 1);
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(undefined);
  }

  return (
    <section aria-labelledby="card-installment-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="card-installment-input-title"
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
            id="purchaseAmount"
            label={copy.purchaseAmount}
            value={values.purchaseAmount}
            placeholder="1,200,000"
            error={errors.purchaseAmount}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                purchaseAmount: formatMoneyInput(value, current.purchaseAmount),
              }))
            }
          />
          <Field
            id="installmentMonths"
            label={copy.installmentMonths}
            value={values.installmentMonths}
            placeholder="12"
            suffix={locale === "ko" ? "개월" : "months"}
            error={errors.installmentMonths}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, installmentMonths: value }))
            }
          />
          <Field
            id="annualFeeRate"
            label={copy.annualFeeRate}
            value={values.annualFeeRate}
            placeholder="12"
            suffix="%"
            error={errors.annualFeeRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, annualFeeRate: value }))
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
            aria-labelledby="card-installment-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="card-installment-result" className="text-xl font-semibold">
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
                  label: copy.totalPayment,
                  value: (
                    <AnimatedWon
                      value={result?.totalPayment ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.averageMonthlyPayment,
                  value: (
                    <AnimatedWon
                      value={result?.averageMonthlyPayment ?? null}
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
                  label={copy.firstPayment}
                  value={won(result.firstPayment, locale)}
                />
                <Detail
                  label={copy.lastPayment}
                  value={won(result.lastPayment, locale)}
                />
                <Detail
                  label={copy.totalFee}
                  value={won(result.totalFee, locale)}
                />
                <Detail
                  label={copy.totalPayment}
                  value={won(result.totalPayment, locale)}
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
  locale: CreditCardInstallmentInterestLocale,
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
