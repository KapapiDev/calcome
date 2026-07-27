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

import { calculateUnemploymentBenefit } from "../calculate";
import { INITIAL_UNEMPLOYMENT_VALUES } from "../constants";
import { formatBenefitWon } from "../format";
import {
  getUnemploymentBenefitsDictionary,
  type UnemploymentBenefitsLocale,
} from "../i18n";
import type {
  UnemploymentBenefitErrors,
  UnemploymentBenefitFormValues,
  UnemploymentBenefitResult,
} from "../types";
import { validateUnemploymentBenefit } from "../validation";
import { BenefitTimeline } from "./benefit-timeline";

const inputClass =
  "mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

export function UnemploymentBenefitsCalculator({
  locale = "ko",
}: {
  locale?: UnemploymentBenefitsLocale;
}) {
  const copy = getUnemploymentBenefitsDictionary(locale).calculator;
  const [values, setValues] = useState<UnemploymentBenefitFormValues>(
    INITIAL_UNEMPLOYMENT_VALUES,
  );
  const [errors, setErrors] = useState<UnemploymentBenefitErrors>({});
  const [result, setResult] = useState<UnemploymentBenefitResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  const update = <K extends keyof UnemploymentBenefitFormValues>(
    field: K,
    value: UnemploymentBenefitFormValues[K],
  ) => setValues((current) => ({ ...current, [field]: value }));
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateUnemploymentBenefit(values, locale);
    setErrors(validation.errors);
    setAnnouncement("");
    if (!validation.data) {
      cancelResultScroll();
      setResult(null);
      setDetailsOpen(true);
      const first = Object.keys(validation.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateUnemploymentBenefit(validation.data);
    requestResultScroll();
    setResult(next);
    setAnimationKey((key) => key + 1);
    setDetailsOpen(true);
    setAnnouncement(copy.complete(formatBenefitWon(next.totalBenefit, locale)));
  }
  function reset() {
    cancelResultScroll();
    setValues(INITIAL_UNEMPLOYMENT_VALUES);
    setErrors({});
    setResult(null);
    setDetailsOpen(true);
    setAnnouncement(copy.resetAnnouncement);
  }
  return (
    <section aria-labelledby="unemployment-calculator-title">
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
            id="unemployment-calculator-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.inputTitle}
          </h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {copy.inputDescription}
          </p>
          {Object.keys(errors).length ? (
            <div
              id="unemployment-error-summary"
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
            >
              {copy.errorSummary}
            </div>
          ) : null}
          <MoneyField
            id="averageDailyWage"
            label={copy.averageDailyWage}
            value={values.averageDailyWage}
            placeholder={copy.wagePlaceholder}
            unit={locale === "ko" ? "원" : "KRW"}
            error={errors.averageDailyWage}
            onChange={(event) =>
              update(
                "averageDailyWage",
                formatMoneyInput(event.target.value, values.averageDailyWage),
              )
            }
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <NumberField
              id="insuredMonths"
              label={copy.insuredMonths}
              value={values.insuredMonths}
              placeholder={copy.monthsPlaceholder}
              unit={copy.months}
              error={errors.insuredMonths}
              onChange={(event) => update("insuredMonths", event.target.value)}
            />
            <NumberField
              id="age"
              label={copy.age}
              value={values.age}
              placeholder={copy.agePlaceholder}
              unit={copy.yearsOld}
              error={errors.age}
              onChange={(event) => update("age", event.target.value)}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="dailyHours" className="text-sm font-medium">
              {copy.dailyHours}
            </label>
            <div className="relative">
              <select
                id="dailyHours"
                value={values.dailyHours}
                onChange={(event) => update("dailyHours", event.target.value)}
                className={`${inputClass} pr-12`}
              >
                {Array.from({ length: 8 }, (_, index) => index + 1).map(
                  (hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ),
                )}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-8 flex items-center pt-1.5 text-xs text-muted-foreground">
                {copy.hours}
              </span>
            </div>
          </div>
          <label className="mt-3 flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm">
            <input
              type="checkbox"
              checked={values.disabled}
              onChange={(event) => update("disabled", event.target.checked)}
            />
            {copy.disabled}
          </label>
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
            aria-labelledby="unemployment-result-title"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-primary">
              {copy.resultEyebrow}
            </p>
            <h2
              id="unemployment-result-title"
              className="mt-1 text-xl font-semibold"
            >
              {copy.resultTitle}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.totalBenefit,
                  value: (
                    <AnimatedWon
                      key={`total-${result ? animationKey : "empty"}`}
                      value={result?.totalBenefit ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.dailyBenefit,
                  value: (
                    <AnimatedWon
                      key={`daily-${result ? animationKey : "empty"}`}
                      value={result?.dailyBenefit ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.benefitDays,
                  value: result
                    ? `${result.benefitDays}${locale === "ko" ? "일" : " days"}`
                    : "-",
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
          <BenefitTimeline days={result?.benefitDays ?? null} locale={locale} />
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
              <>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    [copy.baseAmount, result.calculatedDailyBenefit],
                    [copy.lowerLimit, result.lowerLimit],
                    [copy.upperLimit, result.upperLimit],
                    [copy.applied, result.dailyBenefit],
                  ].map(([label, value]) => (
                    <div
                      key={String(label)}
                      className="rounded-lg bg-muted p-3"
                    >
                      <dt className="text-xs text-muted-foreground">
                        {String(label)}
                      </dt>
                      <dd className="mt-1 font-semibold tabular-nums">
                        {formatBenefitWon(value, locale)}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-sm font-medium">
                  {result.appliedLimit === "lower"
                    ? copy.limitLower
                    : result.appliedLimit === "upper"
                      ? copy.limitUpper
                      : copy.limitNone}
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                {copy.emptyDetails}
              </p>
            )}
          </details>
        </div>
      </div>
    </section>
  );
}

function MoneyField({
  id,
  label,
  value,
  placeholder,
  unit,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  unit: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="text-sm font-medium">
        {label} <span className="text-destructive">*</span>
      </label>
      <div className="relative">
        <input
          id={id}
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error unemployment-error-summary` : undefined
          }
          className={`${inputClass} pr-14`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-xs text-muted-foreground">
          {unit}
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
function NumberField({
  id,
  label,
  value,
  placeholder,
  unit,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  unit: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium">
        {label} <span className="text-destructive">*</span>
      </label>
      <div className="relative">
        <input
          id={id}
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error unemployment-error-summary` : undefined
          }
          className={`${inputClass} pr-12`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-xs text-muted-foreground">
          {unit}
        </span>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
