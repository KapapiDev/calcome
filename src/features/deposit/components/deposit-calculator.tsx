"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";

import { calculateDeposit } from "../calculate";
import {
  DEFAULT_DEPOSIT_VALUES,
  GENERAL_INTEREST_TAX_RATE,
} from "../constants";
import { formatDepositPercent, formatDepositWon } from "../format";
import { getDepositDictionary, type DepositLocale } from "../i18n";
import type {
  DepositField,
  DepositFormValues,
  DepositResult,
  DepositValidationErrors,
} from "../types";
import { validateDepositForm } from "../validation";
import { DepositGrowthChart } from "./deposit-growth-chart";

const INITIAL_VALUES: DepositFormValues = {
  ...DEFAULT_DEPOSIT_VALUES,
  depositAmount: "",
  depositPeriod: "",
  annualInterestRate: "",
};
const controlClass =
  "mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

function NumberField({
  field,
  label,
  value,
  unit,
  help,
  error,
  placeholder,
  money,
  onChange,
  onBlur,
}: {
  field: DepositField;
  label: string;
  value: string;
  unit: string;
  help: string;
  error?: string;
  placeholder: string;
  money?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label htmlFor={field} className="text-sm font-medium">
        {label} <span className="text-destructive">*</span>
      </label>
      <div className="relative">
        <input
          id={field}
          name={field}
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            if (money)
              event.target.value = formatMoneyInput(event.target.value, value);
            onChange(event);
          }}
          onBlur={onBlur}
          inputMode="decimal"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={`${field}-help${error ? ` ${field}-error deposit-form-error-summary` : ""}`}
          className={`${controlClass} pr-14`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {unit}
        </span>
      </div>
      <p id={`${field}-help`} className="sr-only">
        {help}
      </p>
      {error ? (
        <p id={`${field}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function DepositCalculator({
  locale = "ko",
}: {
  locale?: DepositLocale;
}) {
  const copy = getDepositDictionary(locale).calculator;
  const [values, setValues] = useState<DepositFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<DepositValidationErrors>({});
  const [result, setResult] = useState<DepositResult | null>(null);
  const [appliedValues, setAppliedValues] = useState(DEFAULT_DEPOSIT_VALUES);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [additionalOpen, setAdditionalOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  function updateValue(field: DepositField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }
  function validateField(field: DepositField) {
    const validation = validateDepositForm(values, locale);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateDepositForm(values, locale);
    setErrors(validation.errors);
    setAnnouncement("");
    if (!validation.data) {
      cancelResultScroll();
      setResult(null);
      setAppliedValues(DEFAULT_DEPOSIT_VALUES);
      setDetailsOpen(true);
      setAdditionalOpen(false);
      const first = Object.keys(validation.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateDeposit(validation.data);
    requestResultScroll();
    setResult(next);
    setAppliedValues(values);
    setAnimationKey((current) => current + 1);
    setDetailsOpen(true);
    setAdditionalOpen(true);
    setAnnouncement(copy.complete(formatDepositWon(next.maturityAfterTax)));
  }
  function reset() {
    cancelResultScroll();
    setValues(INITIAL_VALUES);
    setErrors({});
    setResult(null);
    setAppliedValues(DEFAULT_DEPOSIT_VALUES);
    setDetailsOpen(true);
    setAdditionalOpen(false);
    setAnnouncement(copy.resetAnnouncement);
  }
  const taxRate =
    appliedValues.taxOption === "tax-free"
      ? "0"
      : appliedValues.taxOption === "general"
        ? GENERAL_INTEREST_TAX_RATE
        : appliedValues.customTaxRate;

  return (
    <section aria-labelledby="deposit-calculator-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">
            {copy.inputEyebrow}
          </p>
          <h2
            id="deposit-calculator-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.inputTitle}
          </h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {copy.inputDescription}
          </p>
          {Object.keys(errors).length ? (
            <div
              id="deposit-form-error-summary"
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
            >
              {copy.errorSummary}
            </div>
          ) : null}
          <div className="mt-4 grid gap-3">
            <NumberField
              field="depositAmount"
              label={copy.amount}
              value={values.depositAmount}
              unit={copy.won}
              help={copy.amountHelp}
              error={errors.depositAmount}
              placeholder={copy.amountPlaceholder}
              money
              onChange={(e) => updateValue("depositAmount", e.target.value)}
              onBlur={() => validateField("depositAmount")}
            />
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                field="depositPeriod"
                label={copy.period}
                value={values.depositPeriod}
                unit={values.periodUnit === "years" ? copy.years : copy.months}
                help={copy.periodHelp}
                error={errors.depositPeriod}
                placeholder={copy.periodPlaceholder}
                onChange={(e) => updateValue("depositPeriod", e.target.value)}
                onBlur={() => validateField("depositPeriod")}
              />
              <div>
                <label htmlFor="periodUnit" className="text-sm font-medium">
                  {copy.periodUnit} <span className="text-destructive">*</span>
                </label>
                <select
                  id="periodUnit"
                  value={values.periodUnit}
                  onChange={(e) => updateValue("periodUnit", e.target.value)}
                  className={controlClass}
                >
                  <option value="years">{copy.years}</option>
                  <option value="months">{copy.months}</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                field="annualInterestRate"
                label={copy.rate}
                value={values.annualInterestRate}
                unit="%"
                help={copy.rateHelp}
                error={errors.annualInterestRate}
                placeholder={copy.ratePlaceholder}
                onChange={(e) =>
                  updateValue("annualInterestRate", e.target.value)
                }
                onBlur={() => validateField("annualInterestRate")}
              />
              <div>
                <label htmlFor="interestMethod" className="text-sm font-medium">
                  {copy.method} <span className="text-destructive">*</span>
                </label>
                <select
                  id="interestMethod"
                  value={values.interestMethod}
                  onChange={(e) =>
                    updateValue("interestMethod", e.target.value)
                  }
                  className={controlClass}
                >
                  <option value="simple">{copy.simple}</option>
                  <option value="compound">{copy.compound}</option>
                </select>
              </div>
            </div>
          </div>
          <fieldset className="mt-3">
            <legend className="text-sm font-medium">{copy.taxOption}</legend>
            <div className="mt-1.5 grid gap-2">
              {[
                ["general", copy.general],
                ["tax-free", copy.taxFree],
                ["custom", copy.custom],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="taxOption"
                    value={value}
                    checked={values.taxOption === value}
                    onChange={(e) => updateValue("taxOption", e.target.value)}
                  />
                  {label}
                </label>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {copy.taxHelp}
            </p>
          </fieldset>
          {values.taxOption === "custom" ? (
            <div className="mt-3">
              <NumberField
                field="customTaxRate"
                label={copy.customTax}
                value={values.customTaxRate}
                unit="%"
                help={copy.customTaxHelp}
                error={errors.customTaxRate}
                placeholder={copy.customTaxPlaceholder}
                onChange={(e) => updateValue("customTaxRate", e.target.value)}
                onBlur={() => validateField("customTaxRate")}
              />
            </div>
          ) : null}
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            aria-labelledby="deposit-result-title"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-primary">
              {copy.resultsEyebrow}
            </p>
            <h2
              id="deposit-result-title"
              className="mt-1 text-xl font-semibold"
            >
              {copy.resultsTitle}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.maturity,
                  value: result ? (
                    <AnimatedWon
                      value={result.maturityAfterTax}
                      animationKey={animationKey}
                    />
                  ) : (
                    "-"
                  ),
                  featured: true,
                },
                {
                  label: copy.principal,
                  value: result ? (
                    <AnimatedWon
                      value={result.principal}
                      animationKey={animationKey}
                    />
                  ) : (
                    "-"
                  ),
                },
                {
                  label: copy.interest,
                  value: result ? (
                    <AnimatedWon
                      value={result.afterTaxInterest}
                      animationKey={animationKey}
                    />
                  ) : (
                    "-"
                  ),
                },
              ]}
            />
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              {copy.notice}
            </p>
          </section>
          <DepositGrowthChart
            schedule={result?.schedule}
            animationKey={animationKey}
            locale={locale}
          />
          <details
            open={detailsOpen}
            onToggle={(event) => {
              if (result) setDetailsOpen(event.currentTarget.open);
            }}
            className="rounded-xl border bg-card"
          >
            <summary
              onClick={(event) => {
                if (!result) event.preventDefault();
              }}
              className="min-h-12 cursor-pointer list-none px-4 py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copy.details}
            </summary>
            <div className="border-t p-4">
              {result ? (
                <div className="max-h-[36rem] overflow-auto rounded-lg border">
                  <table className="w-full min-w-[620px] text-right text-sm tabular-nums">
                    <caption className="sr-only">{copy.tableCaption}</caption>
                    <thead className="sticky top-0 bg-muted">
                      <tr>
                        {copy.tableHeadings.map((heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="border-b px-3 py-2 font-medium"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.month} className="border-b last:border-0">
                          <th scope="row" className="px-3 py-2">
                            {row.month} {copy.monthSuffix}
                          </th>
                          <td className="px-3 py-2">
                            {formatDepositWon(row.principal)}
                          </td>
                          <td className="px-3 py-2">
                            {formatDepositWon(row.accumulatedInterest)}
                          </td>
                          <td className="px-3 py-2">
                            {formatDepositWon(row.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {copy.emptyDetails}
                </p>
              )}
            </div>
          </details>
          <details
            open={additionalOpen}
            onToggle={(event) => setAdditionalOpen(event.currentTarget.open)}
            className="rounded-xl border bg-card"
          >
            <summary className="min-h-12 cursor-pointer list-none px-4 py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.additional}
            </summary>
            <div className="border-t p-4">
              {result ? (
                <>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {[
                      [
                        copy.additionalLabels[0],
                        formatDepositWon(result.maturityBeforeTax),
                      ],
                      [
                        copy.additionalLabels[1],
                        formatDepositWon(result.grossInterest),
                      ],
                      [
                        copy.additionalLabels[2],
                        formatDepositWon(result.estimatedTax),
                      ],
                      [
                        copy.additionalLabels[3],
                        formatDepositPercent(result.effectiveReturnRate),
                      ],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-lg border bg-background p-3"
                      >
                        <dt className="text-xs text-muted-foreground">
                          {label}
                        </dt>
                        <dd className="mt-1 font-semibold tabular-nums">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <h3 className="mt-4 font-medium">{copy.assumptions}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {appliedValues.interestMethod === "simple"
                      ? copy.simple
                      : copy.compound}{" "}
                    · {appliedValues.depositPeriod}{" "}
                    {appliedValues.periodUnit === "years"
                      ? copy.years
                      : copy.months}{" "}
                    · {taxRate}%
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {copy.emptyDetails}
                </p>
              )}
            </div>
          </details>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {announcement}
          </p>
        </div>
      </div>
    </section>
  );
}
