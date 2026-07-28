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
  calculateDebtRepaymentPeriod,
  type DebtRepaymentPeriodResult,
} from "../calculate";
import {
  debtRepaymentPeriodContent,
  type DebtRepaymentPeriodLocale,
} from "../content";
import {
  validateDebtRepaymentPeriod,
  type DebtRepaymentPeriodErrors,
  type DebtRepaymentPeriodValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: DebtRepaymentPeriodValues = {
  balance: "",
  annualInterestRate: "",
  monthlyPayment: "",
};
const errorSummaryId = "debt-repayment-period-error-summary";

export function DebtRepaymentPeriodCalculator({
  locale,
}: {
  locale: DebtRepaymentPeriodLocale;
}) {
  const copy = debtRepaymentPeriodContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<DebtRepaymentPeriodErrors>({});
  const [result, setResult] = useState<
    DebtRepaymentPeriodResult | null | undefined
  >(undefined);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);
  const setMoney = (key: "balance" | "monthlyPayment", value: string) =>
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateDebtRepaymentPeriod(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(undefined);
      return;
    }
    requestResultScroll();
    setResult(calculateDebtRepaymentPeriod(checked.data));
    setAnimationKey((value) => value + 1);
  }
  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(undefined);
  }

  return (
    <section aria-labelledby="debt-repayment-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="debt-repayment-input-title"
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
            id="balance"
            label={copy.balance}
            value={values.balance}
            placeholder="10,000,000"
            error={errors.balance}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setMoney("balance", value)}
          />
          <Field
            id="annualInterestRate"
            label={copy.interestRate}
            value={values.annualInterestRate}
            placeholder="6"
            suffix="%"
            error={errors.annualInterestRate}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                annualInterestRate: value,
              }))
            }
          />
          <Field
            id="monthlyPayment"
            label={copy.monthlyPayment}
            value={values.monthlyPayment}
            placeholder="500,000"
            error={errors.monthlyPayment}
            errorSummaryId={errorSummaryId}
            onChange={(value) => setMoney("monthlyPayment", value)}
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
            aria-labelledby="debt-repayment-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="debt-repayment-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            {result === null ? (
              <p
                role="status"
                className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm leading-6"
              >
                {copy.unpayable}
              </p>
            ) : (
              <PrimaryResults
                metrics={[
                  {
                    label: copy.payoffPeriod,
                    value: result ? copy.yearMonth(result.payoffMonths) : "-",
                    featured: true,
                  },
                  {
                    label: copy.totalRepayment,
                    value: (
                      <AnimatedWon
                        value={result?.totalRepayment ?? null}
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
            )}
            <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
          </section>
          <details open className="rounded-xl border bg-card p-4 shadow-sm">
            <summary className="min-h-10 cursor-pointer content-center font-semibold">
              {copy.details}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Detail
                  label={copy.payoffPeriod}
                  value={`${result.payoffMonths.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")} ${copy.monthUnit}`}
                />
                <Detail
                  label={copy.finalPayment}
                  value={won(result.finalPayment, locale)}
                />
                <Detail
                  label={copy.totalRepayment}
                  value={won(result.totalRepayment, locale)}
                />
                <Detail
                  label={copy.totalInterest}
                  value={won(result.totalInterest, locale)}
                />
              </dl>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                {result === null ? copy.unpayable : copy.empty}
              </p>
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
          aria-describedby={
            error ? `${id}-error ${errorSummaryId}` : undefined
          }
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
  locale: DebtRepaymentPeriodLocale,
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
