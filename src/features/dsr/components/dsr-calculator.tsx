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
import { calculateDsr, type DsrResult } from "../calculate";
import { dsrContent, type DsrLocale } from "../content";
import { validateDsr, type DsrErrors, type DsrValues } from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "dsr-error-summary";
const initialValues: DsrValues = {
  annualIncome: "",
  existingAnnualDebtService: "",
  newLoanPrincipal: "",
  annualInterestRate: "",
  termYears: "",
};

export function DsrCalculator({ locale }: { locale: DsrLocale }) {
  const copy = dsrContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<DsrErrors>({});
  const [result, setResult] = useState<DsrResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  const setMoney = (
    key: keyof Pick<
      DsrValues,
      "annualIncome" | "existingAnnualDebtService" | "newLoanPrincipal"
    >,
    value: string,
  ) =>
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateDsr(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateDsr(checked.data));
    setAnimationKey((value) => value + 1);
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(null);
  }
  const moneyFields = [
    ["annualIncome", copy.annualIncome, "60,000,000"],
    ["existingAnnualDebtService", copy.existingDebt, "6,000,000"],
    ["newLoanPrincipal", copy.newLoan, "100,000,000"],
  ] as const;

  return (
    <section aria-labelledby="dsr-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="dsr-input-title" className="mt-1 text-xl font-semibold">
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
          {moneyFields.map(([key, label, placeholder]) => (
            <Field
              key={key}
              id={key}
              label={label}
              value={values[key]}
              placeholder={placeholder}
              error={errors[key]}
              errorSummaryId={errorSummaryId}
              onChange={(value) => setMoney(key, value)}
            />
          ))}
          <Field
            id="annualInterestRate"
            label={copy.interestRate}
            value={values.annualInterestRate}
            placeholder="4.5"
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
            id="termYears"
            label={copy.termYears}
            value={values.termYears}
            placeholder="20"
            suffix={locale === "ko" ? "년" : "years"}
            error={errors.termYears}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({ ...current, termYears: value }))
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
            aria-labelledby="dsr-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="dsr-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.dsr,
                  value: result
                    ? `${result.dsrRate.toDecimalPlaces(1).toString()}%`
                    : "—",
                  featured: true,
                },
                {
                  label: copy.monthlyPayment,
                  value: (
                    <AnimatedWon
                      value={result?.monthlyPayment ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.annualDebt,
                  value: (
                    <AnimatedWon
                      value={result?.totalAnnualDebtService ?? null}
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
                  label={copy.newAnnualDebt}
                  value={won(result.newAnnualDebtService, locale)}
                />
                <Detail
                  label={copy.existingAnnualDebt}
                  value={won(result.existingAnnualDebtService, locale)}
                />
                <Detail
                  label={copy.income}
                  value={won(result.annualIncome, locale)}
                />
                <Detail
                  label={copy.dsr}
                  value={`${result.dsrRate.toDecimalPlaces(2).toString()}%`}
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
  locale: DsrLocale,
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
