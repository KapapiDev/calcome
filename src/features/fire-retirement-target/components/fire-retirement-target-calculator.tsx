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
  calculateFireRetirementTarget,
  type FireRetirementTargetResult,
} from "../calculate";
import {
  fireRetirementTargetContent,
  type FireRetirementTargetLocale,
} from "../content";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  monthlyExpenses: "3,000",
  withdrawalRatePercent: "4",
  currentPortfolio: "200,000",
  monthlyContribution: "2,000",
  expectedAnnualReturnPercent: "5",
};

export function FireRetirementTargetCalculator({
  locale,
}: {
  locale: FireRetirementTargetLocale;
}) {
  const copy = fireRetirementTargetContent[locale];
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<FireRetirementTargetResult>();
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
    const monthlyExpenses = number(values.monthlyExpenses);
    const withdrawalRatePercent = number(values.withdrawalRatePercent);
    const currentPortfolio = number(values.currentPortfolio);
    const monthlyContribution = number(values.monthlyContribution);
    const expectedAnnualReturnPercent = number(
      values.expectedAnnualReturnPercent,
    );
    const invalid =
      monthlyExpenses === null ||
      monthlyExpenses <= 0 ||
      withdrawalRatePercent === null ||
      withdrawalRatePercent <= 0 ||
      withdrawalRatePercent > 20 ||
      currentPortfolio === null ||
      currentPortfolio < 0 ||
      monthlyContribution === null ||
      monthlyContribution < 0 ||
      expectedAnnualReturnPercent === null ||
      expectedAnnualReturnPercent <= -100 ||
      expectedAnnualReturnPercent > 100;

    setError(invalid);
    if (
      invalid ||
      monthlyExpenses === null ||
      withdrawalRatePercent === null ||
      currentPortfolio === null ||
      monthlyContribution === null ||
      expectedAnnualReturnPercent === null
    ) {
      setResult(undefined);
      return;
    }

    requestResultScroll();
    setResult(
      calculateFireRetirementTarget({
        monthlyExpenses,
        withdrawalRatePercent,
        currentPortfolio,
        monthlyContribution,
        expectedAnnualReturnPercent,
      }),
    );
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setError(false);
    setResult(undefined);
  }

  function updateMoney(
    key: "monthlyExpenses" | "currentPortfolio" | "monthlyContribution",
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));
  }

  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);
  const progress = result ? `${result.fundedPercent.toFixed(1)}%` : "—";
  const timeToTarget = result
    ? result.monthsToTarget === null
      ? locale === "ko"
        ? "100년 내 도달하지 않음"
        : "Not reached within 100 years"
      : result.monthsToTarget === 0
        ? locale === "ko"
          ? "목표 달성"
          : "Target reached"
        : `${Math.floor(result.monthsToTarget / 12)}${locale === "ko" ? "년" : "y"} ${result.monthsToTarget % 12}${locale === "ko" ? "개월" : "m"}`
    : "—";

  return (
    <section aria-labelledby="fire-retirement-target-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="fire-retirement-target-input-title"
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
            id="monthlyExpenses"
            label={copy.monthlyExpenses}
            value={values.monthlyExpenses}
            suffix={currency}
            onChange={(value) => updateMoney("monthlyExpenses", value)}
          />
          <Field
            id="withdrawalRatePercent"
            label={copy.withdrawalRate}
            value={values.withdrawalRatePercent}
            suffix="%"
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                withdrawalRatePercent: value,
              }))
            }
          />
          <Field
            id="currentPortfolio"
            label={copy.currentPortfolio}
            value={values.currentPortfolio}
            suffix={currency}
            onChange={(value) => updateMoney("currentPortfolio", value)}
          />
          <Field
            id="monthlyContribution"
            label={copy.monthlyContribution}
            value={values.monthlyContribution}
            suffix={currency}
            onChange={(value) => updateMoney("monthlyContribution", value)}
          />
          <Field
            id="expectedAnnualReturnPercent"
            label={copy.expectedReturn}
            value={values.expectedAnnualReturnPercent}
            suffix="%"
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                expectedAnnualReturnPercent: value,
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
          aria-labelledby="fire-retirement-target-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="fire-retirement-target-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.targetPortfolio,
                value: money(result?.targetPortfolio),
                featured: true,
              },
              { label: copy.fundingGap, value: money(result?.fundingGap) },
              { label: copy.fundedPercent, value: progress },
              { label: copy.monthsToTarget, value: timeToTarget },
              {
                label: copy.annualExpenses,
                value: money(result?.annualExpenses),
              },
              {
                label: copy.annualWithdrawal,
                value: money(result?.annualWithdrawalAtTarget),
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
