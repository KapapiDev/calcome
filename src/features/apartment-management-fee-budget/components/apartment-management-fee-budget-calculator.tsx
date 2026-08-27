"use client";

import { type FormEvent, useMemo, useState } from "react";
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
  calculateApartmentManagementFeeBudget,
  type ApartmentManagementFeeBudgetResult,
} from "../calculate";
import {
  apartmentManagementFeeBudgetContent,
  type ApartmentManagementFeeBudgetLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: ApartmentManagementFeeBudgetLocale) {
  return locale === "ko"
    ? {
        monthlyManagementFee: "180,000",
        monthlyUtilities: "120,000",
        monthlyParkingAndOtherFee: "30,000",
        annualSpecialAssessment: "600,000",
        homeSizeSqm: "84",
        monthlyNetIncome: "5,000,000",
      }
    : {
        monthlyManagementFee: "250",
        monthlyUtilities: "180",
        monthlyParkingAndOtherFee: "50",
        annualSpecialAssessment: "1,200",
        homeSizeSqm: "85",
        monthlyNetIncome: "5,500",
      };
}

export function ApartmentManagementFeeBudgetCalculator({
  locale,
}: {
  locale: ApartmentManagementFeeBudgetLocale;
}) {
  const copy = apartmentManagementFeeBudgetContent[locale];
  const defaults = useMemo(() => initialValues(locale), [locale]);
  const [values, setValues] = useState(defaults);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<ApartmentManagementFeeBudgetResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  const parseMoney = (value: string) => Number(value.replaceAll(",", ""));
  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);
  const percent = (value?: number) =>
    value === undefined
      ? "—"
      : `${new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 2,
        }).format(value)}%`;

  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const next = calculateApartmentManagementFeeBudget({
        monthlyManagementFee: parseMoney(values.monthlyManagementFee),
        monthlyUtilities: parseMoney(values.monthlyUtilities),
        monthlyParkingAndOtherFee: parseMoney(values.monthlyParkingAndOtherFee),
        annualSpecialAssessment: parseMoney(values.annualSpecialAssessment),
        homeSizeSqm: Number(values.homeSizeSqm),
        monthlyNetIncome: parseMoney(values.monthlyNetIncome),
      });
      setHasError(false);
      requestResultScroll();
      setResult(next);
    } catch {
      setHasError(true);
      setResult(undefined);
    }
  }

  function reset() {
    cancelResultScroll();
    setValues(defaults);
    setHasError(false);
    setResult(undefined);
  }

  const setMoney = (
    key:
      | "monthlyManagementFee"
      | "monthlyUtilities"
      | "monthlyParkingAndOtherFee"
      | "annualSpecialAssessment"
      | "monthlyNetIncome",
    value: string,
  ) =>
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));

  const moneyFields = [
    ["monthlyManagementFee", copy.monthlyManagementFee],
    ["monthlyUtilities", copy.monthlyUtilities],
    ["monthlyParkingAndOtherFee", copy.monthlyParkingAndOtherFee],
    ["annualSpecialAssessment", copy.annualSpecialAssessment],
    ["monthlyNetIncome", copy.monthlyNetIncome],
  ] as const;

  return (
    <section aria-labelledby="apartment-management-fee-budget-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="apartment-management-fee-budget-input-title"
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
          {moneyFields.map(([key, label]) => (
            <div key={key} className="mt-4">
              <label htmlFor={key} className="block text-sm font-medium">
                {label}
              </label>
              <div className="relative">
                <input
                  id={key}
                  inputMode="decimal"
                  value={values[key]}
                  onChange={(event) => setMoney(key, event.target.value)}
                  aria-invalid={hasError}
                  className={fieldClass}
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                  {currency}
                </span>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <label htmlFor="homeSizeSqm" className="block text-sm font-medium">
              {copy.homeSizeSqm}
            </label>
            <div className="relative">
              <input
                id="homeSizeSqm"
                inputMode="decimal"
                value={values.homeSizeSqm}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    homeSizeSqm: event.target.value,
                  }))
                }
                aria-invalid={hasError}
                className={fieldClass}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                m²
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="apartment-management-fee-budget-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="apartment-management-fee-budget-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.monthlyBudgetedCost,
                value: money(result?.monthlyBudgetedCost),
                featured: true,
              },
              {
                label: copy.annualBudgetedCost,
                value: money(result?.annualBudgetedCost),
                featured: true,
              },
              {
                label: copy.monthlyRecurringCost,
                value: money(result?.monthlyRecurringCost),
              },
              {
                label: copy.monthlySpecialAssessmentEquivalent,
                value: money(result?.monthlySpecialAssessmentEquivalent),
              },
              {
                label: copy.monthlyCostPerSqm,
                value: money(result?.monthlyCostPerSqm),
              },
              {
                label: copy.incomeSharePercent,
                value: percent(result?.incomeSharePercent),
              },
            ]}
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {copy.note}
          </p>
        </section>
      </div>
    </section>
  );
}
