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
import { calculateEmergencyFund, type EmergencyFundResult } from "../calculate";
import { emergencyFundContent, type EmergencyFundLocale } from "../content";

const fieldClass = "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-16 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";

const initialValues = {
  monthlyEssentialExpenses: "2,000,000",
  targetMonths: "6",
  currentSavings: "5,000,000",
  monthlyContribution: "700,000",
};

export function EmergencyFundCalculator({ locale }: { locale: EmergencyFundLocale }) {
  const copy = emergencyFundContent[locale];
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(false);
  const [result, setResult] = useState<EmergencyFundResult>();
  const { currency } = useDisplayCurrency(locale);
  const { resultRef, noteNumericInputFocus, requestResultScroll, cancelResultScroll } = useStableResultScroll(result ?? null);

  function number(value: string) {
    const parsed = Number(value.replaceAll(",", "").trim());
    return Number.isFinite(parsed) ? parsed : null;
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const monthlyEssentialExpenses = number(values.monthlyEssentialExpenses);
    const targetMonths = number(values.targetMonths);
    const currentSavings = number(values.currentSavings);
    const monthlyContribution = number(values.monthlyContribution);
    const invalid = monthlyEssentialExpenses === null || monthlyEssentialExpenses <= 0 || targetMonths === null || targetMonths <= 0 || targetMonths > 36 || currentSavings === null || currentSavings < 0 || monthlyContribution === null || monthlyContribution < 0;
    setError(invalid);
    if (invalid || monthlyEssentialExpenses === null || targetMonths === null || currentSavings === null || monthlyContribution === null) {
      setResult(undefined);
      return;
    }
    requestResultScroll();
    setResult(calculateEmergencyFund({ monthlyEssentialExpenses, targetMonths, currentSavings, monthlyContribution }));
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setError(false);
    setResult(undefined);
  }

  function updateMoney(key: "monthlyEssentialExpenses" | "currentSavings" | "monthlyContribution", value: string) {
    setValues((current) => ({ ...current, [key]: formatMoneyInput(value, current[key]) }));
  }

  const money = (value?: number) => value === undefined ? "—" : formatDisplayCurrency(value, locale, currency);
  const coverage = result ? `${result.currentCoverageMonths.toFixed(1)} ${locale === "ko" ? "개월" : "months"}` : "—";
  const monthsToGoal = result ? result.monthsToGoal === null ? (locale === "ko" ? "월 저축액 입력 필요" : "Add a monthly contribution") : `${result.monthsToGoal} ${locale === "ko" ? "개월" : "months"}` : "—";

  return (
    <section aria-labelledby="emergency-fund-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form onSubmit={submit} onFocusCapture={noteNumericInputFocus} noValidate className={`${compactCalculatorSettingsClass} min-w-0`}>
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2 id="emergency-fund-input-title" className="mt-1 text-xl font-semibold">{copy.input}</h2>
          {error ? <p role="alert" className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive">{copy.error}</p> : null}
          <CurrencySelector locale={locale} />
          <Field id="monthlyEssentialExpenses" label={copy.monthlyExpenses} value={values.monthlyEssentialExpenses} suffix={currency} onChange={(value) => updateMoney("monthlyEssentialExpenses", value)} />
          <Field id="targetMonths" label={copy.targetMonths} value={values.targetMonths} suffix={locale === "ko" ? "개월" : "months"} onChange={(value) => setValues((current) => ({ ...current, targetMonths: value }))} />
          <Field id="currentSavings" label={copy.currentSavings} value={values.currentSavings} suffix={currency} onChange={(value) => updateMoney("currentSavings", value)} />
          <Field id="monthlyContribution" label={copy.monthlyContribution} value={values.monthlyContribution} suffix={currency} onChange={(value) => updateMoney("monthlyContribution", value)} />
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>{copy.reset}</Button>
          </div>
        </form>

        <section ref={resultRef} aria-labelledby="emergency-fund-result-title" className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm">
          <h2 id="emergency-fund-result-title" className="text-xl font-semibold">{copy.result}</h2>
          <PrimaryResults metrics={[
            { label: copy.targetFund, value: money(result?.targetFund), featured: true },
            { label: copy.fundingGap, value: money(result?.fundingGap) },
            { label: copy.coverage, value: coverage },
            { label: copy.monthsToGoal, value: monthsToGoal },
            { label: copy.surplus, value: money(result?.surplus) },
          ]} />
          <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
        </section>
      </div>
    </section>
  );
}

function Field({ id, label, value, suffix, onChange }: { id: string; label: string; value: string; suffix: string; onChange: (value: string) => void }) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      <div className="relative">
        <input id={id} inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} className={fieldClass} />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">{suffix}</span>
      </div>
    </div>
  );
}
