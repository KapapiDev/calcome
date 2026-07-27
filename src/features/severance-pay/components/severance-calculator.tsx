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

import { calculateSeverancePay } from "../calculate";
import { INITIAL_SEVERANCE_VALUES } from "../constants";
import {
  formatServiceDays,
  formatServiceYears,
  formatSeveranceWon,
} from "../format";
import { getSeveranceDictionary, type SeveranceLocale } from "../i18n";
import type {
  SeveranceErrors,
  SeveranceField,
  SeveranceFormValues,
  SeveranceResult,
} from "../types";
import { validateSeveranceForm } from "../validation";
import { ServiceTimeline } from "./service-timeline";

const controlClass =
  "mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "severance-error-summary";

function Field({
  field,
  label,
  value,
  placeholder,
  error,
  inputMode = "decimal",
  type = "text",
  onChange,
  onBlur,
}: {
  field: SeveranceField;
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  inputMode?: "decimal" | "none";
  type?: "text" | "date";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label htmlFor={field} className="text-sm font-medium">
        {label} <span className="text-destructive">*</span>
      </label>
      <input
        id={field}
        name={field}
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${field}-error ${errorSummaryId}` : undefined
        }
        className={controlClass}
      />
      {error ? (
        <p id={`${field}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SeveranceCalculator({
  locale = "ko",
}: {
  locale?: SeveranceLocale;
}) {
  const copy = getSeveranceDictionary(locale).calculator;
  const [values, setValues] = useState<SeveranceFormValues>(
    INITIAL_SEVERANCE_VALUES,
  );
  const [errors, setErrors] = useState<SeveranceErrors>({});
  const [result, setResult] = useState<SeveranceResult | null>(null);
  const [applied, setApplied] = useState<SeveranceFormValues>(
    INITIAL_SEVERANCE_VALUES,
  );
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

  const update = (field: SeveranceField, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));
  function validateField(field: SeveranceField) {
    const validation = validateSeveranceForm(values, locale);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateSeveranceForm(values, locale);
    setErrors(validation.errors);
    setAnnouncement("");
    if (!validation.data) {
      cancelResultScroll();
      setResult(null);
      setApplied(INITIAL_SEVERANCE_VALUES);
      setDetailsOpen(true);
      setAdditionalOpen(false);
      const first = Object.keys(validation.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateSeverancePay(validation.data);
    requestResultScroll();
    setResult(next);
    setApplied(values);
    setAnimationKey((current) => current + 1);
    setDetailsOpen(true);
    setAdditionalOpen(true);
    setAnnouncement(
      copy.complete(formatSeveranceWon(next.estimatedSeverancePay, locale)),
    );
  }
  function reset() {
    cancelResultScroll();
    setValues(INITIAL_SEVERANCE_VALUES);
    setErrors({});
    setResult(null);
    setApplied(INITIAL_SEVERANCE_VALUES);
    setDetailsOpen(true);
    setAdditionalOpen(false);
    setAnnouncement(copy.resetAnnouncement);
  }
  const serviceLabel = result
    ? `${formatServiceYears(result.serviceYears, locale)} · ${formatServiceDays(result.serviceDays, locale)}`
    : undefined;
  return (
    <section aria-labelledby="severance-calculator-title">
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
            id="severance-calculator-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.inputTitle}
          </h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {copy.inputDescription}
          </p>
          {Object.keys(errors).length ? (
            <div
              id={errorSummaryId}
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
            >
              {copy.errorSummary}
            </div>
          ) : null}
          <div className="mt-4">
            <label htmlFor="averageDailyWage" className="text-sm font-medium">
              {copy.averageWage} <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <input
                id="averageDailyWage"
                name="averageDailyWage"
                value={values.averageDailyWage}
                placeholder={copy.averagePlaceholder}
                inputMode="decimal"
                onChange={(event) => {
                  event.target.value = formatMoneyInput(
                    event.target.value,
                    values.averageDailyWage,
                  );
                  update("averageDailyWage", event.target.value);
                }}
                onBlur={() => validateField("averageDailyWage")}
                aria-invalid={Boolean(errors.averageDailyWage)}
                aria-describedby={`averageDailyWage-help${
                  errors.averageDailyWage
                    ? ` averageDailyWage-error ${errorSummaryId}`
                    : ""
                }`}
                className={`${controlClass} pr-14`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
                {copy.won}
              </span>
            </div>
            <p
              id="averageDailyWage-help"
              className="mt-1 text-xs leading-5 text-muted-foreground"
            >
              {copy.averageHelp}
            </p>
            {errors.averageDailyWage ? (
              <p
                id="averageDailyWage-error"
                className="mt-1 text-sm text-destructive"
              >
                {errors.averageDailyWage}
              </p>
            ) : null}
          </div>
          <fieldset className="mt-4">
            <legend className="text-sm font-medium">{copy.periodMethod}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["dates", "manual"] as const).map((mode) => (
                <label
                  key={mode}
                  className="flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="periodMode"
                    value={mode}
                    checked={values.periodMode === mode}
                    onChange={() => {
                      update("periodMode", mode);
                      setErrors({});
                    }}
                  />
                  {mode === "dates" ? copy.dates : copy.manual}
                </label>
              ))}
            </div>
          </fieldset>
          {values.periodMode === "dates" ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Field
                field="startDate"
                label={copy.startDate}
                type="date"
                inputMode="none"
                value={values.startDate}
                error={errors.startDate}
                onChange={(event) => update("startDate", event.target.value)}
                onBlur={() => validateField("startDate")}
              />
              <div>
                <Field
                  field="endDate"
                  label={copy.endDate}
                  type="date"
                  inputMode="none"
                  value={values.endDate}
                  error={errors.endDate}
                  onChange={(event) => update("endDate", event.target.value)}
                  onBlur={() => validateField("endDate")}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {copy.endDateHelp}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Field
                field="yearsWorked"
                label={copy.years}
                value={values.yearsWorked}
                placeholder="0"
                error={errors.yearsWorked}
                onChange={(event) => update("yearsWorked", event.target.value)}
                onBlur={() => validateField("yearsWorked")}
              />
              <Field
                field="monthsWorked"
                label={copy.months}
                value={values.monthsWorked}
                placeholder="0"
                error={errors.monthsWorked}
                onChange={(event) => update("monthsWorked", event.target.value)}
                onBlur={() => validateField("monthsWorked")}
              />
              <Field
                field="daysWorked"
                label={copy.days}
                value={values.daysWorked}
                placeholder="0"
                error={errors.daysWorked}
                onChange={(event) => update("daysWorked", event.target.value)}
                onBlur={() => validateField("daysWorked")}
              />
            </div>
          )}
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
            aria-labelledby="severance-result-title"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-primary">
              {copy.resultEyebrow}
            </p>
            <h2
              id="severance-result-title"
              className="mt-1 text-xl font-semibold"
            >
              {copy.resultTitle}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.estimatedPay,
                  value: (
                    <AnimatedWon
                      key={`pay-${result ? animationKey : "empty"}`}
                      value={result?.estimatedSeverancePay ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.averageDailyWage,
                  value: (
                    <AnimatedWon
                      key={`daily-${result ? animationKey : "empty"}`}
                      value={result?.averageDailyWage ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.thirtyDayWage,
                  value: (
                    <AnimatedWon
                      key={`thirty-${result ? animationKey : "empty"}`}
                      value={result?.thirtyDayWage ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              {copy.resultNote}
            </p>
            <p className="sr-only" aria-live="polite">
              {announcement}
            </p>
          </section>
          <ServiceTimeline
            mode={applied.periodMode}
            startDate={applied.startDate}
            endDate={applied.endDate}
            serviceLabel={serviceLabel}
            locale={locale}
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
              className="min-h-10 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copy.details}
            </summary>
            {result ? (
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  [copy.servicePeriod, serviceLabel],
                  [
                    copy.serviceDays,
                    formatServiceDays(result.serviceDays, locale),
                  ],
                  [
                    copy.serviceYears,
                    formatServiceYears(result.serviceYears, locale),
                  ],
                  [
                    copy.averageDailyWage,
                    formatSeveranceWon(result.averageDailyWage, locale),
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-muted p-3">
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                {copy.emptyDetails}
              </p>
            )}
          </details>
          <details
            open={additionalOpen}
            onToggle={(event) => setAdditionalOpen(event.currentTarget.open)}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <summary className="min-h-10 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.additional}
            </summary>
            {result ? (
              <div className="mt-4 space-y-3 text-sm">
                <p className="rounded-lg bg-muted p-3 font-mono">
                  {copy.formula}
                </p>
                <p className="text-muted-foreground">
                  {applied.periodMode === "dates"
                    ? copy.dateBasis
                    : copy.manualBasis}
                </p>
                <p className="font-semibold">
                  {formatSeveranceWon(result.estimatedSeverancePay, locale)}
                </p>
              </div>
            ) : null}
          </details>
        </div>
      </div>
    </section>
  );
}
