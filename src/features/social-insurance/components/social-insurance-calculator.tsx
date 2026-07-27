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
import { calculateSocialInsurance } from "../calculate";
import { INITIAL_SOCIAL_INSURANCE_VALUES } from "../constants";
import { formatSalaryWon } from "@/features/net-salary/format";
import { getSocialInsuranceDictionary } from "../i18n";
import type {
  SocialInsuranceErrors,
  SocialInsuranceFormValues,
  SocialInsuranceLocale,
  SocialInsuranceResult,
  WorkplaceSize,
} from "../types";
import { validateSocialInsurance } from "../validation";

const inputClass =
  "mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const errorSummaryId = "social-insurance-error-summary";
const rows = [
  "pension",
  "health",
  "longTermCare",
  "employment",
  "industrialAccident",
] as const;

export function SocialInsuranceCalculator({
  locale = "ko",
}: {
  locale?: SocialInsuranceLocale;
}) {
  const copy = getSocialInsuranceDictionary(locale).calc;
  const [values, setValues] = useState<SocialInsuranceFormValues>(
    INITIAL_SOCIAL_INSURANCE_VALUES,
  );
  const [errors, setErrors] = useState<SocialInsuranceErrors>({});
  const [result, setResult] = useState<SocialInsuranceResult | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  const update = (field: keyof SocialInsuranceFormValues, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));
  const moneyChange =
    (field: "monthlyPay" | "nonTaxablePay") =>
    (event: ChangeEvent<HTMLInputElement>) =>
      update(field, formatMoneyInput(event.target.value, values[field]));
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checked = validateSocialInsurance(values, locale);
    setErrors(checked.errors);
    setAnnouncement("");
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      const first = Object.keys(checked.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateSocialInsurance(checked.data);
    requestResultScroll();
    setResult(next);
    setAnimationKey((key) => key + 1);
    setAnnouncement(
      copy.complete(formatSalaryWon(next.employee.total, locale)),
    );
  }
  function reset() {
    cancelResultScroll();
    setValues(INITIAL_SOCIAL_INSURANCE_VALUES);
    setErrors({});
    setResult(null);
    setAnnouncement(copy.resetAnnouncement);
  }
  return (
    <section aria-labelledby="social-insurance-calculator-title">
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
            id="social-insurance-calculator-title"
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
              {copy.error}
            </div>
          ) : null}
          <MoneyField
            id="monthlyPay"
            label={copy.monthlyPay}
            value={values.monthlyPay}
            placeholder={copy.monthlyPlaceholder}
            error={errors.monthlyPay}
            onChange={moneyChange("monthlyPay")}
            unit={copy.won}
          />
          <MoneyField
            id="nonTaxablePay"
            label={copy.nonTaxable}
            value={values.nonTaxablePay}
            placeholder={copy.nonTaxablePlaceholder}
            error={errors.nonTaxablePay}
            onChange={moneyChange("nonTaxablePay")}
            unit={copy.won}
          />
          <MoneyField
            id="accidentRate"
            label={copy.accidentRate}
            value={values.accidentRate}
            placeholder={copy.accidentPlaceholder}
            error={errors.accidentRate}
            onChange={(e) => update("accidentRate", e.target.value)}
            unit={copy.percent}
          />
          <div className="mt-3">
            <label htmlFor="workplaceSize" className="text-sm font-medium">
              {copy.workplaceSize}
            </label>
            <select
              id="workplaceSize"
              value={values.workplaceSize}
              onChange={(event) =>
                update("workplaceSize", event.target.value as WorkplaceSize)
              }
              aria-invalid={Boolean(errors.workplaceSize)}
              aria-describedby={
                errors.workplaceSize
                  ? `workplaceSize-error ${errorSummaryId}`
                  : undefined
              }
              className={inputClass}
            >
              <option value="under150">{copy.under150}</option>
              <option value="priority150">{copy.priority150}</option>
              <option value="between150And999">{copy.between150And999}</option>
              <option value="over1000OrPublic">{copy.over1000OrPublic}</option>
            </select>
            {errors.workplaceSize ? (
              <p
                id="workplaceSize-error"
                className="mt-1 text-sm text-destructive"
              >
                {errors.workplaceSize}
              </p>
            ) : null}
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
            aria-labelledby="social-insurance-result-title"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-primary">
              {copy.resultEyebrow}
            </p>
            <h2
              id="social-insurance-result-title"
              className="mt-1 text-xl font-semibold"
            >
              {copy.resultTitle}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.employeeTotal,
                  value: (
                    <AnimatedWon
                      value={result?.employee.total ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.employerTotal,
                  value: (
                    <AnimatedWon
                      value={result?.employer.total ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.combinedTotal,
                  value: (
                    <AnimatedWon
                      value={result?.combinedTotal ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
            <p className="sr-only" aria-live="polite">
              {announcement}
            </p>
          </section>
          <details open className="rounded-xl border bg-card p-4 shadow-sm">
            <summary className="min-h-10 cursor-pointer content-center font-semibold">
              {copy.breakdown}
            </summary>
            {result ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[460px] text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="py-2">{copy.item}</th>
                      <th className="py-2 text-right">{copy.employee}</th>
                      <th className="py-2 text-right">{copy.employer}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((key) => (
                      <tr key={key} className="border-b last:border-0">
                        <th className="py-2 text-left font-normal">
                          {key === "employment" ? copy.employment : copy[key]}
                        </th>
                        <td className="py-2 text-right tabular-nums">
                          {formatSalaryWon(
                            key === "industrialAccident"
                              ? 0
                              : result.employee[key],
                            locale,
                          )}
                        </td>
                        <td className="py-2 text-right tabular-nums">
                          {formatSalaryWon(result.employer[key], locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  {copy.employerEmploymentNote}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">{copy.empty}</p>
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
  error,
  onChange,
  unit,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  unit: string;
}) {
  return (
    <div className="mt-3">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
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
            error ? `${id}-error ${errorSummaryId}` : undefined
          }
          className={`${inputClass} pr-12`}
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
