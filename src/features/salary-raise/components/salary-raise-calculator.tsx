"use client";

import { type FormEvent, useState } from "react";
import {
  CurrencySelector,
  formatDisplayCurrency,
  useDisplayCurrency,
} from "@/components/calculators/currency-selector";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateSalaryRaise,
  type SalaryPeriod,
  type SalaryRaiseResult,
} from "../calculate";
import { salaryRaiseContent, type SalaryRaiseLocale } from "../content";
import { validateSalaryRaise, type SalaryRaiseErrors } from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function SalaryRaiseCalculator({
  locale,
}: {
  locale: SalaryRaiseLocale;
}) {
  const copy = salaryRaiseContent[locale];
  const { currency } = useDisplayCurrency(locale);
  const [period, setPeriod] = useState<SalaryPeriod>("annual");
  const [salary, setSalary] = useState("");
  const [raiseRate, setRaiseRate] = useState("");
  const [errors, setErrors] = useState<SalaryRaiseErrors>({});
  const [result, setResult] = useState<SalaryRaiseResult | null>(null);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateSalaryRaise({ salary, raiseRate, period }, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateSalaryRaise(checked.data));
  }

  function reset() {
    cancelResultScroll();
    setPeriod("annual");
    setSalary("");
    setRaiseRate("");
    setErrors({});
    setResult(null);
  }

  const money = (
    value:
      | { toDecimalPlaces: (places: number) => { toNumber: () => number } }
      | undefined,
  ) =>
    value === undefined
      ? "-"
      : formatDisplayCurrency(
          value.toDecimalPlaces(2).toNumber(),
          locale,
          currency,
        );

  return (
    <section aria-labelledby="salary-raise-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="salary-raise-title" className="mt-1 text-xl font-semibold">
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
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
          <CurrencySelector locale={locale} />
          <label className="mt-4 block text-sm font-medium">
            {copy.salary}
            <input
              inputMode="decimal"
              value={salary}
              placeholder={
                period === "annual"
                  ? copy.annualPlaceholder
                  : copy.monthlyPlaceholder
              }
              onChange={(event) =>
                setSalary(formatMoneyInput(event.target.value, salary))
              }
              aria-invalid={Boolean(errors.salary)}
              aria-describedby={errors.salary ? "salary-error" : undefined}
              className={fieldClass}
            />
          </label>
          {errors.salary ? (
            <p id="salary-error" className="mt-1 text-sm text-destructive">
              {errors.salary}
            </p>
          ) : null}
          <label htmlFor="raiseRate" className="mt-4 block text-sm font-medium">
            {copy.raiseRate}
          </label>
          <div className="relative">
            <input
              id="raiseRate"
              inputMode="decimal"
              value={raiseRate}
              placeholder={copy.ratePlaceholder}
              onChange={(event) => setRaiseRate(event.target.value)}
              aria-invalid={Boolean(errors.raiseRate)}
              aria-describedby={errors.raiseRate ? "rate-error" : undefined}
              className={`${fieldClass} pr-10`}
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
              %
            </span>
          </div>
          {errors.raiseRate ? (
            <p id="rate-error" className="mt-1 text-sm text-destructive">
              {errors.raiseRate}
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
            aria-labelledby="salary-raise-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="salary-raise-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.newAnnual,
                  value: money(result?.newAnnualSalary),
                  featured: true,
                },
                {
                  label: copy.annualIncrease,
                  value: money(result?.annualIncrease),
                },
                {
                  label: copy.monthlyIncrease,
                  value: money(result?.monthlyIncrease),
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
                  label={copy.currentAnnual}
                  value={money(result.currentAnnualSalary)}
                />
                <Detail
                  label={copy.currentMonthly}
                  value={money(result.currentMonthlySalary)}
                />
                <Detail
                  label={copy.newMonthly}
                  value={money(result.newMonthlySalary)}
                />
                <Detail
                  label={copy.appliedRate}
                  value={`${result.raiseRate.toString()}%`}
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
