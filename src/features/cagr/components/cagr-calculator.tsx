"use client";

import Decimal from "decimal.js";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import {
  CurrencySelector,
  useDisplayCurrency,
} from "@/components/calculators/currency-selector";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";

import { calculateCagr } from "../calculate";
import { DEFAULT_CAGR_VALUES } from "../constants";
import {
  formatCagrMultiple,
  formatCagrPercent,
  formatCagrCurrency,
} from "../format";
import { createCagrGrowthRecords } from "../growth";
import { getCagrDictionary, type CagrLocale } from "../i18n";
import type {
  CagrField,
  CagrFormValues,
  CagrGrowthRecord,
  CagrResult,
  CagrValidationErrors,
} from "../types";
import { validateCagrForm } from "../validation";
import { AnimatedCagrValue } from "./animated-cagr-value";
import { CagrGrowthChart } from "./cagr-growth-chart";

const INITIAL_VALUES: CagrFormValues = {
  ...DEFAULT_CAGR_VALUES,
  initialValue: "",
  finalValue: "",
  investmentPeriod: "",
};

const ERROR_SUMMARY_ID = "cagr-error-summary";

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
  field: CagrField;
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
          aria-describedby={`${field}-help${error ? ` ${field}-error ${ERROR_SUMMARY_ID}` : ""}`}
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

