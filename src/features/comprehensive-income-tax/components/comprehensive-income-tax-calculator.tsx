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
  calculateComprehensiveIncomeTax,
  type ComprehensiveIncomeTaxResult,
} from "../calculate";
import {
  comprehensiveIncomeTaxContent,
  type ComprehensiveIncomeTaxLocale,
} from "../content";
import {
  validateComprehensiveIncomeTax,
  type ComprehensiveIncomeTaxErrors,
  type ComprehensiveIncomeTaxValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: ComprehensiveIncomeTaxValues = {
  grossIncome: "",
  necessaryExpenses: "",
  incomeDeduction: "",
  taxRate: "",
  progressiveDeduction: "",
  taxCredit: "",
  localIncomeTaxRate: "",
};
const moneyKeys = [
  "grossIncome",
  "necessaryExpenses",
  "incomeDeduction",
  "progressiveDeduction",
  "taxCredit",
] as const;
const rateKeys = ["taxRate", "localIncomeTaxRate"] as const;
const errorSummaryId = "comprehensive-income-tax-error-summary";

export function ComprehensiveIncomeTaxCalculator({
  locale,
}: {
  locale: ComprehensiveIncomeTaxLocale;
}) {
  const copy = comprehensiveIncomeTaxContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ComprehensiveIncomeTaxErrors>({});
  const [result, setResult] = useState<ComprehensiveIncomeTaxResult | null>(
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
    const checked = validateComprehensiveIncomeTax(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateComprehensiveIncomeTax(checked.data));
    setAnimationKey((value) => value + 1);
  }
  return (
    <section aria-labelledby="comprehensive-income-tax-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="comprehensive-income-tax-input-title"
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
          {moneyKeys.map((key) => (
            <Field
              key={key}
              id={key}
              label={copy.fields[key]}
              value={values[key]}
              placeholder={
                key === "grossIncome"
                  ? "100,000,000"
                  : key === "necessaryExpenses"
                    ? "30,000,000"
                    : key === "incomeDeduction"
                      ? "15,000,000"
                      : key === "progressiveDeduction"
                        ? "5,760,000"
                        : "1,000,000"
              }
              error={errors[key]}
              errorSummaryId={errorSummaryId}
              onChange={(value) =>
                setValues((current) => ({
                  ...current,
                  [key]: formatMoneyInput(value, current[key]),
                }))
              }
            />
          ))}
          {rateKeys.map((key) => (
            <Field
              key={key}
              id={key}
              label={copy.fields[key]}
              value={values[key]}
              placeholder={key === "taxRate" ? "24" : "10"}
              suffix="%"
              error={errors[key]}
              errorSummaryId={errorSummaryId}
              onChange={(value) =>
                setValues((current) => ({ ...current, [key]: value }))
              }
            />
          ))}
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                cancelResultScroll();
                setValues(initialValues);
                setErrors({});
                setResult(null);
              }}
            >
              {copy.reset}
            </Button>
          </div>
        </form>
        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            aria-labelledby="comprehensive-income-tax-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2
              id="comprehensive-income-tax-result"
              className="text-xl font-semibold"
            >
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.totalTax,
                  value: (
                    <AnimatedWon
                      value={result?.totalTax ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.incomeAfterTax,
                  value: (
                    <AnimatedWon
                      value={result?.incomeAfterTax ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.taxableIncome,
                  value: (
                    <AnimatedWon
                      value={result?.taxableIncome ?? null}
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
                  label={copy.adjustedIncome}
                  value={won(result.adjustedIncome, locale)}
                />
                <Detail
                  label={copy.nationalTaxBeforeCredit}
                  value={won(result.nationalTaxBeforeCredit, locale)}
                />
                <Detail
                  label={copy.nationalIncomeTax}
                  value={won(result.nationalIncomeTax, locale)}
                />
                <Detail
                  label={copy.localIncomeTax}
                  value={won(result.localIncomeTax, locale)}
                />
                <Detail
                  label={copy.effectiveRate}
                  value={`${result.effectiveTaxRate.toDecimalPlaces(2).toString()}%`}
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
  const errorId = `${id}-error`;
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
          aria-describedby={error ? `${errorId} ${errorSummaryId}` : undefined}
          className={`${fieldClass} ${suffix ? "pr-14" : ""}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
            {suffix}
          </span>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
function won(
  value: { toDecimalPlaces: (places: number) => { toNumber: () => number } },
  locale: ComprehensiveIncomeTaxLocale,
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
