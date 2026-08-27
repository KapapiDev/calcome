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
  calculatePensionFutureMonthlyIncome,
  type PensionFutureMonthlyIncomeResult,
} from "../calculate";
import {
  pensionFutureMonthlyIncomeContent,
  type PensionFutureMonthlyIncomeLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function initialValues(locale: PensionFutureMonthlyIncomeLocale) {
  return locale === "ko"
    ? {
        currentBalance: "100,000,000",
        monthlyContribution: "1,000,000",
        yearsUntilRetirement: "20",
        accumulationAnnualReturnPercent: "5",
        payoutYears: "25",
        payoutAnnualReturnPercent: "3",
      }
    : {
        currentBalance: "100,000",
        monthlyContribution: "1,000",
        yearsUntilRetirement: "20",
        accumulationAnnualReturnPercent: "5",
        payoutYears: "25",
        payoutAnnualReturnPercent: "3",
      };
}

export function PensionFutureMonthlyIncomeCalculator({
  locale,
}: {
  locale: PensionFutureMonthlyIncomeLocale;
}) {
  const copy = pensionFutureMonthlyIncomeContent[locale];
  const defaults = initialValues(locale);
  const [values, setValues] = useState(defaults);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<PensionFutureMonthlyIncomeResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function number(value: string) {
    const parsed = Number(value.replaceAll(",", "").trim());
    return Number.isFinite(parsed) ? parsed : null;
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const currentBalance = number(values.currentBalance);
    const monthlyContribution = number(values.monthlyContribution);
    const yearsUntilRetirement = number(values.yearsUntilRetirement);
    const accumulationAnnualReturnPercent = number(
      values.accumulationAnnualReturnPercent,
    );
    const payoutYears = number(values.payoutYears);
    const payoutAnnualReturnPercent = number(values.payoutAnnualReturnPercent);
    const invalid =
      currentBalance === null ||
      currentBalance < 0 ||
      monthlyContribution === null ||
      monthlyContribution < 0 ||
      (currentBalance === 0 && monthlyContribution === 0) ||
      yearsUntilRetirement === null ||
      yearsUntilRetirement < 0 ||
      yearsUntilRetirement > 80 ||
      accumulationAnnualReturnPercent === null ||
      accumulationAnnualReturnPercent <= -100 ||
      accumulationAnnualReturnPercent > 100 ||
      payoutYears === null ||
      payoutYears <= 0 ||
      payoutYears > 100 ||
      payoutAnnualReturnPercent === null ||
      payoutAnnualReturnPercent <= -100 ||
      payoutAnnualReturnPercent > 100;

    setError(invalid);
    if (
      invalid ||
      currentBalance === null ||
      monthlyContribution === null ||
      yearsUntilRetirement === null ||
      accumulationAnnualReturnPercent === null ||
      payoutYears === null ||
      payoutAnnualReturnPercent === null
    ) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculatePensionFutureMonthlyIncome({
        currentBalance,
        monthlyContribution,
        yearsUntilRetirement,
        accumulationAnnualReturnPercent,
        payoutYears,
        payoutAnnualReturnPercent,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setValues(defaults);
    setError(false);
    setResult(undefined);
  }

  function updateMoney(
    key: "currentBalance" | "monthlyContribution",
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));
  }

  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);

  return (
    <section aria-labelledby="pension-future-monthly-income-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="pension-future-monthly-income-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <CurrencySelector locale={locale} />
          <Field
            id="currentBalance"
            label={copy.currentBalance}
            value={values.currentBalance}
            suffix={currency}
            onChange={(value) => updateMoney("currentBalance", value)}
          />
          <Field
            id="monthlyContribution"
            label={copy.monthlyContribution}
            value={values.monthlyContribution}
            suffix={currency}
            onChange={(value) => updateMoney("monthlyContribution", value)}
          />
          <Field
            id="yearsUntilRetirement"
            label={copy.yearsUntilRetirement}
            value={values.yearsUntilRetirement}
            suffix={locale === "ko" ? "년" : "years"}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                yearsUntilRetirement: value,
              }))
            }
          />
          <Field
            id="accumulationAnnualReturnPercent"
            label={copy.accumulationReturn}
            value={values.accumulationAnnualReturnPercent}
            suffix="%"
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                accumulationAnnualReturnPercent: value,
              }))
            }
          />
          <Field
            id="payoutYears"
            label={copy.payoutYears}
            value={values.payoutYears}
            suffix={locale === "ko" ? "년" : "years"}
            onChange={(value) =>
              setValues((current) => ({ ...current, payoutYears: value }))
            }
          />
          <Field
            id="payoutAnnualReturnPercent"
            label={copy.payoutReturn}
            value={values.payoutAnnualReturnPercent}
            suffix="%"
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                payoutAnnualReturnPercent: value,
              }))
            }
          />
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>

        <section
          ref={resultRef}
          aria-labelledby="pension-future-monthly-income-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="pension-future-monthly-income-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.monthlyIncome,
                value: money(result?.estimatedMonthlyIncome),
                featured: true,
              },
              {
                label: copy.retirementBalance,
                value: money(result?.projectedRetirementBalance),
              },
              {
                label: copy.annualIncome,
                value: money(result?.estimatedAnnualIncome),
              },
              {
                label: copy.totalContributions,
                value: money(result?.totalContributions),
              },
              {
                label: copy.investmentGrowth,
                value: money(result?.investmentGrowth),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  suffix,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  suffix: string;
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
          onChange={(event) => onChange(event.target.value)}
          className={fieldClass}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {suffix}
        </span>
      </div>
    </div>
  );
}