export function CagrCalculator({ locale = "ko" }: { locale?: CagrLocale }) {
  const { currency } = useDisplayCurrency(locale);
  const copy = getCagrDictionary(locale).calculator;
  const [values, setValues] = useState<CagrFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<CagrValidationErrors>({});
  const [result, setResult] = useState<CagrResult | null>(null);
  const [appliedValues, setAppliedValues] =
    useState<CagrFormValues>(INITIAL_VALUES);
  const [records, setRecords] = useState<CagrGrowthRecord[]>([]);
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

  function updateValue(field: CagrField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validateField(field: CagrField) {
    const validation = validateCagrForm(values, locale);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }

  function clearResult() {
    cancelResultScroll();
    setResult(null);
    setAppliedValues(INITIAL_VALUES);
    setRecords([]);
    setDetailsOpen(true);
    setAdditionalOpen(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateCagrForm(values, locale);
    setErrors(validation.errors);
    setAnnouncement("");
    if (!validation.data) {
      clearResult();
      const first = Object.keys(validation.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateCagr(validation.data);
    requestResultScroll();
    setResult(next);
    setRecords(createCagrGrowthRecords(validation.data, values.periodUnit));
    setAppliedValues(values);
    setAnimationKey((current) => current + 1);
    setDetailsOpen(true);
    setAdditionalOpen(true);
    setAnnouncement(copy.complete(formatCagrPercent(next.cagrPercent)));
  }

  function reset() {
    clearResult();
    setValues(INITIAL_VALUES);
    setErrors({});
    setAnnouncement(copy.resetAnnouncement);
  }

  const initial = result
    ? new Decimal(appliedValues.initialValue.replaceAll(",", ""))
    : null;
  const ending = result
    ? new Decimal(appliedValues.finalValue.replaceAll(",", ""))
    : null;
  const multiple = initial && ending ? ending.div(initial) : null;
  const periodLabel = result
    ? `${appliedValues.investmentPeriod} ${appliedValues.periodUnit === "years" ? copy.years : copy.months}`
    : "-";

  return (
    <section aria-labelledby="cagr-calculator-title">
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
          <h2 id="cagr-calculator-title" className="mt-1 text-xl font-semibold">
            {copy.inputTitle}
          </h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {copy.inputDescription}
          </p>
          <CurrencySelector locale={locale} />
          {Object.keys(errors).length ? (
            <div
              id={ERROR_SUMMARY_ID}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
            >
              {copy.errorSummary}
            </div>
          ) : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <NumberField
              field="initialValue"
              label={copy.initialValue}
              value={values.initialValue}
              unit={currency}
              help={copy.initialHelp}
              error={errors.initialValue}
              placeholder={copy.initialPlaceholder}
              money
              onChange={(event) =>
                updateValue("initialValue", event.target.value)
              }
              onBlur={() => validateField("initialValue")}
            />
            <NumberField
              field="finalValue"
              label={copy.finalValue}
              value={values.finalValue}
              unit={currency}
              help={copy.finalHelp}
              error={errors.finalValue}
              placeholder={copy.finalPlaceholder}
              money
              onChange={(event) =>
                updateValue("finalValue", event.target.value)
              }
              onBlur={() => validateField("finalValue")}
            />
            <NumberField
              field="investmentPeriod"
              label={copy.period}
              value={values.investmentPeriod}
              unit={values.periodUnit === "years" ? copy.years : copy.months}
              help={copy.periodHelp}
              error={errors.investmentPeriod}
              placeholder={copy.periodPlaceholder}
              onChange={(event) =>
                updateValue("investmentPeriod", event.target.value)
              }
              onBlur={() => validateField("investmentPeriod")}
            />
            <div>
              <label htmlFor="periodUnit" className="text-sm font-medium">
                {copy.periodUnit} <span className="text-destructive">*</span>
              </label>
              <select
                id="periodUnit"
                value={values.periodUnit}
                onChange={(event) =>
                  updateValue("periodUnit", event.target.value)
                }
                className={controlClass}
              >
                <option value="years">{copy.years}</option>
                <option value="months">{copy.months}</option>
              </select>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Button type="submit" size="lg" className="h-11">
              {copy.calculate}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11"
              onClick={reset}
            >
              {copy.reset}
            </Button>
          </div>
        </form>

        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            aria-labelledby="cagr-result-title"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-primary">
              {copy.resultEyebrow}
            </p>
            <h2 id="cagr-result-title" className="mt-1 text-xl font-semibold">
              {copy.resultTitle}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.cagr,
                  value: (
                    <AnimatedCagrValue
                      key={`cagr-${result ? animationKey : "empty"}`}
                      value={result?.cagrPercent ?? null}
                      format={formatCagrPercent}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.totalGrowth,
                  value: (
                    <AnimatedCagrValue
                      key={`growth-${result ? animationKey : "empty"}`}
                      value={result?.totalReturnPercent ?? null}
                      format={formatCagrPercent}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.absoluteProfit,
                  value: (
                    <AnimatedCagrValue
                      key={`profit-${result ? animationKey : "empty"}`}
                      value={result?.absoluteProfit ?? null}
                      format={(value) =>
                        formatCagrCurrency(value, locale, currency)
                      }
                      animationKey={animationKey}
                    />
                  ),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              {copy.resultNote}
            </p>
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {announcement}
            </p>
          </section>

          <CagrGrowthChart
            records={result ? records : undefined}
            periodUnit={appliedValues.periodUnit}
            animationKey={animationKey}
            locale={locale}
            currency={currency}
          />

          <details
            open={result ? detailsOpen : true}
            onToggle={(event) => {
              if (result) setDetailsOpen(event.currentTarget.open);
            }}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <summary
              aria-disabled={!result}
              onClick={(event) => {
                if (!result) event.preventDefault();
              }}
              className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copy.details}
            </summary>
            {result ? (
              <div className="mt-4 max-h-[36rem] overflow-auto rounded-lg border">
                <table className="w-full min-w-[520px] text-right text-sm tabular-nums">
                  <caption className="sr-only">{copy.tableCaption}</caption>
                  <thead className="sticky top-0 bg-muted">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left">
                        {copy.periodIndex}
                      </th>
                      <th scope="col" className="px-3 py-3">
                        {copy.estimatedValue}
                      </th>
                      <th scope="col" className="px-3 py-3">
                        {copy.cumulativeGrowth}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.index} className="border-t">
                        <th
                          scope="row"
                          className="px-3 py-3 text-left font-medium"
                        >
                          {record.index}{" "}
                          {appliedValues.periodUnit === "years"
                            ? copy.years
                            : copy.months}
                        </th>
                        <td className="px-3 py-3">
                          {formatCagrCurrency(record.value, locale, currency)}
                        </td>
                        <td className="px-3 py-3">
                          {formatCagrPercent(record.growthPercent)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                {copy.detailsEmpty}
              </p>
            )}
          </details>

          <details
            open={additionalOpen}
            onToggle={(event) => setAdditionalOpen(event.currentTarget.open)}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <summary className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.additional}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  [
                    copy.beginningValue,
                    <AnimatedCagrValue
                      key={`initial-${animationKey}`}
                      value={initial}
                      format={(value) =>
                        formatCagrCurrency(value, locale, currency)
                      }
                      animationKey={animationKey}
                    />,
                  ],
                  [
                    copy.endingValue,
                    <AnimatedCagrValue
                      key={`ending-${animationKey}`}
                      value={ending}
                      format={(value) =>
                        formatCagrCurrency(value, locale, currency)
                      }
                      animationKey={animationKey}
                    />,
                  ],
                  [copy.investmentPeriod, periodLabel],
                  [
                    copy.growthMultiple,
                    <AnimatedCagrValue
                      key={`multiple-${animationKey}`}
                      value={multiple}
                      format={formatCagrMultiple}
                      animationKey={animationKey}
                    />,
                  ],
                ].map(([label, value]) => (
                  <div key={String(label)} className="rounded-lg bg-muted p-3">
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                {copy.additionalEmpty}
              </p>
            )}
          </details>
        </div>
      </div>
    </section>
  );
}
