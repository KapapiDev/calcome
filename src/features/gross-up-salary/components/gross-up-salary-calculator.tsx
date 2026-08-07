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
  calculateGrossUpSalary,
  type GrossUpSalaryResult,
  type SalaryPeriod,
} from "../calculate";
import { grossUpSalaryContent, type GrossUpSalaryLocale } from "../content";
import { validateGrossUpSalary, type GrossUpSalaryErrors } from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "gross-up-salary-error-summary";
const won = (
  value: { toDecimalPlaces: (places: number) => { toNumber: () => number } },
  locale: GrossUpSalaryLocale,
) =>
  `${value
    .toDecimalPlaces(0)
    .toNumber()
    .toLocaleString(
      locale === "ko" ? "ko-KR" : "en-US",
    )} ${locale === "ko" ? "원" : "KRW"}`;

export function GrossUpSalaryCalculator({
  locale,
}: {
  locale: GrossUpSalaryLocale;
}) {
  const copy = grossUpSalaryContent[locale];
  const [period, setPeriod] = useState<SalaryPeriod>("annual");
  const [targetNetSalary, setTargetNetSalary] = useState("");
  const [deductionRate, setDeductionRate] = useState("");
  const [errors, setErrors] = useState<GrossUpSalaryErrors>({});
  const [result, setResult] = useState<GrossUpSalaryResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  const hasErrors = Object.keys(errors).length > 0;

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateGrossUpSalary(
      { targetNetSalary, deductionRate, period },
      locale,
    );
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateGrossUpSalary(checked.data));
    setAnimationKey((value) => value + 1);
  }

  function reset() {
    cancelResultScroll();
    setPeriod("annual");
    setTargetNetSalary("");
    setDeductionRate("");
    setErrors({});
    setResult(null);
  }

  return (
    <section aria-labelledby="gross-up-salary-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="gross-up-salary-title" className="mt-1 text-xl font-semibold">
            {copy.input}
          </h2>
          {hasErrors ? (
            <p
              id={errorSummaryId}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <fieldset className="mt-4">
            <legend className="sr-only">{copy.salary}</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["annual", "monthly"] as const).map((option) => (
                <label
                  key={option}
                  className="flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="period"
                    checked={period === option}
                    onChange={() => setPeriod(option)}
                  />
                  {copy[option]}
                </label>
              ))}
            </div>
          </fieldset>
          <label
            htmlFor="targetNetSalary"
            className="mt-4 block text-sm font-medium"
          >
            {copy.salary}
          </label>
          <input
            id="targetNetSalary"
            inputMode="decimal"
            value={targetNetSalary}
            placeholder={
              period === "annual"
                ? copy.annualPlaceholder
                : copy.monthlyPlaceholder
            }
            onChange={(event) =>
              setTargetNetSalary(
                formatMoneyInput(event.target.value, targetNetSalary),
              )
            }
            aria-invalid={Boolean(errors.targetNetSalary)}
            aria-describedby={
              errors.targetNetSalary
                ? `target-net-error ${errorSummaryId}`
                : undefined
            }
            className={fieldClass}
          />
          {errors.targetNetSalary ? (
            <p id="target-net-error" className="mt-1 text-sm text-destructive">
              {errors.targetNetSalary}
            </p>
          ) : null}
          <label
            htmlFor="deductionRate"
            className="mt-4 block text-sm font-medium"
          >
            {copy.deductionRate}
          </label>
          <div className="relative">
            <input
              id="deductionRate"
              inputMode="decimal"
              value={deductionRate}
              placeholder={copy.ratePlaceholder}
              onChange={(event) => setDeductionRate(event.target.value)}
              aria-invalid={Boolean(errors.deductionRate)}
              aria-describedby={
                errors.deductionRate
                  ? `deduction-rate-error ${errorSummaryId}`
                  : undefined
              }
              className={`${fieldClass} pr-10`}
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
              %
            </span>
          </div>
          {errors.deductionRate ? (
            <p
              id="deduction-rate-error"
              className="mt-1 text-sm text-destructive"
            >
              {errors.deductionRate}
            </p>
          ) : null}
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
            aria-labelledby="gross-up-salary-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="gross-up-salary-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.annualGross,
                  value: (
                    <AnimatedWon
                      value={result?.requiredAnnualGross ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.monthlyGross,
                  value: (
                    <AnimatedWon
                      value={result?.requiredMonthlyGross ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.annualDeductions,
                  value: (
                    <AnimatedWon
                      value={result?.annualDeductions ?? null}
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
                  label={copy.annualNet}
                  value={won(result.targetAnnualNet, locale)}
                />
                <Detail
                  label={copy.monthlyNet}
                  value={won(result.targetMonthlyNet, locale)}
                />
                <Detail
                  label={copy.monthlyDeductions}
                  value={won(result.monthlyDeductions, locale)}
                />
                <Detail
                  label={copy.appliedRate}
                  value={`${result.deductionRate.toString()}%`}
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
