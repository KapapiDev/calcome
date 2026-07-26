"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { formatMoneyInput } from "@/lib/input/money";
import { calculateSalaryConversion, type SalaryPeriod } from "../calculate";
import {
  salaryConversionContent,
  type SalaryConversionLocale,
} from "../content";
import { validateSalaryConversion } from "../validation";

export function SalaryConversionCalculator({
  locale,
}: {
  locale: SalaryConversionLocale;
}) {
  const copy = salaryConversionContent[locale];
  const [period, setPeriod] = useState<SalaryPeriod>("annual");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReturnType<
    typeof calculateSalaryConversion
  > | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateSalaryConversion({ salary, period }, locale);
    if (!checked.data) {
      setError(copy.error);
      setResult(null);
      return;
    }
    setError("");
    setResult(calculateSalaryConversion(checked.data));
    setAnimationKey((key) => key + 1);
  }
  function reset() {
    setPeriod("annual");
    setSalary("");
    setError("");
    setResult(null);
  }
  return (
    <section aria-labelledby="salary-conversion-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="salary-conversion-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {error ? (
            <p
              id="salary-conversion-error"
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {error}
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
          <label className="mt-4 block text-sm font-medium">
            {copy.salary}
            <input
              inputMode="decimal"
              value={salary}
              placeholder={copy.placeholder}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "salary-conversion-error" : undefined}
              onChange={(event) =>
                setSalary(formatMoneyInput(event.target.value, salary))
              }
              className="mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 sm:text-sm"
            />
          </label>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          aria-labelledby="salary-conversion-result"
          className="rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="salary-conversion-result" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.annualSalary,
                value: (
                  <AnimatedWon
                    value={result?.annualSalary ?? null}
                    animationKey={animationKey}
                  />
                ),
                featured: true,
              },
              {
                label: copy.monthlySalary,
                value: (
                  <AnimatedWon
                    value={result?.monthlySalary ?? null}
                    animationKey={animationKey}
                  />
                ),
              },
              {
                label: copy.weeklySalary,
                value: (
                  <AnimatedWon
                    value={result?.weeklySalary ?? null}
                    animationKey={animationKey}
                  />
                ),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            {result ? copy.note : copy.empty}
          </p>
        </section>
      </div>
    </section>
  );
}
