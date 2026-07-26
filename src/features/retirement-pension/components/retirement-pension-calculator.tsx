"use client";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
  PrimaryResults,
} from "@/components/calculators/calculator-workspace";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { formatMoneyInput } from "@/lib/input/money";
import { calculateRetirementPension } from "../calculate";
import {
  retirementPensionContent,
  type RetirementPensionLocale,
} from "../content";
import { validateRetirementPension } from "../validation";

const errorId = "retirement-pension-error";

export function RetirementPensionCalculator({
  locale,
}: {
  locale: RetirementPensionLocale;
}) {
  const copy = retirementPensionContent[locale];
  const [values, setValues] = useState({
    monthlyContribution: "500,000",
    years: "20",
    annualReturnRate: "4",
  });
  const [result, setResult] = useState<ReturnType<
    typeof calculateRetirementPension
  > | null>(null);
  const [error, setError] = useState("");
  const [animationKey, setAnimationKey] = useState(0);
  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateRetirementPension(values);
    if (!checked) {
      setError(copy.error);
      setResult(null);
      return;
    }
    setError("");
    setResult(calculateRetirementPension(checked));
    setAnimationKey((key) => key + 1);
  }
  function reset() {
    setValues({
      monthlyContribution: "500,000",
      years: "20",
      annualReturnRate: "4",
    });
    setResult(null);
    setError("");
  }
  return (
    <section aria-labelledby="retirement-pension-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="retirement-pension-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {error ? (
            <p
              id={errorId}
              role="alert"
              className="mt-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
          {(["monthlyContribution", "years", "annualReturnRate"] as const).map(
            (field) => (
              <label key={field} className="mt-4 block text-sm font-medium">
                {copy[field]}
                <input
                  inputMode="decimal"
                  value={values[field]}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [field]:
                        field === "monthlyContribution"
                          ? formatMoneyInput(event.target.value, current[field])
                          : event.target.value,
                    }))
                  }
                  className="mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm"
                />
              </label>
            ),
          )}
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          aria-labelledby="retirement-pension-result"
          className="rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="retirement-pension-result" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.estimatedBalance,
                value: (
                  <AnimatedWon
                    value={result?.estimatedBalance ?? null}
                    animationKey={animationKey}
                  />
                ),
                featured: true,
              },
              {
                label: copy.principal,
                value: (
                  <AnimatedWon
                    value={result?.principal ?? null}
                    animationKey={animationKey}
                  />
                ),
              },
              {
                label: copy.investmentGain,
                value: (
                  <AnimatedWon
                    value={result?.investmentGain ?? null}
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
