"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import { calculateValueAddedTax, type ValueAddedTaxResult } from "../calculate";
import { valueAddedTaxContent, type ValueAddedTaxLocale } from "../content";
import {
  validateValueAddedTax,
  type ValueAddedTaxErrors,
  type ValueAddedTaxValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: ValueAddedTaxValues = {
  amount: "",
  taxRate: "10",
  mode: "exclusive",
};
const errorSummaryId = "value-added-tax-error-summary";

export function ValueAddedTaxCalculator({
  locale,
}: {
  locale: ValueAddedTaxLocale;
}) {
  const copy = valueAddedTaxContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ValueAddedTaxErrors>({});
  const [result, setResult] = useState<ValueAddedTaxResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateValueAddedTax(values, locale);
    setErrors(checked.errors);
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      return;
    }
    requestResultScroll();
    setResult(calculateValueAddedTax(checked.data));
    setAnimationKey((value) => value + 1);
  }

  return (
    <section aria-labelledby="value-added-tax-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="value-added-tax-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              id={errorSummaryId}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <fieldset className="mt-4">
            <legend className="text-sm font-medium">{copy.mode}</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(["exclusive", "inclusive"] as const).map((mode) => (
                <label
                  key={mode}
                  className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm"
                >
                  <input
                    type="radio"
                    name="mode"
                    value={mode}
                    checked={values.mode === mode}
                    onChange={() =>
                      setValues((current) => ({ ...current, mode }))
                    }
                  />
                  {copy[mode]}
                </label>
              ))}
            </div>
          </fieldset>
          <Field
            id="amount"
            label={copy.amount}
            value={values.amount}
            placeholder="1,100,000"
            error={errors.amount}
            errorSummaryId={errorSummaryId}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                amount: formatMoneyInput(value, current.amount),
              }))
            }
          />
          <Field
            id="taxRate"
            label={copy.taxRate}
            value={values.taxRate}
            placeholder="10"
            suffix="%"
            error={errors.taxRate}
            errorSummaryId={errorSummaryId}
            onChange={(taxRate) =>
              setValues((current) => ({ ...current, taxRate }))
            }
          />
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                cancelResultScroll();
                setValues(initialValues);
                setErrors({});
                setResult(null);
              }}
            >
              {copy.reset}
            </Button>
          </div>
        </form>
        <section
          ref={resultRef}
          aria-labelledby="value-added-tax-result"
          className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
        >
          <h2 id="value-added-tax-result" className="text-xl font-semibold">
            {copy.result}
          </h2>
          <PrimaryResults
            metrics={[
              {
                label: copy.totalAmount,
                value: (
                  <AnimatedWon
                    value={rounded(result?.totalAmount)}
                    animationKey={animationKey}
                  />
                ),
                featured: true,
              },
              {
                label: copy.supplyAmount,
                value: (
                  <AnimatedWon
                    value={rounded(result?.supplyAmount)}
                    animationKey={animationKey}
                  />
                ),
              },
              {
                label: copy.taxAmount,
                value: (
                  <AnimatedWon
                    value={rounded(result?.taxAmount)}
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

function rounded(value: import("decimal.js").default | undefined) {
  return value?.toDecimalPlaces(0) ?? null;
}

function Field({
  id,
  label,
  value,
  placeholder,
  suffix,
  error,
  errorSummaryId,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  suffix?: string;
  error?: string;
  errorSummaryId: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-error`;
  return (
    <label htmlFor={id} className="mt-4 block text-sm font-medium">
      {label}
      <span className="relative block">
        <input
          id={id}
          inputMode="decimal"
          className={fieldClass}
          value={value}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${errorId} ${errorSummaryId}` : undefined}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
            {suffix}
          </span>
        ) : null}
      </span>
      {error ? (
        <span id={errorId} className="mt-1 block text-xs text-destructive">
          {error}
        </span>
      ) : null}
    </label>
  );
}
