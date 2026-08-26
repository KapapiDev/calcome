"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import {
  CurrencySelector,
  formatDisplayCurrency,
  useDisplayCurrency,
} from "@/components/calculators/currency-selector";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateSalaryNegotiationTarget,
  type SalaryNegotiationTargetResult,
} from "../calculate";
import {
  salaryNegotiationTargetContent,
  type SalaryNegotiationTargetLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  currentSalary: "100,000",
  minimumIncreasePercent: "5",
  targetIncreasePercent: "12",
  stretchIncreasePercent: "20",
};

export function SalaryNegotiationTargetCalculator({
  locale,
}: {
  locale: SalaryNegotiationTargetLocale;
}) {
  const copy = salaryNegotiationTargetContent[locale];
  const [values, setValues] = useState(initialValues);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<SalaryNegotiationTargetResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const currentSalary = Number(values.currentSalary.replaceAll(",", ""));
    const minimumIncreasePercent = Number(values.minimumIncreasePercent);
    const targetIncreasePercent = Number(values.targetIncreasePercent);
    const stretchIncreasePercent = Number(values.stretchIncreasePercent);
    const invalid =
      !Number.isFinite(currentSalary) ||
      currentSalary <= 0 ||
      !Number.isFinite(minimumIncreasePercent) ||
      !Number.isFinite(targetIncreasePercent) ||
      !Number.isFinite(stretchIncreasePercent) ||
      minimumIncreasePercent < 0 ||
      targetIncreasePercent < minimumIncreasePercent ||
      stretchIncreasePercent < targetIncreasePercent ||
      stretchIncreasePercent > 300;

    setHasError(invalid);
    if (invalid) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculateSalaryNegotiationTarget({
        currentSalary,
        minimumIncreasePercent,
        targetIncreasePercent,
        stretchIncreasePercent,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setHasError(false);
    setResult(undefined);
  }

  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);

  const percentFields = [
    ["minimumIncreasePercent", copy.minimumIncrease],
    ["targetIncreasePercent", copy.targetIncrease],
    ["stretchIncreasePercent", copy.stretchIncrease],
  ] as const;

  return (
    <section aria-labelledby="salary-negotiation-target-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="salary-negotiation-target-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {hasError ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <CurrencySelector locale={locale} />
          <div className="mt-4">
            <label
              htmlFor="currentSalary"
              className="block text-sm font-medium"
            >
              {copy.currentSalary}
            </label>
            <div className="relative">
              <input
                id="currentSalary"
                inputMode="decimal"
                value={values.currentSalary}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    currentSalary: formatMoneyInput(
                      event.target.value,
                      current.currentSalary,
                    ),
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                {currency}
              </span>
            </div>
          </div>
          {percentFields.map(([key, label]) => (
            <div key={key} className="mt-4">
              <label htmlFor={key} className="block text-sm font-medium">
                {label}
              </label>
              <div className="relative">
                <input
                  id={key}
                  inputMode="decimal"
                  value={values[key]}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [key]: event.target.value,
                    }))
                  }
                  aria-invalid={hasError}
                  className={fieldClass}
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          ))}
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          ref={resultRef}
          aria-labelledby="salary-negotiation-target-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="salary-negotiation-target-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.targetSalary,
                value: money(result?.targetSalary),
                featured: true,
              },
              {
                label: copy.minimumSalary,
                value: money(result?.minimumSalary),
              },
              {
                label: copy.stretchSalary,
                value: money(result?.stretchSalary),
              },
              {
                label: copy.targetIncreaseAmount,
                value: money(result?.targetIncreaseAmount),
              },
              {
                label: copy.currentMonthly,
                value: money(result?.currentMonthlyEquivalent),
              },
              {
                label: copy.targetMonthly,
                value: money(result?.targetMonthlyEquivalent),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}
