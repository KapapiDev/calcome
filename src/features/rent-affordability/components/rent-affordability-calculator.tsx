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
  calculateRentAffordability,
  type RentAffordabilityResult,
} from "../calculate";
import {
  rentAffordabilityContent,
  type RentAffordabilityLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  monthlyTakeHomeIncome: "5,000",
  fixedMonthlyObligations: "500",
  desiredMonthlyLeftover: "2,500",
  nonRentHousingCosts: "300",
  targetHousingPercent: "30",
};

export function RentAffordabilityCalculator({
  locale,
}: {
  locale: RentAffordabilityLocale;
}) {
  const copy = rentAffordabilityContent[locale];
  const [values, setValues] = useState(initialValues);
  const [hasError, setHasError] = useState(false);
  const [result, setResult] = useState<RentAffordabilityResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function parseMoney(value: string) {
    return Number(value.replaceAll(",", ""));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const monthlyTakeHomeIncome = parseMoney(values.monthlyTakeHomeIncome);
    const fixedMonthlyObligations = parseMoney(values.fixedMonthlyObligations);
    const desiredMonthlyLeftover = parseMoney(values.desiredMonthlyLeftover);
    const nonRentHousingCosts = parseMoney(values.nonRentHousingCosts);
    const targetHousingPercent = Number(values.targetHousingPercent);
    const invalid =
      !Number.isFinite(monthlyTakeHomeIncome) ||
      monthlyTakeHomeIncome <= 0 ||
      !Number.isFinite(fixedMonthlyObligations) ||
      fixedMonthlyObligations < 0 ||
      !Number.isFinite(desiredMonthlyLeftover) ||
      desiredMonthlyLeftover < 0 ||
      !Number.isFinite(nonRentHousingCosts) ||
      nonRentHousingCosts < 0 ||
      !Number.isFinite(targetHousingPercent) ||
      targetHousingPercent <= 0 ||
      targetHousingPercent > 100;

    setHasError(invalid);
    if (invalid) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculateRentAffordability({
        monthlyTakeHomeIncome,
        fixedMonthlyObligations,
        desiredMonthlyLeftover,
        nonRentHousingCosts,
        targetHousingPercent,
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

  const setMoney = (
    key:
      | "monthlyTakeHomeIncome"
      | "fixedMonthlyObligations"
      | "desiredMonthlyLeftover"
      | "nonRentHousingCosts",
    value: string,
  ) =>
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));

  const limitingFactor = result
    ? result.limitingFactor === "ratio"
      ? copy.ratioFactor
      : result.limitingFactor === "cash-flow"
        ? copy.cashFlowFactor
        : copy.bothFactor
    : "—";

  const moneyFields = [
    ["monthlyTakeHomeIncome", copy.monthlyIncome],
    ["fixedMonthlyObligations", copy.fixedObligations],
    ["desiredMonthlyLeftover", copy.desiredLeftover],
    ["nonRentHousingCosts", copy.nonRentHousingCosts],
  ] as const;

  return (
    <section aria-labelledby="rent-affordability-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="rent-affordability-input-title"
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
            <label
              htmlFor="targetHousingPercent"
              className="block text-sm font-medium"
            >
              {copy.targetHousingPercent}
            </label>
            <div className="relative">
              <input
                id="targetHousingPercent"
                inputMode="decimal"
                value={values.targetHousingPercent}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    targetHousingPercent: event.target.value,
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
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          ref={resultRef}
          aria-labelledby="rent-affordability-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="rent-affordability-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.recommendedRent,
                value: money(result?.recommendedMonthlyRent),
                featured: true,
              },
              {
                label: copy.annualRent,
                value: money(result?.annualRent),
              },
              {
                label: copy.ratioCap,
                value: money(result?.ratioBasedRentCap),
              },
              {
                label: copy.cashFlowCap,
                value: money(result?.cashFlowRentCap),
              },
              {
                label: copy.remainingAfterPlan,
                value: money(result?.remainingAfterPlan),
              },
              {
                label: copy.housingShare,
                value:
                  result === undefined
                    ? "—"
                    : `${result.totalHousingSharePercent.toFixed(1)}%`,
              },
              {
                label: copy.limitingFactor,
                value: limitingFactor,
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
