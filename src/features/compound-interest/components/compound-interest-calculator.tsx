"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Calculator, ChartNoAxesCombined } from "lucide-react";

import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { afterViewportSettles } from "@/lib/browser/stable-viewport";
import { formatMoneyInput } from "@/lib/input/money";

import { calculateCompoundInterest } from "../calculate";
import { DEFAULT_COMPOUND_INTEREST_VALUES } from "../constants";
import { formatMultiplier, formatPercent, formatWon } from "../format";
import { getCompoundDictionary, type CompoundLocale } from "../i18n";
import type {
  CompoundInterestField,
  CompoundInterestFormValues,
  CompoundInterestResult,
  ValidationErrors,
} from "../types";
import { validateCompoundInterestForm } from "../validation";
import { AnimatedWon } from "./animated-won";
import { CompoundGrowthChart } from "./compound-growth-chart";

const INITIAL_COMPOUND_INTEREST_VALUES: CompoundInterestFormValues = {
  ...DEFAULT_COMPOUND_INTEREST_VALUES,
  initialPrincipal: "",
  recurringContribution: "",
  durationYears: "",
  annualInterestRate: "",
};

const inputClassName =
  "mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 sm:text-sm";

type NumberFieldProps = {
  field: CompoundInterestField;
  label: string;
  value: string;
  unit: string;
  help?: string;
  error?: string;
  required?: boolean;
  placeholder: string;
  money?: boolean;
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

function NumberField({
  field,
  label,
  value,
  unit,
  help,
  error,
  required = false,
  placeholder,
  money = false,
  className,
  onChange,
  onBlur,
}: NumberFieldProps) {
  const descriptionIds = [
    help ? `${field}-help` : "",
    error ? `${field}-error` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <label htmlFor={field} className="text-sm font-medium">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </label>
      <div className="relative">
        <input
          id={field}
          name={field}
          value={value}
          onChange={(event) => {
            if (money)
              event.target.value = formatMoneyInput(event.target.value, value);
            onChange(event);
          }}
          placeholder={placeholder}
          onBlur={onBlur}
          inputMode="decimal"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionIds || undefined}
          className={`${inputClassName} pr-14`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-2 text-sm text-muted-foreground">
          {unit}
        </span>
      </div>
      {help ? (
        <p id={`${field}-help`} className="sr-only">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={`${field}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CompoundInterestCalculator({
  locale = "ko",
}: {
  locale?: CompoundLocale;
}) {
  const copy = getCompoundDictionary(locale).calculator;
  const [values, setValues] = useState<CompoundInterestFormValues>(
    INITIAL_COMPOUND_INTEREST_VALUES,
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [result, setResult] = useState<CompoundInterestResult | null>(null);
  const [yearlyDetailsOpen, setYearlyDetailsOpen] = useState(true);
  const [additionalDetailsOpen, setAdditionalDetailsOpen] = useState(false);
  const [chartAnimationKey, setChartAnimationKey] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const resultSectionRef = useRef<HTMLElement>(null);
  const pendingResultScrollRef = useRef(false);
  const mobileInputWasFocusedRef = useRef(false);

  useEffect(() => {
    if (!result || !pendingResultScrollRef.current) return;

    pendingResultScrollRef.current = false;
    const keyboardMayBeOpen = Boolean(
      mobileInputWasFocusedRef.current &&
      window.visualViewport &&
      window.visualViewport.width < 768,
    );
    mobileInputWasFocusedRef.current = false;

    return afterViewportSettles(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      resultSectionRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, keyboardMayBeOpen);
  }, [result]);

  function updateValue(field: CompoundInterestField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validateField(field: CompoundInterestField) {
    const validation = validateCompoundInterestForm(values, locale);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnnouncement("");
    const validation = validateCompoundInterestForm(values, locale);
    setErrors(validation.errors);

    if (!validation.data) {
      const firstField = Object.keys(validation.errors)[0];
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`#${firstField}`)?.focus();
      });
      return;
    }

    const nextResult = calculateCompoundInterest(validation.data);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    pendingResultScrollRef.current = true;
    setResult(nextResult);
    setChartAnimationKey((current) => current + 1);
    setYearlyDetailsOpen(true);
    setAdditionalDetailsOpen(true);
    setAnnouncement(copy.complete(formatWon(nextResult.estimatedFinalBalance)));
  }

  function reset() {
    pendingResultScrollRef.current = false;
    mobileInputWasFocusedRef.current = false;
    setValues(INITIAL_COMPOUND_INTEREST_VALUES);
    setErrors({});
    setResult(null);
    setYearlyDetailsOpen(true);
    setAdditionalDetailsOpen(false);
    setAnnouncement(copy.resetAnnouncement);
  }

  return (
    <section aria-labelledby="calculator-title" className="space-y-8">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          onFocusCapture={(event) => {
            if (
              event.target instanceof HTMLInputElement &&
              event.target.inputMode === "decimal"
            ) {
              mobileInputWasFocusedRef.current = true;
            }
          }}
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <div className="mb-5">
            <h2
              id="calculator-title"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Calculator className="size-5 text-primary" aria-hidden="true" />
              {copy.inputTitle}
            </h2>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              {copy.inputDescription}
            </p>
          </div>

          {Object.keys(errors).length > 0 ? (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
            >
              {copy.errorSummary}
            </div>
          ) : null}

          <div className="grid gap-x-3 gap-y-4 sm:grid-cols-2">
            <NumberField
              field="initialPrincipal"
              label={copy.initialPrincipal}
              value={values.initialPrincipal}
              unit={copy.won}
              required
              help={copy.initialHelp}
              error={errors.initialPrincipal}
              placeholder={copy.initialPlaceholder}
              money
              className="sm:order-1 sm:col-span-2"
              onChange={(event) =>
                updateValue("initialPrincipal", event.target.value)
              }
              onBlur={() => validateField("initialPrincipal")}
            />
            <NumberField
              field="recurringContribution"
              label={copy.contribution}
              value={values.recurringContribution}
              unit={copy.won}
              required
              help={copy.contributionHelp}
              error={errors.recurringContribution}
              placeholder={copy.contributionPlaceholder}
              money
              className="sm:order-2 sm:col-span-2"
              onChange={(event) =>
                updateValue("recurringContribution", event.target.value)
              }
              onBlur={() => validateField("recurringContribution")}
            />
            <div className="sm:order-6">
              <label
                htmlFor="contributionFrequency"
                className="text-sm font-medium"
              >
                {copy.contributionFrequency}{" "}
                <span className="text-destructive">*</span>
              </label>
              <select
                id="contributionFrequency"
                value={values.contributionFrequency}
                onChange={(event) =>
                  updateValue("contributionFrequency", event.target.value)
                }
                className={inputClassName}
              >
                <option value="monthly">{copy.monthly}</option>
                <option value="yearly">{copy.yearly}</option>
              </select>
            </div>
            <NumberField
              field="durationYears"
              label={copy.duration}
              value={values.durationYears}
              unit={copy.yearsUnit}
              required
              help={copy.durationHelp}
              error={errors.durationYears}
              placeholder={copy.durationPlaceholder}
              onChange={(event) =>
                updateValue("durationYears", event.target.value)
              }
              onBlur={() => validateField("durationYears")}
              className="sm:order-5"
            />
            <NumberField
              field="annualInterestRate"
              label={copy.annualRate}
              value={values.annualInterestRate}
              unit="%"
              required
              help={copy.annualRateHelp}
              error={errors.annualInterestRate}
              placeholder={copy.annualRatePlaceholder}
              onChange={(event) =>
                updateValue("annualInterestRate", event.target.value)
              }
              onBlur={() => validateField("annualInterestRate")}
              className="sm:order-3"
            />
            <div className="sm:order-4">
              <label
                htmlFor="compoundingFrequency"
                className="text-sm font-medium"
              >
                {copy.compoundingFrequency}{" "}
                <span className="text-destructive">*</span>
              </label>
              <select
                id="compoundingFrequency"
                value={values.compoundingFrequency}
                onChange={(event) =>
                  updateValue("compoundingFrequency", event.target.value)
                }
                className={inputClassName}
              >
                <option value="yearly">{copy.yearly}</option>
                <option value="semiannually">{copy.semiannually}</option>
                <option value="quarterly">{copy.quarterly}</option>
                <option value="monthly">{copy.monthly}</option>
                <option value="daily">{copy.daily}</option>
              </select>
            </div>
          </div>

          <fieldset className="mt-3">
            <legend className="text-sm font-medium">{copy.timing}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                ["end", copy.end],
                ["beginning", copy.beginning],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="contributionTiming"
                    value={value}
                    checked={values.contributionTiming === value}
                    onChange={(event) =>
                      updateValue("contributionTiming", event.target.value)
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-4 grid gap-2">
            <Button type="submit" size="lg" className="h-11 w-full">
              {copy.calculate}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11 w-full"
              onClick={reset}
            >
              {copy.reset}
            </Button>
          </div>

          <details className="mt-3 rounded-xl border bg-muted/30 px-3 py-2">
            <summary className="min-h-11 cursor-pointer content-center text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {copy.advanced}
              {values.inflationRate.trim() || values.taxRate.trim()
                ? copy.entered
                : ""}
            </summary>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {copy.advancedHelp}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <NumberField
                field="inflationRate"
                label={copy.inflation}
                value={values.inflationRate}
                unit="%"
                help={copy.inflationHelp}
                error={errors.inflationRate}
                placeholder={copy.inflationPlaceholder}
                onChange={(event) =>
                  updateValue("inflationRate", event.target.value)
                }
                onBlur={() => validateField("inflationRate")}
              />
              <NumberField
                field="taxRate"
                label={copy.tax}
                value={values.taxRate}
                unit="%"
                help={copy.taxHelp}
                error={errors.taxRate}
                placeholder={copy.taxPlaceholder}
                onChange={(event) => updateValue("taxRate", event.target.value)}
                onBlur={() => validateField("taxRate")}
              />
            </div>
          </details>
        </form>
        <div className="min-w-0 space-y-3">
          <section
            ref={resultSectionRef}
            aria-labelledby="result-title"
            className="scroll-mt-24 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2
              id="result-title"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <ChartNoAxesCombined
                className="size-5 text-primary"
                aria-hidden="true"
              />
              {copy.results}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.assets,
                  value: (
                    <AnimatedWon
                      key={`assets-${result ? chartAnimationKey : "empty"}`}
                      animationKey={chartAnimationKey}
                      value={result?.estimatedFinalBalance ?? null}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.principal,
                  value: (
                    <AnimatedWon
                      key={`principal-${result ? chartAnimationKey : "empty"}`}
                      animationKey={chartAnimationKey}
                      value={result?.totalContributedPrincipal ?? null}
                    />
                  ),
                },
                {
                  label: copy.gain,
                  value: (
                    <AnimatedWon
                      key={`gain-${result ? chartAnimationKey : "empty"}`}
                      animationKey={chartAnimationKey}
                      value={result?.estimatedNetGain ?? null}
                    />
                  ),
                },
              ]}
            />
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {announcement}
            </p>
          </section>
          <CompoundGrowthChart
            records={result?.yearlyData}
            animationKey={chartAnimationKey}
            locale={locale}
          />
          <details
            open={result ? yearlyDetailsOpen : true}
            onToggle={(event) => {
              if (result) setYearlyDetailsOpen(event.currentTarget.open);
            }}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <summary
              aria-disabled={!result}
              onClick={(event) => {
                if (!result) event.preventDefault();
              }}
              className="cursor-pointer text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copy.details}
            </summary>
            {result ? (
              <>
                <div className="mt-4 overflow-x-auto rounded-lg border">
                  <table className="w-full min-w-[640px] border-collapse text-right text-sm tabular-nums">
                    <caption className="sr-only">{copy.tableCaption}</caption>
                    <thead className="bg-muted/70">
                      <tr>
                        {copy.tableHeadings.map((heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="whitespace-nowrap border-b px-3 py-3 font-medium"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyData.map((record) => (
                        <tr
                          key={record.year}
                          className="border-b last:border-0"
                        >
                          <th scope="row" className="px-3 py-3 font-medium">
                            {record.year}
                            {copy.yearSuffix}
                          </th>
                          <td className="px-3 py-3">
                            {formatWon(record.netBalance)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.contributions)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.interest)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.cumulativePrincipal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {copy.emptyDetails}
              </p>
            )}
          </details>

          {result ? (
            <>
              <details
                open={additionalDetailsOpen}
                onToggle={(event) =>
                  setAdditionalDetailsOpen(event.currentTarget.open)
                }
                className="rounded-xl border bg-card p-4 shadow-sm"
              >
                <summary className="cursor-pointer text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {copy.additional}
                </summary>
                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                  {copy.additionalLabels.map((label, index) => (
                    <div
                      key={label}
                      className="rounded-xl border bg-background p-4"
                    >
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="mt-1 font-semibold tabular-nums">
                        {formatWon(
                          [
                            result.grossFinalBalance,
                            result.grossInterest,
                            result.estimatedTax,
                            result.inflationAdjustedValue,
                          ][index],
                        )}
                      </dd>
                    </div>
                  ))}
                  <div className="rounded-xl border bg-background p-4 sm:col-span-2">
                    <dt className="text-xs text-muted-foreground">
                      {copy.multiplier}
                    </dt>
                    <dd className="mt-1 font-semibold tabular-nums">
                      {formatMultiplier(result.growthMultiplier)}
                    </dd>
                  </div>
                </dl>
                <div className="mt-5 rounded-xl bg-muted p-4 text-sm leading-6">
                  <p className="font-medium">{copy.assumptions}</p>
                  <p className="mt-1 text-muted-foreground">
                    {copy.timingPrefix}{" "}
                    {values.contributionTiming === "beginning"
                      ? copy.beginning
                      : copy.end}
                    {result.inflationEnabled
                      ? ` · ${copy.inflationApplied} ${formatPercent(values.inflationRate)}`
                      : ` · ${copy.inflationNone}`}
                    {result.taxEnabled
                      ? ` · ${copy.taxApplied} ${formatPercent(values.taxRate)}`
                      : ` · ${copy.taxNone}`}
                  </p>
                </div>
              </details>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
