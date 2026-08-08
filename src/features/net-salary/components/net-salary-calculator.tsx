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
import { calculateNetSalary } from "../calculate";
import { INITIAL_NET_SALARY_VALUES } from "../constants";
import { formatSalaryWon } from "../format";
import { getNetSalaryDictionary, type NetSalaryLocale } from "../i18n";
import type {
  DeductionKey,
  NetSalaryErrors,
  NetSalaryFormValues,
  NetSalaryResult,
} from "../types";
import { validateNetSalary } from "../validation";
import { DeductionBar } from "./deduction-bar";

const inputClass =
  "mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const deductionKeys: DeductionKey[] = [
  "pension",
  "health",
  "longTermCare",
  "employment",
  "incomeTax",
  "localIncomeTax",
];

export function NetSalaryCalculator({
  locale = "ko",
}: {
  locale?: NetSalaryLocale;
}) {
  const copy = getNetSalaryDictionary(locale).calc;
  const [values, setValues] = useState<NetSalaryFormValues>(
    INITIAL_NET_SALARY_VALUES,
  );
  const [errors, setErrors] = useState<NetSalaryErrors>({});
  const [result, setResult] = useState<NetSalaryResult | null>(null);
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
  const update = <K extends keyof NetSalaryFormValues>(
    field: K,
    value: NetSalaryFormValues[K],
  ) => setValues((current) => ({ ...current, [field]: value }));
  const moneyChange =
    (field: "salary" | "bonus" | "monthlyNonTaxable") =>
    (event: ChangeEvent<HTMLInputElement>) =>
      update(field, formatMoneyInput(event.target.value, values[field]));
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checked = validateNetSalary(values, locale);
    setErrors(checked.errors);
    setAnnouncement("");
    if (!checked.data) {
      cancelResultScroll();
      setResult(null);
      setDetailsOpen(true);
      const first = Object.keys(checked.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateNetSalary(checked.data);
    requestResultScroll();
    setResult(next);
    setAnimationKey((key) => key + 1);
    setDetailsOpen(true);
    setAnnouncement(
      copy.complete(formatSalaryWon(next.monthlyTakeHome, locale)),
    );
  }
  function reset() {
    cancelResultScroll();
    setValues(INITIAL_NET_SALARY_VALUES);
    setErrors({});
    setResult(null);
    setDetailsOpen(true);
    setAnnouncement(copy.resetAnnouncement);
  }
  return (
    <section aria-labelledby="net-salary-calculator-title">
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
            id="net-salary-calculator-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.inputTitle}
          </h2>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {copy.inputDescription}
          </p>
          {Object.keys(errors).length ? (
            <div
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
            >
              {copy.error}
            </div>
          ) : null}
          <fieldset className="mt-4">
            <legend className="sr-only">{copy.salary}</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["annual", "monthly"] as const).map((mode) => (
                <label
                  key={mode}
                  className="flex min-h-10 items-center gap-2 rounded-lg border px-3 text-sm has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="salaryMode"
                    checked={values.salaryMode === mode}
                    onChange={() => update("salaryMode", mode)}
                  />
                  {copy[mode]}
                </label>
              ))}
            </div>
          </fieldset>
          <MoneyField
            id="salary"
            label={values.salaryMode === "annual" ? copy.annual : copy.monthly}
            value={values.salary}
            placeholder={
              values.salaryMode === "annual"
                ? copy.annualPlaceholder
                : copy.monthlyPlaceholder
            }
            error={errors.salary}
            onChange={moneyChange("salary")}
            unit={copy.won}
          />
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <MoneyField
              id="bonus"
              label={copy.bonus}
              value={values.bonus}
              placeholder={copy.bonusPlaceholder}
              error={errors.bonus}
              onChange={moneyChange("bonus")}
              unit={copy.won}
            />
            <MoneyField
              id="monthlyNonTaxable"
              label={copy.nonTaxable}
              value={values.monthlyNonTaxable}
              placeholder={copy.nonTaxablePlaceholder}
              error={errors.monthlyNonTaxable}
              onChange={moneyChange("monthlyNonTaxable")}
              unit={copy.won}
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <NumberField
              id="dependents"
              label={copy.dependents}
              value={values.dependents}
              error={errors.dependents}
              onChange={(e) => update("dependents", e.target.value)}
            />
            <NumberField
              id="children"
              label={copy.children}
              value={values.children}
              error={errors.children}
              onChange={(e) => update("children", e.target.value)}
            />
          </div>
          <fieldset className="mt-4">
            <legend className="text-sm font-medium">{copy.insurance}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {deductionKeys.map((key) => (
                <label
                  key={key}
                  className="flex min-h-10 items-center gap-2 rounded-lg border px-2 text-xs"
                >
                  <input
                    type="checkbox"
                    checked={values[key]}
                    onChange={(e) => update(key, e.target.checked)}
                  />
                  {copy[key]}
                </label>
              ))}
            </div>
          </fieldset>
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
            aria-labelledby="net-salary-result-title"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-primary">
              {copy.resultEyebrow}
            </p>
            <h2
              id="net-salary-result-title"
              className="mt-1 text-xl font-semibold"
            >
              {copy.resultTitle}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.monthlyTakeHome,
                  value: (
                    <AnimatedWon
                      value={result?.monthlyTakeHome ?? null}
                      animationKey={animationKey}
                    />
                  ),
                  featured: true,
                },
                {
                  label: copy.annualTakeHome,
                  value: (
                    <AnimatedWon
                      value={result?.annualTakeHome ?? null}
                      animationKey={animationKey}
                    />
                  ),
                },
                {
                  label: copy.gross,
                  value: (
                    <AnimatedWon
                      value={result?.annualGross ?? null}
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
          <DeductionBar result={result} locale={locale} />
          <details
            open={result ? detailsOpen : true}
            onToggle={(e) => {
              if (result) setDetailsOpen(e.currentTarget.open);
            }}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <summary
              aria-disabled={!result}
              onClick={(e) => {
                if (!result) e.preventDefault();
              }}
              className="min-h-11 cursor-pointer content-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copy.breakdown}
            </summary>
            {result ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="py-2">{copy.details}</th>
                      <th className="py-2 text-right">{copy.deductions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deductionKeys.map((key) => (
                      <tr key={key} className="border-b last:border-0">
                        <th className="py-2 text-left font-normal">
                          {copy[key]}
                        </th>
                        <td className="py-2 text-right tabular-nums">
                          {formatSalaryWon(result.deductions[key], locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold">
                      <th className="pt-3 text-left">{copy.deductions}</th>
                      <td className="pt-3 text-right">
                        {formatSalaryWon(result.monthlyDeductions, locale)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
          aria-describedby={error ? `${id}-error` : undefined}
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
function NumberField({
  id,
  label,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium">
        {label}
      </label>
      <input
        id={id}
        inputMode="numeric"
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={inputClass}
      />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
