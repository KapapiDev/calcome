"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateEmployerTotalLaborCost,
  type EmployerTotalLaborCostResult,
  type EmploymentTrainingRate,
} from "../calculate";
import {
  employerTotalLaborCostContent,
  type EmployerTotalLaborCostLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  monthlyWage: "3,000,000",
  employmentTrainingRate: "0.25",
  industrialAccidentRate: "0",
  includeRetirementProvision: true,
};

const trainingOptions = [
  ["0.25", "150인 미만 / under 150 employees"],
  ["0.45", "150인 이상 우선지원 / 150+ priority-support"],
  ["0.65", "150~999인 / 150–999 employees"],
  ["0.85", "1000인 이상·국가·지자체 / 1,000+ or government"],
] as const;

export function EmployerTotalLaborCostCalculator({
  locale,
}: {
  locale: EmployerTotalLaborCostLocale;
}) {
  const copy = employerTotalLaborCostContent[locale];
  const [values, setValues] = useState(initialValues);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<EmployerTotalLaborCostResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const monthlyWage = Number(values.monthlyWage.replaceAll(",", ""));
    const employmentTrainingRate = Number(
      values.employmentTrainingRate,
    ) as EmploymentTrainingRate;
    const industrialAccidentRate = Number(values.industrialAccidentRate);
    const invalid =
      !Number.isFinite(monthlyWage) ||
      monthlyWage <= 0 ||
      ![0.25, 0.45, 0.65, 0.85].includes(employmentTrainingRate) ||
      !Number.isFinite(industrialAccidentRate) ||
      industrialAccidentRate < 0 ||
      industrialAccidentRate > 20;

    setHasError(invalid);
    if (invalid) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculateEmployerTotalLaborCost({
        monthlyWage,
        employmentTrainingRate,
        industrialAccidentRate,
        includeRetirementProvision: values.includeRetirementProvision,
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
    value === undefined
      ? "—"
      : new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
          style: "currency",
          currency: "KRW",
          maximumFractionDigits: 0,
        }).format(value);

  return (
    <section aria-labelledby="employer-total-labor-cost-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="employer-total-labor-cost-input-title"
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
          <div className="mt-4">
            <label htmlFor="monthlyWage" className="block text-sm font-medium">
              {copy.monthlyWage}
            </label>
            <div className="relative">
              <input
                id="monthlyWage"
                inputMode="decimal"
                value={values.monthlyWage}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    monthlyWage: formatMoneyInput(
                      event.target.value,
                      current.monthlyWage,
                    ),
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                KRW
              </span>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="employmentTrainingRate"
              className="block text-sm font-medium"
            >
              {copy.trainingRate}
            </label>
            <select
              id="employmentTrainingRate"
              value={values.employmentTrainingRate}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  employmentTrainingRate: event.target.value,
                }))
              }
              className="mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
            >
              {trainingOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label} ({value}%)
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label
              htmlFor="industrialAccidentRate"
              className="block text-sm font-medium"
            >
              {copy.industrialAccidentRate}
            </label>
            <div className="relative">
              <input
                id="industrialAccidentRate"
                inputMode="decimal"
                value={values.industrialAccidentRate}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    industrialAccidentRate: event.target.value,
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
          <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={values.includeRetirementProvision}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  includeRetirementProvision: event.target.checked,
                }))
              }
              className="size-4"
            />
            {copy.includeRetirement}
          </label>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          ref={resultRef}
          aria-labelledby="employer-total-labor-cost-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="employer-total-labor-cost-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.totalMonthly,
                value: money(result?.monthlyTotalLaborCost),
                featured: true,
              },
              {
                label: copy.totalAnnual,
                value: money(result?.annualTotalLaborCost),
              },
              {
                label: copy.employerOnCost,
                value: money(result?.monthlyEmployerOnCost),
              },
              {
                label: copy.onCostPercent,
                value:
                  result === undefined
                    ? "—"
                    : `${result.employerOnCostPercent.toFixed(2)}%`,
              },
              {
                label: copy.pension,
                value: money(result?.nationalPension),
              },
              {
                label: copy.health,
                value: money(result?.healthAndLongTermCare),
              },
              {
                label: copy.employment,
                value: money(result?.employmentInsurance),
              },
              {
                label: copy.industrialAccident,
                value: money(result?.industrialAccidentInsurance),
              },
              {
                label: copy.retirement,
                value: money(result?.retirementProvision),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}
