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
  calculateDollarCostAveraging,
  type DollarCostAveragingResult,
} from "../calculate";
import { dollarCostAveragingContent } from "../content";
import {
  validateDollarCostAveraging,
  type DollarCostAveragingErrors,
  type DollarCostAveragingLocale,
  type DollarCostAveragingValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-12 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues: DollarCostAveragingValues = {
  initialInvestment: "1,000,000",
  monthlyContribution: "300,000",
  annualReturnPercent: "7",
  years: "10",
};

export function DollarCostAveragingCalculator({
  locale,
}: {
  locale: DollarCostAveragingLocale;
}) {
  const copy = dollarCostAveragingContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<DollarCostAveragingErrors>({});
  const [result, setResult] = useState<DollarCostAveragingResult>();
  const { currency } = useDisplayCurrency(locale);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateDollarCostAveraging(values, locale);
    setErrors(checked.errors);
    if (!checked.data) return;
    requestResultScroll();
    setResult(calculateDollarCostAveraging(checked.data));
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
    key: "annualReturnPercent" | "years",
    value: string,
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  const numberLocale = locale === "ko" ? "ko-KR" : "en-US";
  const money = (value?: number) =>
    value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);

  return (
    <section aria-labelledby="dca-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="dca-input-title" className="mt-1 text-xl font-semibold">
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
          <MoneyField
            id="initialInvestment"
            label={copy.initialInvestment}
            value={values.initialInvestment}
            error={errors.initialInvestment}
            suffix={currency}
            onChange={(value) => updateMoney("initialInvestment", value)}
          />
          <MoneyField
            id="monthlyContribution"
            label={copy.monthlyContribution}
            value={values.monthlyContribution}
            error={errors.monthlyContribution}
            suffix={currency}
            onChange={(value) => updateMoney("monthlyContribution", value)}
          />
          <NumberField
            id="annualReturnPercent"
            label={copy.annualReturnPercent}
            value={values.annualReturnPercent}
            error={errors.annualReturnPercent}
            suffix="%"
            onChange={(value) => updateNumber("annualReturnPercent", value)}
          />
          <NumberField
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
          aria-labelledby="dca-result-title"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="dca-result-title" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.endingBalance,
                value: money(result?.endingBalance),
                featured: true,
              },
              {
                label: copy.totalInvested,
                value: money(result?.totalInvested),
              },
              {
                label: copy.estimatedGain,
                value: money(result?.estimatedGain),
              },
              {
                label: copy.months,
                value:
                  result === undefined
                    ? "—"
                    : result.months.toLocaleString(numberLocale),
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

function MoneyField(props: FieldProps) {
  return <InputField {...props} inputMode="decimal" />;
}

function NumberField(props: FieldProps) {
  return <InputField {...props} inputMode="decimal" />;
}

function InputField({
  id,
  label,
  value,
  error,
  suffix,
  onChange,
  inputMode,
}: FieldProps & { inputMode: "decimal" }) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          inputMode={inputMode}
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
