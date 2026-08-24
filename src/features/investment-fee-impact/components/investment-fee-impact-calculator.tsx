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
  calculateInvestmentFeeImpact,
  type InvestmentFeeImpactResult,
} from "../calculate";
import {
  investmentFeeImpactContent,
  type InvestmentFeeImpactLocale,
} from "../content";
import {
  validateInvestmentFeeImpact,
  type InvestmentFeeImpactErrors,
  type InvestmentFeeImpactValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-12 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues: InvestmentFeeImpactValues = {
  initialInvestment: "10,000",
  monthlyContribution: "500",
  annualReturnPercent: "7",
  annualFeePercent: "1",
  years: "20",
};

export function InvestmentFeeImpactCalculator({
  locale,
}: {
  locale: InvestmentFeeImpactLocale;
}) {
  const copy = investmentFeeImpactContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<InvestmentFeeImpactErrors>({});
  const [result, setResult] = useState<InvestmentFeeImpactResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateInvestmentFeeImpact(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      setResult(undefined);
      return;
    }
    requestResultScroll();
    setResult(calculateInvestmentFeeImpact(checked.data));
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(undefined);
  }

  function updateMoney(
    key: "initialInvestment" | "monthlyContribution",
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [key]: formatMoneyInput(value, current[key]),
    }));
  }

  function updateNumber(
    key: "annualReturnPercent" | "annualFeePercent" | "years",
    value: string,
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);
  const percent = (value?: number) =>
    value === undefined
      ? "—"
      : `${value.toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 2,
        })}%`;

  return (
    <section aria-labelledby="investment-fee-impact-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="investment-fee-impact-input-title"
            className="mt-1 text-xl font-semibold"
          >
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
          <CurrencySelector locale={locale} />
          <InputField
            id="initialInvestment"
            label={copy.initialInvestment}
            value={values.initialInvestment}
            error={errors.initialInvestment}
            suffix={currency}
            onChange={(value) => updateMoney("initialInvestment", value)}
          />
          <InputField
            id="monthlyContribution"
            label={copy.monthlyContribution}
            value={values.monthlyContribution}
            error={errors.monthlyContribution}
            suffix={currency}
            onChange={(value) => updateMoney("monthlyContribution", value)}
          />
          <InputField
            id="annualReturnPercent"
            label={copy.annualReturnPercent}
            value={values.annualReturnPercent}
            error={errors.annualReturnPercent}
            suffix="%"
            onChange={(value) => updateNumber("annualReturnPercent", value)}
          />
          <InputField
            id="annualFeePercent"
            label={copy.annualFeePercent}
            value={values.annualFeePercent}
            error={errors.annualFeePercent}
            suffix="%"
            onChange={(value) => updateNumber("annualFeePercent", value)}
          />
          <InputField
            id="years"
            label={copy.years}
            value={values.years}
            error={errors.years}
            suffix={locale === "ko" ? "년" : "years"}
            onChange={(value) => updateNumber("years", value)}
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
          aria-labelledby="investment-fee-impact-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2
            id="investment-fee-impact-result-title"
            className="text-xl font-semibold"
          >
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.afterFees,
                value: money(result?.endingBalanceAfterFees),
                featured: true,
              },
              {
                label: copy.feeImpact,
                value: money(result?.feeImpactAmount),
              },
              {
                label: copy.feeImpactPercent,
                value: percent(result?.feeImpactPercent),
              },
              {
                label: copy.withoutFees,
                value: money(result?.endingBalanceWithoutFees),
              },
              {
                label: copy.totalInvested,
                value: money(result?.totalInvested),
              },
            ]}
          />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  suffix: string;
  onChange: (value: string) => void;
};

function InputField({ id, label, value, error, suffix, onChange }: FieldProps) {
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
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={fieldClass}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {suffix}
        </span>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
